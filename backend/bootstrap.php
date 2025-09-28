<?php
declare(strict_types=1);



require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');

$configFile = __DIR__ . '/config.php';

if (!is_file($configFile)) {
    respondError('Missing configuration file. Copy backend/config.example.php to backend/config.php and fill in your credentials.', 500);
    exit;
}

$config = require $configFile;

$allowedOrigins = array_map(static fn($origin) => trim(strtolower((string) $origin)), $config['security']['allowed_origins'] ?? []);
$enforceHttps = !empty($config['security']['enforce_https']);
$sessionName = $config['security']['session_name'] ?? 'art_ratio_session';

$isSecureRequest = static function (): bool {
    if (!empty($_SERVER['HTTPS']) && strtolower((string) $_SERVER['HTTPS']) !== 'off') {
        return true;
    }

    if (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) === 'https') {
        return true;
    }

    return false;
};

if ($enforceHttps && !$isSecureRequest()) {
    respondError('HTTPS is required', 403);
    exit;
}

$cookieParams = [
    'lifetime' => 0,
    'path' => '/',
    'httponly' => true,
    'samesite' => 'Lax',
];

if ($isSecureRequest()) {
    $cookieParams['secure'] = true;
    header('Strict-Transport-Security: max-age=63072000; includeSubDomains; preload');
}

if (PHP_SESSION_ACTIVE !== session_status()) {
    session_name($sessionName);
    session_set_cookie_params($cookieParams);
    session_start();
}

// Basic CORS allow list
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$normalizedOrigin = strtolower($origin);
$originAllowed = false;

if ($origin) {
    if (!$allowedOrigins) {
        respondError('Origin not allowed', 403);
        exit;
    }

    if (!in_array($normalizedOrigin, $allowedOrigins, true)) {
        respondError('Origin not allowed', 403);
        exit;
    }

    $originAllowed = true;
    header("Access-Control-Allow-Origin: $origin");
    header('Access-Control-Allow-Credentials: true');
    header('Vary: Origin');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if ($origin && !$originAllowed) {
        respondError('Origin not allowed', 403);
        exit;
    }
    http_response_code(204);
    exit;
}

function respond(mixed $data = null, int $status = 200, ?array $meta = null): void
{
    $payload = [
        'ok' => true,
        'data' => $data,
    ];

    if ($meta !== null && $meta !== []) {
        $payload['meta'] = $meta;
    }

    sendResponse($payload, $status);
}

function respondError(string $message, int $status = 400, array $extra = []): void
{
    $payload = [
        'ok' => false,
        'error' => translateMessage($message),
    ];

    $code = $extra['code'] ?? $status;
    if ($code !== null) {
        $payload['code'] = (int) $code;
    }

    if (isset($extra['errors']) && is_array($extra['errors'])) {
        $payload['errors'] = translateErrorMessages($extra['errors']);
        unset($extra['errors']);
    }

    foreach ($extra as $key => $value) {
        if ($key === 'code') {
            continue;
        }

        if (is_string($value)) {
            $payload[$key] = translateMessage($value);
            continue;
        }

        if (is_array($value) && $key === 'meta') {
            $payload[$key] = $value;
            continue;
        }

        $payload[$key] = $value;
    }

    sendResponse($payload, $status);
}

function sendResponse(array $payload, int $status): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

function translateMessage(string $message, array $replacements = []): string
{
    $language = getRequestLanguage();
    $catalog = getTranslationCatalog();

    if ($language === 'ar') {
        $translated = $catalog['ar'][$message] ?? $message;
    } else {
        $translated = $catalog[$language][$message] ?? $message;
    }

    if ($replacements) {
        $translated = strtr($translated, $replacements);
    }

    return $translated;
}

function translateErrorMessages(array $errors): array
{
    $translated = [];

    foreach ($errors as $key => $value) {
        if (is_array($value)) {
            $translated[$key] = translateErrorMessages($value);
            continue;
        }

        if (is_string($value)) {
            $translated[$key] = translateMessage($value);
            continue;
        }

        $translated[$key] = $value;
    }

    return $translated;
}

function getRequestLanguage(): string
{
    static $cached = null;

    if ($cached !== null) {
        return $cached;
    }

    if (isset($_GET['lang'])) {
        $cached = normalisePreferenceLanguage((string) $_GET['lang']);
        return $cached;
    }

    if (isset($_SESSION['preferences']['language'])) {
        $cached = normalisePreferenceLanguage((string) $_SESSION['preferences']['language']);
        return $cached;
    }

    if (!empty($_SERVER['HTTP_ACCEPT_LANGUAGE'])) {
        $accepted = explode(',', (string) $_SERVER['HTTP_ACCEPT_LANGUAGE']);
        foreach ($accepted as $entry) {
            $locale = trim(explode(';', $entry)[0] ?? '');
            if ($locale === '') {
                continue;
            }

            if (stripos($locale, 'ar') === 0) {
                $cached = 'ar';
                return $cached;
            }

            if (stripos($locale, 'en') === 0) {
                $cached = 'en';
                return $cached;
            }
        }
    }

    $cached = 'ar';
    return $cached;
}

function getTranslationCatalog(): array
{
    static $catalog = null;

    if ($catalog !== null) {
        return $catalog;
    }

    $catalog = [
        'en' => [],
        'ar' => [
            'Method not allowed' => 'الطريقة غير مسموحة',
            'Unexpected server error' => 'خطأ غير متوقع في الخادم',
            'Invalid username or password' => 'اسم المستخدم أو كلمة المرور غير صحيحين',
            'Username and password are required' => 'اسم المستخدم وكلمة المرور مطلوبان',
            'Username is required' => 'اسم المستخدم مطلوب',
            'Username must be 100 characters or fewer' => 'يجب ألا يتجاوز اسم المستخدم 100 حرف',
            'Password is required' => 'كلمة المرور مطلوبة',
            'Password must be at least 8 characters' => 'يجب ألا تقل كلمة المرور عن 8 أحرف',
            'Password must be 255 characters or fewer' => 'يجب ألا تتجاوز كلمة المرور 255 حرفاً',
            'Unauthorized' => 'غير مصرح لك بالوصول',
            'Customer not found' => 'العميل غير موجود',
            'Missing or invalid customer id' => 'معرّف العميل مفقود أو غير صالح',
            'No fields provided for update' => 'لم يتم تقديم أي حقول للتحديث',
            'Validation failed' => 'فشلت عملية التحقق',
            'Equipment item not found' => 'عنصر المعدات غير موجود',
            'Missing or invalid equipment id' => 'معرّف المعدات مفقود أو غير صالح',
            'Database connection failed' => 'فشل الاتصال بقاعدة البيانات',
            'Maintenance ticket not found' => 'طلب الصيانة غير موجود',
            'Missing or invalid maintenance id' => 'معرّف طلب الصيانة مفقود أو غير صالح',
            'No preference fields provided' => 'لم يتم تقديم أي إعدادات مخصصة',
            'Missing or invalid project id' => 'معرّف المشروع مفقود أو غير صالح',
            'Project not found' => 'المشروع غير موجود',
            'Missing or invalid reservation id' => 'معرّف الحجز مفقود أو غير صالح',
            'Reservation not found' => 'الحجز غير موجود',
            'Technician not found' => 'الفني غير موجود',
            'Missing or invalid technician id' => 'معرّف الفني مفقود أو غير صالح',
            'User not found' => 'المستخدم غير موجود',
            'Missing or invalid user id' => 'معرّف المستخدم مفقود أو غير صالح',
            'HTTPS is required' => 'الاتصال الآمن HTTPS مطلوب',
            'Origin not allowed' => 'المصدر غير مسموح به',
            'Missing configuration file. Copy backend/config.example.php to backend/config.php and fill in your credentials.' => 'ملف الإعدادات مفقود. انسخ backend/config.example.php إلى backend/config.php واملأ بيانات الاتصال.',
            'Invalid JSON payload' => 'بيانات JSON غير صالحة',
            'Unable to read request body' => 'تعذر قراءة محتوى الطلب',
            'Unknown preference key supplied' => 'تم تمرير إعداد غير معروف',
            'Invalid dashboard tab value' => 'قيمة علامة لوحة التحكم غير صالحة',
            'Invalid role' => 'الدور غير صالح',
            'Invalid role filter' => 'عامل التصفية الخاص بالدور غير صالح',
            'Customer is required' => 'العميل مطلوب',
            'Start date/time is required' => 'تاريخ/وقت البداية مطلوب',
            'Start date/time is invalid' => 'تاريخ/وقت البداية غير صالح',
            'End date/time is required' => 'تاريخ/وقت النهاية مطلوب',
            'End date/time is invalid' => 'تاريخ/وقت النهاية غير صالح',
            'End date/time must be after start date/time' => 'يجب أن يكون تاريخ/وقت النهاية بعد تاريخ/وقت البداية',
            'Status is invalid' => 'الحالة غير صالحة',
            'Location is too long (max 255 characters)' => 'الموقع طويل جداً (255 حرفاً كحد أقصى)',
            'Title is too long (max 200 characters)' => 'العنوان طويل جداً (200 حرف كحد أقصى)',
            'Reservation code is too long (max 50 characters)' => 'رمز الحجز طويل جداً (50 حرفاً كحد أقصى)',
            'Discount must be zero or greater' => 'يجب أن يكون الخصم صفراً أو أكثر',
            'Discount type must be percent or amount' => 'نوع الخصم يجب أن يكون نسبة أو مبلغاً ثابتاً',
            'Paid status is invalid' => 'حالة الدفع غير صالحة',
            'Items must be an array' => 'قائمة العناصر يجب أن تكون مصفوفة',
            'Technicians must be an array' => 'قائمة الفنيين يجب أن تكون مصفوفة',
            'Description is required' => 'الوصف مطلوب',
            'Description is too long (max 500 characters)' => 'الوصف طويل جداً (500 حرف كحد أقصى)',
            'Barcode is required' => 'الرمز الشريطي مطلوب',
            'Barcode is too long (max 100 characters)' => 'الرمز الشريطي طويل جداً (100 حرف كحد أقصى)',
            'Barcode already exists' => 'الرمز الشريطي مستخدم بالفعل',
            'Category is too long (max 100 characters)' => 'الفئة طويلة جداً (100 حرف كحد أقصى)',
            'Subcategory is too long (max 100 characters)' => 'الفئة الفرعية طويلة جداً (100 حرف كحد أقصى)',
            'Name is too long (max 150 characters)' => 'الاسم طويل جداً (150 حرفاً كحد أقصى)',
            'Quantity must be numeric' => 'الكمية يجب أن تكون رقماً',
            'Quantity must be zero or greater' => 'الكمية يجب أن تكون صفراً أو أكثر',
            'Unit price must be numeric' => 'سعر الوحدة يجب أن يكون رقماً',
            'Unit price must be zero or greater' => 'سعر الوحدة يجب أن يكون صفراً أو أكثر',
            'Image URL is too long (max 255 characters)' => 'رابط الصورة طويل جداً (255 حرفاً كحد أقصى)',
            'Title is required' => 'العنوان مطلوب',
            'Title must be 255 characters or fewer' => 'يجب ألا يتجاوز العنوان 255 حرفاً',
            'Project type is required' => 'نوع المشروع مطلوب',
            'Project type must be 100 characters or fewer' => 'يجب ألا يتجاوز نوع المشروع 100 حرف',
            'Client is required' => 'العميل مطلوب',
            'Client not found' => 'العميل غير موجود',
            'Client company must be 255 characters or fewer' => 'يجب ألا يتجاوز اسم شركة العميل 255 حرفاً',
            'Payment status must be paid or unpaid' => 'حالة الدفع يجب أن تكون مدفوعة أو غير مدفوعة',
            'Equipment estimate must be zero or greater' => 'تقدير المعدات يجب أن يكون صفراً أو أكثر',
            'Tax amount must be zero or greater' => 'قيمة الضريبة يجب أن تكون صفراً أو أكثر',
            'Total with tax must be zero or greater' => 'الإجمالي مع الضريبة يجب أن يكون صفراً أو أكثر',
            'Expenses must be an array' => 'المصروفات يجب أن تكون مصفوفة',
            'Expenses total must be zero or greater' => 'إجمالي المصروفات يجب أن يكون صفراً أو أكثر',
            'Equipment must be an array' => 'المعدات يجب أن تكون مصفوفة',
            'Project code must be 50 characters or fewer' => 'يجب ألا يتجاوز رمز المشروع 50 حرفاً',
            'Project code already exists' => 'رمز المشروع مستخدم بالفعل',
            'Equipment is required' => 'المعدات مطلوبة',
            'Equipment not found' => 'المعدات غير موجودة',
            'Maintenance type is too long (max 150 characters)' => 'نوع الصيانة طويل جداً (150 حرفاً كحد أقصى)',
            'Priority is invalid' => 'الأولوية غير صالحة',
            'Notes are too long (max 1000 characters)' => 'الملاحظات طويلة جداً (1000 حرف كحد أقصى)',
            'Resolution report is too long (max 2000 characters)' => 'تقرير الحل طويل جداً (2000 حرف كحد أقصى)',
            'Full name is required' => 'الاسم الكامل مطلوب',
            'Full name is too long (max 150 characters)' => 'الاسم الكامل طويل جداً (150 حرفاً كحد أقصى)',
            'Phone number is required' => 'رقم الهاتف مطلوب',
            'Phone number is too long (max 30 characters)' => 'رقم الهاتف طويل جداً (30 حرفاً كحد أقصى)',
            'Email is too long (max 150 characters)' => 'البريد الإلكتروني طويل جداً (150 حرفاً كحد أقصى)',
            'Email is invalid' => 'البريد الإلكتروني غير صالح',
            'Email format is invalid' => 'صيغة البريد الإلكتروني غير صحيحة',
            'Role is required' => 'الدور مطلوب',
            'Role is too long (max 150 characters)' => 'الدور طويل جداً (150 حرفاً كحد أقصى)',
            'Department is too long (max 150 characters)' => 'القسم طويل جداً (150 حرفاً كحد أقصى)',
            'Notes are too long (max 500 characters)' => 'الملاحظات طويلة جداً (500 حرف كحد أقصى)',
            'Daily wage must be numeric' => 'الأجر اليومي يجب أن يكون رقماً',
            'Daily wage must be zero or greater' => 'الأجر اليومي يجب أن يكون صفراً أو أكثر',
            'Address is too long (max 255 characters)' => 'العنوان طويل جداً (255 حرفاً كحد أقصى)',
            'Company is too long (max 150 characters)' => 'اسم الشركة طويل جداً (150 حرفاً كحد أقصى)',
            'Database name and user must be provided in the configuration.' => 'يجب تحديد اسم قاعدة البيانات واسم المستخدم في الإعدادات.',
            'Equipment entry must be an object' => 'عنصر المعدات يجب أن يكون كائناً (Object)',
            'Equipment id is required' => 'معرّف المعدات مطلوب',
            'Expense amount must be zero or greater' => 'قيمة المصروف يجب أن تكون صفراً أو أكثر',
            'Expense label is required' => 'وصف المصروف مطلوب',
            'Expense label must be 255 characters or fewer' => 'وصف المصروف يجب ألا يتجاوز 255 حرفاً',
            'Expense must be an object' => 'المصروف يجب أن يكون كائناً (Object)',
            'Item must be an object' => 'العنصر يجب أن يكون كائناً (Object)',
            'Quantity must be at least 1' => 'الكمية يجب ألا تقل عن 1',
            'Technician id is required' => 'معرّف الفني مطلوب',
            'A user with that username already exists' => 'هذا الاسم مستخدم بالفعل',
            'At least one administrator must remain' => 'يجب أن يبقى مسؤول واحد على الأقل',
            'You cannot delete the account you are currently using' => 'لا يمكنك حذف الحساب الذي تستخدمه حالياً',
            'The pdo_mysql extension is not enabled on this server.' => 'إضافة pdo_mysql غير مفعلة على هذا الخادم.',
            'Failed to fetch updated maintenance ticket' => 'فشل في جلب تذكرة الصيانة المحدّثة',
            'Failed to load created project' => 'فشل في تحميل المشروع الذي تم إنشاؤه',
            'Failed to load updated project' => 'فشل في تحميل المشروع المحدّث',
        ],
    ];

    return $catalog;
}

function getDatabaseConnection(): PDO
{
    static $connection = null;

    if ($connection instanceof PDO) {
        return $connection;
    }

    global $config;

    $connection = create_pdo($config['db'] ?? []);

    return $connection;
}

function findUserByUsername(PDO $pdo, string $username): ?array
{
    $statement = $pdo->prepare('SELECT id, username, password_hash, role, last_login FROM users WHERE username = :username LIMIT 1');
    $statement->execute(['username' => $username]);
    $user = $statement->fetch();

    return $user ?: null;
}

function verifyCredentials(string $username, string $password): ?array
{
    $normalizedUsername = trim($username);

    if ($normalizedUsername === '' || $password === '') {
        return null;
    }

    $pdo = getDatabaseConnection();
    $user = findUserByUsername($pdo, $normalizedUsername);

    if (!$user) {
        return null;
    }

    if (!password_verify($password, (string) $user['password_hash'])) {
        return null;
    }

    if (password_needs_rehash((string) $user['password_hash'], PASSWORD_DEFAULT)) {
        $newHash = password_hash($password, PASSWORD_DEFAULT);

        $update = $pdo->prepare('UPDATE users SET password_hash = :hash WHERE id = :id');
        $update->execute([
            'hash' => $newHash,
            'id' => $user['id'],
        ]);

        $user['password_hash'] = $newHash;
    }

    return $user;
}

function loginUser(array $user): void
{
    $pdo = getDatabaseConnection();

    session_regenerate_id(true);
    $sessionId = session_id();
    $loginTime = (new DateTimeImmutable())->format('Y-m-d H:i:s');

    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;

    $statement = $pdo->prepare('INSERT INTO session_logs (user_id, session_id, login_time, ip_address, user_agent)
        VALUES (:user_id, :session_id, :login_time, :ip_address, :user_agent)');
    $statement->execute([
        'user_id' => $user['id'],
        'session_id' => $sessionId,
        'login_time' => $loginTime,
        'ip_address' => $ipAddress,
        'user_agent' => $userAgent,
    ]);

    $sessionLogId = (int) $pdo->lastInsertId();

    $update = $pdo->prepare('UPDATE users SET last_login = :last_login WHERE id = :id');
    $update->execute([
        'last_login' => $loginTime,
        'id' => $user['id'],
    ]);

    $_SESSION['user'] = [
        'id' => (int) $user['id'],
        'username' => (string) $user['username'],
        'role' => (string) $user['role'],
        'login_at' => $loginTime,
        'session_id' => $sessionId,
        'session_log_id' => $sessionLogId,
    ];

    logActivity($pdo, 'LOGIN_SUCCESS', [
        'ip' => $ipAddress,
        'user_agent' => $userAgent,
        'previous_login' => $user['last_login'] ?? null,
    ]);
}

function logoutUser(): void
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        return;
    }

    $user = $_SESSION['user'] ?? null;

    if ($user && isset($user['session_id'])) {
        $pdo = getDatabaseConnection();
        $sessionId = (string) $user['session_id'];

        try {
            $statement = $pdo->prepare('UPDATE session_logs SET logout_time = :logout_time WHERE session_id = :session_id AND logout_time IS NULL');
            $statement->execute([
                'logout_time' => (new DateTimeImmutable())->format('Y-m-d H:i:s'),
                'session_id' => $sessionId,
            ]);
        } catch (Throwable $exception) {
            error_log('Failed to update session_logs on logout: ' . $exception->getMessage());
        }

        logActivity($pdo, 'LOGOUT', [
            'ip' => $_SERVER['REMOTE_ADDR'] ?? null,
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? null,
        ]);
    }

    $_SESSION = [];

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(
            session_name(),
            '',
            time() - 42000,
            $params['path'] ?? '/',
            $params['domain'] ?? '',
            (bool) ($params['secure'] ?? false),
            (bool) ($params['httponly'] ?? true)
        );
    }

    session_destroy();
}

function normaliseActivityDetails(mixed $details): ?string
{
    if ($details === null) {
        return null;
    }

    if ($details instanceof JsonSerializable) {
        $details = $details->jsonSerialize();
    }

    if (is_string($details)) {
        $details = ['message' => $details];
    } elseif (!is_array($details)) {
        $details = ['value' => $details];
    }

    $encoded = json_encode($details, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

    return $encoded === false ? null : $encoded;
}

function logActivity(PDO $pdo, string $action, mixed $details = null): void
{
    if (!isAuthenticated()) {
        return;
    }

    $user = $_SESSION['user'];

    try {
        $statement = $pdo->prepare('INSERT INTO activity_logs (user_id, session_id, action, details)
            VALUES (:user_id, :session_id, :action, :details)');
        $statement->execute([
            'user_id' => $user['id'],
            'session_id' => $user['session_id'],
            'action' => $action,
            'details' => normaliseActivityDetails($details),
        ]);
    } catch (Throwable $exception) {
        error_log('Failed to write activity log: ' . $exception->getMessage());
    }
}

function getAuthenticatedUser(): ?array
{
    if (!isAuthenticated()) {
        return null;
    }

    return [
        'id' => (int) $_SESSION['user']['id'],
        'username' => (string) $_SESSION['user']['username'],
        'role' => (string) $_SESSION['user']['role'],
        'loginAt' => $_SESSION['user']['login_at'] ?? null,
    ];
}

function isAuthenticated(): bool
{
    return isset($_SESSION['user']['id']) && (int) $_SESSION['user']['id'] > 0;
}

function requireAuthenticated(): void
{
    if (!isAuthenticated()) {
        respondError('Unauthorized', 401);
        exit;
    }
}

function requireRole(string|array $roles): void
{
    requireAuthenticated();

    $allowedRoles = is_array($roles) ? $roles : [$roles];
    $allowedRoles = array_map(static fn($role) => (string) $role, $allowedRoles);
    $currentRole = (string) ($_SESSION['user']['role'] ?? '');

    if (!in_array($currentRole, $allowedRoles, true)) {
        logActivity(getDatabaseConnection(), 'AUTHORIZATION_DENIED', [
            'required_roles' => $allowedRoles,
            'current_role' => $currentRole,
            'path' => $_SERVER['REQUEST_URI'] ?? null,
        ]);

        respondError('Forbidden', 403);
        exit;
    }
}

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

function getUserPreferences(): array
{
    $defaults = getDefaultPreferences();
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

    $filtered = array_intersect_key($current, $defaults);

    return array_merge($defaults, $filtered);
}
