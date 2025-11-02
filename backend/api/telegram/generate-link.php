<?php
declare(strict_types=1);

require_once __DIR__ . '/../../bootstrap.php';
require_once __DIR__ . '/../../services/telegram.php';

use InvalidArgumentException;
use Throwable;

function randomToken(int $len = 24): string {
    return rtrim(strtr(base64_encode(random_bytes($len)), '+/', '-_'), '=');
}

try {
    requireRole('admin');
    $pdo = getDatabaseConnection();

    $context = ($_GET['context'] ?? $_POST['context'] ?? 'technician');
    $context = in_array($context, ['technician', 'admin'], true) ? $context : 'technician';
    $technicianId = isset($_GET['technician_id']) ? (int)$_GET['technician_id'] : (isset($_POST['technician_id']) ? (int)$_POST['technician_id'] : 0);
    $phone = trim((string)($_GET['phone'] ?? $_POST['phone'] ?? ''));

    if ($context === 'technician' && $technicianId <= 0 && $phone === '') {
        throw new InvalidArgumentException('Provide technician_id or phone');
    }

    // Ensure table exists
    $pdo->exec('CREATE TABLE IF NOT EXISTS telegram_links (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      token VARCHAR(64) NOT NULL UNIQUE,
      context VARCHAR(16) NOT NULL DEFAULT "technician",
      technician_id BIGINT UNSIGNED NULL,
      phone VARCHAR(32) NULL,
      chat_id VARCHAR(64) NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      used_at DATETIME NULL,
      INDEX idx_context_token (context, token),
      INDEX idx_tech (technician_id),
      INDEX idx_phone (phone)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci');

    $token = randomToken(18);
    $normalizedPhone = $phone !== '' ? telegramNormalizePhone($phone) : '';
    $techName = null;
    if ($technicianId > 0) {
      try {
        $s = $pdo->prepare('SELECT full_name FROM technicians WHERE id = :id LIMIT 1');
        $s->execute(['id' => $technicianId]);
        $n = $s->fetchColumn();
        if ($n) $techName = (string)$n;
      } catch (Throwable $_) { /* ignore */ }
    }
    $stmt = $pdo->prepare('INSERT INTO telegram_links (token, context, technician_id, technician_name, phone) VALUES (:t, :c, :tid, :name, :p)');
    $stmt->execute([
        't' => $token,
        'c' => $context,
        'tid' => $technicianId > 0 ? $technicianId : null,
        'name' => $techName,
        'p' => $normalizedPhone !== '' ? $normalizedPhone : null,
    ]);

    // Compute bot username
    $me = telegramGetMe();
    $username = is_array($me) ? ($me['username'] ?? null) : null;
    $deepLink = $username ? ('https://t.me/' . $username . '?start=' . $token) : null;

    respond([
        'token' => $token,
        'link' => $deepLink,
        'note' => $deepLink ? 'Share this link with the user to link their Telegram.' : 'Could not resolve bot username; construct link as https://t.me/<BOT_USERNAME>?start=' . $token,
    ]);
} catch (Throwable $e) {
    respondError('Failed to generate link', 500, [ 'details' => $e->getMessage() ]);
}
