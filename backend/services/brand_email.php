<?php
declare(strict_types=1);

function resolveBrandEmailBaseUrl(): string
{
    return 'https://art-ratio.com';
}

function resolveBrandEmailAssetUrl(string $relativePath): string
{
    $trimmedPath = ltrim($relativePath, '/');
    $host = trim((string) ($_SERVER['HTTP_HOST'] ?? ''));
    if ($host !== '' && (stripos($host, '127.0.0.1') !== false || stripos($host, 'localhost') !== false)) {
        $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $localPath = 'Arino - Template/' . $trimmedPath;
        return $scheme . '://' . $host . '/' . str_replace('%2F', '/', rawurlencode($localPath));
    }

    return resolveBrandEmailBaseUrl() . '/' . $trimmedPath;
}

function resolveBrandEmailLogoUrl(): string
{
    return resolveBrandEmailAssetUrl('assets/img/email-art-ratio-logo.png');
}

function resolveBrandEmailPalette(): array
{
    return [
        'panel' => '#1f3022',
        'slate' => '#8EA7B5',
        'sage' => '#9AAA91',
        'surface' => '#FFFFFF',
        'surface_border' => 'rgba(80,80,80,0.14)',
        'body_text' => '#1f2937',
        'email_background' => '#FFFFFF',
    ];
}

function resolveBrandEmailSocialLinks(): array
{
    return [
        [
            'label' => 'Instagram',
            'icon_url' => resolveBrandEmailAssetUrl('assets/img/email-social/instagram.svg'),
            'url' => 'https://www.instagram.com/art_ratio',
        ],
        [
            'label' => 'WhatsApp',
            'icon_url' => resolveBrandEmailAssetUrl('assets/img/email-social/whatsapp.svg'),
            'url' => 'https://wa.me/966567680152',
        ],
        [
            'label' => 'TikTok',
            'icon_url' => resolveBrandEmailAssetUrl('assets/img/email-social/tiktok.svg'),
            'url' => 'https://www.tiktok.com/@art_ratio',
        ],
        [
            'label' => 'YouTube',
            'icon_url' => resolveBrandEmailAssetUrl('assets/img/email-social/youtube.svg'),
            'url' => 'https://www.youtube.com/@ArtRatio',
        ],
        [
            'label' => 'Snapchat',
            'icon_url' => resolveBrandEmailAssetUrl('assets/img/email-social/snapchat.svg'),
            'url' => 'https://snapchat.com/t/J5tv4Szx',
        ],
        [
            'label' => 'LinkedIn',
            'icon_url' => resolveBrandEmailAssetUrl('assets/img/email-social/linkedin.svg'),
            'url' => 'https://www.linkedin.com/company/art-ratio/',
        ],
        [
            'label' => 'Vimeo',
            'icon_url' => resolveBrandEmailAssetUrl('assets/img/email-social/vimeo.svg'),
            'url' => 'https://vimeo.com/user249863389?fl=pp&fe=sh',
        ],
    ];
}

function buildBrandEmailSocialLinksHtml(): string
{
    $links = [];
    foreach (resolveBrandEmailSocialLinks() as $social) {
        $url = htmlspecialchars((string) ($social['url'] ?? ''), ENT_QUOTES, 'UTF-8');
        $iconUrl = htmlspecialchars((string) ($social['icon_url'] ?? ''), ENT_QUOTES, 'UTF-8');
        $label = htmlspecialchars((string) ($social['label'] ?? ''), ENT_QUOTES, 'UTF-8');

        $links[] = '<span class="er-social-item" style="display:inline-block;padding:0 4px 8px;">'
            . '<span class="er-social-circle" style="display:inline-block;width:38px;height:38px;border:1px solid rgba(255,255,255,0.72);border-radius:999px;text-align:center;vertical-align:middle;">'
            . '<a href="' . $url . '" target="_blank" rel="noopener noreferrer" aria-label="' . $label . '" class="er-social-link" style="display:block;width:38px;height:38px;line-height:38px;text-decoration:none;">'
            . '<img src="' . $iconUrl . '" alt="' . $label . '" width="16" height="16" class="er-social-icon" style="display:block;width:16px;height:16px;margin:11px auto;border:0;outline:none;text-decoration:none;">'
            . '</a>'
            . '</span>'
            . '</span>';
    }

    return '<div class="er-social-host" style="text-align:center;font-size:0;line-height:0;">'
        . implode('', $links)
        . '</div>';
}

function buildBrandEmailSocialLinksText(): string
{
    $lines = [];
    foreach (resolveBrandEmailSocialLinks() as $social) {
        $lines[] = (string) ($social['label'] ?? '') . ': ' . (string) ($social['url'] ?? '');
    }

    return implode("\n", $lines);
}

function buildBrandEmailClosingHtml(bool $isArabic): string
{
    if ($isArabic) {
        return '<div style="margin-top:20px;">'
            . '<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#111827;">مع التحية،</p>'
            . '<p style="margin:0;font-size:15px;font-weight:700;color:#111827;">فريق أرت ريشيو</p>'
            . '</div>';
    }

    return '<div style="margin-top:20px;">'
        . '<p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#111827;">Best regards,</p>'
        . '<p style="margin:0;font-size:15px;font-weight:700;color:#111827;">Art Ratio Team</p>'
        . '</div>';
}

function buildBrandEmailClosingText(bool $isArabic): string
{
    return $isArabic ? "مع التحية،\nفريق أرت ريشيو" : "Best regards,\nArt Ratio Team";
}

function buildBrandEmailPhoneHtml(string $phone): string
{
    $safePhone = htmlspecialchars(trim($phone), ENT_QUOTES, 'UTF-8');
    return '<span dir="ltr" style="display:inline-block;direction:ltr;unicode-bidi:bidi-override;white-space:nowrap;">' . $safePhone . '</span>';
}

function buildBrandEmailFooterHtml(bool $isArabic): string
{
    $palette = resolveBrandEmailPalette();
    $logoUrl = htmlspecialchars(resolveBrandEmailLogoUrl(), ENT_QUOTES, 'UTF-8');
    $siteUrl = resolveBrandEmailBaseUrl();
    $safeSiteUrl = htmlspecialchars($siteUrl, ENT_QUOTES, 'UTF-8');
    $socialLinks = buildBrandEmailSocialLinksHtml();
    $contactPhone = buildBrandEmailPhoneHtml('+966 56 768 0152');
    $contactLineHtml = $isArabic
        ? '<div class="er-footer-contact" style="margin:0;color:rgba(255,255,255,0.82);font-size:12px;line-height:1.8;text-align:center;">'
            . '<span class="er-contact-item" style="display:inline-block;white-space:nowrap;">الهاتف: ' . $contactPhone . '</span>'
            . '<span class="er-contact-sep" style="display:inline-block;margin:0 8px;color:' . $palette['slate'] . ';">|</span>'
            . '<span class="er-contact-item" style="display:inline-block;white-space:nowrap;">الموقع الإلكتروني: <a href="' . $safeSiteUrl . '" style="color:' . $palette['sage'] . ';text-decoration:none;font-weight:700;">art-ratio.com</a></span>'
            . '<span class="er-contact-sep" style="display:inline-block;margin:0 8px;color:' . $palette['slate'] . ';">|</span>'
            . '<span class="er-contact-item" style="display:inline-block;white-space:nowrap;">البريد: <a href="mailto:info@art-ratio.com" style="color:' . $palette['sage'] . ';text-decoration:none;font-weight:700;">info@art-ratio.com</a></span>'
            . '</div>'
        : '<div class="er-footer-contact" style="margin:0;color:rgba(255,255,255,0.82);font-size:12px;line-height:1.8;text-align:center;">'
            . '<span class="er-contact-item" style="display:inline-block;white-space:nowrap;">Phone: ' . $contactPhone . '</span>'
            . '<span class="er-contact-sep" style="display:inline-block;margin:0 8px;color:' . $palette['slate'] . ';">|</span>'
            . '<span class="er-contact-item" style="display:inline-block;white-space:nowrap;">Website: <a href="' . $safeSiteUrl . '" style="color:' . $palette['sage'] . ';text-decoration:none;font-weight:700;">art-ratio.com</a></span>'
            . '<span class="er-contact-sep" style="display:inline-block;margin:0 8px;color:' . $palette['slate'] . ';">|</span>'
            . '<span class="er-contact-item" style="display:inline-block;white-space:nowrap;">Email: <a href="mailto:info@art-ratio.com" style="color:' . $palette['sage'] . ';text-decoration:none;font-weight:700;">info@art-ratio.com</a></span>'
            . '</div>';

    return '<div style="margin-top:22px;padding:16px 20px 18px;border-radius:18px;background:' . $palette['panel'] . ';border:1px solid ' . $palette['slate'] . ';color:#fefefe;text-align:center;">'
        . '<img src="' . $logoUrl . '" alt="Art Ratio" style="display:block;margin:0 auto 12px;max-width:132px;height:auto;">'
        . $contactLineHtml
        . '<div style="margin-top:12px;">' . $socialLinks . '</div>'
        . '</div>';
}

function buildBrandEmailFooterText(bool $isArabic): string
{
    $lines = [];
    $lines[] = $isArabic ? 'الهاتف: +966 56 768 0152' : 'Phone: +966 56 768 0152';
    $lines[] = 'Email: info@art-ratio.com';
    $lines[] = resolveBrandEmailBaseUrl();
    $lines[] = '';
    $lines[] = $isArabic ? 'روابط التواصل الاجتماعي:' : 'Social links:';
    $lines[] = buildBrandEmailSocialLinksText();

    return implode("\n", $lines);
}

function buildBrandEmailShellHtml(string $contentHtml, bool $isArabic, string $title): string
{
    $palette = resolveBrandEmailPalette();
    $safeTitle = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
    $logoUrl = htmlspecialchars(resolveBrandEmailLogoUrl(), ENT_QUOTES, 'UTF-8');
    $dir = $isArabic ? 'rtl' : 'ltr';
    $fontFamily = $isArabic ? 'Tahoma,Arial,sans-serif' : 'Arial,sans-serif';

    return '<style>'
        . '.er-social-host{max-width:100%;margin:0 auto;}'
        . '.er-footer-contact{max-width:100%;}'
        . '@media only screen and (max-width:640px){'
        . '.er-contact-item{display:block !important;margin:0 0 6px !important;}'
        . '.er-contact-sep{display:none !important;}'
        . '.er-social-host{max-width:160px !important;}'
        . '.er-social-item{padding:0 3px 6px !important;}'
        . '.er-social-circle,.er-social-link{width:30px !important;height:30px !important;}'
        . '.er-social-icon{width:13px !important;height:13px !important;margin:8px auto !important;}'
        . '}'
        . '</style>'
        . '<div dir="' . $dir . '" style="margin:0;padding:24px;background:' . $palette['email_background'] . ';font-family:' . $fontFamily . ';">'
        . '<div style="max-width:760px;margin:0 auto;background:' . $palette['surface'] . ';border:1px solid ' . $palette['surface_border'] . ';border-radius:24px;overflow:hidden;box-shadow:0 18px 40px rgba(3,11,3,0.22);">'
        . '<div style="padding:22px 20px 20px;background:' . $palette['panel'] . ';border-bottom:3px solid ' . $palette['slate'] . ';text-align:center;">'
        . '<p style="margin:0 0 12px;color:' . $palette['sage'] . ';font-size:10px;font-weight:700;letter-spacing:0.24em;text-transform:uppercase;">art-ratio.com</p>'
        . '<img src="' . $logoUrl . '" alt="Art Ratio" style="display:block;margin:0 auto 12px;max-width:132px;height:auto;">'
        . '<p style="margin:0;"><span style="display:inline-block;padding:10px 18px;border-radius:999px;border:1px solid rgba(142,167,181,0.42);background:rgba(142,167,181,0.10);color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;line-height:1;">' . $safeTitle . '</span></p>'
        . '</div>'
        . '<div style="padding:30px 28px;color:' . $palette['body_text'] . ';line-height:1.8;">'
        . $contentHtml
        . buildBrandEmailFooterHtml($isArabic)
        . '</div>'
        . '</div>'
        . '</div>';
}
