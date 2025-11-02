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
        return false;
    }

    $subject = trim($subject);
    $toName = trim($toName);
    $textBody = $textBody ?? strip_tags($htmlBody);

    if ($cfg['provider'] === 'smtp') {
        return sendEmailViaSmtp(
            $cfg['smtp_host'],
            (int)$cfg['smtp_port'],
            (string)$cfg['smtp_secure'],
            (string)$cfg['smtp_user'],
            (string)$cfg['smtp_pass'],
            $cfg['from_email'],
            $cfg['from_name'],
            $toEmail,
            $toName,
            $subject,
            $htmlBody,
            $textBody ?? strip_tags($htmlBody)
        );
    }

    return false;
}

function sendEmailViaSendGrid(
    string $apiKey,
    string $fromEmail,
    string $fromName,
    string $toEmail,
    string $toName,
    string $subject,
    string $htmlBody,
    string $textBody
): bool {
    if (!extension_loaded('curl')) {
        error_log('curl extension is required for SendGrid.');
        emailSetLastError('curl extension is required for SendGrid');
        return false;
    }

    $payload = [
        'personalizations' => [[
            'to' => [[
                'email' => $toEmail,
                'name' => $toName !== '' ? $toName : $toEmail,
            ]],
            'subject' => $subject,
        ]],
        'from' => [
            'email' => $fromEmail,
            'name' => $fromName,
        ],
        'content' => [
            [
                'type' => 'text/plain',
                'value' => $textBody,
            ],
            [
                'type' => 'text/html',
                'value' => $htmlBody,
            ],
        ],
    ];

    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false) {
        error_log('Failed to encode SendGrid payload.');
        emailSetLastError('Failed to encode SendGrid payload');
        return false;
    }

    $ch = curl_init('https://api.sendgrid.com/v3/mail/send');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => $json,
        CURLOPT_TIMEOUT => 30,
    ]);

    $response = curl_exec($ch);
    if ($response === false) {
        $curlErr = curl_error($ch);
        error_log('SendGrid request error: ' . $curlErr);
        curl_close($ch);
        emailSetLastError('SendGrid request error: ' . $curlErr);
        return false;
    }
    $status = (int) (curl_getinfo($ch, CURLINFO_RESPONSE_CODE) ?: 0);
    curl_close($ch);

    if ($status >= 200 && $status < 300) {
        return true;
    }

    $msg = sprintf('SendGrid responded with status %d: %s', $status, (string)$response);
    error_log($msg);
    emailSetLastError($msg);
    return false;
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
    // Basic validation
    if (!filter_var($toEmail, FILTER_VALIDATE_EMAIL)) {
        emailSetLastError('Invalid recipient email');
        return false;
    }

    $boundary = 'b_' . bin2hex(random_bytes(12));

    // Encode subject for UTF-8
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    $headers = [];
    $headers[] = 'From: ' . ($fromName !== '' ? ('=?UTF-8?B?' . base64_encode($fromName) . '?= <' . $fromEmail . '>') : $fromEmail);
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: 8bit';

    $bodyParts = [];
    $bodyParts[] = '--' . $boundary;
    $bodyParts[] = 'Content-Type: text/plain; charset=UTF-8';
    $bodyParts[] = 'Content-Transfer-Encoding: 8bit';
    $bodyParts[] = '';
    $bodyParts[] = $textBody;
    $bodyParts[] = '--' . $boundary;
    $bodyParts[] = 'Content-Type: text/html; charset=UTF-8';
    $bodyParts[] = 'Content-Transfer-Encoding: 8bit';
    $bodyParts[] = '';
    $bodyParts[] = $htmlBody;
    $bodyParts[] = '--' . $boundary . '--';
    $bodyParts[] = '';

    $message = implode("\r\n", $bodyParts);

    $params = '-f' . $fromEmail; // Set envelope sender for better deliverability

    try {
        // Try with envelope sender first
        $ok = @mail($toEmail, $encodedSubject, $message, implode("\r\n", $headers), $params);
        if ($ok) {
            return true;
        }
        // Fallback: try without additional params (some hosts disallow -f)
        $fallbackMsg = 'phpmail() with -f failed for ' . $toEmail . '; falling back without -f';
        error_log($fallbackMsg);
        $ok2 = @mail($toEmail, $encodedSubject, $message, implode("\r\n", $headers));
        if (!$ok2) {
            $failMsg = 'phpmail() fallback returned false for recipient ' . $toEmail;
            error_log($failMsg);
            emailSetLastError($failMsg);
        }
        return $ok2;
    } catch (Throwable $e) {
        error_log('phpmail() failed: ' . $e->getMessage());
        emailSetLastError('phpmail exception: ' . $e->getMessage());
        return false;
    }
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

    $boundary = 'b_' . bin2hex(random_bytes(12));
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

    $headers = [];
    $headers[] = 'From: ' . ($fromName !== '' ? ('=?UTF-8?B?' . base64_encode($fromName) . '?= <' . $fromEmail . '>') : $fromEmail);
    $headers[] = 'To: ' . ($toName !== '' ? ('=?UTF-8?B?' . base64_encode($toName) . '?= <' . $toEmail . '>') : $toEmail);
    $headers[] = 'Subject: ' . $encodedSubject;
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"; charset=UTF-8';
    $headers[] = 'Content-Transfer-Encoding: 8bit';

    $bodyParts = [];
    $bodyParts[] = '--' . $boundary;
    $bodyParts[] = 'Content-Type: text/plain; charset=UTF-8';
    $bodyParts[] = 'Content-Transfer-Encoding: 8bit';
    $bodyParts[] = '';
    $bodyParts[] = $textBody;
    $bodyParts[] = '--' . $boundary;
    $bodyParts[] = 'Content-Type: text/html; charset=UTF-8';
    $bodyParts[] = 'Content-Transfer-Encoding: 8bit';
    $bodyParts[] = '';
    $bodyParts[] = $htmlBody;
    $bodyParts[] = '--' . $boundary . '--';
    $bodyParts[] = '';

    $data = implode("\r\n", $headers) . "\r\n\r\n" . implode("\r\n", $bodyParts);

    $write('MAIL FROM: <' . $fromEmail . '>');
    $mailFrom = $read();
    if (!$expect($mailFrom, 250)) {
        emailSetLastError('SMTP MAIL FROM failed: ' . trim($mailFrom));
        fclose($conn);
        return false;
    }

    $write('RCPT TO: <' . $toEmail . '>');
    $rcptTo = $read();
    if (!$expect($rcptTo, 250)) {
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
    return true;
}
