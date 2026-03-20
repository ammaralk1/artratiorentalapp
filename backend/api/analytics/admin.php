<?php
declare(strict_types=1);

define('API_INCLUDE_MODE', true);
require_once __DIR__ . '/index.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

try {
    if ($method !== 'GET') {
        respondError('Method not allowed', 405);
        return;
    }

    $pdo = getDatabaseConnection();
    requireRole(['admin', 'manager']);
    ensureSiteAnalyticsTables($pdo);
    handleSiteAnalyticsAdminGet($pdo);
} catch (InvalidArgumentException $exception) {
    respondError($exception->getMessage(), 422);
} catch (Throwable $exception) {
    respondError('Unexpected server error', 500, [
        'details' => $exception->getMessage(),
    ]);
}

function handleSiteAnalyticsAdminGet(PDO $pdo): void
{
    $days = isset($_GET['days']) ? (int) $_GET['days'] : 30;
    if ($days < 1) {
        $days = 30;
    } elseif ($days > 365) {
        $days = 365;
    }

    $rangeStart = (new DateTimeImmutable(sprintf('-%d days', max(0, $days - 1))))
        ->setTime(0, 0, 0);
    $rangeEnd = new DateTimeImmutable();
    $baseParams = [
        'range_start' => $rangeStart->format('Y-m-d H:i:s'),
        'range_end' => $rangeEnd->format('Y-m-d H:i:s'),
    ];
    [$filterSql, $filterParams, $filters] = buildSiteAnalyticsAdminFilters();
    $params = array_merge($baseParams, $filterParams);

    $overview = fetchSiteAnalyticsOverview($pdo, $params, $filterSql, $filters);
    $topPages = fetchSiteAnalyticsTopPages($pdo, $params, $filterSql);
    $visitsByDay = fetchSiteAnalyticsDailyVisits($pdo, $params, $filterSql, $rangeStart, $rangeEnd);
    $topSources = fetchSiteAnalyticsTopSources($pdo, $params, $filterSql);
    $deviceBreakdown = fetchSiteAnalyticsDeviceBreakdown($pdo, $params, $filterSql, (int) ($overview['page_views'] ?? 0));
    $filterOptions = fetchSiteAnalyticsFilterOptions($pdo, array_merge($baseParams, buildSiteAnalyticsFilterParamsExcludingPageType($filters)), buildSiteAnalyticsFilterSqlExcludingPageType($filters));

    respond([
        'overview' => $overview,
        'top_pages' => $topPages,
        'visits_by_day' => $visitsByDay,
        'top_sources' => $topSources,
        'device_breakdown' => $deviceBreakdown,
        'filters' => $filters,
        'filter_options' => $filterOptions,
        'range' => [
            'days' => $days,
            'from' => $rangeStart->format('Y-m-d H:i:s'),
            'to' => $rangeEnd->format('Y-m-d H:i:s'),
        ],
    ]);
}

function fetchSiteAnalyticsOverview(PDO $pdo, array $params, string $filterSql, array $filters): array
{
    $statement = $pdo->prepare(
        'SELECT
            COUNT(*) AS page_views,
            COUNT(DISTINCT visitor_id) AS unique_visitors,
            COUNT(DISTINCT session_id) AS sessions
         FROM site_page_visits
         WHERE created_at BETWEEN :range_start AND :range_end' . $filterSql
    );
    $statement->execute($params);
    $row = $statement->fetch() ?: [];

    $pageViews = (int) ($row['page_views'] ?? 0);
    $sessions = (int) ($row['sessions'] ?? 0);

    return [
        'page_views' => $pageViews,
        'unique_visitors' => (int) ($row['unique_visitors'] ?? 0),
        'sessions' => $sessions,
        'avg_pages_per_session' => $sessions > 0 ? round($pageViews / $sessions, 2) : 0,
        'contact_leads' => canCountSiteConversionsForFilters($filters) ? countSiteAnalyticsContactLeads($pdo, $params) : null,
        'feedback_submissions' => canCountSiteConversionsForFilters($filters) ? countSiteAnalyticsFeedbackSubmissions($pdo, $params) : null,
    ];
}

function countSiteAnalyticsContactLeads(PDO $pdo, array $params): int
{
    try {
        $statement = $pdo->prepare(
            'SELECT COUNT(*)
             FROM contact_inquiries
             WHERE created_at BETWEEN :range_start AND :range_end'
        );
        $statement->execute($params);
        return (int) $statement->fetchColumn();
    } catch (Throwable $error) {
        return 0;
    }
}

function countSiteAnalyticsFeedbackSubmissions(PDO $pdo, array $params): int
{
    try {
        $statement = $pdo->prepare(
            'SELECT COUNT(*)
             FROM feedback_submissions
             WHERE created_at BETWEEN :range_start AND :range_end'
        );
        $statement->execute($params);
        return (int) $statement->fetchColumn();
    } catch (Throwable $error) {
        return 0;
    }
}

function fetchSiteAnalyticsTopPages(PDO $pdo, array $params, string $filterSql): array
{
    $statement = $pdo->prepare(
        'SELECT
            page_path,
            COALESCE(MAX(NULLIF(page_title, "")), page_path) AS page_title,
            COUNT(*) AS views,
            COUNT(DISTINCT visitor_id) AS visitors,
            COUNT(DISTINCT session_id) AS sessions,
            MAX(created_at) AS last_visited_at
         FROM site_page_visits
         WHERE created_at BETWEEN :range_start AND :range_end' . $filterSql . '
         GROUP BY page_path
         ORDER BY views DESC, visitors DESC, page_path ASC
         LIMIT 10'
    );
    $statement->execute($params);
    $rows = $statement->fetchAll() ?: [];

    return array_map(static function (array $row): array {
        return [
            'page_path' => (string) ($row['page_path'] ?? ''),
            'page_title' => (string) ($row['page_title'] ?? ''),
            'views' => (int) ($row['views'] ?? 0),
            'visitors' => (int) ($row['visitors'] ?? 0),
            'sessions' => (int) ($row['sessions'] ?? 0),
            'last_visited_at' => $row['last_visited_at'] ?? null,
        ];
    }, $rows);
}

function fetchSiteAnalyticsDailyVisits(PDO $pdo, array $params, string $filterSql, DateTimeImmutable $rangeStart, DateTimeImmutable $rangeEnd): array
{
    $statement = $pdo->prepare(
        'SELECT
            DATE(created_at) AS visit_date,
            COUNT(*) AS page_views,
            COUNT(DISTINCT visitor_id) AS visitors,
            COUNT(DISTINCT session_id) AS sessions
         FROM site_page_visits
         WHERE created_at BETWEEN :range_start AND :range_end' . $filterSql . '
         GROUP BY DATE(created_at)
         ORDER BY visit_date ASC'
    );
    $statement->execute($params);
    $rows = $statement->fetchAll() ?: [];

    $indexed = [];
    foreach ($rows as $row) {
        $indexed[(string) $row['visit_date']] = [
            'date' => (string) $row['visit_date'],
            'page_views' => (int) ($row['page_views'] ?? 0),
            'visitors' => (int) ($row['visitors'] ?? 0),
            'sessions' => (int) ($row['sessions'] ?? 0),
        ];
    }

    $result = [];
    for ($cursor = $rangeStart; $cursor <= $rangeEnd; $cursor = $cursor->modify('+1 day')) {
        $key = $cursor->format('Y-m-d');
        $result[] = $indexed[$key] ?? [
            'date' => $key,
            'page_views' => 0,
            'visitors' => 0,
            'sessions' => 0,
        ];
    }

    return $result;
}

function fetchSiteAnalyticsTopSources(PDO $pdo, array $params, string $filterSql): array
{
    $statement = $pdo->prepare(
        'SELECT
            CASE
                WHEN referrer_type = "direct" THEN "(direct)"
                WHEN referrer_type = "internal" THEN "(internal)"
                ELSE COALESCE(NULLIF(referrer_host, ""), "(unknown)")
            END AS source_label,
            COUNT(*) AS views,
            COUNT(DISTINCT visitor_id) AS visitors
         FROM site_page_visits
         WHERE created_at BETWEEN :range_start AND :range_end' . $filterSql . '
         GROUP BY source_label
         ORDER BY views DESC, visitors DESC, source_label ASC
         LIMIT 8'
    );
    $statement->execute($params);
    $rows = $statement->fetchAll() ?: [];

    return array_map(static function (array $row): array {
        return [
            'source' => (string) ($row['source_label'] ?? ''),
            'views' => (int) ($row['views'] ?? 0),
            'visitors' => (int) ($row['visitors'] ?? 0),
        ];
    }, $rows);
}

function fetchSiteAnalyticsDeviceBreakdown(PDO $pdo, array $params, string $filterSql, int $pageViews): array
{
    $statement = $pdo->prepare(
        'SELECT
            device_type,
            COUNT(*) AS views,
            COUNT(DISTINCT visitor_id) AS visitors
         FROM site_page_visits
         WHERE created_at BETWEEN :range_start AND :range_end' . $filterSql . '
         GROUP BY device_type
         ORDER BY views DESC'
    );
    $statement->execute($params);
    $rows = $statement->fetchAll() ?: [];

    return array_map(static function (array $row) use ($pageViews): array {
        $views = (int) ($row['views'] ?? 0);
        return [
            'device_type' => (string) ($row['device_type'] ?? 'desktop'),
            'views' => $views,
            'visitors' => (int) ($row['visitors'] ?? 0),
            'percentage' => $pageViews > 0 ? round(($views / $pageViews) * 100, 1) : 0,
        ];
    }, $rows);
}

function buildSiteAnalyticsAdminFilters(): array
{
    $filters = [
        'page_type' => normalizeSiteAnalyticsFilterValue((string) ($_GET['page_type'] ?? '')),
        'device_type' => normalizeSiteAnalyticsFilterDevice((string) ($_GET['device_type'] ?? '')),
        'source_type' => normalizeSiteAnalyticsFilterSource((string) ($_GET['source_type'] ?? '')),
        'include_internal' => normalizeSiteAnalyticsFilterBoolean($_GET['include_internal'] ?? null),
    ];

    $conditions = [];
    $params = [];

    if (!$filters['include_internal']) {
        $conditions[] = ' AND is_internal = 0';
    }

    if ($filters['page_type'] !== '') {
        $conditions[] = ' AND page_type = :page_type';
        $params['page_type'] = $filters['page_type'];
    }
    if ($filters['device_type'] !== '') {
        $conditions[] = ' AND device_type = :device_type';
        $params['device_type'] = $filters['device_type'];
    }
    if ($filters['source_type'] !== '') {
        $conditions[] = ' AND referrer_type = :source_type';
        $params['source_type'] = $filters['source_type'];
    }

    return [implode('', $conditions), $params, $filters];
}

function buildSiteAnalyticsFilterSqlExcludingPageType(array $filters): string
{
    $conditions = [];
    if (!($filters['include_internal'] ?? false)) {
        $conditions[] = ' AND is_internal = 0';
    }
    if (($filters['device_type'] ?? '') !== '') {
        $conditions[] = ' AND device_type = :device_type';
    }
    if (($filters['source_type'] ?? '') !== '') {
        $conditions[] = ' AND referrer_type = :source_type';
    }
    return implode('', $conditions);
}

function buildSiteAnalyticsFilterParamsExcludingPageType(array $filters): array
{
    $params = [];
    if (($filters['device_type'] ?? '') !== '') {
        $params['device_type'] = $filters['device_type'];
    }
    if (($filters['source_type'] ?? '') !== '') {
        $params['source_type'] = $filters['source_type'];
    }
    return $params;
}

function fetchSiteAnalyticsFilterOptions(PDO $pdo, array $params, string $filterSql): array
{
    $statement = $pdo->prepare(
        'SELECT DISTINCT page_type
         FROM site_page_visits
         WHERE created_at BETWEEN :range_start AND :range_end' . $filterSql . '
           AND page_type IS NOT NULL
           AND page_type <> ""
         ORDER BY page_type ASC'
    );
    $statement->execute($params);
    $pageTypes = array_values(array_filter(array_map(static fn($value) => (string) $value, $statement->fetchAll(PDO::FETCH_COLUMN) ?: [])));

    return [
        'page_types' => $pageTypes,
        'device_types' => ['desktop', 'mobile', 'tablet'],
        'source_types' => ['direct', 'external', 'internal'],
    ];
}

function normalizeSiteAnalyticsFilterValue(string $value): string
{
    $normalized = strtolower(trim($value));
    if ($normalized === '' || $normalized === 'all') {
        return '';
    }

    $normalized = preg_replace('/[^a-z0-9_-]/', '', $normalized) ?? '';
    return substr($normalized, 0, 80);
}

function normalizeSiteAnalyticsFilterDevice(string $value): string
{
    $normalized = strtolower(trim($value));
    return in_array($normalized, ['desktop', 'mobile', 'tablet'], true) ? $normalized : '';
}

function normalizeSiteAnalyticsFilterSource(string $value): string
{
    $normalized = strtolower(trim($value));
    return in_array($normalized, ['direct', 'external', 'internal'], true) ? $normalized : '';
}

function canCountSiteConversionsForFilters(array $filters): bool
{
    return ($filters['page_type'] ?? '') === ''
        && ($filters['device_type'] ?? '') === ''
        && ($filters['source_type'] ?? '') === '';
}

function normalizeSiteAnalyticsFilterBoolean(mixed $value): bool
{
    if (is_bool($value)) {
        return $value;
    }

    $normalized = strtolower(trim((string) $value));
    return in_array($normalized, ['1', 'true', 'yes', 'on'], true);
}
