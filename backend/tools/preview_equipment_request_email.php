<?php
declare(strict_types=1);

define('API_INCLUDE_MODE', true);
require_once __DIR__ . '/../api/equipment-requests/index.php';

header('Content-Type: text/html; charset=utf-8');

function previewMapEquipmentRequestItemStatusMeta(string $status): array
{
    $normalized = normalizeEquipmentRequestItemStatus($status);
    return match ($normalized) {
        'available' => [
            'key' => 'available',
            'ar' => 'متاح',
            'en' => 'Available',
            'background' => '#ecfdf3',
            'text' => '#166534',
            'border' => '#86efac',
        ],
        'unavailable' => [
            'key' => 'unavailable',
            'ar' => 'غير متوفر',
            'en' => 'Unavailable',
            'background' => '#fef2f2',
            'text' => '#991b1b',
            'border' => '#fca5a5',
        ],
        default => [
            'key' => 'pending',
            'ar' => 'قيد المراجعة',
            'en' => 'Pending',
            'background' => '#fffbeb',
            'text' => '#92400e',
            'border' => '#fcd34d',
        ],
    };
}

function previewBuildStatusRows(array $items, bool $isArabic): string
{
    $rows = '';
    foreach ($items as $item) {
        $name = htmlspecialchars((string) ($item['name'] ?? ''), ENT_QUOTES, 'UTF-8');
        $category = htmlspecialchars((string) ($item['category'] ?? ''), ENT_QUOTES, 'UTF-8');
        $subcategory = htmlspecialchars((string) ($item['subcategory'] ?? ''), ENT_QUOTES, 'UTF-8');
        $qty = max(1, (int) ($item['qty'] ?? 1));
        $itemNoteRaw = normalizeEquipmentRequestMultiline((string) ($item['item_status_note'] ?? ''), 500);
        $itemNote = $itemNoteRaw !== '' ? htmlspecialchars($itemNoteRaw, ENT_QUOTES, 'UTF-8') : '-';
        $itemStatusMeta = previewMapEquipmentRequestItemStatusMeta((string) ($item['item_status'] ?? 'pending'));
        $itemStatusLabel = $isArabic ? (string) $itemStatusMeta['ar'] : (string) $itemStatusMeta['en'];
        $statusTag = '<span style="display:inline-block;padding:3px 9px;border-radius:999px;'
            . 'font-weight:700;font-size:12px;background:' . htmlspecialchars((string) $itemStatusMeta['background'], ENT_QUOTES, 'UTF-8') . ';'
            . 'color:' . htmlspecialchars((string) $itemStatusMeta['text'], ENT_QUOTES, 'UTF-8') . ';'
            . 'border:1px solid ' . htmlspecialchars((string) $itemStatusMeta['border'], ENT_QUOTES, 'UTF-8') . ';">'
            . htmlspecialchars($itemStatusLabel, ENT_QUOTES, 'UTF-8')
            . '</span>';
        $categoryText = trim($category . ($subcategory !== '' ? ' • ' . $subcategory : ''));
        if ($categoryText === '') {
            $categoryText = '-';
        }

        $rows .= '<tr>'
            . '<td style="padding:8px;border:1px solid #ddd;">' . $name . '</td>'
            . '<td style="padding:8px;border:1px solid #ddd;">' . $categoryText . '</td>'
            . '<td style="padding:8px;border:1px solid #ddd;text-align:center;">' . $qty . '</td>'
            . '<td style="padding:8px;border:1px solid #ddd;text-align:center;">' . $statusTag . '</td>'
            . '<td style="padding:8px;border:1px solid #ddd;">' . $itemNote . '</td>'
            . '</tr>';
    }

    return $rows;
}

function previewBuildStatusEmailHtml(
    string $requestCode,
    string $customerName,
    string $customerPhone,
    int $totalItems,
    array $items,
    string $statusLabel,
    string $statusNote,
    bool $isArabic
): string {
    $safeName = htmlspecialchars($customerName, ENT_QUOTES, 'UTF-8');
    $safeCode = htmlspecialchars($requestCode, ENT_QUOTES, 'UTF-8');
    $safePhone = htmlspecialchars($customerPhone, ENT_QUOTES, 'UTF-8');
    $safeNote = $statusNote !== '' ? nl2br(htmlspecialchars($statusNote, ENT_QUOTES, 'UTF-8')) : '';
    $rows = previewBuildStatusRows($items, $isArabic);

    if ($isArabic) {
        $body = '<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;line-height:1.8;">'
            . '<p>مرحبًا ' . $safeName . '،</p>'
            . '<p>تم تحديث حالة طلب المعدات الخاص بك.</p>'
            . '<p><strong>حالة الطلب:</strong> ' . htmlspecialchars($statusLabel, ENT_QUOTES, 'UTF-8') . '<br>'
            . '<strong>رقم الطلب:</strong> ' . $safeCode . '<br>'
            . '<strong>الجوال:</strong> ' . $safePhone . '<br>'
            . '<strong>إجمالي المعدات:</strong> ' . $totalItems . '</p>'
            . ($safeNote !== '' ? '<p><strong>ملاحظة التحديث:</strong><br>' . $safeNote . '</p>' : '')
            . '<table style="border-collapse:collapse;width:100%;margin-top:16px;">'
            . '<thead><tr>'
            . '<th style="padding:8px;border:1px solid #ddd;text-align:right;">العنصر</th>'
            . '<th style="padding:8px;border:1px solid #ddd;text-align:right;">التصنيف</th>'
            . '<th style="padding:8px;border:1px solid #ddd;text-align:center;">الكمية</th>'
            . '<th style="padding:8px;border:1px solid #ddd;text-align:center;">حالة العنصر</th>'
            . '<th style="padding:8px;border:1px solid #ddd;text-align:right;">ملاحظة</th>'
            . '</tr></thead>'
            . '<tbody>' . $rows . '</tbody>'
            . '</table>'
            . buildEquipmentRequestClosingHtml(true)
            . '</div>';
        return buildEquipmentRequestEmailShellHtml($body, true, 'Equipment Request Status');
    }

    $body = '<div style="font-family:Arial,sans-serif;line-height:1.7;">'
        . '<p>Hello ' . $safeName . ',</p>'
        . '<p>Your equipment request status has been updated.</p>'
        . '<p><strong>Status:</strong> ' . htmlspecialchars($statusLabel, ENT_QUOTES, 'UTF-8') . '<br>'
        . '<strong>Request code:</strong> ' . $safeCode . '<br>'
        . '<strong>Phone:</strong> ' . $safePhone . '<br>'
        . '<strong>Total quantity:</strong> ' . $totalItems . '</p>'
        . ($safeNote !== '' ? '<p><strong>Update note:</strong><br>' . $safeNote . '</p>' : '')
        . '<table style="border-collapse:collapse;width:100%;margin-top:16px;">'
        . '<thead><tr>'
        . '<th style="padding:8px;border:1px solid #ddd;text-align:left;">Item</th>'
        . '<th style="padding:8px;border:1px solid #ddd;text-align:left;">Category</th>'
        . '<th style="padding:8px;border:1px solid #ddd;text-align:center;">Qty</th>'
        . '<th style="padding:8px;border:1px solid #ddd;text-align:center;">Item status</th>'
        . '<th style="padding:8px;border:1px solid #ddd;text-align:left;">Note</th>'
        . '</tr></thead>'
        . '<tbody>' . $rows . '</tbody>'
        . '</table>'
        . buildEquipmentRequestClosingHtml(false)
        . '</div>';
    return buildEquipmentRequestEmailShellHtml($body, false, 'Equipment Request Status');
}

$sampleItems = [
    [
        'name' => 'Sony FX6 Camera',
        'category' => 'Camera',
        'subcategory' => 'Cinema',
        'qty' => 1,
        'item_status' => 'available',
        'item_status_note' => 'جاهز للتسليم',
    ],
    [
        'name' => 'Aputure 600D Pro',
        'category' => 'Lighting',
        'subcategory' => 'LED',
        'qty' => 2,
        'item_status' => 'pending',
        'item_status_note' => '',
    ],
    [
        'name' => 'DJI Ronin RS 3 Pro',
        'category' => 'Stabilizer',
        'subcategory' => 'Gimbal',
        'qty' => 1,
        'item_status' => 'unavailable',
        'item_status_note' => 'سنقترح بديلًا مناسبًا',
    ],
];

$arabicReceipt = buildEquipmentRequestCustomerReceivedEmailHtml(
    'Order #1001',
    'العميل التجريبي',
    '+966 50 000 0000',
    'أحتاج التوصيل مساءً إذا أمكن.',
    4,
    $sampleItems,
    true
);

$englishReceipt = buildEquipmentRequestCustomerReceivedEmailHtml(
    'Order #1001',
    'Sample Client',
    '+966 50 000 0000',
    'Please arrange evening delivery if possible.',
    4,
    $sampleItems,
    false
);

$arabicStatus = previewBuildStatusEmailHtml(
    'Order #1001',
    'العميل التجريبي',
    '+966 50 000 0000',
    4,
    $sampleItems,
    'تم تأكيد الطلب',
    'تمت مراجعة العناصر وسيتم التواصل معك خلال وقت قصير.',
    true
);
$brandPalette = resolveEquipmentRequestBrandPalette();
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Equipment Email Preview</title>
  <link rel="stylesheet" href="/Arino%20-%20Template/assets/css/plugins/fontawesome.min.css">
  <style>
    body {
      margin: 0;
      font-family: Tajawal, Arial, sans-serif;
      background: <?php echo $brandPalette['charcoal']; ?>;
      color: #e5e7eb;
    }
    .page {
      max-width: 980px;
      margin: 0 auto;
      padding: 32px 20px 48px;
    }
    .hero {
      margin-bottom: 24px;
      padding: 28px;
      border-radius: 28px;
      background: linear-gradient(135deg, <?php echo $brandPalette['near_black']; ?> 0%, <?php echo $brandPalette['forest']; ?> 55%, <?php echo $brandPalette['olive']; ?> 100%);
      border: 1px solid <?php echo $brandPalette['slate']; ?>;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
      text-align: center;
    }
    .hero img {
      display: block;
      width: min(220px, 60vw);
      margin: 0 auto 16px;
    }
    .hero h1 {
      margin: 0 0 8px;
      font-size: 28px;
      color: #f8fafc;
    }
    .hero p {
      margin: 0;
      color: <?php echo $brandPalette['sage']; ?>;
      line-height: 1.8;
    }
    .stack {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 20px;
    }
    .card {
      background: <?php echo $brandPalette['near_black']; ?>;
      border: 1px solid <?php echo $brandPalette['slate']; ?>;
      border-radius: 26px;
      overflow: visible;
      box-shadow: 0 22px 50px rgba(0, 0, 0, 0.24);
    }
    .card-header {
      padding: 15px 20px;
      background: linear-gradient(90deg, <?php echo $brandPalette['forest']; ?> 0%, <?php echo $brandPalette['olive']; ?> 100%);
      border-bottom: 1px solid <?php echo $brandPalette['slate']; ?>;
      color: #f8fafc;
      font-weight: 700;
      font-size: 15px;
    }
    .frame {
      padding: 12px;
      background: <?php echo $brandPalette['slate']; ?>;
      overflow-x: auto;
    }
    .email {
      background: transparent;
      color: #111827;
      border-radius: 22px;
      padding: 0;
      min-height: 100%;
      overflow-x: auto;
    }
    .email table {
      width: 100%;
      table-layout: fixed;
    }
    .email td,
    .email th {
      word-break: break-word;
    }
  </style>
</head>
<body>
  <div class="page">
    <section class="hero">
      <img src="<?php echo htmlspecialchars(resolveEquipmentRequestBrandLogoUrl(), ENT_QUOTES, 'UTF-8'); ?>" alt="Art Ratio">
      <h1>معاينة شكل الإيميل</h1>
      <p>هذه صفحة preview محلية تعرض براندينغ الإيميل بألوان وهوية Art Ratio، مع الشعار الصحيح وروابط السوشال من الموقع نفسه، وبعرض عمودي ليسهل مراجعة كل نموذج.</p>
    </section>

    <section class="stack">
      <article class="card">
        <div class="card-header">استلام الطلب - عربي</div>
        <div class="frame">
          <div class="email"><?php echo $arabicReceipt; ?></div>
        </div>
      </article>

      <article class="card">
        <div class="card-header">Receipt Email - English</div>
        <div class="frame">
          <div class="email"><?php echo $englishReceipt; ?></div>
        </div>
      </article>

      <article class="card">
        <div class="card-header">تحديث حالة الطلب - عربي</div>
        <div class="frame">
          <div class="email"><?php echo $arabicStatus; ?></div>
        </div>
      </article>
    </section>
  </div>
</body>
</html>
