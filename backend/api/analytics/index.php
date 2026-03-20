<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if (!defined('API_INCLUDE_MODE')) {
    try {
        if ($method !== 'POST') {
            respondError('Method not allowed', 405);
            return;
        }

        $pdo = getDatabaseConnection();
        ensureSiteAnalyticsTables($pdo);
        handleSiteAnalyticsTrack($pdo);
    } catch (InvalidArgumentException $exception) {
        respondError($exception->getMessage(), 422);
    } catch (Throwable $exception) {
        respondError('Unexpected server error', 500, [
            'details' => $exception->getMessage(),
        ]);
    }
}

function handleSiteAnalyticsTrack(PDO $pdo): void
{
    $payload = readSiteAnalyticsJsonPayload();

    $visitorId = normalizeSiteAnalyticsToken((string) ($payload['visitor_id'] ?? ''), 64);
    $sessionId = normalizeSiteAnalyticsToken((string) ($payload['session_id'] ?? ''), 64);
    $pagePath = normalizeSiteAnalyticsPath((string) ($payload['page_path'] ?? ''), 255);
    $pageTitle = normalizeSiteAnalyticsText((string) ($payload['page_title'] ?? ''), 255);
    $pageType = normalizeSiteAnalyticsText((string) ($payload['page_type'] ?? ''), 80);
    $languageCode = normalizeSiteAnalyticsLanguage((string) ($payload['language'] ?? ''));
    $referrerUrl = normalizeSiteAnalyticsUrl((string) ($payload['referrer'] ?? ''), 500);
    $deviceType = normalizeSiteAnalyticsDeviceType((string) ($payload['device_type'] ?? ''));
    $screenWidth = normalizeSiteAnalyticsScreenWidth($payload['screen_width'] ?? null);

    if ($visitorId === '' || $sessionId === '' || $pagePath === '') {
        throw new InvalidArgumentException('Visitor id, session id, and page path are required');
    }

    $currentHost = strtolower((string) (parse_url('https://' . (string) ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST) ?: ''));
    $referrerHost = normalizeSiteAnalyticsReferrerHost($referrerUrl);
    $referrerType = resolveSiteAnalyticsReferrerType($referrerUrl, $referrerHost, $currentHost);
    $ipAddress = substr(function_exists('getClientIpAddress') ? getClientIpAddress() : ((string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0')), 0, 45);
    $userAgent = substr(trim((string) ($_SERVER['HTTP_USER_AGENT'] ?? '')), 0, 500);

    if (hasRecentTrackedSiteVisit($pdo, $visitorId, $sessionId, $pagePath)) {
        respond([
            'tracked' => false,
            'deduplicated' => true,
        ], 202);
        return;
    }

    $statement = $pdo->prepare(
        'INSERT INTO site_page_visits (
            visitor_id,
            session_id,
            page_path,
            page_title,
            page_type,
            referrer_url,
            referrer_host,
            referrer_type,
            device_type,
            language_code,
            screen_width,
            user_agent,
            ip_address
        ) VALUES (
            :visitor_id,
            :session_id,
            :page_path,
            :page_title,
            :page_type,
            :referrer_url,
            :referrer_host,
            :referrer_type,
            :device_type,
            :language_code,
            :screen_width,
            :user_agent,
            :ip_address
        )'
    );
    $statement->execute([
        'visitor_id' => $visitorId,
        'session_id' => $sessionId,
        'page_path' => $pagePath,
        'page_title' => $pageTitle !== '' ? $pageTitle : null,
        'page_type' => $pageType !== '' ? $pageType : null,
        'referrer_url' => $referrerUrl !== '' ? $referrerUrl : null,
        'referrer_host' => $referrerHost !== '' ? $referrerHost : null,
        'referrer_type' => $referrerType,
        'device_type' => $deviceType,
        'language_code' => $languageCode !== '' ? $languageCode : null,
        'screen_width' => $screenWidth,
        'user_agent' => $userAgent !== '' ? $userAgent : null,
        'ip_address' => $ipAddress,
    ]);

    respond([
        'tracked' => true,
        'visit_id' => (int) $pdo->lastInsertId(),
    ], 201);
}

function ensureSiteAnalyticsTables(PDO $pdo): void
{
    static $ensured = false;

    if ($ensured) {
        return;
    }

    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS site_page_visits (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            visitor_id VARCHAR(64) NOT NULL,
            session_id VARCHAR(64) NOT NULL,
            page_path VARCHAR(255) NOT NULL,
            page_title VARCHAR(255) NULL,
            page_type VARCHAR(80) NULL,
            referrer_url VARCHAR(500) NULL,
            referrer_host VARCHAR(190) NULL,
            referrer_type VARCHAR(20) NOT NULL DEFAULT "direct",
            device_type VARCHAR(20) NOT NULL DEFAULT "desktop",
            language_code VARCHAR(12) NULL,
            screen_width INT UNSIGNED NULL,
            user_agent VARCHAR(500) NULL,
            ip_address VARCHAR(45) NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_site_page_visits_created_at (created_at),
            INDEX idx_site_page_visits_path (page_path),
            INDEX idx_site_page_visits_visitor (visitor_id),
            INDEX idx_site_page_visits_session (session_id),
            INDEX idx_site_page_visits_referrer_type (referrer_type),
            INDEX idx_site_page_visits_referrer_host (referrer_host)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    $ensured = true;
}

function readSiteAnalyticsJsonPayload(): array
{
    $raw = trim((string) file_get_contents('php://input'));
    if ($raw === '') {
        throw new InvalidArgumentException('Request payload is required');
    }

    $payload = json_decode($raw, true);
    if (!is_array($payload)) {
        throw new InvalidArgumentException('Invalid JSON payload');
    }

    return $payload;
}

function normalizeSiteAnalyticsText(string $value, int $maxLength): string
{
    $normalized = trim(preg_replace('/\s+/u', ' ', $value) ?? '');
    if ($normalized === '') {
        return '';
    }

    return mb_substr($normalized, 0, $maxLength);
}

function normalizeSiteAnalyticsToken(string $value, int $maxLength): string
{
    $normalized = strtolower(trim($value));
    if ($normalized === '') {
        return '';
    }

    $normalized = preg_replace('/[^a-z0-9_-]/', '', $normalized) ?? '';
    return substr($normalized, 0, $maxLength);
}

function normalizeSiteAnalyticsPath(string $value, int $maxLength): string
{
    $normalized = trim($value);
    if ($normalized === '') {
        return '';
    }

    if (!str_starts_with($normalized, '/')) {
        $normalized = '/' . ltrim($normalized, '/');
    }

    $normalized = preg_replace('/[#?].*$/', '', $normalized) ?? $normalized;
    return substr($normalized, 0, $maxLength);
}

function normalizeSiteAnalyticsUrl(string $value, int $maxLength): string
{
    $normalized = trim($value);
    if ($normalized === '') {
        return '';
    }

    if (!filter_var($normalized, FILTER_VALIDATE_URL)) {
        return '';
    }

    return substr($normalized, 0, $maxLength);
}

function normalizeSiteAnalyticsReferrerHost(string $referrerUrl): string
{
    if ($referrerUrl === '') {
        return '';
    }

    $host = (string) (parse_url($referrerUrl, PHP_URL_HOST) ?: '');
    return strtolower(substr($host, 0, 190));
}

function resolveSiteAnalyticsReferrerType(string $referrerUrl, string $referrerHost, string $currentHost): string
{
    if ($referrerUrl === '' || $referrerHost === '') {
        return 'direct';
    }

    if ($currentHost !== '' && $referrerHost === $currentHost) {
        return 'internal';
    }

    if ($currentHost !== '' && str_ends_with($referrerHost, '.' . $currentHost)) {
        return 'internal';
    }

    return 'external';
}

function normalizeSiteAnalyticsLanguage(string $value): string
{
    $normalized = strtolower(trim($value));
    if (!preg_match('/^[a-z]{2,5}(?:-[a-z]{2,5})?$/', $normalized)) {
        return '';
    }

    return substr($normalized, 0, 12);
}

function normalizeSiteAnalyticsDeviceType(string $value): string
{
    $normalized = strtolower(trim($value));
    $allowed = ['desktop', 'mobile', 'tablet'];
    if (!in_array($normalized, $allowed, true)) {
        return 'desktop';
    }

    return $normalized;
}

function normalizeSiteAnalyticsScreenWidth(mixed $value): ?int
{
    if ($value === null || $value === '') {
        return null;
    }

    $parsed = (int) $value;
    if ($parsed < 240 || $parsed > 12000) {
        return null;
    }

    return $parsed;
}

function hasRecentTrackedSiteVisit(PDO $pdo, string $visitorId, string $sessionId, string $pagePath, int $seconds = 20): bool
{
    $threshold = (new DateTimeImmutable(sprintf('-%d seconds', max(5, $seconds))))->format('Y-m-d H:i:s');
    $statement = $pdo->prepare(
        'SELECT id
         FROM site_page_visits
         WHERE visitor_id = :visitor_id
           AND session_id = :session_id
           AND page_path = :page_path
           AND created_at >= :threshold
         ORDER BY id DESC
         LIMIT 1'
    );
    $statement->execute([
        'visitor_id' => $visitorId,
        'session_id' => $sessionId,
        'page_path' => $pagePath,
        'threshold' => $threshold,
    ]);

    return (bool) $statement->fetchColumn();
}
