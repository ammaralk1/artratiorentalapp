<?php

declare(strict_types=1);

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
        'en' => [
            'Username must be at least 3 characters' => 'Username must be at least 3 characters',
            'Username contains invalid characters' => 'Username contains invalid characters',
            'Password contains invalid characters' => 'Password contains invalid characters',
        ],
        'ar' => [
            'Method not allowed' => 'الطريقة غير مسموحة',
            'Unexpected server error' => 'خطأ غير متوقع في الخادم',
            'Invalid username or password' => 'اسم المستخدم أو كلمة المرور غير صحيحين',
            'Username and password are required' => 'اسم المستخدم وكلمة المرور مطلوبان',
            'Username is required' => 'اسم المستخدم مطلوب',
            'Username must be at least 3 characters' => 'اسم المستخدم يجب ألا يقل عن 3 أحرف',
            'Username must be 100 characters or fewer' => 'يجب ألا يتجاوز اسم المستخدم 100 حرف',
            'Username contains invalid characters' => 'اسم المستخدم يحتوي على أحرف غير مسموحة',
            'Password is required' => 'كلمة المرور مطلوبة',
            'Password must be at least 8 characters' => 'يجب ألا تقل كلمة المرور عن 8 أحرف',
            'Password must be 255 characters or fewer' => 'يجب ألا تتجاوز كلمة المرور 255 حرفاً',
            'Password contains invalid characters' => 'كلمة المرور تحتوي على أحرف غير مسموحة',
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
            'Too many login attempts. Try again later.' => 'عدد كبير من محاولات تسجيل الدخول. حاول لاحقاً.',
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
            'Project code must be 50 characters or fewer' => 'رمز المشروع يجب ألا يتجاوز 50 حرفاً',
        ],
    ];

    return $catalog;
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
