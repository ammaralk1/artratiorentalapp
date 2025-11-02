<?php
declare(strict_types=1);

function ensureTemplatesTable(PDO $pdo): void
{
    try {
        $pdo->exec('CREATE TABLE IF NOT EXISTS notification_templates (
          id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(120) NOT NULL,
          channel ENUM("email","telegram","both") NOT NULL DEFAULT "both",
          subject VARCHAR(191) NULL,
          body_html MEDIUMTEXT NULL,
          body_text MEDIUMTEXT NULL,
          attachment_url VARCHAR(512) NULL,
          attachment_urls JSON NULL,
          variables JSON NULL,
          active TINYINT(1) NOT NULL DEFAULT 1,
          created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          UNIQUE KEY uq_template_name (name)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');
    } catch (Throwable $e) {
        error_log('ensureTemplatesTable failed: ' . $e->getMessage());
    }
}

function renderTemplateString(string $tpl, array $vars): string
{
    // Support {{ path.to.value }} with dot notation
    return preg_replace_callback('/\{\{\s*([a-zA-Z0-9_\.]+)\s*\}\}/u', function ($m) use ($vars) {
        $path = (string)$m[1];
        $value = $vars;
        foreach (explode('.', $path) as $key) {
            if (is_array($value) && array_key_exists($key, $value)) {
                $value = $value[$key];
            } else {
                return '';
            }
        }
        if (is_scalar($value)) return (string)$value;
        return json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }, $tpl);
}

function buildTemplateContextForEntity(PDO $pdo, string $entityType, int $entityId): array
{
    $ctx = [ 'entity' => [ 'type' => $entityType, 'id' => $entityId ] ];
    if ($entityType === 'reservation') {
        require_once __DIR__ . '/../api/reservations/index.php';
        $r = fetchReservationById($pdo, $entityId);
        if ($r) {
            $ctx['reservation'] = [
                'id' => (int)$r['id'],
                'code' => (string)($r['reservation_code'] ?? ''),
                'title' => (string)($r['title'] ?? ''),
                'customer_name' => (string)($r['customer_name'] ?? ''),
                'start_datetime' => (string)($r['start_datetime'] ?? ''),
                'end_datetime' => (string)($r['end_datetime'] ?? ''),
                'location' => (string)($r['location'] ?? ''),
                'project_code' => (string)($r['project_code'] ?? ''),
            ];
        }
    } elseif ($entityType === 'project') {
        require_once __DIR__ . '/../api/projects/index.php';
        $p = fetchProjectById($pdo, $entityId);
        if ($p) {
            $ctx['project'] = [
                'id' => (int)$p['id'],
                'code' => (string)($p['project_code'] ?? ''),
                'title' => (string)($p['title'] ?? ''),
                'client_name' => (string)($p['client_name'] ?? ''),
                'start_datetime' => (string)($p['start_datetime'] ?? ''),
                'end_datetime' => (string)($p['end_datetime'] ?? ''),
            ];
        }
    }
    return $ctx;
}

function renderTemplate(array $template, array $baseContext, array $recipientContext = []): array
{
    $vars = $baseContext;
    if ($recipientContext) { $vars['recipient'] = $recipientContext; }
    $subject = isset($template['subject']) && is_string($template['subject']) ? renderTemplateString($template['subject'], $vars) : null;
    $html = isset($template['body_html']) && is_string($template['body_html']) ? renderTemplateString($template['body_html'], $vars) : null;
    $text = isset($template['body_text']) && is_string($template['body_text']) ? renderTemplateString($template['body_text'], $vars) : null;
    if ($text === null && $html !== null) { $text = strip_tags($html); }
    if ($html === null && $text !== null) { $html = nl2br(htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')); }
    return [ 'subject' => $subject, 'html' => $html, 'text' => $text ];
}
