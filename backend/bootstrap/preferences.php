<?php

declare(strict_types=1);

function getDefaultPreferences(): array
{
    return [
        'language' => 'ar',
        'theme' => 'light',
        'dashboardTab' => null,
        'dashboardSubTab' => null,
        'projectsTab' => null,
        'projectsSubTab' => null,
    ];
}

function normalisePreferenceLanguage(string $language): string
{
    $normalized = strtolower(trim($language));
    return $normalized === 'en' ? 'en' : 'ar';
}

function normalisePreferenceTheme(string $theme): string
{
    $normalized = strtolower(trim($theme));
    return $normalized === 'dark' ? 'dark' : 'light';
}

function normaliseDashboardTarget(string $value): ?string
{
    $trimmed = trim($value);
    if ($trimmed === '') {
        return null;
    }

    if (!preg_match('/^[a-z0-9\-]+$/i', $trimmed)) {
        throw new InvalidArgumentException('Invalid dashboard tab value');
    }

    return $trimmed;
}

function safeNormaliseDashboardTarget(?string $value): ?string
{
    if ($value === null) {
        return null;
    }

    $trimmed = trim($value);
    if ($trimmed === '') {
        return null;
    }

    if (!preg_match('/^[a-z0-9\-]+$/i', $trimmed)) {
        return null;
    }

    return $trimmed;
}

function ensureUserPreferencesTable(PDO $pdo): void
{
    static $ensured = false;

    if ($ensured) {
        return;
    }

    try {
        $pdo->exec(
            'CREATE TABLE IF NOT EXISTS user_preferences (
                user_id BIGINT UNSIGNED PRIMARY KEY,
                language VARCHAR(10) NOT NULL,
                theme VARCHAR(10) NOT NULL,
                dashboard_tab VARCHAR(100) NULL,
                dashboard_sub_tab VARCHAR(100) NULL,
                projects_tab VARCHAR(100) NULL,
                projects_sub_tab VARCHAR(100) NULL,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                CONSTRAINT fk_user_prefs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci'
        );
    } catch (Throwable $error) {
        error_log('Failed to ensure user_preferences table: ' . $error->getMessage());
    }

    $ensured = true;
}

function fetchPersistedUserPreferences(PDO $pdo, int $userId): array
{
    $defaults = getDefaultPreferences();

    try {
        ensureUserPreferencesTable($pdo);

        $statement = $pdo->prepare('SELECT language, theme, dashboard_tab, dashboard_sub_tab, projects_tab, projects_sub_tab
            FROM user_preferences WHERE user_id = :user_id LIMIT 1');
        $statement->execute(['user_id' => $userId]);

        $row = $statement->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            return $defaults;
        }

        $sanitised = [
            'language' => normalisePreferenceLanguage((string) ($row['language'] ?? $defaults['language'])),
            'theme' => normalisePreferenceTheme((string) ($row['theme'] ?? $defaults['theme'])),
            'dashboardTab' => safeNormaliseDashboardTarget($row['dashboard_tab'] ?? null),
            'dashboardSubTab' => safeNormaliseDashboardTarget($row['dashboard_sub_tab'] ?? null),
            'projectsTab' => safeNormaliseDashboardTarget($row['projects_tab'] ?? null),
            'projectsSubTab' => safeNormaliseDashboardTarget($row['projects_sub_tab'] ?? null),
        ];

        return array_merge($defaults, array_intersect_key($sanitised, $defaults));
    } catch (Throwable $error) {
        error_log(sprintf('Failed to load user preferences for user %d: %s', $userId, $error->getMessage()));
        return $defaults;
    }
}

function persistUserPreferencesToDatabase(PDO $pdo, int $userId, array $preferences): void
{
    $defaults = getDefaultPreferences();
    $merged = array_merge($defaults, array_intersect_key($preferences, $defaults));

    $payload = [
        'user_id' => $userId,
        'language' => normalisePreferenceLanguage((string) $merged['language']),
        'theme' => normalisePreferenceTheme((string) $merged['theme']),
        'dashboard_tab' => $merged['dashboardTab'] === null ? null : normaliseDashboardTarget((string) $merged['dashboardTab']),
        'dashboard_sub_tab' => $merged['dashboardSubTab'] === null ? null : normaliseDashboardTarget((string) $merged['dashboardSubTab']),
        'projects_tab' => $merged['projectsTab'] === null ? null : normaliseDashboardTarget((string) $merged['projectsTab']),
        'projects_sub_tab' => $merged['projectsSubTab'] === null ? null : normaliseDashboardTarget((string) $merged['projectsSubTab']),
    ];

    try {
        ensureUserPreferencesTable($pdo);

        $statement = $pdo->prepare('INSERT INTO user_preferences (user_id, language, theme, dashboard_tab, dashboard_sub_tab, projects_tab, projects_sub_tab)
            VALUES (:user_id, :language, :theme, :dashboard_tab, :dashboard_sub_tab, :projects_tab, :projects_sub_tab)
            ON DUPLICATE KEY UPDATE language = VALUES(language), theme = VALUES(theme),
                dashboard_tab = VALUES(dashboard_tab), dashboard_sub_tab = VALUES(dashboard_sub_tab),
                projects_tab = VALUES(projects_tab), projects_sub_tab = VALUES(projects_sub_tab)');
        $statement->execute($payload);
    } catch (Throwable $error) {
        error_log(sprintf('Failed to persist user preferences for user %d: %s', $userId, $error->getMessage()));
    }
}

function ensureUserPreferencesLoaded(): void
{
    if (!isAuthenticated()) {
        return;
    }

    if (isset($_SESSION['preferences']) && is_array($_SESSION['preferences'])) {
        return;
    }

    $pdo = getDatabaseConnection();
    $_SESSION['preferences'] = fetchPersistedUserPreferences($pdo, (int) $_SESSION['user']['id']);
}

function getUserPreferences(): array
{
    $defaults = getDefaultPreferences();

    if (isAuthenticated()) {
        ensureUserPreferencesLoaded();
    }

    $stored = $_SESSION['preferences'] ?? [];

    if (!is_array($stored)) {
        return $defaults;
    }

    $filtered = array_intersect_key($stored, $defaults);

    return array_merge($defaults, $filtered);
}

function updateUserPreferences(array $changes): array
{
    $defaults = getDefaultPreferences();

    if (isAuthenticated()) {
        ensureUserPreferencesLoaded();
    }

    $current = $_SESSION['preferences'] ?? [];

    if (!is_array($current)) {
        $current = [];
    }

    foreach ($changes as $key => $value) {
        switch ($key) {
            case 'language':
                $current['language'] = normalisePreferenceLanguage((string) $value);
                break;
            case 'theme':
                $current['theme'] = normalisePreferenceTheme((string) $value);
                break;
            case 'dashboardTab':
                $current['dashboardTab'] = normaliseDashboardTarget((string) $value);
                break;
            case 'dashboardSubTab':
                $current['dashboardSubTab'] = normaliseDashboardTarget((string) $value);
                break;
            case 'projectsTab':
                $current['projectsTab'] = normaliseDashboardTarget((string) $value);
                break;
            case 'projectsSubTab':
                $current['projectsSubTab'] = normaliseDashboardTarget((string) $value);
                break;
            default:
                throw new InvalidArgumentException('Unknown preference key supplied');
        }
    }

    $_SESSION['preferences'] = $current;

    if (isAuthenticated()) {
        $pdo = getDatabaseConnection();
        persistUserPreferencesToDatabase($pdo, (int) $_SESSION['user']['id'], $current);
    }

    $filtered = array_intersect_key($current, $defaults);

    return array_merge($defaults, $filtered);
}
