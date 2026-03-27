export const PUBLIC_SITE_ORIGIN = 'https://art-ratio.com';

export const PUBLIC_PAGE_LOCALES = Object.freeze({
  'index.html': {
    pageId: 'home',
    routes: {
      en: '/en/',
      ar: '/',
    },
    seo: {
      en: {
        title: 'Art Ratio | Visual Production, Photography & Equipment Rental',
        description:
          'Art Ratio brings together production, photography, and equipment rental for brands, campaigns, events, and visual stories that need craft and clarity.',
      },
      ar: {
        title: 'آرت ريشيو | إنتاج بصري وتصوير وتأجير معدات',
        description:
          'في آرت ريشيو نجمع بين الإنتاج البصري، والتصوير، وتأجير المعدات لصناعة أعمال تُنفّذ بحرفية وتُقدَّم بوضوح.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [
      {
        key: 'side_header_heading',
        selector: '.cs-side_header_heading',
        type: 'html',
        values: {
          en: 'Got a project in mind? <br>We’re ready to bring it to life.',
          ar: 'عندك مشروع في بالك؟ <br>جاهزين نحوله إلى واقع.',
        },
      },
      {
        key: 'side_header_contact_title',
        selector: '.cs-side_header_box .cs-side_header_title.cs-primary_color',
        index: 0,
        type: 'text',
        values: {
          en: 'Contact Us',
          ar: 'تواصل معنا',
        },
      },
      {
        key: 'home_hero_title',
        selector: '.cs-hero_title.cs-hero_title--home-intro',
        type: 'html',
        values: {
          en: 'Creativity In <br>Our Blood Line',
          ar: 'الإبداع <br>يجري فينا',
        },
      },
      {
        key: 'home_cta',
        selector: '[data-i18n-key="home_cta"]',
        type: 'text',
        values: {
          en: 'Get a Quote',
          ar: 'اطلب عرض سعر',
        },
      },
      {
        key: 'home_hero_subtitle',
        selector: '[data-i18n-key="home_hero_subtitle"]',
        type: 'text',
        values: {
          en: 'We turn your concepts into visual masterpieces, crafting every project with a unique blend of artistry and innovation that brings your vision to life.',
          ar: 'نحوّل أفكارك إلى أعمال بصرية متقنة، ونصنع كل مشروع بمزيج من الحس الإبداعي والابتكار ليظهر رؤيتك بالشكل الذي تستحقه.',
        },
      },
      {
        key: 'home_follow_us',
        selector: '.cs-hero_social_title',
        type: 'text',
        values: {
          en: 'Follow Us',
          ar: 'تابعنا',
        },
      },
      {
        key: 'home_service_subtitle',
        selector: '[data-i18n-key="home_service_subtitle"]',
        type: 'text',
        values: {
          en: 'What We Offer',
          ar: 'ما الذي نقدمه',
        },
      },
      {
        key: 'home_service_title',
        selector: '[data-i18n-key="home_service_title"]',
        type: 'text',
        values: {
          en: 'Explore Our Services',
          ar: 'استكشف خدماتنا',
        },
      },
      {
        key: 'home_general_text_1',
        selector: '[data-i18n-key="home_general_text_1"]',
        type: 'html',
        values: {
          en: 'A visual journey of creativity and precision… <br>this is how we see the world of advertising',
          ar: 'رحلة بصرية تنسج الإبداع بالدقة، <br>وبهذه الروح نرى عالم الإعلان.',
        },
      },
      {
        key: 'home_general_text_2',
        selector: '[data-i18n-key="home_general_text_2"]',
        type: 'text',
        values: {
          en: 'Moments captured with passion… turning every event into a story worth telling',
          ar: 'نلتقط اللحظات بشغف، ونحوّل كل فعالية إلى حكاية تستحق أن تُروى.',
        },
      },
      {
        key: 'home_general_text_3',
        selector: '[data-i18n-key="home_general_text_3"]',
        type: 'text',
        values: {
          en: 'Fast, impactful, and attention-grabbing… this is how we craft your social media moment',
          ar: 'محتوى سريع ومؤثر يلفت الانتباه، وبهذا الإيقاع نصنع حضورك على السوشال ميديا.',
        },
      },
    ],
  },
  'about.html': {
    pageId: 'about',
    routes: {
      en: '/en/about/',
      ar: '/من-نحن/',
    },
    seo: {
      en: {
        title: 'About Art Ratio | A Saudi-Based Production House',
        description:
          'Art Ratio is a Saudi-based production house shaped by cinematic craft, commercial clarity, and a close reading of the market it creates for.',
      },
      ar: {
        title: 'من نحن | آرت ريشيو',
        description:
          'آرت ريشيو بيت إنتاج بصري ينطلق من السعودية، ويشتغل بحس سينمائي وفهم قريب من السوق الذي يصنع له.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [
      {
        key: 'side_header_heading',
        selector: '.cs-side_header_heading',
        type: 'html',
        values: {
          en: 'Got a project in mind? <br>We’re ready to bring it to life.',
          ar: 'عندك مشروع في بالك؟ <br>جاهزين نحوله إلى واقع.',
        },
      },
      {
        key: 'side_header_contact_title',
        selector: '.cs-side_header_box .cs-side_header_title.cs-primary_color',
        index: 0,
        type: 'text',
        values: {
          en: 'Contact Us',
          ar: 'تواصل معنا',
        },
      },
      {
        key: 'about_hero_title',
        selector: '[data-i18n-key="about_hero_title"]',
        type: 'text',
        values: {
          en: 'About Us',
          ar: 'من نحن',
        },
      },
      {
        key: 'about_intro_subtitle',
        selector: '[data-i18n-key="about_intro_subtitle"]',
        type: 'text',
        values: {
          en: 'About Art Ratio',
          ar: 'عن آرت ريشيو',
        },
      },
      {
        key: 'about_intro_title',
        selector: '[data-i18n-key="about_intro_title"]',
        type: 'text',
        values: {
          en: 'Cinematic artistry shaped by precision, passion, and purpose.',
          ar: 'حسّ سينمائي تصوغه الدقة، والشغف، والغاية.',
        },
      },
      {
        key: 'about_intro_p1',
        selector: '[data-i18n-key="about_intro_p1"]',
        type: 'text',
        values: {
          en: 'We are ART RATIO, and we are a motion picture & commercial production company.',
          ar: 'نحن آرت ريشيو، بيت إنتاج يجمع بين الصورة المتحركة والعمل التجاري برؤية واحدة.',
        },
      },
      {
        key: 'about_intro_p2',
        selector: '[data-i18n-key="about_intro_p2"]',
        type: 'text',
        values: {
          en: 'We take concepts and turn them into impactful visual content that connects with people, backed by state-of-the-art technology and a highly-skilled team of creatives.',
          ar: 'نأخذ الفكرة ونحوّلها إلى محتوى بصري مؤثر يتصل بالناس، مستندين إلى أدوات حديثة وفريق إبداعي عالي الكفاءة.',
        },
      },
      {
        key: 'about_local_market_note',
        selector: '[data-i18n-key="about_local_market_note"]',
        type: 'text',
        values: {
          en: 'From the heart of Saudi Arabia, we shape each project with a close feel for the market, the audience, and the pace it needs.',
          ar: 'ومن قلب المملكة العربية السعودية، نتعامل مع كل مشروع بفهم قريب للسوق والجمهور والإيقاع الذي يحتاجه.',
        },
      },
      {
        key: 'funfacts_title',
        selector: '[data-i18n-key="funfacts_title"]',
        type: 'text',
        values: {
          en: 'Our fun fact',
          ar: 'أرقام من رحلتنا',
        },
      },
      {
        key: 'funfacts_body',
        selector: '[data-i18n-key="funfacts_body"]',
        type: 'html',
        values: {
          en: 'Our work blends creativity and craftsmanship, shaped by years of collaboration with clients who trust our vision.<br>These numbers offer a glimpse into our journey.',
          ar: 'يمتزج في عملنا الحس الإبداعي بالحرفة، عبر سنوات من الشراكات مع عملاء وثقوا برؤيتنا.<br>وهذه الأرقام تعطي لمحة عن الرحلة.',
        },
      },
    ],
  },
  'contact.html': {
    pageId: 'contact',
    routes: {
      en: '/en/contact/',
      ar: '/تواصل-معنا/',
    },
    seo: {
      en: {
        title: 'Contact Art Ratio',
        description:
          'Tell us what you’re building. Art Ratio works across commercials, events, photography, equipment, and visual content with a process built around clarity and execution.',
      },
      ar: {
        title: 'تواصل مع آرت ريشيو',
        description:
          'إذا عندك مشروع قيد التشكّل، حدّثنا عنه. نعمل على الإعلانات، والتغطيات، والتصوير، وتأجير المعدات، بتنفيذ واضح من أول خطوة.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'service.html': {
    pageId: 'service',
    routes: {
      en: '/en/service/',
      ar: '/خدماتنا/',
    },
    seo: {
      en: {
        title: 'Services | Art Ratio',
        description:
          'Explore Art Ratio’s work across TV & Commercial Ads, Events & Coverage, Social Media Visuals, Commercial Photography, Equipment Rental, and Production Consultancy.',
      },
      ar: {
        title: 'الخدمات | آرت ريشيو',
        description:
          'استكشف خدمات آرت ريشيو عبر الإعلانات التلفزيونية والتجارية، وتغطية الفعاليات، ومحتوى السوشال ميديا، والتصوير التجاري، وتأجير المعدات، والاستشارات الإنتاجية.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'portfolio.html': {
    pageId: 'portfolio',
    routes: {
      en: '/en/portfolio/',
      ar: '/أعمالنا/',
    },
    seo: {
      en: {
        title: 'Portfolio | Art Ratio',
        description:
          'A selection of Art Ratio work across campaigns, events, films, photography, and visual pieces shaped with craft, pace, and presence.',
      },
      ar: {
        title: 'أعمالنا | آرت ريشيو',
        description:
          'مجموعة من أعمال آرت ريشيو عبر الحملات، والفعاليات، والأفلام، والتصوير، وقطع بصرية صيغت بحرفة وإيقاع وحضور.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'blog.html': {
    pageId: 'blog',
    routes: {
      en: '/en/blog/',
      ar: '/كشكولنا/',
    },
    seo: {
      en: {
        title: 'Blog | Art Ratio',
        description:
          'Notes, behind-the-scenes thinking, and practical reads from the Art Ratio process across production, events, photography, and visual craft.',
      },
      ar: {
        title: 'المدونة | آرت ريشيو',
        description:
          'ملاحظات وقراءات عملية وكواليس من تجربة آرت ريشيو في الإنتاج، والفعاليات، والتصوير، وصناعة التفاصيل البصرية.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'photography-agency.html': {
    pageId: 'photo-gallery',
    routes: {
      en: '/en/photography-agency/',
      ar: '/معرض-الصور/',
    },
    seo: {
      en: {
        title: 'Photo Gallery | Art Ratio',
        description:
          'Browse selected photography from Art Ratio across commercial work, e-commerce, events, and social-first visual content.',
      },
      ar: {
        title: 'معرض الصور | آرت ريشيو',
        description:
          'استكشف مجموعة مختارة من أعمال التصوير لدى آرت ريشيو عبر الأعمال التجارية، والتجارة الإلكترونية، والفعاليات، والمحتوى البصري المخصص للنشر.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'team.html': {
    pageId: 'team',
    routes: {
      en: '/en/team/',
      ar: '/فريقنا/',
    },
    seo: {
      en: {
        title: 'Team | Art Ratio',
        description:
          'Meet the Art Ratio team behind the production, photography, lighting, and direction work shaping each project.',
      },
      ar: {
        title: 'فريقنا | آرت ريشيو',
        description:
          'تعرّف على فريق آرت ريشيو خلف أعمال الإنتاج، والتصوير، والإضاءة، والإخراج التي تصوغ كل مشروع.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'faq.html': {
    pageId: 'faq',
    routes: {
      en: '/en/faq/',
      ar: '/الأسئلة-الشائعة/',
    },
    seo: {
      en: {
        title: 'FAQ | Art Ratio',
        description:
          'Find answers about Art Ratio services, production workflow, equipment, booking expectations, and how projects move from brief to delivery.',
      },
      ar: {
        title: 'الأسئلة الشائعة | آرت ريشيو',
        description:
          'اعثر على إجابات حول خدمات آرت ريشيو، وآلية العمل، والمعدات، ومتطلبات الحجز، وكيف ينتقل المشروع من الفكرة إلى التسليم.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'shop.html': {
    pageId: 'shop',
    routes: {
      en: '/en/shop/',
      ar: '/معداتنا/',
    },
    seo: {
      en: {
        title: 'Equipment List | Art Ratio',
        description:
          'Browse the Art Ratio equipment list for production-ready gear, tools, and supporting items available across the current public rental surface.',
      },
      ar: {
        title: 'معداتنا | آرت ريشيو',
        description:
          'تصفح قائمة معدات آرت ريشيو وما يتبعها من أدوات وتجهيزات مخصصة لسطح التأجير العام الحالي.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'shop-product-details.html': {
    pageId: 'shop-product-details',
    routes: {
      en: '/en/shop-product-details/',
      ar: '/تفاصيل-معدة/',
    },
    seo: {
      en: {
        title: 'Equipment Details | Art Ratio',
        description:
          'View the current public equipment detail page on Art Ratio to review item presentation, pricing context, and supporting rental information.',
      },
      ar: {
        title: 'تفاصيل المعدة | آرت ريشيو',
        description:
          'استعرض صفحة تفاصيل المعدة العامة في آرت ريشيو لمراجعة عرض العنصر وسياق التسعير ومعلومات التأجير المساندة.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'service-details-tv-commercial-ads.html': {
    pageId: 'service-tv-details',
    routes: {
      en: '/en/service-details-tv-commercial-ads/',
      ar: '/خدمة-إعلانات-التلفزيون-والإعلانات-التجارية/',
    },
    seo: {
      en: {
        title: 'TV & Commercial Ads | Art Ratio',
        description:
          'From the first idea to the final second on screen, Art Ratio develops commercials with clear direction, cinematic craft, and commercial intent.',
      },
      ar: {
        title: 'إعلانات التلفزيون والإعلانات التجارية | آرت ريشيو',
        description:
          'من أول فكرة إلى آخر ثانية على الشاشة، تطوّر آرت ريشيو الإعلان بصياغة واضحة وتنفيذ بصري يحمل أثره.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'service-details-events-coverage.html': {
    pageId: 'service-events-details',
    routes: {
      en: '/en/service-details-events-coverage/',
      ar: '/خدمة-تغطية-الفعاليات/',
    },
    seo: {
      en: {
        title: 'Events & Coverage | Art Ratio',
        description:
          'Art Ratio covers events with a production eye that keeps the energy, detail, and story intact across film, photography, and social-ready moments.',
      },
      ar: {
        title: 'تغطية الفعاليات | آرت ريشيو',
        description:
          'نغطي الفعاليات بعين إنتاجية تحفظ الإيقاع، والتفاصيل، والقصة عبر الفيلم، والصورة، واللحظة الجاهزة للنشر.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'service-details-social-media-content.html': {
    pageId: 'service-social-details',
    routes: {
      en: '/en/service-details-social-media-content/',
      ar: '/خدمة-محتوى-السوشال-ميديا/',
    },
    seo: {
      en: {
        title: 'Social Media Visuals | Art Ratio',
        description:
          'Art Ratio creates social media visuals with a production eye, helping brands show up with clarity, pace, and a visual language that holds attention.',
      },
      ar: {
        title: 'محتوى السوشال ميديا | آرت ريشيو',
        description:
          'تصنع آرت ريشيو محتوى بصريًا للسوشال ميديا بعين إنتاجية، يساعد العلامات على الظهور بوضوح وبإيقاع يحفظ الانتباه.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'service-details-photography.html': {
    pageId: 'service-photography-details',
    routes: {
      en: '/en/service-details-photography/',
      ar: '/خدمة-التصوير-التجاري/',
    },
    seo: {
      en: {
        title: 'Commercial Photography | Art Ratio',
        description:
          'Art Ratio creates commercial photography for products, menus, portraits, campaigns, and visual assets that need polish without losing character.',
      },
      ar: {
        title: 'التصوير التجاري | آرت ريشيو',
        description:
          'تصنع آرت ريشيو صورًا تجارية للمنتجات، والقوائم، والبورتريه، والحملات، بصور متقنة تحفظ شخصية العمل.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'service-details-equipment-rental.html': {
    pageId: 'service-rental-details',
    routes: {
      en: '/en/service-details-equipment-rental/',
      ar: '/خدمة-تأجير-المعدات/',
    },
    seo: {
      en: {
        title: 'Equipment Rental | Art Ratio',
        description:
          'Art Ratio provides production equipment rental with practical support for teams that need reliable gear, smooth prep, and a setup built for the job.',
      },
      ar: {
        title: 'تأجير المعدات | آرت ريشيو',
        description:
          'توفر آرت ريشيو تأجير معدات إنتاج بدعم عملي وتجهيزات موثوقة لفِرق تحتاج سير عمل واضحًا وجاهزية حقيقية.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
  'service-details-consultancy.html': {
    pageId: 'service-consultancy-details',
    routes: {
      en: '/en/service-details-consultancy/',
      ar: '/خدمة-الاستشارات-الإنتاجية/',
    },
    seo: {
      en: {
        title: 'Production Consultancy | Art Ratio',
        description:
          'Art Ratio offers production consultancy shaped by practical experience, helping teams plan clearly, make better decisions, and move into execution with confidence.',
      },
      ar: {
        title: 'الاستشارات الإنتاجية | آرت ريشيو',
        description:
          'تقدم آرت ريشيو استشارات إنتاجية مبنية على خبرة عملية، تساعد الفرق على التخطيط الواضح واتخاذ قرارات أفضل قبل التنفيذ.',
      },
    },
    document: {
      en: { lang: 'en', dir: 'ltr' },
      ar: { lang: 'ar', dir: 'rtl' },
    },
    body: [],
  },
});

export const getPageLocaleConfig = (file) => PUBLIC_PAGE_LOCALES[file] || null;
