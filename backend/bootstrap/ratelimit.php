<?php

declare(strict_types=1);

/**
 * IP-based rate limiting for public (unauthenticated) form endpoints.
 *
 * Uses a lightweight `form_rate_limits` table to track submissions per IP
 * per form type within a rolling time window. Entries older than the window
 * are purged on each check to keep the table small.
 */

function ensureFormRateLimitsTable(PDO $pdo): void
{
    static $ensured = false;
    if ($ensured) {
        return;
    }

    $pdo->exec(
        'CREATE TABLE IF NOT EXISTS form_rate_limits (
            id          BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            form_type   VARCHAR(64)  NOT NULL,
            ip_address  VARCHAR(45)  NOT NULL,
            submitted_at DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_frl_lookup (form_type, ip_address, submitted_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
    );

    $ensured = true;
}

/**
 * Check whether the current request IP has exceeded the submission limit
 * for the given form type within the rolling window.
 *
 * Responds with 429 and exits immediately if the limit is exceeded.
 * Records the current submission on success.
 *
 * @param PDO    $pdo        Active database connection
 * @param string $formType   Identifier string, e.g. 'contact', 'feedback'
 * @param int    $maxPerHour Maximum submissions allowed per IP per hour (default: 10)
 */
function checkPublicFormRateLimit(PDO $pdo, string $formType, int $maxPerHour = 10): void
{
    $ip = getClientIpAddress();
    $windowStart = (new DateTimeImmutable('-1 hour'))->format('Y-m-d H:i:s');
    $now = (new DateTimeImmutable())->format('Y-m-d H:i:s');

    try {
        ensureFormRateLimitsTable($pdo);

        // Purge expired entries to keep the table small
        $pdo->prepare('DELETE FROM form_rate_limits WHERE submitted_at < :window')
            ->execute(['window' => $windowStart]);

        // Count recent submissions from this IP for this form
        $stmt = $pdo->prepare(
            'SELECT COUNT(*) FROM form_rate_limits
             WHERE form_type = :form AND ip_address = :ip AND submitted_at >= :window'
        );
        $stmt->execute(['form' => $formType, 'ip' => $ip, 'window' => $windowStart]);
        $count = (int) $stmt->fetchColumn();

        if ($count >= $maxPerHour) {
            respondError('Too many requests. Please try again later.', 429);
            exit;
        }

        // Record this submission
        $pdo->prepare(
            'INSERT INTO form_rate_limits (form_type, ip_address, submitted_at) VALUES (:form, :ip, :now)'
        )->execute(['form' => $formType, 'ip' => $ip, 'now' => $now]);
    } catch (Throwable $e) {
        // Rate-limit table failure must not block legitimate submissions — log and continue
        error_log('Form rate limit check failed: ' . $e->getMessage());
    }
}
