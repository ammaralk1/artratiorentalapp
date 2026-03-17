<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    $pdo = getDatabaseConnection();
    ensureBlogCommentsTable($pdo);

    switch ($method) {
        case 'GET':
            handleBlogCommentsGet($pdo);
            break;
        case 'POST':
            handleBlogCommentsPost($pdo);
            break;
        default:
            respondError('Method not allowed', 405);
    }
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}

function handleBlogCommentsGet(PDO $pdo): void
{
    $postSlug = normalizeBlogPostSlug((string) ($_GET['post_slug'] ?? ''));
    if ($postSlug === '') {
        respondError('post_slug is required', 422);
        return;
    }

    $limit = isset($_GET['limit']) ? max(1, min(100, (int) $_GET['limit'])) : 50;
    $offset = isset($_GET['offset']) ? max(0, (int) $_GET['offset']) : 0;

    $totalStatement = $pdo->prepare(
        "SELECT COUNT(*) FROM blog_comments WHERE post_slug = :post_slug AND status = 'approved'"
    );
    $totalStatement->execute(['post_slug' => $postSlug]);
    $total = (int) $totalStatement->fetchColumn();

    $statement = $pdo->prepare(
        "SELECT id, post_slug, author_name, content, created_at
         FROM blog_comments
         WHERE post_slug = :post_slug AND status = 'approved'
         ORDER BY created_at ASC, id ASC
         LIMIT :limit OFFSET :offset"
    );
    $statement->bindValue(':post_slug', $postSlug, PDO::PARAM_STR);
    $statement->bindValue(':limit', $limit, PDO::PARAM_INT);
    $statement->bindValue(':offset', $offset, PDO::PARAM_INT);
    $statement->execute();

    $items = $statement->fetchAll();

    respond($items, 200, [
        'post_slug' => $postSlug,
        'count' => count($items),
        'total' => $total,
        'limit' => $limit,
        'offset' => $offset,
    ]);
}

function handleBlogCommentsPost(PDO $pdo): void
{
    $payload = readJsonPayload();
    if ($payload === null) {
        return;
    }

    $postSlug = normalizeBlogPostSlug((string) ($payload['post_slug'] ?? ''));
    if ($postSlug === '') {
        respondError('post_slug is required', 422);
        return;
    }

    $authorName = normalizeSingleLineText((string) ($payload['author_name'] ?? ''), 120);
    if ($authorName === '' || textLength($authorName) < 2) {
        respondError('author_name must be at least 2 characters', 422);
        return;
    }

    $authorEmail = strtolower(trim((string) ($payload['author_email'] ?? '')));
    if ($authorEmail !== '' && !filter_var($authorEmail, FILTER_VALIDATE_EMAIL)) {
        respondError('author_email is invalid', 422);
        return;
    }
    if ($authorEmail !== '' && strlen($authorEmail) > 190) {
        respondError('author_email is too long', 422);
        return;
    }

    if ($authorEmail === '') {
        $authorEmail = '';
    }

    $content = normalizeCommentText((string) ($payload['content'] ?? ''), 3000);
    if ($content === '' || textLength($content) < 3) {
        respondError('content must be at least 3 characters', 422);
        return;
    }

    $ipAddress = function_exists('getClientIpAddress')
        ? substr(getClientIpAddress(), 0, 45)
        : substr((string) ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0'), 0, 45);
    $userAgent = substr(trim((string) ($_SERVER['HTTP_USER_AGENT'] ?? '')), 0, 500);

    if (isCommentRateLimited($pdo, $ipAddress, $authorEmail)) {
        respondError('Too many comments. Please wait before posting again.', 429);
        return;
    }

    $contentHash = hash('sha256', $content);
    if ($authorEmail !== '') {
        $duplicateStatement = $pdo->prepare(
            "SELECT id
             FROM blog_comments
             WHERE post_slug = :post_slug
               AND author_email = :author_email
               AND content_hash = :content_hash
               AND created_at >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)
             LIMIT 1"
        );
        $duplicateStatement->execute([
            'post_slug' => $postSlug,
            'author_email' => $authorEmail,
            'content_hash' => $contentHash,
        ]);
    } else {
        $duplicateStatement = $pdo->prepare(
            "SELECT id
             FROM blog_comments
             WHERE post_slug = :post_slug
               AND ip_address = :ip_address
               AND content_hash = :content_hash
               AND created_at >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)
             LIMIT 1"
        );
        $duplicateStatement->execute([
            'post_slug' => $postSlug,
            'ip_address' => $ipAddress,
            'content_hash' => $contentHash,
        ]);
    }

    $duplicateId = (int) ($duplicateStatement->fetchColumn() ?: 0);
    if ($duplicateId > 0) {
        respondError('This comment was already submitted recently.', 409);
        return;
    }

    $autoApprove = (bool) getAppConfig('blog_comments', 'auto_approve', true);
    $status = $autoApprove ? 'approved' : 'pending';

    $insertStatement = $pdo->prepare(
        'INSERT INTO blog_comments (
            post_slug,
            author_name,
            author_email,
            content,
            content_hash,
            status,
            ip_address,
            user_agent
        ) VALUES (
            :post_slug,
            :author_name,
            :author_email,
            :content,
            :content_hash,
            :status,
            :ip_address,
            :user_agent
        )'
    );
    $insertStatement->execute([
        'post_slug' => $postSlug,
        'author_name' => $authorName,
        'author_email' => $authorEmail,
        'content' => $content,
        'content_hash' => $contentHash,
        'status' => $status,
        'ip_address' => $ipAddress,
        'user_agent' => $userAgent,
    ]);

    $id = (int) $pdo->lastInsertId();
    $selectStatement = $pdo->prepare(
        'SELECT id, post_slug, author_name, content, status, created_at
         FROM blog_comments
         WHERE id = :id
         LIMIT 1'
    );
    $selectStatement->execute(['id' => $id]);
    $comment = $selectStatement->fetch();

    respond($comment ?: [
        'id' => $id,
        'post_slug' => $postSlug,
        'author_name' => $authorName,
        'content' => $content,
        'status' => $status,
        'created_at' => (new DateTimeImmutable())->format('Y-m-d H:i:s'),
    ], 201, [
        'approved' => $status === 'approved',
    ]);
}

function readJsonPayload(): ?array
{
    $raw = file_get_contents('php://input');
    if ($raw === false) {
        respondError('Unable to read request body', 400);
        return null;
    }

    $raw = trim($raw);
    if ($raw === '') {
        return [];
    }

    $payload = json_decode($raw, true);
    if (!is_array($payload)) {
        respondError('Invalid JSON payload', 400);
        return null;
    }

    return $payload;
}

function normalizeBlogPostSlug(string $raw): string
{
    $slug = trim(rawurldecode($raw));
    $slug = str_replace('\\', '/', $slug);
    $slug = preg_replace('~/+~', '/', $slug) ?? '';
    $slug = trim($slug, '/');

    if ($slug === '' || str_contains($slug, '..')) {
        return '';
    }

    if (str_starts_with($slug, 'blog/')) {
        $slug = substr($slug, 5);
    }

    if ($slug === '' || preg_match('~^(category|tag)(/|$)~i', $slug)) {
        return '';
    }

    if (!preg_match('~^[\p{L}\p{N}/_-]+$~u', $slug)) {
        return '';
    }

    if (preg_match('~^[A-Za-z0-9/_-]+$~', $slug)) {
        $slug = strtolower($slug);
    }

    return $slug;
}

function normalizeSingleLineText(string $raw, int $maxLength): string
{
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $raw) ?? '';
    $value = trim(preg_replace('/\s+/u', ' ', $value) ?? '');

    if ($maxLength > 0 && textLength($value) > $maxLength) {
        if (function_exists('mb_substr')) {
            $value = trim((string) mb_substr($value, 0, $maxLength, 'UTF-8'));
        } else {
            $value = trim(substr($value, 0, $maxLength));
        }
    }

    return $value;
}

function normalizeCommentText(string $raw, int $maxLength): string
{
    $value = str_replace(["\r\n", "\r"], "\n", $raw);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value) ?? '';
    $value = trim($value);

    if ($maxLength > 0 && textLength($value) > $maxLength) {
        if (function_exists('mb_substr')) {
            $value = trim((string) mb_substr($value, 0, $maxLength, 'UTF-8'));
        } else {
            $value = trim(substr($value, 0, $maxLength));
        }
    }

    return $value;
}

function textLength(string $value): int
{
    if (function_exists('mb_strlen')) {
        return (int) mb_strlen($value, 'UTF-8');
    }

    return strlen($value);
}

function isCommentRateLimited(PDO $pdo, string $ipAddress, string $authorEmail): bool
{
    if ($ipAddress !== '') {
        $ipStatement = $pdo->prepare(
            'SELECT COUNT(*) FROM blog_comments WHERE ip_address = :ip_address AND created_at >= DATE_SUB(NOW(), INTERVAL 1 MINUTE)'
        );
        $ipStatement->execute(['ip_address' => $ipAddress]);
        $ipCount = (int) $ipStatement->fetchColumn();
        if ($ipCount >= 3) {
            return true;
        }
    }

    if ($authorEmail !== '') {
        $emailStatement = $pdo->prepare(
            'SELECT COUNT(*) FROM blog_comments WHERE author_email = :author_email AND created_at >= DATE_SUB(NOW(), INTERVAL 10 MINUTE)'
        );
        $emailStatement->execute(['author_email' => $authorEmail]);
        $emailCount = (int) $emailStatement->fetchColumn();
        if ($emailCount >= 6) {
            return true;
        }
    }

    return false;
}

function ensureBlogCommentsTable(PDO $pdo): void
{
    static $ensured = false;
    if ($ensured) {
        return;
    }

    $pdo->exec(
        "CREATE TABLE IF NOT EXISTS blog_comments (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            post_slug VARCHAR(255) NOT NULL,
            author_name VARCHAR(120) NOT NULL,
            author_email VARCHAR(190) NULL,
            content TEXT NOT NULL,
            content_hash CHAR(64) NOT NULL,
            status ENUM('pending','approved','rejected','spam') NOT NULL DEFAULT 'approved',
            ip_address VARCHAR(45) NOT NULL,
            user_agent VARCHAR(500) NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_blog_comments_post_status_date (post_slug, status, created_at),
            INDEX idx_blog_comments_email_date (author_email, created_at),
            INDEX idx_blog_comments_ip_date (ip_address, created_at),
            INDEX idx_blog_comments_dedupe (post_slug, author_email, content_hash, created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
    );

    $ensured = true;
}
