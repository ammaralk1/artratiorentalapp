<?php
declare(strict_types=1);

// Lightweight last-error storage for email providers
function emailSetLastError(string $message): void
{
    $GLOBALS['email_last_error'] = $message;
}

function emailGetLastError(): ?string
{
    $err = $GLOBALS['email_last_error'] ?? null;
    return is_string($err) && $err !== '' ? $err : null;
}

/**
 * Returns validated email config from app config.
 */
function getEmailConfig(): array
{
    $config = getAppConfig('email') ?? [];

    $enabled = (bool)($config['enabled'] ?? false);
    if (!$enabled) {
        return [ 'enabled' => false ];
    }

    // SMTP-only configuration
    $fromEmail = trim((string)($config['from_email'] ?? ''));
    $fromName = trim((string)($config['from_name'] ?? ''));
    $smtpHost = trim((string)($config['smtp_host'] ?? ''));
    $smtpPort = (int)($config['smtp_port'] ?? 0);
    $smtpSecure = trim((string)($config['smtp_secure'] ?? ''));
    $smtpUser = trim((string)($config['smtp_user'] ?? ''));
    $smtpPass = (string)($config['smtp_pass'] ?? '');

    if ($fromEmail === '' || $smtpHost === '' || $smtpPort <= 0 || $smtpUser === '' || $smtpPass === '') {
        throw new RuntimeException('Email is enabled but SMTP config is incomplete.');
    }

    return [
        'enabled' => true,
        'provider' => 'smtp',
        'smtp_host' => $smtpHost,
        'smtp_port' => $smtpPort,
        'smtp_secure' => $smtpSecure,
        'smtp_user' => $smtpUser,
        'smtp_pass' => $smtpPass,
        'from_email' => $fromEmail,
        'from_name' => $fromName !== '' ? $fromName : $fromEmail,
    ];
}

/**
 * Sends an email using the configured provider.
 * Returns true on success, false on failure.
 */
function sendEmail(string $toEmail, string $toName, string $subject, string $htmlBody, ?string $textBody = null): bool
{
    emailSetLastError('');

    try {
        $cfg = getEmailConfig();
    } catch (Throwable $e) {
        error_log('Email config error: ' . $e->getMessage());
        emailSetLastError('Email config error: ' . $e->getMessage());
        return false;
    }

    if (empty($cfg['enabled'])) {
        // Make the failure reason visible to callers
        emailSetLastError('Email disabled by configuration');
        return false;
    }

    $toEmail = trim($toEmail);
    if ($toEmail === '' || !filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
        emailSetLastError('Invalid recipient email');
        return false;
    }

    $subject = trim($subject);
    $toName = trim($toName);
    $textBody = $textBody ?? strip_tags($htmlBody);

    if ($cfg['provider'] === 'smtp') {
        $smtpAttempts = buildSmtpAttemptList($cfg);
        $attemptErrors = [];
        foreach ($smtpAttempts as $attempt) {
            $ok = sendEmailViaSmtp(
                (string)$attempt['smtp_host'],
                (int)$attempt['smtp_port'],
                (string)$attempt['smtp_secure'],
                (string)$attempt['smtp_user'],
                (string)$attempt['smtp_pass'],
                (string)$attempt['from_email'],
                (string)$attempt['from_name'],
                $toEmail,
                $toName,
                $subject,
                $htmlBody,
                $textBody ?? strip_tags($htmlBody)
            );
            if ($ok) {
                emailSetLastError('');
                return true;
            }

            $lastError = emailGetLastError() ?? 'Unknown SMTP error';
            $attemptErrors[] = sprintf(
                '%s:%d (%s) -> %s',
                (string)$attempt['smtp_host'],
                (int)$attempt['smtp_port'],
                (string)$attempt['smtp_secure'],
                $lastError
            );
            error_log('SMTP attempt failed: ' . end($attemptErrors));
        }

        $phpMailFallback = sendEmailViaPhpMail(
            (string)$cfg['from_email'],
            (string)$cfg['from_name'],
            $toEmail,
            $toName,
            $subject,
            $htmlBody,
            $textBody ?? strip_tags($htmlBody)
        );
        if ($phpMailFallback) {
            emailSetLastError('');
            return true;
        }

        $mailFallbackError = emailGetLastError() ?? 'PHP mail() fallback failed';
        $smtpErrorSummary = $attemptErrors
            ? ('SMTP failed: ' . implode(' | ', $attemptErrors))
            : 'SMTP failed with no detailed error';
        emailSetLastError($smtpErrorSummary . ' | ' . $mailFallbackError);
        return false;
    }

    emailSetLastError('Unsupported email provider');
    return false;
}

function buildSmtpAttemptList(array $cfg): array
{
    $host = trim((string)($cfg['smtp_host'] ?? ''));
    $port = (int)($cfg['smtp_port'] ?? 0);
    $secure = strtolower(trim((string)($cfg['smtp_secure'] ?? '')));
    $user = trim((string)($cfg['smtp_user'] ?? ''));
    $pass = (string)($cfg['smtp_pass'] ?? '');
    $fromEmail = trim((string)($cfg['from_email'] ?? ''));
    $fromName = trim((string)($cfg['from_name'] ?? ''));

    $attempts = [];
    $seen = [];

    $pushAttempt = static function (string $h, int $p, string $s) use (
        &$attempts,
        &$seen,
        $user,
        $pass,
        $fromEmail,
        $fromName
    ): void {
        if ($h === '' || $p <= 0) {
            return;
        }
        $normalizedSecure = strtolower(trim($s));
        $key = strtolower($h) . '|' . $p . '|' . $normalizedSecure . '|' . strtolower($user);
        if (isset($seen[$key])) {
            return;
        }
        $seen[$key] = true;
        $attempts[] = [
            'smtp_host' => $h,
            'smtp_port' => $p,
            'smtp_secure' => $normalizedSecure,
            'smtp_user' => $user,
            'smtp_pass' => $pass,
            'from_email' => $fromEmail,
            'from_name' => $fromName,
        ];
    };

    // Primary configured attempt first.
    $pushAttempt($host, $port, $secure);

    // Common SMTP fallbacks.
    $pushAttempt($host, 587, 'tls');
    $pushAttempt($host, 465, 'ssl');
    $pushAttempt($host, 25, '');

    return $attempts;
}

function encodeEmailHeaderValue(string $value): string
{
    $value = trim($value);
    if ($value === '') {
        return '';
    }

    if (preg_match('/^[\x20-\x7E]+$/', $value)) {
        return $value;
    }

    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function formatEmailAddressHeader(string $email, string $name = ''): string
{
    $email = trim($email);
    $name = trim($name);

    if ($name === '') {
        return $email;
    }

    return encodeEmailHeaderValue($name) . ' <' . $email . '>';
}

function generateEmailMessageId(string $fromEmail): string
{
    $domain = 'localhost';
    if (filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
        $parts = explode('@', $fromEmail, 2);
        $candidateDomain = isset($parts[1]) ? trim((string) $parts[1]) : '';
        $candidateDomain = preg_replace('/[^A-Za-z0-9.-]/', '', $candidateDomain) ?? '';
        if ($candidateDomain !== '') {
            $domain = $candidateDomain;
        }
    }

    try {
        $token = bin2hex(random_bytes(16));
    } catch (Throwable $e) {
        $token = md5((string) microtime(true));
    }

    return '<' . $token . '@' . $domain . '>';
}

function encodeEmailBodyBase64(string $content): string
{
    return rtrim(chunk_split(base64_encode($content), 76, "\r\n"));
}

function buildMultipartEmailPayload(
    string $fromEmail,
    string $fromName,
    string $toEmail,
    string $toName,
    string $subject,
    string $htmlBody,
    string $textBody
): array {
    try {
        $boundary = 'b_' . bin2hex(random_bytes(12));
    } catch (Throwable $e) {
        $boundary = 'b_' . md5((string) microtime(true));
    }

    $headers = [];
    $headers[] = 'From: ' . formatEmailAddressHeader($fromEmail, $fromName);
    $headers[] = 'To: ' . formatEmailAddressHeader($toEmail, $toName);
    $headers[] = 'Reply-To: ' . $fromEmail;
    $headers[] = 'Date: ' . gmdate('D, d M Y H:i:s O');
    $headers[] = 'Message-ID: ' . generateEmailMessageId($fromEmail);
    $headers[] = 'Subject: ' . encodeEmailHeaderValue($subject);
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';

    $bodyParts = [];
    $bodyParts[] = '--' . $boundary;
    $bodyParts[] = 'Content-Type: text/plain; charset=UTF-8';
    $bodyParts[] = 'Content-Transfer-Encoding: base64';
    $bodyParts[] = '';
    $bodyParts[] = encodeEmailBodyBase64($textBody);
    $bodyParts[] = '--' . $boundary;
    $bodyParts[] = 'Content-Type: text/html; charset=UTF-8';
    $bodyParts[] = 'Content-Transfer-Encoding: base64';
    $bodyParts[] = '';
    $bodyParts[] = encodeEmailBodyBase64($htmlBody);
    $bodyParts[] = '--' . $boundary . '--';
    $bodyParts[] = '';

    return [
        'boundary' => $boundary,
        'encoded_subject' => encodeEmailHeaderValue($subject),
        'headers' => $headers,
        'headers_string' => implode("\r\n", $headers),
        'message' => implode("\r\n", $bodyParts),
    ];
}

function escapeSmtpData(string $data): string
{
    $normalized = str_replace("\r\n", "\n", $data);
    $escaped = preg_replace('/(?m)^\./', '..', $normalized);
    if (!is_string($escaped)) {
        $escaped = $normalized;
    }

    return str_replace("\n", "\r\n", $escaped);
}

function sendEmailViaPhpMail(
    string $fromEmail,
    string $fromName,
    string $toEmail,
    string $toName,
    string $subject,
    string $htmlBody,
    string $textBody
): bool {
    if (!function_exists('mail')) {
        emailSetLastError('PHP mail() is not available');
        return false;
    }

    $payload = buildMultipartEmailPayload(
        $fromEmail,
        $fromName,
        $toEmail,
        $toName,
        $subject,
        $htmlBody,
        $textBody
    );
    $toHeader = formatEmailAddressHeader($toEmail, $toName);
    $mailHeaders = array_values(array_filter(
        (array) ($payload['headers'] ?? []),
        static function (mixed $header): bool {
            if (!is_string($header)) {
                return false;
            }

            return stripos($header, 'Subject:') !== 0 && stripos($header, 'To:') !== 0;
        }
    ));

    $extraParams = '';
    if (filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
        $extraParams = '-f' . $fromEmail;
    }

    $sent = $extraParams !== ''
        ? @mail($toHeader, (string) $payload['encoded_subject'], (string) $payload['message'], implode("\r\n", $mailHeaders), $extraParams)
        : @mail($toHeader, (string) $payload['encoded_subject'], (string) $payload['message'], implode("\r\n", $mailHeaders));

    if (!$sent) {
        emailSetLastError('PHP mail() returned false');
        return false;
    }

    emailSetLastError('');
    return true;
}


function sendEmailViaSmtp(
    string $host,
    int $port,
    string $secure, // 'ssl' | 'tls' | ''
    string $username,
    string $password,
    string $fromEmail,
    string $fromName,
    string $toEmail,
    string $toName,
    string $subject,
    string $htmlBody,
    string $textBody
): bool {
    if (!filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
        emailSetLastError('Invalid recipient email');
        return false;
    }

    $transport = $secure === 'ssl' ? 'ssl://' : '';
    $remote = ($transport ?: '') . $host . ':' . $port;

    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ],
    ]);

    $conn = @stream_socket_client($remote, $errno, $errstr, 30, STREAM_CLIENT_CONNECT, $context);
    if (!$conn) {
        emailSetLastError('SMTP connect failed: ' . $errno . ' ' . $errstr);
        return false;
    }

    stream_set_timeout($conn, 30);

    $read = function() use ($conn) {
        $data = '';
        while (!feof($conn)) {
            $line = fgets($conn, 515);
            if ($line === false) break;
            $data .= $line;
            if (preg_match('/^\d{3} [\s\S]*\r?\n$/', $line)) break;
            if (!preg_match('/^\d{3}-/', $line)) break;
        }
        return $data;
    };

    $expect = function($data, $code) use ($read) {
        if (!preg_match('/^' . preg_quote((string)$code, '/') . '\b/', $data)) {
            return false;
        }
        return true;
    };

    $write = function($cmd) use ($conn) {
        fwrite($conn, $cmd . "\r\n");
    };

    $greeting = $read();
    if (!$expect($greeting, 220)) {
        emailSetLastError('SMTP greeting failed: ' . trim($greeting));
        fclose($conn);
        return false;
    }

    $write('EHLO ' . ($host ?: 'localhost'));
    $ehlo = $read();
    if (!$expect($ehlo, 250)) {
        // Try HELO
        $write('HELO ' . ($host ?: 'localhost'));
        $helo = $read();
        if (!$expect($helo, 250)) {
            emailSetLastError('SMTP EHLO/HELO failed');
            fclose($conn);
            return false;
        }
    }

    if ($secure === 'tls') {
        $write('STARTTLS');
        $tlsResp = $read();
        if (!$expect($tlsResp, 220)) {
            emailSetLastError('SMTP STARTTLS failed: ' . trim($tlsResp));
            fclose($conn);
            return false;
        }
        if (!stream_socket_enable_crypto($conn, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            emailSetLastError('SMTP TLS crypto enable failed');
            fclose($conn);
            return false;
        }
        // Re-EHLO after STARTTLS
        $write('EHLO ' . ($host ?: 'localhost'));
        $ehlo2 = $read();
        if (!$expect($ehlo2, 250)) {
            emailSetLastError('SMTP EHLO after STARTTLS failed');
            fclose($conn);
            return false;
        }
    }

    // AUTH LOGIN
    $write('AUTH LOGIN');
    $authResp = $read();
    if (!$expect($authResp, 334)) {
        emailSetLastError('SMTP AUTH not accepted: ' . trim($authResp));
        fclose($conn);
        return false;
    }
    $write(base64_encode($username));
    $userResp = $read();
    if (!$expect($userResp, 334)) {
        emailSetLastError('SMTP username rejected: ' . trim($userResp));
        fclose($conn);
        return false;
    }
    $write(base64_encode($password));
    $passResp = $read();
    if (!$expect($passResp, 235)) {
        emailSetLastError('SMTP password rejected: ' . trim($passResp));
        fclose($conn);
        return false;
    }

    $payload = buildMultipartEmailPayload(
        $fromEmail,
        $fromName,
        $toEmail,
        $toName,
        $subject,
        $htmlBody,
        $textBody
    );
    $data = escapeSmtpData((string) $payload['headers_string'] . "\r\n\r\n" . (string) $payload['message']);

    $write('MAIL FROM: <' . $fromEmail . '>');
    $mailFrom = $read();
    if (!$expect($mailFrom, 250)) {
        emailSetLastError('SMTP MAIL FROM failed: ' . trim($mailFrom));
        fclose($conn);
        return false;
    }

    $write('RCPT TO: <' . $toEmail . '>');
    $rcptTo = $read();
    $rcptAccepted = $expect($rcptTo, 250) || $expect($rcptTo, 251) || $expect($rcptTo, 252);
    if (!$rcptAccepted) {
        emailSetLastError('SMTP RCPT TO failed: ' . trim($rcptTo));
        fclose($conn);
        return false;
    }

    $write('DATA');
    $dataResp = $read();
    if (!$expect($dataResp, 354)) {
        emailSetLastError('SMTP DATA not accepted: ' . trim($dataResp));
        fclose($conn);
        return false;
    }

    fwrite($conn, $data . "\r\n.\r\n");
    $dataDone = $read();
    if (!$expect($dataDone, 250)) {
        emailSetLastError('SMTP message rejected: ' . trim($dataDone));
        fclose($conn);
        return false;
    }

    $write('QUIT');
    fclose($conn);
    emailSetLastError('');
    return true;
}
