(() => {
  const STORAGE_KEY = 'arinoLang';
  const CART_KEY = 'equipmentCart';
  const keyedTranslations = {
    checkout_heading: { en: 'Checkout', ar: 'الدفع' },
    checkout_coupon: {
      type: 'html',
      en: 'Have a coupon? <a href=\"\">Click here to enter your code</a>',
      ar: 'لديك كوبون خصم؟ <a href=\"\">اضغط هنا لإدخال الرمز</a>',
    },
    checkout_billing_title: { en: 'Billing Details', ar: 'بيانات الفاتورة' },
    checkout_first_name: { en: 'First Name *', ar: 'الاسم الأول *' },
    checkout_last_name: { en: 'Last Name *', ar: 'اسم العائلة *' },
    checkout_company: { en: 'Company name (optional)', ar: 'اسم الشركة (اختياري)' },
    checkout_country: { en: 'Country / Region *', ar: 'البلد / المنطقة *' },
    country_us: { en: 'United States (US)', ar: 'الولايات المتحدة' },
    country_uk: { en: 'United Kingdom', ar: 'المملكة المتحدة' },
    country_ca: { en: 'Kanada', ar: 'كندا' },
    checkout_street: { en: 'Street address *', ar: 'العنوان التفصيلي *' },
    checkout_city: { en: 'Town / City *', ar: 'المدينة *' },
    checkout_state: { en: 'State *', ar: 'الولاية / المنطقة *' },
    state_ca: { en: 'California', ar: 'كاليفورنيا' },
    state_nj: { en: 'New Gercy', ar: 'نيوجيرسي' },
    state_daiking: { en: 'Daiking', ar: 'دايكينج' },
    checkout_zip: { en: 'ZIP Code *', ar: 'الرمز البريدي *' },
    checkout_phone: { en: 'Phone *', ar: 'رقم الجوال *' },
    checkout_email: { en: 'Email address *', ar: 'البريد الإلكتروني *' },
    checkout_additional_title: { en: 'Additional information', ar: 'معلومات إضافية' },
    checkout_notes: { en: 'Order notes (optional)', ar: 'ملاحظات الطلب (اختياري)' },
    checkout_order_title: { en: 'Your order', ar: 'طلبك' },
    checkout_products: { en: 'Products', ar: 'المنتجات' },
    checkout_amount: { en: 'Amount', ar: 'الإجمالي' },
    checkout_subtotal: { en: 'Subtotal', ar: 'المجموع الفرعي' },
    checkout_total: { en: 'Total', ar: 'الإجمالي' },
    checkout_proceed: { en: 'Procced To Checkout', ar: 'متابعة الدفع' },
    checkout_payment: { en: 'Payment', ar: 'الدفع' },
    checkout_cod: { en: 'Cash on delivery', ar: 'الدفع عند الاستلام' },
    checkout_cod_desc: { en: 'Pay with cash upon delivery.', ar: 'ادفع نقداً عند الاستلام.' },
    checkout_privacy_text: {
      type: 'html',
      en: 'Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="">privacy policy</a>.',
      ar: 'سيتم استخدام بياناتك الشخصية لمعالجة طلبك ودعم تجربتك عبر هذا الموقع ولأغراض أخرى موضحة في <a href="">سياسة الخصوصية</a>.',
    },
    checkout_place_order: { en: 'Place Order', ar: 'تأكيد الطلب' },
    placeholder_street_line1: {
      en: 'House number and street name',
      ar: 'رقم المنزل واسم الشارع',
    },
    placeholder_street_line2: {
      en: 'Apartment, suite, unit, etc (optional) ',
      ar: 'شقة أو وحدة أو مبنى (اختياري)',
    },
    home_general_text_1: {
      type: 'html',
      en: 'A visual journey of creativity and precision… <br>this is how we see the world of advertising',
      ar: 'رحلة بصرية تنسج الإبداع بالدقة، وبكده نصنع عالم الإعلان بطريقتنا',
    },
    home_general_text_2: {
      en: 'Moments captured with passion… turning every event into a story worth telling',
      ar: 'نلتقط اللحظات بشغف، ونحوّل كل فعالية إلى حكاية تستحق تنقال.',
    },
    home_general_text_3: {
      en: 'Fast, impactful, and attention-grabbing… this is how we craft your social media moment',
      ar: 'محتوى سريع ومؤثر يلفت الانتباه، بهذي الروح نصنع حضورك على السوشال ميديا.',
    },
    home_service_subtitle: { en: 'What We Offer', ar: 'ايش نقدم' },
    home_service_title: { en: 'Explore Our Services', ar: 'استكشف خدماتنا' },
    home_cta: { en: 'Get a Quote', ar: 'اطلب عرض سعر' },
    nav_home: { en: 'Home', ar: 'الرئيسية' },
    nav_about: { en: 'About', ar: 'من نحن' },
    nav_services: { en: 'Services', ar: 'خدماتنا' },
    nav_portfolio: { en: 'Portfolio', ar: 'أعمالنا' },
    nav_gallery: { en: 'Photo Gallery', ar: 'معرض الصور' },
    nav_blog: { en: 'Blog', ar: 'كشكولنا' },
    home_page_title: { en: 'Art Ratio - Home', ar: 'آرت ريشيو - الرئيسية' },
    about_page_title: { en: 'Art Ratio - About', ar: 'آرت ريشيو - من نحن' },
    services_page_title: { en: 'Art Ratio - Services', ar: 'آرت ريشيو - خدماتنا' },
    service_consultancy_page_title: {
      en: 'Art Ratio - Service: Production Consultancy',
      ar: 'آرت ريشو - خدمة: الاستشارات الإنتاجية',
    },
    service_photography_page_title: {
      en: 'Art Ratio - Service: Commercial Photography',
      ar: 'آرت ريشو - خدمة: التصوير التجاري',
    },
    service_events_page_title: {
      en: 'Art Ratio - Service: Events Coverage',
      ar: 'آرت ريشو - خدمة: تغطية الفعاليات',
    },
    service_social_page_title: {
      en: 'Art Ratio - Service: Social Media Content',
      ar: 'آرت ريشو - خدمة: محتوى السوشال ميديا',
    },
    service_tv_page_title: {
      en: 'Art Ratio - Service: TV & Commercial Ads',
      ar: 'آرت ريشو - خدمة: إعلانات التلفزيون والإعلانات التجارية',
    },
    service_rental_page_title: {
      en: 'Art Ratio - Service: Equipment Rental',
      ar: 'آرت ريشو - خدمة: تأجير المعدات',
    },
    portfolio_page_title: { en: 'Art Ratio - Portfolio', ar: 'آرت ريشيو - أعمالنا' },
    portfolio_airport_lounge_page_title: {
      en: 'Art Ratio - Project: Airport Executive Lounge',
      ar: 'آرت ريشو - مشروع: صالة كبار الشخصيات في المطار',
    },
    portfolio_golf_tournament_page_title: {
      en: 'Art Ratio - Project: Golf Tournament',
      ar: 'آرت ريشو - مشروع: بطولة الجولف',
    },
    portfolio_saudi_dent_page_title: {
      en: 'Art Ratio - Project: Saudi Dent',
      ar: 'آرت ريشو - مشروع: سعودي دنت',
    },
    blog_page_title: { en: 'Art Ratio - Blog', ar: 'آرت ريشيو - كشكولنا' },
    team_page_title: { en: 'Art Ratio - Team', ar: 'آرت ريشيو - فريقنا' },
    contact_page_title: { en: 'Art Ratio - Contact', ar: 'آرت ريشيو - تواصل معنا' },
    feedback_page_title: { en: 'Art Ratio - Feedback', ar: 'آرت ريشيو - آراء العملاء' },
    faq_page_title: { en: 'Art Ratio - FAQ', ar: 'آرت ريشيو - الأسئلة الشائعة' },
    shop_page_title: { en: 'Art Ratio - Equipment List', ar: 'آرت ريشيو - معداتنا' },
    shop_cart_page_title: { en: 'Art Ratio - Equipment Cart', ar: 'آرت ريشيو - سلة المعدات' },
    shop_checkout_page_title: { en: 'Art Ratio - Equipment Checkout', ar: 'آرت ريشيو - طلب المعدات' },
    shop_product_details_page_title: {
      en: 'Art Ratio - Equipment Details',
      ar: 'آرت ريشيو - تفاصيل معدة',
    },
    shop_wishlist_page_title: { en: 'Art Ratio - Wishlist', ar: 'آرت ريشيو - المفضلة' },
    shop_order_received_page_title: {
      en: 'Art Ratio - Order Confirmation',
      ar: 'آرت ريشيو - تأكيد الطلب',
    },
    gallery_breadcrumb: { en: 'Photo Gallery', ar: 'معرض الصور' },
    photo_gallery_page_title: { en: 'Photo Gallery', ar: 'معرض الصور' },
    privacy_page_title: { en: 'Privacy Policy | Art Ratio', ar: 'سياسة الخصوصية | آرت ريشيو' },
    privacy_breadcrumb: { en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    terms_page_title: { en: 'Terms of Use | Art Ratio', ar: 'شروط الاستخدام | آرت ريشيو' },
    terms_breadcrumb: { en: 'Terms of Use', ar: 'شروط الاستخدام' },
    privacy_intro_full: {
      ar: 'توضح سياسة الخصوصية هذه كيفية قيام شركة فوود أرت للدعاية والإعلان، العاملة تحت العلامة التجارية المسجلة آرت ريشو («آرت ريشو» أو «نحن»)، بجمع البيانات الشخصية واستخدامها ومعالجتها وتخزينها والإفصاح عنها وحمايتها عند استخدامك لموقعنا الإلكتروني أو تواصلك معنا أو طلبك لخدماتنا أو تفاعلك معنا فيما يتعلق بأعمالنا الإبداعية والإنتاجية والإعلانية والتشغيلية.',
    },
    terms_intro_full_1: {
      ar: 'تحكم شروط الاستخدام هذه («الشروط») الوصول إلى واستخدام الموقع الإلكتروني الذي تديره شركة فوود أرت للدعاية والإعلان، العاملة تحت العلامة التجارية المسجلة آرت ريشو («آرت ريشو» أو «نحن»).',
    },
    terms_intro_full_2: {
      ar: 'باستخدامك لهذا الموقع أو الوصول إليه، فإنك توافق على الالتزام بهذه الشروط وبسياسة الخصوصية الخاصة بنا. إذا لم توافق على هذه الشروط، فيجب عليك التوقف عن استخدام الموقع.',
    },
    privacy_toc_html: {
      type: 'html',
      ar: `<h2>في هذه الصفحة</h2>
        <a href="#scope">1. النطاق</a>
        <a href="#personal-data">2. البيانات الشخصية التي نجمعها</a>
        <a href="#purposes">3. أغراض المعالجة</a>
        <a href="#legal-basis">4. الأساس القانوني للمعالجة</a>
        <a href="#sources">5. مصادر البيانات الشخصية</a>
        <a href="#sharing">6. المشاركة والإفصاح</a>
        <a href="#transfers">7. نقل البيانات دوليًا</a>
        <a href="#cookies">8. ملفات تعريف الارتباط والتحليلات</a>
        <a href="#retention">9. الاحتفاظ بالبيانات</a>
        <a href="#security">10. أمن البيانات</a>
        <a href="#rights">11. حقوقك</a>
        <a href="#marketing">12. الاتصالات التسويقية</a>
        <a href="#children">13. الأطفال والقُصّر</a>
        <a href="#third-party">14. روابط وخدمات الأطراف الثالثة</a>
        <a href="#changes">15. التغييرات على سياسة الخصوصية</a>
        <a href="#contact">16. تواصل معنا</a>`,
    },
    privacy_content_html: {
      type: 'html',
      ar: `<section id="scope" class="legal-card">
          <h2>1. النطاق</h2>
          <p>تنطبق سياسة الخصوصية هذه على البيانات الشخصية التي يتم جمعها من خلال:</p>
          <ul>
            <li>موقعنا الإلكتروني؛</li>
            <li>نماذج التواصل والاستفسار ونماذج الحجز أو طلب الخدمة؛</li>
            <li>البريد الإلكتروني، الهاتف، واتساب، وقنوات التواصل المهنية الأخرى؛</li>
            <li>الاجتماعات، العروض، عروض الأسعار، العقود، الفواتير، ومراحل تنفيذ المشاريع؛ و</li>
            <li>أي تفاعلات أخرى مرتبطة بخدماتنا أو أنشطتنا التجارية.</li>
          </ul>
          <p>تهدف سياسة الخصوصية هذه إلى التطبيق بما يتوافق مع الأنظمة واللوائح المعمول بها في المملكة العربية السعودية، بما في ذلك نظام حماية البيانات الشخصية (PDPL) ولائحته التنفيذية، بالقدر المنطبق على أنشطتنا.</p>
        </section>

        <section id="personal-data" class="legal-card">
          <h2>2. البيانات الشخصية التي نجمعها</h2>
          <p>بحسب طبيعة تفاعلك معنا ونوع الخدمة المطلوبة، قد نجمع ونعالج الفئات التالية من البيانات الشخصية:</p>
          <p><strong>2.1 بيانات الهوية والتواصل</strong></p>
          <p>وقد تشمل:</p>
          <ul>
            <li>الاسم الكامل؛</li>
            <li>اسم الشركة أو الجهة؛</li>
            <li>البريد الإلكتروني؛</li>
            <li>رقم الهاتف؛</li>
            <li>المسمى الوظيفي أو المنصب؛ و</li>
            <li>المدينة أو بيانات تواصل تجارية ذات صلة.</li>
          </ul>
          <p><strong>2.2 بيانات المشروع والخدمة</strong></p>
          <p>وقد تشمل:</p>
          <ul>
            <li>تفاصيل الاستفسار؛</li>
            <li>نوع الخدمة المطلوبة؛</li>
            <li>متطلبات الإنتاج أو التصوير أو الإعلان أو تغطية الفعاليات؛</li>
            <li>تفضيلات الجدولة والجداول الزمنية؛</li>
            <li>تفاصيل الموقع؛</li>
            <li>مراجع المشروع، الملخصات الإبداعية، الملاحظات، الملفات، والمرفقات؛ و</li>
            <li>أي معلومات أخرى تقدمها طوعًا فيما يتعلق بالطلب أو المشروع.</li>
          </ul>
          <p><strong>2.3 البيانات التعاقدية والمالية</strong></p>
          <p>عند الحاجة، قد نجمع معلومات لازمة لـ:</p>
          <ul>
            <li>إعداد عروض الأسعار والمقترحات؛</li>
            <li>إصدار الاتفاقيات والفواتير؛</li>
            <li>معالجة المدفوعات أو متابعتها؛ و</li>
            <li>الاحتفاظ بالسجلات التجارية والمحاسبية المرتبطة.</li>
          </ul>
          <p><strong>2.4 البيانات التقنية وبيانات الاستخدام</strong></p>
          <p>عند استخدامك الموقع، قد نجمع معلومات تقنية مثل:</p>
          <ul>
            <li>عنوان IP؛</li>
            <li>نوع المتصفح وإصداره؛</li>
            <li>نوع الجهاز؛</li>
            <li>نظام التشغيل؛</li>
            <li>الصفحات التي تمت زيارتها؛</li>
            <li>أوقات الزيارة ومدتها؛</li>
            <li>الموقع أو المصدر المُحيل؛ و</li>
            <li>بيانات مرتبطة بملفات تعريف الارتباط أو التحليلات.</li>
          </ul>
          <p><strong>2.5 معلومات أخرى تقدمها طوعًا</strong></p>
          <p>إذا اخترت إرسال معلومات إضافية لنا، بما في ذلك عبر النماذج أو البريد الإلكتروني أو الملخصات أو وثائق المشروع، فقد نقوم بمعالجة تلك المعلومات بالقدر اللازم للغرض ذي الصلة.</p>
        </section>

        <section id="purposes" class="legal-card">
          <h2>3. أغراض المعالجة</h2>
          <p>قد نعالج البيانات الشخصية لأغراض تشغيلية وتجارية مشروعة، ومنها:</p>
          <ul>
            <li>الرد على الاستفسارات والطلبات والمراسلات؛</li>
            <li>إعداد عروض الأسعار والمقترحات والتسعير ومعلومات الخدمة؛</li>
            <li>إدارة وتنسيق وتقديم الخدمات الإبداعية والإنتاجية والإعلانية والإعلامية؛</li>
            <li>التواصل مع العملاء والموردين والمتعاقدين والمستقلين وأصحاب المصلحة بالمشاريع؛</li>
            <li>إعداد العقود والفواتير والسجلات ذات الصلة؛</li>
            <li>تحسين أداء الموقع ووظائفه وسهولة استخدامه وجودة التواصل؛</li>
            <li>الحفاظ على أمن الأنظمة والعمليات والموقع؛</li>
            <li>الامتثال للالتزامات القانونية والتنظيمية والضريبية والمحاسبية والمهنية؛ و</li>
            <li>إثبات الحقوق القانونية وممارستها والدفاع عنها وحماية المصالح التجارية المشروعة.</li>
          </ul>
        </section>

        <section id="legal-basis" class="legal-card">
          <h2>4. الأساس القانوني للمعالجة</h2>
          <p>عند الاقتضاء بموجب الأنظمة السارية، نعالج البيانات الشخصية استنادًا إلى واحد أو أكثر من الأسس القانونية التالية:</p>
          <ul>
            <li>موافقتك؛</li>
            <li>الحاجة لاتخاذ خطوات بناءً على طلبك قبل إبرام عقد؛</li>
            <li>تنفيذ عقد أو ترتيب خدمات؛</li>
            <li>الامتثال للالتزامات القانونية أو التنظيمية؛ و</li>
            <li>المصالح المشروعة حيث يسمح النظام بذلك ولا تتغلب عليها حقوقك.</li>
          </ul>
        </section>

        <section id="sources" class="legal-card">
          <h2>5. مصادر البيانات الشخصية</h2>
          <p>نقوم عادةً بجمع البيانات الشخصية منك مباشرة. وفي بعض الحالات قد نتلقى بيانات شخصية مرتبطة بالأعمال من:</p>
          <ul>
            <li>الشركة أو الجهة التي تمثلها؛</li>
            <li>ممثلين مفوضين من قبلك؛</li>
            <li>أطراف مشروع تعمل نيابة عنك؛</li>
            <li>مصادر عامة متاحة بصورة نظامية؛ أو</li>
            <li>مزودي خدمة أو منصات مستخدمة فيما يتعلق بالموقع أو تقديم الخدمة.</li>
          </ul>
        </section>

        <section id="sharing" class="legal-card">
          <h2>6. المشاركة والإفصاح</h2>
          <p>نحن لا نبيع البيانات الشخصية.</p>
          <p>قد نكشف أو نشارك البيانات الشخصية فقط عند الضرورة وبشكل مناسب ونظامي، بما في ذلك مع:</p>
          <ul>
            <li>مزودي استضافة الموقع، ومزودي خدمات تقنية المعلومات، ومنصات التواصل، ومزودي التحليلات؛</li>
            <li>المستشارين المهنيين، بما في ذلك القانونيين والمحاسبيين والإداريين أو مستشاري الامتثال؛</li>
            <li>الموردين وشركاء المشاريع والمتعاقدين والمستقلين أو المتعاونين المشاركين في تقديم الخدمات المطلوبة؛</li>
            <li>الجهات الحكومية أو التنظيمية أو القضائية أو جهات إنفاذ النظام المختصة إذا كان الإفصاح مطلوبًا بنظام أو لائحة أو طلب ملزم قانونيًا؛ و</li>
            <li>أطراف أخرى بموافقتك إذا كانت الموافقة مطلوبة.</li>
          </ul>
          <p>عند الاستعانة بمزودي خدمات أو معالجي بيانات من أطراف ثالثة، نسعى لضمان خضوعهم لالتزامات مناسبة تتعلق بالسرية والأمن وحماية البيانات.</p>
        </section>

        <section id="transfers" class="legal-card">
          <h2>7. نقل البيانات دوليًا</h2>
          <p>عندما يستلزم استخدام خدمات الاستضافة أو المنصات الرقمية أو الأدوات البرمجية أو الأنظمة السحابية أو مزودي الخدمات نقل البيانات الشخصية خارج المملكة العربية السعودية، فإننا نتخذ ذلك بما يتوافق مع المتطلبات النظامية والتنظيمية المعمول بها ونطبق الضمانات المناسبة عند الاقتضاء.</p>
        </section>

        <section id="cookies" class="legal-card">
          <h2>8. ملفات تعريف الارتباط والتحليلات</h2>
          <p>قد نستخدم ملفات تعريف الارتباط وتقنيات مشابهة من أجل:</p>
          <ul>
            <li>تشغيل الموقع ودعمه؛</li>
            <li>فهم أنماط الاستخدام وقياس أداء الموقع؛</li>
            <li>تحسين تجربة المستخدم ووظائف الموقع؛ و</li>
            <li>دعم أمن الموقع ووظائفه التقنية الأساسية.</li>
          </ul>
          <p>يمكنك إدارة أو تعطيل بعض ملفات تعريف الارتباط من خلال إعدادات المتصفح، إلا أن تعطيل بعضها قد يؤثر على أداء أو وظائف أجزاء من الموقع.</p>
        </section>

        <section id="retention" class="legal-card">
          <h2>9. الاحتفاظ بالبيانات</h2>
          <p>نحتفظ بالبيانات الشخصية فقط للمدة اللازمة لتحقيق الأغراض الموضحة في سياسة الخصوصية هذه، بما في ذلك:</p>
          <ul>
            <li>إدارة الاستفسارات وطلبات الخدمة؛</li>
            <li>الاحتفاظ بسجلات المشاريع والأعمال؛</li>
            <li>الامتثال للالتزامات القانونية والتنظيمية والمحاسبية والضريبية أو التعاقدية؛ و</li>
            <li>حماية حقوقنا القانونية ومصالحنا المشروعة في حال المطالبات أو النزاعات.</li>
          </ul>
          <p>عندما لا تعود البيانات الشخصية مطلوبة للغرض المعني ولا يوجد أساس نظامي للاحتفاظ بها، فإننا نسعى إلى حذفها أو إتلافها أو إخفاء هويتها بشكل آمن حسب الاقتضاء.</p>
        </section>

        <section id="security" class="legal-card">
          <h2>10. أمن البيانات</h2>
          <p>نطبق تدابير إدارية وتقنية وتنظيمية معقولة ومناسبة لحماية البيانات الشخصية من الوصول غير المصرح به أو الفقد أو سوء الاستخدام أو التعديل أو الإتلاف أو الإفصاح غير المشروع.</p>
          <p>وقد تشمل هذه التدابير، عند الاقتضاء:</p>
          <ul>
            <li>ضوابط الوصول؛</li>
            <li>تقييد الوصول الداخلي؛</li>
            <li>أنظمة آمنة وضمانات تقنية؛</li>
            <li>إجراءات إدارة الوثائق والسجلات؛ و</li>
            <li>ضوابط تشغيلية داخلية وضوابط سرية.</li>
          </ul>
          <p>ومع ذلك، لا يمكن ضمان الأمان الكامل لأي نظام أو وسيلة نقل عبر الإنترنت أو تخزين إلكتروني.</p>
        </section>

        <section id="rights" class="legal-card">
          <h2>11. حقوقك</h2>
          <p>وفقًا للأنظمة واللوائح المعمول بها في المملكة العربية السعودية، قد تكون لك حقوق معينة بشأن بياناتك الشخصية، ومنها الحق في:</p>
          <ul>
            <li>المعرفة بالأساس النظامي أو العملي لجمع بياناتك الشخصية والغرض من ذلك؛</li>
            <li>طلب الوصول إلى بياناتك الشخصية؛</li>
            <li>طلب نسخة من بياناتك الشخصية بصيغة واضحة وقابلة للقراءة حيثما ينطبق؛</li>
            <li>طلب تصحيح أو استكمال أو تحديث البيانات غير الدقيقة أو غير المكتملة؛ و</li>
            <li>طلب حذف أو إتلاف البيانات الشخصية حيث يسمح النظام بذلك.</li>
          </ul>
          <p>لتقديم طلب متعلق بالخصوصية، يرجى التواصل عبر:<br><a href="mailto:info@art-ratio.com">info@art-ratio.com</a></p>
          <p>قد نطلب معلومات لازمة للتحقق من هويتك قبل الاستجابة لطلبك.</p>
        </section>

        <section id="marketing" class="legal-card">
          <h2>12. الاتصالات التسويقية</h2>
          <p>قد نستخدم بيانات التواصل الخاصة بك للتواصل معك بخصوص:</p>
          <ul>
            <li>استفساراتك؛</li>
            <li>الخدمات المطلوبة؛</li>
            <li>عروض الأسعار والمقترحات؛</li>
            <li>تنسيق المشاريع؛ و</li>
            <li>مراسلات الأعمال ذات الصلة.</li>
          </ul>
          <p>إذا أرسلنا أي رسائل ترويجية أو تسويقية، فسيتم ذلك وفقًا للمتطلبات النظامية المعمول بها.</p>
        </section>

        <section id="children" class="legal-card">
          <h2>13. الأطفال والقُصّر</h2>
          <p>لا يستهدف موقعنا وخدماتنا الأطفال أو القُصّر بشكل يتعارض مع الأنظمة المعمول بها. ولا نجمع عمدًا بيانات شخصية للأطفال أو القُصّر دون أساس نظامي مناسب أو أي موافقة مطلوبة من ولي الأمر أو الوصي القانوني.</p>
          <p>إذا تبين لنا أنه تم جمع بيانات شخصية تخص طفلًا أو قاصرًا بشكل غير مناسب، فسنتخذ الإجراء المناسب وفقًا للمتطلبات النظامية المعمول بها.</p>
        </section>

        <section id="third-party" class="legal-card">
          <h2>14. روابط وخدمات الأطراف الثالثة</h2>
          <p>قد يحتوي موقعنا على روابط لمواقع أو أدوات أو منصات أو خدمات تابعة لأطراف ثالثة. نحن غير مسؤولين عن ممارسات الخصوصية أو الأمن أو المحتوى لدى تلك الجهات. ونشجع المستخدمين على مراجعة سياسات الخصوصية الخاصة بأي خدمات أو مواقع خارجية يتم الوصول إليها.</p>
        </section>

        <section id="changes" class="legal-card">
          <h2>15. التغييرات على سياسة الخصوصية</h2>
          <p>قد نقوم بتعديل أو تحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو خدماتنا أو المتطلبات النظامية أو احتياجاتنا التشغيلية. تصبح أي نسخة محدثة نافذة عند نشرها في هذه الصفحة، وقد يتم تحديث تاريخ السريان وفقًا لذلك.</p>
        </section>

        <section id="contact" class="legal-card">
          <h2>16. تواصل معنا</h2>
          <p>إذا كانت لديك أي أسئلة أو طلبات أو ملاحظات بخصوص سياسة الخصوصية هذه أو طريقة معالجتنا للبيانات الشخصية، يرجى التواصل مع:</p>
          <p><strong>شركة فوود أرت للدعاية والإعلان</strong><br>
          العاملة تحت العلامة التجارية المسجلة آرت ريشو<br>
          السجل التجاري: 7030880632<br>
          رقم رخصة الإعلام: 159460<br>
          البريد الإلكتروني: <a href="mailto:info@art-ratio.com">info@art-ratio.com</a><br>
          الهاتف: <a href="tel:+966567680152">+966 56 768 0152</a></p>
        </section>`,
    },
    terms_toc_html: {
      type: 'html',
      ar: `<h2>في هذه الصفحة</h2>
        <a href="#about">1. من نحن</a>
        <a href="#acceptance">2. قبول الشروط</a>
        <a href="#permitted">3. الاستخدام المسموح</a>
        <a href="#content">4. محتوى الموقع واستخدامه المعلوماتي</a>
        <a href="#service-requests">5. طلبات الخدمة وعدم إنشاء عقد تلقائيًا</a>
        <a href="#ip">6. حقوق الملكية الفكرية</a>
        <a href="#submissions">7. محتوى المستخدم</a>
        <a href="#privacy">8. الخصوصية والبيانات الشخصية</a>
        <a href="#third-party">9. روابط وأدوات الأطراف الثالثة</a>
        <a href="#availability">10. توفر الموقع</a>
        <a href="#disclaimer">11. إخلاء المسؤولية عن الضمانات</a>
        <a href="#liability">12. تحديد المسؤولية</a>
        <a href="#indemnity">13. التعويض</a>
        <a href="#suspension">14. تعليق أو تقييد الوصول</a>
        <a href="#law">15. القانون الحاكم والاختصاص القضائي</a>
        <a href="#changes">16. التغييرات على هذه الشروط</a>
        <a href="#severability">17. قابلية الفصل</a>
        <a href="#entire">18. كامل شروط الموقع</a>
        <a href="#contact">19. تواصل معنا</a>`,
    },
    terms_content_html: {
      type: 'html',
      ar: `<section id="about" class="legal-card">
          <h2>1. من نحن</h2>
          <p>هذا الموقع مملوك ومدار من قبل شركة فوود أرت للدعاية والإعلان، العاملة تحت العلامة التجارية المسجلة آرت ريشو، وهي منشأة قائمة في المملكة العربية السعودية.</p>
          <p>تقدم آرت ريشو خدمات إبداعية وإعلانية وإنتاجًا إعلاميًا وإنتاج محتوى وخدمات مهنية ذات صلة.</p>
        </section>
        <section id="acceptance" class="legal-card">
          <h2>2. قبول الشروط</h2>
          <p>يُعد وصولك إلى هذا الموقع واستخدامك له إقرارًا منك بأنك قرأت هذه الشروط وفهمتها ووافقت على الالتزام بها وبسياسة الخصوصية وبجميع الأنظمة واللوائح المعمول بها في المملكة العربية السعودية.</p>
          <p>إذا كنت تستخدم الموقع نيابةً عن شركة أو جهة أو كيان قانوني آخر، فإنك تقر بأن لديك الصلاحية لإلزام ذلك الكيان بهذه الشروط.</p>
        </section>
        <section id="permitted" class="legal-card">
          <h2>3. الاستخدام المسموح</h2>
          <p>يجوز لك استخدام هذا الموقع فقط للأغراض المشروعة وبما يتوافق مع هذه الشروط.</p>
          <p>وتوافق على أنك لن تقوم بما يلي:</p>
          <ul>
            <li>استخدام الموقع بما يخالف الأنظمة واللوائح المعمول بها؛</li>
            <li>استخدام الموقع لأغراض احتيالية أو ضارة أو مسيئة أو مضللة أو غير مشروعة؛</li>
            <li>محاولة الوصول غير المصرح به إلى الموقع أو الخوادم أو الحسابات أو النماذج أو الأنظمة ذات الصلة؛</li>
            <li>التدخل في تشغيل الموقع أو أمنه أو أدائه أو تعطيله؛</li>
            <li>تحميل أو إرسال أو نشر تعليمات برمجية خبيثة أو ملفات ضارة أو مواد تدميرية؛</li>
            <li>نسخ أو جمع أو استخراج أو إعادة نشر أو استغلال محتوى الموقع بما يتجاوز ما يسمح به النظام أو موافقتنا الخطية المسبقة؛</li>
            <li>انتحال شخصية أي فرد أو جهة أو تحريف علاقتك بأي جهة؛ أو</li>
            <li>استخدام الموقع بطريقة قد تضر أعمالنا أو أنظمتنا أو سمعتنا أو حقوقنا القانونية.</li>
          </ul>
        </section>
        <section id="content" class="legal-card">
          <h2>4. محتوى الموقع واستخدامه المعلوماتي</h2>
          <p>المحتوى المتاح على هذا الموقع مقدم لأغراض معلوماتية وترويجية وتواصل أعمال عامة فقط.</p>
          <p>ورغم سعينا للحفاظ على دقة المحتوى وحداثته وفائدته، فإننا لا نضمن أن جميع المعلومات على الموقع ستكون دائمًا كاملة أو دقيقة أو محدثة. وقد يتم تغيير المحتوى أو تحديثه أو حذفه أو تصحيحه في أي وقت دون إشعار.</p>
          <p>لا يُعد أي محتوى في هذا الموقع عرضًا ملزمًا أو مشورة قانونية أو فنية أو التزام خدمة مضمون ما لم يتم تأكيده صراحةً كتابيًا من قبلنا.</p>
        </section>
        <section id="service-requests" class="legal-card">
          <h2>5. طلبات الخدمة وعدم إنشاء عقد تلقائيًا</h2>
          <p>لا يؤدي إرسال استفسار أو نموذج طلب أو حجز أو نموذج تواصل أو بريد إلكتروني أو أي تواصل عبر الموقع بحد ذاته إلى إنشاء عقد ملزم بينك وبين آرت ريشو.</p>
          <p>أي مشروع أو حجز أو عرض أو تسعير أو ارتباط إنتاجي أو مخرجات أو جدول زمني أو ترتيبات أسعار أو علاقة تجارية يكون خاضعًا لتأكيد كتابي مستقل أو عرض سعر أو نطاق عمل أو اتفاقية أو فاتورة أو مستندات أعمال معتمدة بحسب الحالة.</p>
        </section>
        <section id="ip" class="legal-card">
          <h2>6. حقوق الملكية الفكرية</h2>
          <p>ما لم يُذكر خلاف ذلك، فإن جميع محتويات هذا الموقع، بما يشمل على سبيل المثال لا الحصر النصوص والشعارات والعلامات التجارية والعناصر البصرية والتصاميم والصور ومقاطع الفيديو والمواد القابلة للتنزيل وغيرها من المحتوى، مملوكة أو مرخصة أو مستخدمة بصورة نظامية من قبل شركة فوود أرت للدعاية والإعلان / آرت ريشو، ومحمية بموجب الأنظمة ذات الصلة.</p>
          <p>لا يجوز لك إعادة إنتاج أي جزء من محتوى الموقع أو توزيعه أو تعديله أو نشره أو عرضه أو إنشاء أعمال مشتقة منه أو استغلاله تجاريًا أو استخدامه بأي شكل آخر دون موافقتنا الخطية المسبقة، إلا فيما يسمح به النظام.</p>
          <p>تُعد آرت ريشو علامة مسجلة، ويُحظر الاستخدام غير المصرح به لاسم العلامة أو شعارها أو هويتها أو المواد المرتبطة بها.</p>
        </section>
        <section id="submissions" class="legal-card">
          <h2>7. محتوى المستخدم</h2>
          <p>إذا قمت بإرسال أي استفسار أو ملخص أو رسالة أو ملف أو وثيقة أو وسائط أو تعليق أو ملاحظات أو مادة مرجعية أو أي محتوى آخر عبر الموقع أو قنوات التواصل المشار إليها فيه، فإنك تقر بأن:</p>
          <ul>
            <li>لديك الحق في تقديم هذه المواد؛</li>
            <li>لا تنتهك مشاركتك حقوق أي طرف ثالث؛</li>
            <li>لا تتضمن مشاركتك أي مواد غير مشروعة أو تشهيرية أو ضارة أو مضللة؛ و</li>
            <li>لا تتضمن مشاركتك تعليمات برمجية خبيثة أو محتوى تقني ضار.</li>
          </ul>
          <p>تبقى مسؤولاً عن المحتوى الذي تقدمه. ويحق لنا رفض مراجعة أو قبول أو تخزين أو معالجة أو الرد على المشاركات غير المشروعة أو غير المكتملة أو غير الملائمة أو المسيئة أو غير الآمنة تقنيًا أو غير المناسبة تشغيليًا.</p>
        </section>
        <section id="privacy" class="legal-card">
          <h2>8. الخصوصية والبيانات الشخصية</h2>
          <p>قد يتضمن استخدامك للموقع جمع ومعالجة بيانات شخصية. وتخضع طريقة تعاملنا مع البيانات الشخصية لسياسة الخصوصية الخاصة بنا.</p>
          <p>في المملكة العربية السعودية، تخضع معالجة البيانات الشخصية لنظام حماية البيانات الشخصية وإطاره التنظيمي. وتؤكد SDAIA على الشفافية وإشعارات الخصوصية الواضحة كجزء أساسي من الامتثال.</p>
          <p>وباستخدامك الموقع أو تقديم بياناتك لنا، فإنك تقر بأن بياناتك الشخصية قد تُعالج وفقًا لسياسة الخصوصية والأنظمة المعمول بها.</p>
        </section>
        <section id="third-party" class="legal-card">
          <h2>9. روابط وأدوات الأطراف الثالثة</h2>
          <p>قد يتضمن هذا الموقع روابط لمواقع أو منصات أو إضافات أو خرائط أو مشغلات وسائط أو أدوات استضافة أو صفحات تواصل اجتماعي أو خدمات خارجية أخرى لتسهيل الاستخدام أو توفير وظائف إضافية.</p>
          <p>نحن لا نتحكم في محتوى أو توفر أو أمان أو ممارسات الخصوصية أو الشروط الخاصة بتلك الجهات الخارجية، ولسنا مسؤولين عنها. ويكون استخدامك لخدمات الطرف الثالث على مسؤوليتك الخاصة، ويجب عليك مراجعة شروطهم وسياسات الخصوصية لديهم قبل الاستخدام.</p>
        </section>
        <section id="availability" class="legal-card">
          <h2>10. توفر الموقع</h2>
          <p>لا نضمن أن الموقع أو أي جزء منه سيكون متاحًا دائمًا أو دون انقطاع أو آمنًا أو خاليًا من الأخطاء.</p>
          <p>يجوز لنا تعليق أو تقييد أو سحب أو إيقاف أو تعديل كل أو جزء من الموقع في أي وقت، بإشعار أو دون إشعار، لأسباب تجارية أو قانونية أو تشغيلية أو أمنية أو صيانة أو أسباب تقنية.</p>
        </section>
        <section id="disclaimer" class="legal-card">
          <h2>11. إخلاء المسؤولية عن الضمانات</h2>
          <p>إلى أقصى حد يسمح به النظام، يتم تقديم هذا الموقع ومحتواه على أساس «كما هو» و«حسب التوفر».</p>
          <p>لا نقدم أي ضمانات أو تعهدات صريحة أو ضمنية فيما يتعلق بـ:</p>
          <ul>
            <li>استمرارية توفر الموقع دون انقطاع؛</li>
            <li>دقة أو موثوقية أو اكتمال أو حداثة محتوى الموقع؛</li>
            <li>خلو الموقع من الأخطاء أو الفيروسات أو المكونات الضارة؛ أو</li>
            <li>ملاءمة الموقع لغرض معين.</li>
          </ul>
          <p>لا يوجد في هذه الشروط ما يستبعد أي حقوق لا يجوز نظامًا استبعادها.</p>
        </section>
        <section id="liability" class="legal-card">
          <h2>12. تحديد المسؤولية</h2>
          <p>إلى أقصى حد يسمح به النظام، لا تتحمل شركة فوود أرت للدعاية والإعلان / آرت ريشو أي مسؤولية عن أي خسائر أو أضرار مباشرة أو غير مباشرة أو تبعية أو خاصة أو نموذجية أو عقابية ناشئة عن أو مرتبطة بـ:</p>
          <ul>
            <li>الوصول إلى الموقع أو استخدامه؛</li>
            <li>عدم القدرة على الوصول إلى الموقع أو استخدامه؛</li>
            <li>الاعتماد على محتوى الموقع؛</li>
            <li>الأعطال التقنية أو الانقطاعات أو التأخيرات أو الحوادث الأمنية؛</li>
            <li>فقدان البيانات أو الأعمال أو السمعة أو الفرص؛ أو</li>
            <li>استخدام روابط أو منصات أو خدمات الطرف الثالث المشار إليها في الموقع.</li>
          </ul>
          <p>ولا يقصد بهذه الشروط استبعاد أي مسؤولية لا يجوز استبعادها وفق الأنظمة المعمول بها في المملكة العربية السعودية.</p>
        </section>
        <section id="indemnity" class="legal-card">
          <h2>13. التعويض</h2>
          <p>توافق على تعويض شركة فوود أرت للدعاية والإعلان العاملة تحت العلامة آرت ريشو، وإدارتها وموظفيها وشركاتها التابعة ومتعاقديها وممثليها، والدفاع عنهم وإبراء ذمتهم من أي مطالبات أو التزامات أو خسائر أو أضرار أو تكاليف أو مصروفات ناشئة عن أو مرتبطة بـ:</p>
          <ul>
            <li>إساءة استخدامك للموقع؛</li>
            <li>إخلالك بهذه الشروط؛</li>
            <li>مخالفتك للأنظمة المعمول بها؛ أو</li>
            <li>تعديك على حقوق أي طرف ثالث.</li>
          </ul>
        </section>
        <section id="suspension" class="legal-card">
          <h2>14. تعليق أو تقييد الوصول</h2>
          <p>نحتفظ بالحق، وفق تقديرنا الخاص ودون إشعار مسبق عند الاقتضاء، في تعليق أو تقييد أو إنهاء وصولك إلى الموقع إذا رأينا أن:</p>
          <ul>
            <li>قد خالفت هذه الشروط؛</li>
            <li>استخدامك يشكل خطرًا أمنيًا أو قانونيًا أو تشغيليًا؛</li>
            <li>سلوكك مسيء أو احتيالي أو غير مشروع أو ضار؛ أو</li>
            <li>أن هذا الإجراء ضروري لحماية حقوقنا أو المستخدمين أو الأنظمة أو المصالح التجارية.</li>
          </ul>
        </section>
        <section id="law" class="legal-card">
          <h2>15. القانون الحاكم والاختصاص القضائي</h2>
          <p>تخضع هذه الشروط وتفسر وفقًا للأنظمة واللوائح المعمول بها في المملكة العربية السعودية.</p>
          <p>أي نزاع ينشأ عن أو يرتبط بهذه الشروط أو باستخدامك للموقع يكون خاضعًا لاختصاص المحاكم أو الجهات المختصة في المملكة العربية السعودية، ما لم يقتض النظام خلاف ذلك.</p>
        </section>
        <section id="changes" class="legal-card">
          <h2>16. التغييرات على هذه الشروط</h2>
          <p>يجوز لنا تحديث أو تعديل أو مراجعة هذه الشروط من وقت لآخر لتعكس تغييرات الأعمال أو وظائف الموقع أو المتطلبات القانونية أو الممارسات التشغيلية.</p>
          <p>تصبح أي نسخة محدثة نافذة عند نشرها في هذه الصفحة، وقد يتم تعديل تاريخ السريان وفقًا لذلك. ويُعد استمرارك في استخدام الموقع بعد التحديث قبولًا بالشروط المعدلة.</p>
        </section>
        <section id="severability" class="legal-card">
          <h2>17. قابلية الفصل</h2>
          <p>إذا تقرر أن أي بند من هذه الشروط غير صالح أو غير نظامي أو غير قابل للتنفيذ من قبل جهة مختصة، فإن باقي البنود تبقى سارية ونافذة بالكامل بالقدر الذي يسمح به النظام.</p>
        </section>
        <section id="entire" class="legal-card">
          <h2>18. كامل شروط الموقع</h2>
          <p>تشكل هذه الشروط، مع سياسة الخصوصية وأي إشعارات قانونية أخرى منشورة على الموقع، الاتفاق الكامل المتعلق باستخدامك للموقع، ما لم يتم استبدالها باتفاقية خدمات مكتوبة مستقلة.</p>
        </section>
        <section id="contact" class="legal-card">
          <h2>19. تواصل معنا</h2>
          <p>إذا كانت لديك أي أسئلة بخصوص شروط الاستخدام هذه، يرجى التواصل مع:</p>
          <p><strong>شركة فوود أرت للدعاية والإعلان</strong><br>
          العاملة تحت العلامة التجارية المسجلة آرت ريشو<br>
          السجل التجاري: 7030880632<br>
          رقم رخصة الإعلام: 159460<br>
          البريد الإلكتروني: <a href="mailto:info@art-ratio.com">info@art-ratio.com</a><br>
          الهاتف: <a href="tel:+966567680152">+966 56 768 0152</a></p>
        </section>`,
    },
    gallery_section_subtitle: { en: 'Our Portfolio', ar: 'معرض الصور' },
    gallery_section_title: { en: 'Some recent work', ar: 'أحدث أعمالنا المصورة' },
    gallery_filter_commercial: { en: 'Commercial', ar: 'تجاري' },
    gallery_filter_ecommerce: { en: 'E-commerce', ar: 'التجارة الإلكترونية' },
    gallery_filter_events: { en: 'Events', ar: 'فعاليات' },
    gallery_filter_social_media: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    gallery_card_title: { en: 'Photo Gallery', ar: 'معرض الصور' },
    gallery_card_subtitle: { en: 'View Large', ar: 'عرض بالحجم الكبير' },
    nav_portfolio_details: { en: 'Portfolio Details', ar: 'تفاصيل الأعمال' },
    side_header_contact_title: { en: 'Contact Us', ar: 'تواصل معنا' },
    side_header_login_link: { en: 'Login to Dashboard', ar: 'تسجيل الدخول للوحة التحكم' },
    side_header_heading: {
      type: 'html',
      en: 'Got a project in mind?<br>We’re ready to bring it to life.',
      ar: 'عندك مشروع في بالك؟<br>جاهزين نحوله لواقع.',
    },
    home_hero_subtitle: {
      en: 'We turn your concepts into visual masterpieces, crafting every project with a unique blend of artistry and innovation that brings your vision to life.',
      ar: 'نحوّل أفكاركم لروائع بصرية، ونشتغل على كل مشروع بمزيج خاص من الفن والابتكار، عشان نطلع عمل يجسّد رؤيتكم',
    },
    home_projects_subtitle: { en: 'Latest Projects', ar: 'أحدث المشاريع' },
    home_projects_title: { en: ' Portfolio to explore ', ar: 'استكشف أعمالنا' },
    home_blog_subtitle: { en: 'Our Blog', ar: 'كشكولنا' },
    home_blog_title: { en: 'Explore Recent Publications', ar: 'استكشف أحدث المقالات' },
    home_blog_view_more: { en: 'View More Blog', ar: 'عرض المزيد من المقالات' },
    home_values_subtitle: { en: 'Our Values', ar: 'قيمنا' },
    home_values_title: { en: 'What we stand for', ar: 'مبادئنا وفلسفتنا' },
    home_process_subtitle: { en: 'Production Creative Process', ar: 'عملية الإنتاج الإبداعي' },
    home_process_title: { en: 'How we build your final video', ar: 'من الفكرة إلى النسخة النهائية' },
    home_team_subtitle: { en: ' Our Team ', ar: 'فريقنا' },
    home_team_title: { type: 'html', en: 'Awesome team <br>members', ar: 'أعضاء فريقنا المتميز' },
    home_partners_marquee: { en: 'Our trusted and successful partners', ar: 'شركاء النجاح • شركاء النجاح   •' },
    home_testimonial_tala_text: {
      en: 'Perfect, hard-working team with on-time delivery. The overall quality reflected real perfection in every detail.',
      ar: 'فريق مثالي ويعمل بجد، والتسليم دائمًا في الوقت. جودة التنفيذ كانت متقنة بشكل واضح في كل التفاصيل.',
    },
    home_testimonial_yousef_text: {
      en: 'Outstanding creative quality and smooth collaboration from start to finish. The team was respectful, flexible, and highly professional in communication, with clear understanding of the vision in every step.',
      ar: 'جودة إبداعية ممتازة وتعاون سلس من البداية للنهاية. التعامل كان راقيًا ومرنًا واحترافيًا جدًا في التواصل، مع فهم واضح للرؤية في كل مرحلة.',
    },
    home_testimonial_faisal_text: {
      en: 'From the first meeting to final delivery, the team operated with focus, quality, and excellent communication. The output was impactful, organized, and exceeded expectations.',
      ar: 'من أول اجتماع حتى التسليم النهائي، عمل الفريق بتركيز وجودة وتواصل ممتاز. المخرجات كانت مؤثرة ومنظمة وتجاوزت التوقعات.',
    },
    home_testimonial_tala_name: { en: 'Dr. Tala Al-Suliman', ar: 'الدكتورة تالا السليمان' },
    home_testimonial_yousef_name: { en: 'Mr. Yousef Al-Qurashi', ar: 'الأستاذ يوسف القرشي' },
    home_testimonial_faisal_name: { en: 'Coach Al-Baiti Al-Faisal', ar: 'كوتش البيتي الفيصل' },
    home_testimonial_tala_role: { en: 'Clinical Psychology Consultant', ar: 'استشارية علم نفس إكلينيكي' },
    home_testimonial_yousef_role: { en: 'Perfumer', ar: 'صانع عطور' },
    home_testimonial_faisal_role: { en: 'Success and High Achievement Consultant', ar: 'مستشار نجاح وتحقيق عالي' },
    values_creativity_title: { en: 'Creativity', ar: 'الإبداع' },
    values_creativity_text: { en: 'Bringing fresh ideas that exceed expectations.', ar: 'أفكار متجددة تتجاوز التوقعات.' },
    values_innovation_title: { en: 'Innovation', ar: 'الابتكار' },
    values_innovation_text: { en: 'Leveraging the latest technologies and techniques in production.', ar: 'توظيف أحدث التقنيات والأساليب في الإنتاج.' },
    values_excellence_title: { en: 'Excellence', ar: 'التميز' },
    values_excellence_text: { en: 'Delivering work crafted with precision and artistry.', ar: 'تسليم أعمال مصنوعة بدقة وفن.' },
    values_professionalism_title: { en: 'Professionalism', ar: 'الاحترافية' },
    values_professionalism_text: { en: 'Commitment to quality and deadlines in every project.', ar: 'التزام بالجودة والمواعيد في كل مشروع.' },
    values_collaboration_title: { en: 'Collaboration', ar: 'التعاون' },
    values_collaboration_text: { en: 'Working hand-in-hand with clients as one team.', ar: 'نشتغل مع عملائنا يد بيد كفريق واحد' },
    values_reliability_title: { en: 'Reliability', ar: 'الموثوقية' },
    values_reliability_text: { en: 'Building long-term relationships based on trust.', ar: 'نبني علاقات طويلة الأمد قائمة على الثقة.' },
    home_cta_title: {
      type: 'html',
      en: 'Ready to bring your vision to life? <br>Together we’ll turn your ideas into something remarkable.',
      ar: 'جاهز تحوّل رؤيتك لواقع؟<br>خلّينا نحولها لقصة استثنائية.',
    },
    service_tv_cta_title: {
      type: 'html',
      en: 'Ready to let your ad speak for you? <br>Let’s transform your message into a visual experience that leaves an impact.',
      ar: 'جاهز تخلي إعلانك يتكلم عنك؟<br>خلّينا نحوّل رسالتك لتجربة بصرية تترك أثر',
    },
    service_events_cta_title: {
      type: 'html',
      en: 'Ready to capture your moment in the best way? <br>Let’s turn your event into a story that lives on.',
      ar: 'جاهز توثّق لحظتك بأفضل صورة؟<br>خلّينا نحوّل فعاليتك لقصة تعيش.',
    },
    service_social_cta_title: {
      type: 'html',
      en: 'Ready to build a stronger brand presence? <br>Let’s turn your content into impact people notice.',
      ar: 'جاهز تبني حضور أقوى لعلامتك؟<br>خلّينا نحوّل محتواك لتأثير يُلاحظ.',
    },
    service_photo_cta_title: {
      type: 'html',
      en: 'Ready to elevate your product’s visual value? <br>Let’s turn your imagery into real selling power.',
      ar: 'جاهز ترفع قيمة منتجك بصريًا؟<br>خلّينا نحوّل صورتك لقوة بيع حقيقية.',
    },
    service_rental_cta_title: {
      type: 'html',
      en: 'Ready to start your project with confidence? <br>Let’s provide the tools that secure results worthy of your standards.',
      ar: 'جاهز تبدأ مشروعك بثقة؟<br>خلّينا نوفر لك الأدوات اللي تضمن نتيجة تليق فيك.',
    },
    service_consult_cta_title: {
      type: 'html',
      en: 'Ready to take your idea to the right next stage? <br>Let’s turn your vision into a clear plan. Book your consultation now.',
      ar: 'جاهز تاخذ فكرتك للمرحلة الصح؟<br>خلّينا نحوّل تصورك لخطة واضحة، احجز استشارتك الآن',
    },
    home_cta_btn: { en: 'Apply For Meeting', ar: 'احجز اجتماع، وخلي الباقي علينا' },
    about_hero_title: { en: 'About Us', ar: 'من نحن' },
    about_intro_subtitle: { en: 'About Art Ratio', ar: 'عن آرت ريشو' },
    about_intro_title: {
      en: 'Cinematic artistry shaped by precision, passion, and purpose.',
      ar: 'فنٌّ سينمائي نصنعه بالدقة والشغف',
    },
    about_intro_p1: {
      en: 'We are ART RATIO, and we are a motion picture & commercial production company.',
      ar: 'نحن آرت ريشيو، شركة إنتاج سينمائي وإعلاني، نشتغل بإبداع من أول فكرة لآخر لقطة.',
    },
    about_intro_p2: {
      en: 'We take concepts and turn them into impactful visual content that connects with people, backed by state-of-the-art technology and a highly-skilled team of creatives.',
      ar: 'نحوّل الأفكار لتجارب بصرية توصل للناس، بتقنيات حديثة وفريق يعرف كيف يطلع أفضل نتيجة.',
    },
    funfacts_title: { en: 'Our fun fact', ar: 'أرقام تروي قصتنا' },
    funfacts_body: {
      type: 'html',
      en: 'Our work blends creativity and craftsmanship, shaped by years of collaboration with clients who trust our vision.<br>These numbers offer a glimpse into our journey.',
      ar: 'أعمالنا تحمل بصمة إبداع متقن وحرفية عالية، مبنية على سنوات من الشغف والتجربة، وشراكات منحتنا ثقة عملائنا.<br>وهذي الأرقام مو مجرد بيانات… هذي خلاصة رحلتنا، والخطوات اللي شكّلتنا وخلّتْنا نوصل للي إحنا عليه اليوم.',
    },
    funfacts_clients: { en: 'Happy Clients', ar: 'عميل سعيد' },
    funfacts_projects: { en: 'Project Completed', ar: 'مشروع مكتمل' },
    funfacts_workshops: { en: 'Workshops Conducted', ar: 'ورشة عمل منفذة' },
    funfacts_products: { en: 'Products photography', ar: 'مُنتج مصور' },
    about_why_subtitle: { en: 'WHY CHOOSE US?', ar: 'ليش إحنا ؟' },
    about_why_title: {
      en: 'We shape emotions into frames, elegant, timeless, and unforgettable.',
      ar: 'لأن التفاصيل تفرق',
    },
    about_why_p1: {
      en: 'At ART RATIO, we transform ideas into powerful visual stories that inspire and connect. Our team is known for creative excellence, flexible collaboration, and a deep understanding of each client’s vision.',
      ar: 'في آرت ريشو، نحوّل الأفكار  لقصص بصرية ملهمة تلامس الناس ويبقى أثرها لوقت طويل.',
    },
    about_why_p2: {
      type: 'html',
      en: 'We ensure smooth communication, adaptable workflows, and results that consistently exceed expectations.',
      ar: 'يتميّز فريقنا بالإبداع والمرونة، وبقدرته على فهم رؤية كل عميل بعمق، عشان نحوّل احتياجاته لواقع بصري متقن.<br>نضمن تجربة عمل سلسة، وتدفق احترافي في كل مرحلة، ونتائج تتجاوز التوقعات في كل مرة.',
    },
    service_hero_title: { en: 'Services', ar: 'خدماتنا' },
    service_intro_subtitle: { en: 'Our Services', ar: 'خدماتنا' },
    service_intro_title: {
      en: 'We craft powerful visual experiences that elevate your brand and bring your stories to life.',
      ar: 'نحوّل رؤيتك لتجربة بصرية تعزّز علامتك وتحكي قصتك.',
    },
    service_card_tv: { en: 'TV & Commercial Ads', ar: 'إعلانات تلفزيونية وتجارية' },
    service_card_events: { en: 'Events & Coverage', ar: 'الفعاليات والتغطيات' },
    service_card_social: { en: 'Social Media Visuals', ar: 'محتوى شبكات التواصل' },
    service_card_photo: { en: 'Commercial Photography', ar: 'التصوير الفوتوغرافي التجاري' },
    service_card_rental: { en: 'Equipment Rental', ar: 'تأجير المعدات' },
    service_card_consult: { en: 'Cinematography & Film Production Consultancy', ar: 'الاستشارات في التصوير والإنتاج السينمائي' },
    service_tv_details_title: { en: 'TV & Commercial Ads', ar: 'إعلانات تلفزيونية وتجارية' },
    service_tv_details_p1: {
      en: 'An ad is not just product shooting. It is a decision about perception.',
      ar: 'الإعلان مو مجرد تصوير منتج... الإعلان قرار انطباع.',
    },
    service_tv_details_p2: {
      en: 'At Art Ratio, we treat advertising as an integrated production, from the first idea to the last second on screen.',
      ar: 'في آرت ريشيو، نتعامل مع الإعلان كعمل متكامل، من الفكرة الأولى... إلى آخر ثانية على الشاشة.',
    },
    service_tv_details_p3: {
      en: 'We begin by understanding the brand: its value, market position, and message.',
      ar: 'نبدأ بفهم العلامة: قيمتها، مكانها في السوق، ورسالتها.',
    },
    service_tv_details_p4: {
      en: 'Then we build an idea that truly serves the objective, not just beautiful visuals.',
      ar: 'وبعدها نبني فكرة تخدم الهدف فعلًا — مو مجرد مشاهد جميلة.',
    },
    service_tv_details_p5: {
      en: 'A successful ad does not rely on one strong shot. It relies on clear vision, thoughtful direction, and precise execution.',
      ar: 'الإعلان الناجح ما يعتمد على لقطة قوية فقط، يعتمد على رؤية واضحة، إخراج مدروس، وتنفيذ دقيق.',
    },
    service_tv_workflow_title: {
      en: 'We handle every stage with full professionalism:',
      ar: 'نشتغل على كل مرحلة باحتراف:',
    },
    service_tv_point_1: {
      en: 'Idea and scenario development',
      ar: 'تطوير الفكرة والسيناريو',
    },
    service_tv_point_2: {
      en: 'Directorial treatment and visual direction',
      ar: 'بناء المعالجة الإخراجية والرؤية البصرية',
    },
    service_tv_point_3: {
      en: 'Selecting the right shooting locations',
      ar: 'اختيار مواقع التصوير المناسبة',
    },
    service_tv_point_4: {
      en: 'Lighting design and cinematic style',
      ar: 'تصميم الإضاءة والأسلوب السينمائي',
    },
    service_tv_point_5: {
      en: 'Full production team management',
      ar: 'إدارة فريق الإنتاج بالكامل',
    },
    service_tv_point_6: {
      en: 'High-end technical filming execution',
      ar: 'تنفيذ التصوير بأعلى جودة تقنية',
    },
    service_tv_point_7: {
      en: 'Professional editing with pacing that serves the message',
      ar: 'مونتاج احترافي بإيقاع يخدم الرسالة',
    },
    service_tv_point_8: {
      en: 'Color grading and final finishing ready for broadcast',
      ar: 'تصحيح ألوان ومعالجة نهائية جاهزة للبث',
    },
    service_tv_details_p6: {
      en: 'Every element is intentional. Every second has purpose. Every shot serves the message.',
      ar: 'كل عنصر محسوب. كل ثانية لها هدف. كل لقطة تخدم الرسالة.',
    },
    service_tv_details_p7: {
      en: 'Whether it is for TV, digital platforms, or a full campaign, we ensure the final output reflects your brand at its best.',
      ar: 'سواء كان الإعلان للتلفزيون، المنصات الرقمية، أو حملة متكاملة، نضمن إن العمل يطلع بصورة تليق باسمك.',
    },
    service_tv_details_p8: {
      en: 'We do not create ads that appear and fade. We craft visual experiences that elevate brand value and leave a lasting impact.',
      ar: 'ما نصنع إعلان يُعرض وينتهي، نصنع تجربة بصرية ترفع مكانة العلامة وتترك أثر.',
    },
    service_tv_details_p9: {
      en: 'At Art Ratio, we transform your idea from a simple message into work that is watched with confidence and remembered for long.',
      ar: 'في آرت ريشيو، نحوّل الفكرة من مجرد رسالة إلى عمل يُشاهد بثقة... ويُتذكَر طويلًا.',
    },
    service_tv_showreel_intro: {
      en: 'A showcase of our latest TV and commercial advertising work, where creative ideas meet high-end execution for strong visual impact.',
      ar: 'نستعرض أحدث أعمالنا في الإعلانات التلفزيونية والتجارية، ندمج الفكرة الإبداعية مع تنفيذ احترافي يحقق أثر بصري واضح',
    },
    service_events_showreel_intro: {
      en: 'A showcase of our latest events coverage work, where every moment is captured with a cinematic approach that reflects the spirit of the occasion.',
      ar: 'نستعرض أحدث أعمالنا في تغطية الفعاليات، نوثّق كل لحظة بأسلوب سينمائي يعكس روح الحدث ويخلّد أثره',
    },
    service_social_showreel_intro: {
      en: 'A showcase of our latest social media showreel work, where we craft fast, engaging content that boosts brand presence and drives interaction.',
      ar: 'نستعرض أحدث أعمالنا في التواصل الاجتماعي، نصنع محتوى سريع وجذاب يرفع حضور علامتك ويزيد التفاعل',
    },
    service_events_details_p1: {
      en: 'At Art Ratio, we do not just cover the event... we live it and tell its story.',
      ar: 'في آرت ريشيو، إحنا ما نغطي الحدث... إحنا نعيشه، ونحكي قصته.',
    },
    service_events_details_p2: {
      en: 'Whether it is a conference, product launch, festival, sports event, or private occasion, we handle every event with a full production mindset, not just cameras rolling.',
      ar: 'سواء كان مؤتمر، إطلاق منتج، مهرجان، فعالية رياضية، أو حدث خاص — نتعامل مع كل فعالية بعقلية إنتاج كاملة، مو مجرد كاميرات تشتغل.',
    },
    service_events_details_p3: {
      en: 'We plan before the event, build the visual scenario, define angles, lighting, and pacing, and assemble a team that matches the event type and scale.',
      ar: 'نخطط قبل الحدث، نرسم السيناريو البصري، نحدد الزوايا، الإضاءة، الإيقاع، ونبني فريق يناسب طبيعة الفعالية وحجمها.',
    },
    service_events_details_p4: {
      en: 'Our goal? The moment should not end when the event ends; it should become content that continues to live with you afterward.',
      ar: 'هدفنا؟ إن اللحظة ما تنتهي بانتهاء الحدث... بل تتحول إلى محتوى يعيش معكم بعده.',
    },
    service_events_how_we_work: {
      en: 'How We Work?',
      ar: 'كيف نشتغل؟',
    },
    service_events_point_1: {
      en: 'Professional multi-camera video coverage',
      ar: 'تغطية فيديو احترافية متعددة الكاميرات',
    },
    service_events_point_2: {
      en: 'Photography that captures details and human moments',
      ar: 'تصوير فوتوغرافي يوثق التفاصيل واللحظات الإنسانية',
    },
    service_events_point_3: {
      en: 'On-site editing when needed',
      ar: 'مونتاج في الموقع عند الحاجة',
    },
    service_events_point_4: {
      en: 'Cinematic highlight video that summarizes the experience in the best way',
      ar: 'فيديو هايلايت سينمائي يلخص التجربة بأفضل صورة',
    },
    service_events_point_5: {
      en: 'Ready-to-publish social media content',
      ar: 'محتوى جاهز للنشر على السوشال ميديا',
    },
    service_events_point_6: {
      en: 'Live streaming on request',
      ar: 'بث مباشر عند الطلب',
    },
    service_events_details_p5: {
      en: 'We work quietly, but produce with power. We capture the small details before the big ones, and keep your brand identity present in every shot.',
      ar: 'نشتغل بهدوء... لكن ننتج بقوة. نلتقط التفاصيل الصغيرة قبل الكبيرة. ونحافظ على هوية علامتك حاضرة في كل لقطة.',
    },
    service_social_details_p1: {
      en: 'In social media, presence is not measured by the number of posts, but by the strength of visuals and their impact.',
      ar: 'في عالم السوشال ميديا، الحضور ما يُقاس بعدد المنشورات... بل بقوة الصورة وتأثيرها.',
    },
    service_social_details_p2: {
      en: 'At Art Ratio, we approach social media with a complete production mindset. We start by understanding your brand identity, audience, and goals, then create visual content that reflects your personality with clarity and consistency.',
      ar: 'في آرت ريشيو، نتعامل مع السوشال ميديا بعقلية إنتاج متكاملة. نبدأ بفهم هوية العلامة، جمهورها، وأهدافها، ثم نصنع محتوى بصري يعكس شخصيتها بشكل واضح ومتناسق.',
    },
    service_social_details_p3: {
      en: 'Our goal is to make every appearance meaningful, every video purposeful, and every image valuable for your brand in the long run.',
      ar: 'هدفنا أن يكون لكل ظهور معنى، ولكل فيديو رسالة، ولكل صورة قيمة تخدم البراند على المدى الطويل.',
    },
    service_social_heading: {
      en: 'Our social media services include:',
      ar: 'خدماتنا في السوشال ميديا تشمل:',
    },
    service_social_point_1: {
      en: 'Short-form videos with engaging pacing tailored for each platform',
      ar: 'إنتاج فيديوهات قصيرة بإيقاع جذاب ومناسب لكل منصة',
    },
    service_social_point_2: {
      en: 'Professional product and service shoots with a strategic commercial style',
      ar: 'تصوير احترافي للمنتجات والخدمات بأسلوب تجاري مدروس',
    },
    service_social_point_3: {
      en: 'Restaurant and cafe content that reflects atmosphere and highlights visual appetite appeal',
      ar: 'تصوير المطاعم والكافيهات بأسلوب يعكس الأجواء ويبرز التفاصيل الشهية',
    },
    service_social_point_4: {
      en: 'Lifestyle content that expresses your brand identity and story',
      ar: 'محتوى لايف ستايل يعكس هوية العلامة وقصتها',
    },
    service_social_point_5: {
      en: 'Educational clips and useful tips that build audience trust',
      ar: 'مقاطع تعليمية ونصائح مفيدة تبني الثقة مع الجمهور',
    },
    service_social_point_6: {
      en: 'Fast-turnaround social media coverage',
      ar: 'تغطيات سريعة مخصصة للسوشال ميديا',
    },
    service_social_point_7: {
      en: 'Planning and production of interview-style shows or podcasts with a professional visual approach',
      ar: 'إعداد وتصوير برامج حوارية أو بودكاست بأسلوب بصري احترافي',
    },
    service_social_point_8: {
      en: 'Monthly content planning and execution campaigns',
      ar: 'تخطيط وتنفيذ حملات محتوى شهرية متكاملة',
    },
    service_social_details_p4: {
      type: 'html',
      en: "We ensure every element is intentional: lighting, color, camera movement, pacing, and editing.<br>We do not create content just to be present, we build a connected visual presence that keeps your name in your audience's mind.",
      ar: 'نحرص على أن يكون كل عنصر محسوب: الإضاءة، الألوان، حركة الكاميرا، الإيقاع، والمونتاج.<br>ما ننتج محتوى بس عشان نكون موجودين، نصنع حضور بصري مترابط يرسّخ اسمك في ذهن جمهورك.',
    },
    service_social_details_p5: {
      en: 'In a crowded content space, we keep your brand clear, distinctive, and memorable.',
      ar: 'وفي زحمة المحتوى، نخليك واضح، مختلف، وحضورك يترك أثر.',
    },
    service_photo_details_p1: {
      en: 'A commercial image is not just something beautiful. It is a silent sales message.',
      ar: 'الصورة التجارية مو مجرد شكل جميل... هي رسالة بيع صامتة.',
    },
    service_photo_details_p2: {
      en: 'At Art Ratio, we treat commercial photography as part of the brand strategy, not a random shot or just a pretty image.',
      ar: 'في آرت ريشيو، نتعامل مع التصوير الفوتوغرافي التجاري كجزء من استراتيجية العلامة. مو لقطة عشوائية، ولا صورة "حلوة وخلاص".',
    },
    service_photo_details_p3: {
      en: 'We begin by understanding your product or service, its value, market position, and the impression it needs to deliver.',
      ar: 'نبدأ بفهم المنتج أو الخدمة، قيمتها، مكانها في السوق، والانطباع اللي لازم توصله.',
    },
    service_photo_details_p4: {
      en: 'Then we execute with a full production mindset: intentional lighting, precise composition, clear textures, controlled colors, and details that elevate visual product value.',
      ar: 'وبعدها نشتغل بعقلية إنتاج كاملة: إضاءة مدروسة، تكوين دقيق، خامات واضحة، ألوان محسوبة، وتفاصيل ترفع القيمة البصرية للمنتج.',
    },
    service_photo_details_p5: {
      en: 'Because commercial imagery should convince before it speaks.',
      ar: 'لأن الصورة التجارية لازم تقنع قبل ما تتكلم.',
    },
    service_photo_heading: {
      en: 'Our commercial photography services:',
      ar: 'خدماتنا في التصوير الفوتوغرافي التجاري:',
    },
    service_photo_point_1: {
      en: 'Advertising-style product photography that highlights quality and fine details',
      ar: 'تصوير منتجات بأسلوب إعلاني احترافي يبرز الجودة والتفاصيل الدقيقة',
    },
    service_photo_point_2: {
      en: 'Catalog and e-commerce content photography',
      ar: 'تصوير كتالوجات ومحتوى للمتاجر الإلكترونية',
    },
    service_photo_point_3: {
      en: 'Brand campaign photography',
      ar: 'تصوير حملات إعلانية للعلامات التجارية',
    },
    service_photo_point_4: {
      en: 'Industrial and service photography that reflects professionalism and reliability',
      ar: 'تصوير صناعي وخدمات يعكس الاحترافية والموثوقية',
    },
    service_photo_point_5: {
      en: 'Food photography with a commercial style that emphasizes texture and detail',
      ar: 'تصوير أطعمة بأسلوب تجاري يبرز الملمس والتفاصيل',
    },
    service_photo_point_6: {
      en: 'In-studio sessions in a fully equipped environment',
      ar: 'جلسات تصوير داخل استوديو مجهز بالكامل',
    },
    service_photo_point_7: {
      en: 'On-location setup with professional lighting based on project needs',
      ar: 'تجهيز مواقع تصوير خارجية بإضاءة احترافية حسب متطلبات المشروع',
    },
    service_photo_details_p6: {
      en: 'We focus on the smallest elements: shadows, reflections, surface texture, detail sharpness, and color harmony with your brand identity.',
      ar: 'نهتم بأدق العناصر: الظل، الانعكاس، ملمس السطح، حدة التفاصيل، وتناسق الألوان مع هوية العلامة.',
    },
    service_photo_details_p7: {
      en: 'We also provide precise professional retouching to ensure each image is ready for large-format print, advertising, billboards, and official marketing materials.',
      ar: 'ونقدم معالجة احترافية دقيقة تضمن إن الصورة جاهزة للطباعة الكبيرة، الإعلانات، اللوحات، والمواد التسويقية الرسمية.',
    },
    service_photo_details_p8: {
      en: 'In the end, a strong commercial image raises product value before anyone even touches it.',
      ar: 'في النهاية، الصورة التجارية القوية ترفع قيمة المنتج قبل ما يُمسك باليد.',
    },
    service_photo_details_p9: {
      en: 'At Art Ratio, we make every image sell without over-explaining.',
      ar: 'وفي آرت ريشيو، نخلي كل صورة تبيع... بدون ما تشرح.',
    },
    service_photo_showcase_title: {
      en: 'We showcase our standout commercial photography',
      ar: 'نستعرض أبرز الصور الفوتوغرافية التجارية',
    },
    service_photo_showcase_subtitle: {
      en: 'A curated selection reflecting execution quality, detail precision, and the power of imagery to elevate products and strengthen brand presence.',
      ar: 'لقطات مختارة تعكس جودة التنفيذ، ودقة التفاصيل، وقوة الصورة في إبراز المنتج وبناء حضور علامتك.',
    },
    service_rental_details_p1: {
      en: 'The right gear is half the work.',
      ar: 'المعدة الصح... نص الشغل.',
    },
    service_rental_details_p2: {
      en: 'At Art Ratio, we do not offer equipment just for rental. We provide production-ready tools you can rely on.',
      ar: 'في آرت ريشيو، ما نوفر معدات بس عشان تتأجر. نوفر أدوات إنتاج جاهزة تشتغل معك بثقة.',
    },
    service_rental_details_p3: {
      en: 'We know every project, large or small, depends on equipment quality and reliability. That is why every item is tested, maintained, and ready to perform without surprises.',
      ar: 'نعرف إن أي مشروع — كبير أو صغير — يعتمد على جودة المعدة واستقرارها. عشان كذا نهتم إن كل قطعة تكون مجرّبة، محفوظة، وجاهزة للعمل بدون مفاجآت.',
    },
    service_rental_details_p4: {
      en: 'Because production time cannot afford errors.',
      ar: 'لأن وقت التصوير ما يتحمّل أخطاء.',
    },
    service_rental_heading: {
      en: 'What we provide:',
      ar: 'ايش نوفر؟',
    },
    service_rental_point_1: {
      en: 'Professional cinema cameras',
      ar: 'كاميرات سينمائية احترافية',
    },
    service_rental_point_2: {
      en: 'A range of lenses for different shooting styles',
      ar: 'عدسات متنوعة تناسب كل نوع تصوير',
    },
    service_rental_point_3: {
      en: 'Professional lighting setups for indoor and outdoor production',
      ar: 'معدات إضاءة احترافية داخلية وخارجية',
    },
    service_rental_point_4: {
      en: 'Stabilization and camera movement systems',
      ar: 'أنظمة تثبيت وحركة',
    },
    service_rental_point_5: {
      en: 'Professional audio equipment',
      ar: 'معدات صوت احترافية',
    },
    service_rental_point_6: {
      en: 'Integrated production accessories',
      ar: 'ملحقات إنتاج متكاملة',
    },
    service_rental_details_p5: {
      en: 'Every item is inspected before handover and ready for immediate use on set.',
      ar: 'كل معدة يتم فحصها قبل التسليم، وجاهزة للاستخدام فورًا في موقع التصوير.',
    },
    service_rental_details_p6: {
      en: 'We help you choose the right gear based on your project type, whether it is an ad, film, interview, or digital content.',
      ar: 'نساعدك تختار المعدة المناسبة حسب نوع مشروعك، سواء إعلان، فيلم، مقابلة، أو محتوى رقمي.',
    },
    service_rental_details_p7: {
      en: 'Our goal is simple: you focus on creativity, and we secure the tools.',
      ar: 'هدفنا إنك تركز على الإبداع... وإحنا نضمن لك الأدوات.',
    },
    service_rental_details_p8: {
      en: 'At Art Ratio, we provide gear that works with you, not against you.',
      ar: 'وفي آرت ريشيو، نوفر لك المعدة اللي تشتغل معك... مو ضدك.',
    },
    service_consult_details_p1: {
      en: 'Not every project needs a camera first. Sometimes it needs a clear vision before it starts.',
      ar: 'مو كل مشروع يحتاج كاميرا أول شيء... أحيانًا يحتاج رؤية واضحة قبل ما يبدأ.',
    },
    service_consult_details_p2: {
      en: 'At Art Ratio, we provide specialized consultancy in cinematography and film production, helping you plan correctly from day one and avoid costly mistakes later.',
      ar: 'في آرت ريشيو، نقدم استشارات متخصصة في التصوير والإنتاج السينمائي نساعدك تخطط صح من البداية، وتتجنب الأخطاء اللي تكلّف وقت وميزانية بعدين.',
    },
    service_consult_details_p3: {
      en: 'The difference between an average project and an impactful one often starts in planning.',
      ar: 'لأن الفرق بين مشروع عادي ومشروع مؤثر غالبًا يبدأ من مرحلة التخطيط.',
    },
    service_consult_details_p4: {
      en: 'We work with you step by step: understanding your idea, analyzing your objective, defining your audience, and building a visual direction that serves your message clearly and strategically.',
      ar: 'نشتغل معك خطوة بخطوة: نفهم فكرتك، نحلل الهدف، نحدد الجمهور، ونبني تصور بصري يخدم الرسالة بشكل واضح ومدروس.',
    },
    service_consult_details_p5: {
      en: 'Our consultancy is not generic talk. It is practical guidance built on real field experience in production environments.',
      ar: 'الاستشارة عندنا مو كلام عام... هي توجيه عملي مبني على خبرة ميدانية في مواقع التصوير.',
    },
    service_consult_heading: {
      en: 'What our consultancy includes:',
      ar: 'ايش تشمل الاستشارات؟',
    },
    service_consult_point_1: {
      en: 'Developing ideas into a clear visual direction',
      ar: 'تطوير الفكرة وتحويلها لرؤية بصرية واضحة',
    },
    service_consult_point_2: {
      en: 'Building a strong visual identity for the project',
      ar: 'بناء الهوية البصرية للمشروع',
    },
    service_consult_point_3: {
      en: 'Defining the right shooting approach (lighting, lenses, camera movement)',
      ar: 'تحديد أسلوب التصوير المناسب (إضاءة، عدسات، حركة كاميرا)',
    },
    service_consult_point_4: {
      en: 'Creating an integrated production plan before execution',
      ar: 'وضع خطة إنتاج متكاملة قبل التنفيذ',
    },
    service_consult_point_5: {
      en: 'Selecting the right equipment for the project type',
      ar: 'اختيار المعدات المناسبة حسب نوع المشروع',
    },
    service_consult_point_6: {
      en: 'Optimizing budget distribution for the best outcome',
      ar: 'توزيع الميزانية بطريقة ذكية تحقق أفضل نتيجة',
    },
    service_consult_point_7: {
      en: 'Script reviews and directorial treatment guidance',
      ar: 'مراجعة سكريبتات ومعالجة إخراجية',
    },
    service_consult_point_8: {
      en: 'Evaluating existing projects and recommending professional improvements',
      ar: 'تقييم مشاريع قائمة واقتراح تحسينات احترافية',
    },
    service_consult_details_p6: {
      en: 'Whether you are a company launching a campaign, a creator aiming to raise production quality, or an organization that needs professional planning before execution, we support you at the decision stage.',
      ar: 'سواء كنت شركة تبغى تطلق حملة، أو صانع محتوى يبغى يرفع مستوى إنتاجه، أو جهة تحتاج تخطيط احترافي قبل التنفيذ... إحنا نكون معك في مرحلة القرار.',
    },
    service_consult_details_p7: {
      en: 'Because the right decision before production saves half the journey.',
      ar: 'لأن القرار الصح قبل التصوير يوفر نصف الطريق.',
    },
    service_consult_details_p8: {
      en: 'At Art Ratio, we turn ideas from broad concepts into clear production plans you can execute with confidence.',
      ar: 'في آرت ريشيو، نحول الفكرة من تصور عام إلى خطة إنتاج واضحة... قابلة للتنفيذ بثقة.',
    },
    service_equipment_list_link: {
      en: 'Browse Equipment List',
      ar: 'استعراض قائمة المعدات',
    },
    service_tv_details_breadcrumb: { en: 'TV & Commercial Ads', ar: 'إعلانات تلفزيونية وتجارية' },
    process_step_1: { en: 'Pre-production', ar: 'ما قبل الإنتاج' },
    process_step_2: { en: 'CPS', ar: 'اجتماع العميل' },
    process_step_3: { en: 'Director Treatment', ar: 'رؤية المخرج' },
    process_step_4: { en: 'Scriptwriting', ar: 'كتابة النص' },
    process_step_5: { en: 'Story Board', ar: 'الستوري بورد' },
    process_step_6: { en: 'Cast / Crew Selection', ar: 'اختيار الممثلين والفريق' },
    process_step_7: { en: 'Equipment Planning', ar: 'اختيار المعدات' },
    process_step_8: { en: 'Prep', ar: 'التحضير' },
    process_step_9: { en: 'PPM', ar: 'اجتماع ما قبل الإنتاج' },
    process_step_10: { en: 'Shooting', ar: 'التصوير' },
    process_step_11: { en: 'Rough Cut', ar: 'المونتاج الأولي' },
    process_step_12: { en: 'Sound Design & Mixing', ar: 'تصميم ومكساج الصوت' },
    process_step_13: { en: 'Music', ar: 'الموسيقى' },
    process_step_14: { en: 'Editing & Assembly', ar: 'التحرير والتجميع' },
    process_step_15: { en: 'VFX & CGI', ar: 'المؤثرات البصرية' },
    process_step_16: { en: 'Coloring', ar: 'تلوين' },
    process_step_17: { en: 'First Draft', ar: 'المسودة الأولى' },
    process_step_18: { en: 'Client Review', ar: 'مراجعة العميل' },
    process_step_19: { en: 'Final Video', ar: 'الفيديو النهائي' },
    service_tv_faq_subtitle: { en: "FAQ's", ar: 'الأسئلة الشائعة' },
    service_tv_faq_title: { en: 'Some pre questions and answers', ar: 'أسئلة وأجوبة شائعة' },
    service_tv_faq_q1: { en: 'Do you design illustration website?', ar: 'هل تقومون بتصميم مواقع تتضمن الرسوم التوضيحية؟' },
    service_tv_faq_q2: { en: 'Do you provide design source file after finish work?', ar: 'هل توفرون ملفات المصدر بعد الانتهاء من العمل؟' },
    service_tv_faq_q3: { en: 'How to provide project details and payments?', ar: 'كيف يمكن تزويدكم بتفاصيل المشروع وآلية الدفع؟' },
    service_tv_faq_q4: { en: 'Can you tell me please how to contact for project?', ar: 'كيف يمكنني التواصل معكم بخصوص مشروع؟' },
    service_tv_faq_q5: { en: 'Do you makes custom logo, icon etc?', ar: 'هل تقدمون تصميم شعارات وأيقونات مخصصة؟' },
    service_tv_testimonial_text: {
      en: 'I wish I would have thought of it first. Creative agency is the most tech valuable business resource we have ever purchased. Dude your stuff is the bomb! eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt to the explicabo.',
      ar: 'ليتني فكرت في ذلك أولاً! هذه الوكالة الإبداعية هي أفضل استثمار تقني قمنا به، أعمالكم مذهلة حقاً وتحقق نتائج ملموسة.',
    },
    service_tv_testimonial_role: { en: 'CEO AT TECH', ar: 'الرئيس التنفيذي في تك' },
    contact_hero_title: { en: 'Contact Us', ar: 'تواصل معنا' },
    contact_breadcrumb: { en: 'Contact', ar: 'تواصل' },
    contact_intro_subtitle: { en: 'Let’s Connect', ar: 'يلا نبدأ رحلتنا سوا.' },
    contact_intro_title: { type: 'html', en: 'Got a project in mind? <br>We’re ready to bring it to life.', ar: 'عندك مشروع في بالك؟<br>جاهز نحوله لواقع.' },
    contact_form_name: { en: 'Full Name*', ar: 'الاسم الكامل*' },
    contact_form_email: { en: 'Email*', ar: 'البريد الإلكتروني*' },
    contact_form_project: { en: 'Project Type*', ar: 'نوع المشروع*' },
    contact_form_mobile: { en: 'Mobile*', ar: 'رقم الجوال*' },
    contact_form_details: { en: 'Write Project Details*', ar: 'اكتب تفاصيل المشروع*' },
    contact_form_send: { en: 'Send Message', ar: 'أرسل الرسالة' },
    feedback_breadcrumb: { en: 'Feedback', ar: 'آراء العملاء' },
    feedback_intro_subtitle: { en: 'Client Feedback', ar: 'تقييم العميل' },
    feedback_intro_title: {
      en: 'Your feedback helps us improve every project.',
      ar: 'رأيك يهمنا ويساعدنا نطور كل مشروع.',
    },
    feedback_form_name: { en: 'Full Name*', ar: 'الاسم الكامل*' },
    feedback_form_email: { en: 'Email*', ar: 'البريد الإلكتروني*' },
    feedback_form_company: { en: 'Company Name*', ar: 'اسم الشركة*' },
    feedback_form_rating: { en: 'Overall Rating*', ar: 'التقييم العام*' },
    feedback_form_recommend: {
      en: 'Would you recommend us?*',
      ar: 'هل توصي بخدماتنا؟*',
    },
    feedback_form_delivery: {
      en: 'Delivery Satisfaction*',
      ar: 'الرضا عن التسليم*',
    },
    feedback_form_comment: { en: 'Share your experience*', ar: 'شاركنا تجربتك*' },
    feedback_form_send: { en: 'Send Feedback', ar: 'إرسال التقييم' },
    feedback_select_rating: { en: 'Select rating', ar: 'اختر التقييم' },
    feedback_select_option: { en: 'Select option', ar: 'اختر خيارًا' },
    feedback_option_yes: { en: 'Yes', ar: 'نعم' },
    feedback_option_no: { en: 'No', ar: 'لا' },
    portfolio_hero_title: { en: 'Portfolio', ar: 'أعمالنا' },
    portfolio2_page_title: { en: 'Portfolio 2 | Art Ratio', ar: 'أعمالنا 2 | آرت ريشيو' },
    portfolio2_hero_title: { en: 'Portfolio 2', ar: 'أعمالنا 2' },
    portfolio3_page_title: { en: 'Portfolio 3 | Art Ratio', ar: 'أعمالنا 3 | آرت ريشيو' },
    portfolio3_hero_title: { en: 'Portfolio 3', ar: 'أعمالنا 3' },
    portfolio4_page_title: { en: 'Portfolio 4 | Art Ratio', ar: 'أعمالنا 4 | آرت ريشيو' },
    portfolio4_hero_title: { en: 'Portfolio 4', ar: 'أعمالنا 4' },
    portfolio5_page_title: { en: 'Portfolio 5 | Art Ratio', ar: 'أعمالنا 5 | آرت ريشيو' },
    portfolio5_hero_title: { en: 'Portfolio 5', ar: 'أعمالنا 5' },
    portfolio6_page_title: { en: 'Portfolio 6 | Art Ratio', ar: 'أعمالنا 6 | آرت ريشيو' },
    portfolio6_hero_title: { en: 'Portfolio 6', ar: 'أعمالنا 6' },
    portfolio_intro_subtitle: { en: 'Our Portfolio', ar: 'أعمالنا' },
    portfolio_intro_title: { en: 'Some recent work', ar: 'استكشف أعمالنا' },
    portfolio2_intro_title: { en: 'More work on this page', ar: 'المزيد من أعمالنا في هذه الصفحة' },
    portfolio3_intro_title: { en: 'More work on this page', ar: 'المزيد من أعمالنا في هذه الصفحة' },
    portfolio4_intro_title: { en: 'More work on this page', ar: 'المزيد من أعمالنا في هذه الصفحة' },
    portfolio5_intro_title: { en: 'More work on this page', ar: 'المزيد من أعمالنا في هذه الصفحة' },
    portfolio6_intro_title: { en: 'More work on this page', ar: 'المزيد من أعمالنا في هذه الصفحة' },
    portfolio4_item_roomers_title: { en: 'Roomers Branch Opening', ar: 'افتتاح فرع روومرز' },
    portfolio4_item_kioskvision_title: { en: 'Kiosk in Vision Coverage', ar: 'تغطية كشك في ويشن' },
    portfolio4_item_kikomilano_title: { en: 'Kiko Milano', ar: 'كيكو ميلانو' },
    portfolio4_item_citywalkshows_title: { en: 'City Walk Roaming Shows', ar: 'العروض الجوالة سيتي ووك' },
    portfolio4_item_foundationarrar_title: { en: 'Founding Village Arar', ar: 'قرية التأسيس عرعر' },
    portfolio4_item_bookfairhighlight_title: { en: 'Book Fair', ar: 'معرض الكتاب' },
    portfolio4_item_selectedinterviews_title: { en: 'Selected Interviews', ar: 'مقابلات مختارة' },
    portfolio5_item_fi60_title: { en: 'Fi 60', ar: 'في 60' },
    portfolio5_item_alfares_title: { en: 'Jewelry', ar: 'مجوهرات' },
    portfolio5_item_jewelry_title: { en: 'Jewelry', ar: 'مجوهرات' },
    portfolio5_item_overdosegeneral_title: { en: 'Overdose General', ar: 'اوفردوز عام' },
    portfolio5_item_qamariya_title: { en: 'Qamariya', ar: 'قيمرية' },
    portfolio5_item_eventreel_title: { en: 'Reel for Al Tareeqah Al Mueinah', ar: 'ريل للطريقة المعينة' },
    portfolio5_item_adnankhan_title: { en: 'Adnan Khan - Mujhse Duur', ar: 'عدنان خان - مجھ سے دور' },
    portfolio6_item_koozcake_title: { en: 'Kooz Cake', ar: 'كيكة كوز' },
    portfolio6_item_hungerstation_title: { en: 'HungerStation', ar: 'هنجرستيشن' },
    portfolio6_item_eyewa_title: { en: 'Eyewa', ar: 'ايوا' },
    portfolio6_item_zedbbq_title: { en: 'Zed BBQ Box', ar: 'بوكس الباربكيو زد' },
    portfolio6_item_coffeead_title: { en: 'Coffee Ad', ar: 'اعلان قهوة' },
    portfolio6_item_ferrariclub_title: { en: 'Saudi Ferrari Club Gathering', ar: 'تجمع نادي فيراري السعودي' },
    portfolio6_item_azarad_title: { en: 'Azar Ad', ar: 'اعلان ازار' },
    portfolio_filter_all: { en: 'All', ar: 'الكل' },
    portfolio_filter_web: { en: 'Web Design', ar: 'تصميم مواقع' },
    portfolio_filter_uiux: { en: 'UI/UX Design', ar: 'تصميم UI/UX' },
    portfolio_filter_mobile: { en: 'Mobile Apps', ar: 'تطبيقات جوال' },
    portfolio_filter_logo: { en: 'Logo Design', ar: 'تصميم شعارات' },
    portfolio_filter_commercial_ads: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    portfolio_filter_events: { en: 'Events', ar: 'فعاليات' },
    portfolio_filter_social_media: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    portfolio_filter_films: { en: 'Films', ar: 'أفلام' },
    portfolio_filter_photography: { en: 'Photography', ar: 'صور فوتوغرافية' },
    portfolio_item_tazaj_title: { en: 'Tikka Sandwich by Al Tazaj', ar: 'ساندوتش تيكا من الطازج' },
    portfolio_item_title: { en: 'Golf Championship', ar: 'بطولة الجولف' },
    portfolio_item_title_2: { type: 'html', en: 'Airport Executive Lounge', ar: 'المكتب التنفيذي<br>بالمطار' },
    portfolio_item_title_3: { en: 'Saudi Dent', ar: 'سعودي دينت' },
    portfolio_item_title_golf: { en: 'Golf Tournament', ar: 'بطولة الجولف' },
    portfolio_item_subtitle: { en: 'See Details', ar: 'عرض التفاصيل' },
    pf_case_study: { en: 'Case Study', ar: 'دراسة حالة' },
    pf_project_info: { en: 'Project Info -', ar: 'معلومات المشروع -' },
    pf_label_category: { en: 'Category:', ar: 'التصنيف:' },
    pf_label_location: { en: 'Location:', ar: 'الموقع:' },
    pf_label_deliverables: { en: 'Deliverables:', ar: 'المخرجات:' },
    pf_label_window: { en: 'Production Window:', ar: 'فترة التنفيذ:' },
    pf_label_client: { en: 'Client:', ar: 'العميل:' },
    pf_prev_project: { en: 'Prev Project', ar: 'المشروع السابق' },
    pf_next_project: { en: 'Next Project', ar: 'المشروع التالي' },
    pf_airport_breadcrumb: { en: 'Airport Executive Office', ar: 'المكتب التنفيذي بالمطار' },
    pf_airport_title: { en: 'Airport Executive Office', ar: 'المكتب التنفيذي بالمطار' },
    pf_airport_p1: {
      en: 'This project was executed as a commercial photography production to showcase the premium airport lounge experience through clean, high-end still visuals. The approach focused on light control, refined composition, and precise styling to communicate exclusivity with a welcoming tone.',
      ar: 'نُفذ هذا المشروع كإنتاج تصوير فوتوغرافي تجاري لإبراز تجربة اللاونج التنفيذي بالمطار عبر صور ثابتة راقية ونظيفة. ركّزنا على التحكم بالإضاءة، وتكوينات دقيقة، ومعالجة بصرية تعكس الفخامة بروح ترحيبية.',
    },
    pf_airport_p2: {
      en: 'From planning to post-production, the workflow prioritized brand consistency in every frame. The final output delivered a cohesive commercial photo set ready for campaigns, social media, and digital placement while elevating the lounge identity.',
      ar: 'من التخطيط حتى المعالجة النهائية، ركّز سير العمل على ثبات هوية العلامة في كل لقطة. والنتيجة كانت مجموعة صور فوتوغرافية تجارية متكاملة، جاهزة للحملات، والسوشال ميديا، والاستخدام الرقمي بما يعزز حضور اللاونج.',
    },
    pf_airport_category: { en: 'Commercial Photography', ar: 'تصوير فوتوغرافي تجاري' },
    pf_airport_location: { en: 'Jeddah, Riyadh, Madinah, Dammam, Saudi Arabia', ar: 'جدة، الرياض، المدينة المنورة، الدمام، المملكة العربية السعودية' },
    pf_airport_deliverables: { en: 'Commercial Photo Set', ar: 'مجموعة صور فوتوغرافية تجارية' },
    pf_airport_window: { en: '2020', ar: '2020' },
    pf_airport_client: { en: 'Airport Executive Office', ar: 'المكتب التنفيذي بالمطار' },
    pf_golf_breadcrumb: { en: 'Golf Tournament', ar: 'بطولة الجولف' },
    pf_golf_title: { en: 'Golf Tournament', ar: 'بطولة الجولف' },
    pf_golf_p1: {
      en: 'This project was produced as commercial photography to present the tournament with a premium visual identity. The direction balanced action-focused frames with polished lifestyle shots to highlight both competitive energy and brand prestige.',
      ar: 'تم تنفيذ هذا المشروع كتغطية تصوير فوتوغرافي تجاري لإظهار البطولة بهوية بصرية راقية. جمع التوجيه البصري بين لقطات الحركة والمشاهد المصقولة ليبرز روح المنافسة وهيبة العلامة في الوقت نفسه.',
    },
    pf_golf_p2: {
      en: 'Our production pipeline covered concept alignment, on-site execution, and final retouching with consistent quality. The result was a complete commercial photo library ready for press use, social media, and campaign communication.',
      ar: 'غطى مسار العمل مواءمة الفكرة، والتنفيذ الميداني، والمعالجة النهائية بجودة ثابتة. والنتيجة كانت مكتبة صور فوتوغرافية تجارية متكاملة جاهزة للنشر الصحفي، والسوشال ميديا، والتواصل التسويقي.',
    },
    pf_golf_category: { en: 'Commercial Photography', ar: 'تصوير فوتوغرافي تجاري' },
    pf_golf_location: { en: 'Royal Greens, King Abdullah Economic City', ar: 'رويال جرينز، مدينة الملك عبدالله الاقتصادية' },
    pf_golf_deliverables: { en: 'Commercial Photo Set', ar: 'مجموعة صور فوتوغرافية تجارية' },
    pf_golf_window: { en: '2019', ar: '2019' },
    pf_golf_client: { en: 'Emaar Company', ar: 'شركة إعمار' },
    pf_saudi_breadcrumb: { en: 'Saudi Dent', ar: 'سعودي دينت' },
    pf_saudi_title: { en: 'Saudi Dent', ar: 'سعودي دينت' },
    pf_saudi_p1: {
      en: 'Saudi Dent required commercial photography that communicates trust, precision, and modern care standards. We built a polished visual direction using clean compositions, controlled lighting, and detail-focused shots to present the brand with confidence.',
      ar: 'احتاج مشروع سعودي دينت إلى تصوير فوتوغرافي تجاري يعكس الثقة والدقة ومعايير الرعاية الحديثة. بنينا توجهًا بصريًا مصقولًا عبر تكوينات نظيفة، وإضاءة منضبطة، ولقطات دقيقة التفاصيل لإبراز العلامة بثقة.',
    },
    pf_saudi_p2: {
      en: 'The final output was prepared as a commercial photo package for multi-platform usage, including digital campaigns, social publishing, and brand materials. This ensured a unified visual identity while emphasizing service quality and professional standards.',
      ar: 'جُهزت المخرجات كحزمة صور فوتوغرافية تجارية متعددة الاستخدامات تشمل الحملات الرقمية، والنشر على السوشال، ومواد العلامة. وضمن هذا النهج توحيد الهوية البصرية مع إبراز جودة الخدمة والمعايير الاحترافية.',
    },
    pf_saudi_category: { en: 'Commercial Photography', ar: 'تصوير فوتوغرافي تجاري' },
    pf_saudi_location: { en: 'Jeddah, Saudi Arabia', ar: 'جدة، المملكة العربية السعودية' },
    pf_saudi_deliverables: { en: 'Commercial Photo Set', ar: 'مجموعة صور فوتوغرافية تجارية' },
    pf_saudi_window: { en: '2024', ar: '2024' },
    pf_saudi_client: { en: 'Saudi Dent', ar: 'سعودي دينت' },
    pf_tazaj_page_title: { en: 'Tikka Sandwich by Al Tazaj | Portfolio Details', ar: 'ساندوتش تيكا من الطازج | تفاصيل العمل' },
    pf_breadcrumb_works: { en: 'Our Work', ar: 'أعمالنا' },
    pf_tazaj_breadcrumb: { en: 'Tikka Sandwich by Al Tazaj', ar: 'ساندوتش تيكا من الطازج' },
    pf_tazaj_subtitle: { en: 'Commercial Ad', ar: 'إعلان تجاري' },
    pf_tazaj_title: { en: 'Tikka Sandwich by Al Tazaj', ar: 'ساندوتش تيكا من الطازج' },
    pf_tazaj_category: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_tazaj_location: { en: 'Jeddah, Saudi Arabia', ar: 'جدة، المملكة العربية السعودية' },
    pf_tazaj_label_format: { en: 'Format:', ar: 'نوع المحتوى:' },
    pf_tazaj_label_date: { en: 'Project Date:', ar: 'تاريخ المشروع:' },
    pf_tazaj_format: { en: 'Commercial Video', ar: 'فيديو إعلاني' },
    pf_tazaj_window: { en: '2024', ar: '2024' },
    pf_tazaj_client: { en: 'Al Tazaj Restaurants', ar: 'مطاعم الطازج' },
    pf_trump_page_title: { en: 'Trump Tower Jeddah | Portfolio Details', ar: 'برج ترامب جدة | تفاصيل العمل' },
    pf_trump_breadcrumb: { en: 'Trump Tower Jeddah', ar: 'برج ترامب جدة' },
    pf_trump_subtitle: { en: 'Event Coverage', ar: 'تغطية فعالية' },
    pf_trump_title: { en: 'Trump Tower Jeddah', ar: 'برج ترامب جدة' },
    pf_trump_category: { en: 'Events', ar: 'فعاليات' },
    pf_trump_format: { en: 'Recap Video', ar: 'ريكاب فيديو' },
    pf_trump_window: { en: '2025', ar: '2025' },
    pf_trump_client: { en: 'Dar Global', ar: 'دار غلوبال' },
    portfolio_item_trump_title: { en: 'Trump Tower Jeddah', ar: 'برج ترامب جدة' },
    pf_zuluf_page_title: { en: 'Reel for Um Al Zuluf | Portfolio Details', ar: 'ريل لأم الزلف | تفاصيل العمل' },
    pf_zuluf_breadcrumb: { en: 'Reel for Um Al Zuluf', ar: 'ريل لأم الزلف' },
    pf_zuluf_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_zuluf_title: { en: 'Reel for Um Al Zuluf', ar: 'ريل لأم الزلف' },
    pf_zuluf_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_zuluf_format: { en: 'Reel Video', ar: 'فيديو ريل' },
    pf_zuluf_window: { en: '2025', ar: '2025' },
    pf_zuluf_client: { en: 'Um Al Zuluf', ar: 'أم الزلف' },
    portfolio_item_zuluf_title: { en: 'Reel for Um Al Zuluf', ar: 'ريل لأم الزلف' },
    pf_citywalk_page_title: { en: 'Final Film for City Walk 2024 | Portfolio Details', ar: 'الفيلم النهائي للستي ووك ٢٠٢٤ | تفاصيل العمل' },
    pf_citywalk_breadcrumb: { en: 'Final Film for City Walk 2024', ar: 'الفيلم النهائي للستي ووك ٢٠٢٤' },
    pf_citywalk_subtitle: { en: 'Films', ar: 'أفلام' },
    pf_citywalk_title: { en: 'Final Film for City Walk 2024', ar: 'الفيلم النهائي للستي ووك ٢٠٢٤' },
    pf_citywalk_category: { en: 'Films', ar: 'أفلام' },
    pf_citywalk_format: { en: 'Short Film', ar: 'فيلم قصير' },
    pf_citywalk_window: { en: '2024', ar: '2024' },
    pf_citywalk_client: { en: 'National Events Center', ar: 'المركز الوطني للفعاليات' },
    portfolio_item_citywalk_title: { en: 'Final Film for City Walk 2024', ar: 'الفيلم النهائي للستي ووك ٢٠٢٤' },
    pf_hoblo_page_title: { en: 'Hoplo Event | Portfolio Details', ar: 'ايفنت هوبلو | تفاصيل العمل' },
    pf_hoblo_breadcrumb: { en: 'Hoplo Event', ar: 'ايفنت هوبلو' },
    pf_hoblo_subtitle: { en: 'Event Coverage', ar: 'تغطية فعالية' },
    pf_hoblo_title: { en: 'Hoplo Event', ar: 'ايفنت هوبلو' },
    pf_hoblo_category: { en: 'Events', ar: 'فعاليات' },
    pf_hoblo_format: { en: 'Recap Video', ar: 'ريكاب فيديو' },
    pf_hoblo_window: { en: '2025', ar: '2025' },
    pf_hoblo_client: { en: 'Attar United', ar: 'عطار المتحدة' },
    portfolio_item_hoblo_title: { en: 'Hoplo Event', ar: 'ايفنت هوبلو' },
    pf_meetfish_page_title: { en: 'Reel for Meet The Fish | Portfolio Details', ar: 'ريل لميت ذا فيش | تفاصيل العمل' },
    pf_meetfish_breadcrumb: { en: 'Reel for Meet The Fish', ar: 'ريل لميت ذا فيش' },
    pf_meetfish_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_meetfish_title: { en: 'Reel for Meet The Fish', ar: 'ريل لميت ذا فيش' },
    pf_meetfish_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_meetfish_format: { en: 'Reel Video', ar: 'ريل فيديو' },
    pf_meetfish_window: { en: '2025', ar: '2025' },
    pf_meetfish_client: { en: 'Meet The Fish', ar: 'ميت ذا فيش' },
    portfolio_item_meetfish_title: { en: 'Reel for Meet The Fish', ar: 'ريل لميت ذا فيش' },
    pf_bookfair_page_title: { en: 'Book Fair | Portfolio Details', ar: 'معرض الكتاب | تفاصيل العمل' },
    pf_bookfair_breadcrumb: { en: 'Book Fair', ar: 'معرض الكتاب' },
    pf_bookfair_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_bookfair_title: { en: 'Book Fair', ar: 'معرض الكتاب' },
    pf_bookfair_category: { en: 'Events', ar: 'فعاليات' },
    pf_bookfair_format: { en: 'Highlight Video', ar: 'فيديو هايلايت' },
    pf_bookfair_window: { en: '2025', ar: '2025' },
    pf_bookfair_client: { en: 'Sine Company', ar: 'شركة ساين' },
    portfolio_item_bookfair_title: { en: 'Book Fair', ar: 'معرض الكتاب' },
    portfolio2_item_abdulsamad_title: { en: 'Ad Reel for Abdul Samad Al Qurashi', ar: 'ريل إعلاني لعبدالصمد القرشي' },
    portfolio2_item_method_title: { en: 'Coach Al Baiti Al Faisal Reel', ar: 'ريل للكوتش البيتي الفيصل' },
    portfolio2_item_asiafinal_title: { en: 'AFC Elite Champions League Final', ar: 'نهائي دوري أبطال آسيا للنخبة' },
    portfolio2_item_toba_title: { en: 'Toba The One', ar: 'توبا ذا ون' },
    portfolio2_item_muawad_title: { en: 'Muawad Event', ar: 'ايفنت معوض' },
    portfolio2_item_nationalday_title: { en: 'National Day Reel', ar: 'ريل اليوم الوطني' },
    portfolio2_item_tazajmovie_title: { en: 'Al Tazaj Movie Box', ar: 'موفي بوكس الطازج' },
    portfolio3_item_khalkhal_title: { en: 'Rannat Khalkhal Reel', ar: 'ريل رنة خلخال' },
    portfolio3_item_overdose_title: { en: 'Overdose Ice Cream', ar: 'اوفردوز ايس كريم' },
    portfolio3_item_safariextreme_title: { en: 'Safari Extreme', ar: 'سفاري اكستريم' },
    portfolio3_item_citywalkshops_title: { en: 'City Walk Shops Coverage', ar: 'تغطية محلات في السيتي ووك' },
    portfolio3_item_farisjewelry_title: { en: 'Jewelry Video', ar: 'فيديو مجوهرات' },
    portfolio3_item_fullgreenfarms_title: { en: 'Full Green Farms', ar: 'فول جرين فارمز' },
    portfolio3_item_madeinpakistan_title: { en: 'Made in Pakistan', ar: 'صنع في باكستان' },
    pf_abdulsamad_page_title: { en: 'Ad Reel for Abdul Samad Al Qurashi | Portfolio Details', ar: 'ريل إعلاني لعبدالصمد القرشي | تفاصيل العمل' },
    pf_abdulsamad_breadcrumb: { en: 'Ad Reel for Abdul Samad Al Qurashi', ar: 'ريل إعلاني لعبدالصمد القرشي' },
    pf_abdulsamad_subtitle: { en: 'Commercial Ad', ar: 'إعلان تجاري' },
    pf_abdulsamad_title: { en: 'Ad Reel for Abdul Samad Al Qurashi', ar: 'ريل إعلاني لعبدالصمد القرشي' },
    pf_abdulsamad_category: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_abdulsamad_format: { en: 'Ad Reel', ar: 'ريل إعلاني' },
    pf_abdulsamad_window: { en: '2025', ar: '2025' },
    pf_abdulsamad_client: { en: 'Digitect / Abdul Samad Al Qurashi', ar: 'ديجيتيكت / عبدالصمد القرشي' },
    pf_method_page_title: { en: 'Coach Al Baiti Al Faisal Reel | Portfolio Details', ar: 'ريل للكوتش البيتي الفيصل | تفاصيل العمل' },
    pf_method_breadcrumb: { en: 'Coach Al Baiti Al Faisal Reel', ar: 'ريل للكوتش البيتي الفيصل' },
    pf_method_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_method_title: { en: 'Coach Al Baiti Al Faisal Reel', ar: 'ريل للكوتش البيتي الفيصل' },
    pf_method_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_method_format: { en: 'Reel Video', ar: 'فيديو ريل' },
    pf_method_window: { en: '2025', ar: '2025' },
    pf_method_client: { en: 'Al Tareqah Al Muayyanah', ar: 'الطريقة المعينة' },
    pf_asiafinal_page_title: { en: 'AFC Elite Champions League Final | Portfolio Details', ar: 'نهائي دوري أبطال آسيا للنخبة | تفاصيل العمل' },
    pf_asiafinal_breadcrumb: { en: 'AFC Elite Champions League Final', ar: 'نهائي دوري أبطال آسيا للنخبة' },
    pf_asiafinal_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_asiafinal_title: { en: 'AFC Elite Champions League Final', ar: 'نهائي دوري أبطال آسيا للنخبة' },
    pf_asiafinal_category: { en: 'Events', ar: 'فعاليات' },
    pf_asiafinal_format: { en: 'Coverage', ar: 'تغطية' },
    pf_asiafinal_window: { en: '2025', ar: '2025' },
    pf_asiafinal_client: { en: 'Ministry of Sport', ar: 'وزارة الرياضة' },
    pf_toba_page_title: { en: 'Toba The One | Portfolio Details', ar: 'توبا ذا ون | تفاصيل العمل' },
    pf_toba_breadcrumb: { en: 'Toba The One', ar: 'توبا ذا ون' },
    pf_toba_subtitle: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_toba_title: { en: 'Toba The One', ar: 'توبا ذا ون' },
    pf_toba_category: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_toba_format: { en: 'Ad Reel', ar: 'ريل إعلاني' },
    pf_toba_window: { en: '2025', ar: '2025' },
    pf_toba_client: { en: 'Toba Perfumes', ar: 'توبا للعطور' },
    pf_muawad_page_title: { en: 'Muawad Event | Portfolio Details', ar: 'ايفنت معوض | تفاصيل العمل' },
    pf_muawad_breadcrumb: { en: 'Muawad Event', ar: 'ايفنت معوض' },
    pf_muawad_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_muawad_title: { en: 'Muawad Event', ar: 'ايفنت معوض' },
    pf_muawad_category: { en: 'Events', ar: 'فعاليات' },
    pf_muawad_format: { en: 'Recap Video', ar: 'ريكاب فيديو' },
    pf_muawad_window: { en: '2025', ar: '2025' },
    pf_muawad_client: { en: 'Attar United', ar: 'عطار المتحدة' },
    pf_nationalday_page_title: { en: 'National Day Reel | Portfolio Details', ar: 'ريل اليوم الوطني | تفاصيل العمل' },
    pf_nationalday_breadcrumb: { en: 'National Day Reel', ar: 'ريل اليوم الوطني' },
    pf_nationalday_subtitle: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_nationalday_title: { en: 'National Day Reel', ar: 'ريل اليوم الوطني' },
    pf_nationalday_category: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_nationalday_format: { en: 'Ad Reel', ar: 'ريل إعلاني' },
    pf_nationalday_window: { en: '2025', ar: '2025' },
    pf_nationalday_client: { en: 'Digitect / Abdul Samad Al Qurashi', ar: 'ديجيتكت / عبدالصمد القرشي' },
    pf_tazajmovie_page_title: { en: 'Al Tazaj Movie Box | Portfolio Details', ar: 'موفي بوكس الطازج | تفاصيل العمل' },
    pf_tazajmovie_breadcrumb: { en: 'Al Tazaj Movie Box', ar: 'موفي بوكس الطازج' },
    pf_tazajmovie_subtitle: { en: 'Commercial Ad', ar: 'إعلان تجاري' },
    pf_tazajmovie_title: { en: 'Al Tazaj Movie Box', ar: 'موفي بوكس الطازج' },
    pf_tazajmovie_category: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_tazajmovie_format: { en: 'Commercial Video', ar: 'فيديو إعلاني' },
    pf_tazajmovie_window: { en: '2024', ar: '2024' },
    pf_tazajmovie_client: { en: 'Al Tazaj Restaurants', ar: 'مطاعم الطازج' },
    pf_khalkhal_page_title: { en: 'Rannat Khalkhal Reel | Portfolio Details', ar: 'ريل رنة خلخال | تفاصيل العمل' },
    pf_khalkhal_breadcrumb: { en: 'Rannat Khalkhal Reel', ar: 'ريل رنة خلخال' },
    pf_khalkhal_subtitle: { en: 'Commercial Ad', ar: 'إعلان تجاري' },
    pf_khalkhal_title: { en: 'Rannat Khalkhal Reel', ar: 'ريل رنة خلخال' },
    pf_khalkhal_category: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_khalkhal_format: { en: 'Ad Reel', ar: 'ريل إعلاني' },
    pf_khalkhal_window: { en: '2025', ar: '2025' },
    pf_khalkhal_client: { en: 'Digitect / Abdul Samad Al Qurashi', ar: 'ديجيتكت / عبدالصمد القرشي' },
    pf_overdose_page_title: { en: 'Overdose Ice Cream | Portfolio Details', ar: 'اوفردوز ايس كريم | تفاصيل العمل' },
    pf_overdose_breadcrumb: { en: 'Overdose Ice Cream', ar: 'اوفردوز ايس كريم' },
    pf_overdose_subtitle: { en: 'Commercial Ad', ar: 'إعلان تجاري' },
    pf_overdose_title: { en: 'Overdose Ice Cream', ar: 'اوفردوز ايس كريم' },
    pf_overdose_category: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_overdose_format: { en: 'Commercial Video', ar: 'فيديو إعلاني' },
    pf_overdose_window: { en: '2025', ar: '2025' },
    pf_overdose_client: { en: 'Overdose', ar: 'اوفردوز' },
    pf_safariextreme_page_title: { en: 'Safari Extreme | Portfolio Details', ar: 'سفاري اكستريم | تفاصيل العمل' },
    pf_safariextreme_breadcrumb: { en: 'Safari Extreme', ar: 'سفاري اكستريم' },
    pf_safariextreme_subtitle: { en: 'Commercial Ad', ar: 'إعلان تجاري' },
    pf_safariextreme_title: { en: 'Safari Extreme', ar: 'سفاري اكستريم' },
    pf_safariextreme_category: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_safariextreme_format: { en: 'Ad Reel', ar: 'ريل إعلاني' },
    pf_safariextreme_window: { en: '2025', ar: '2025' },
    pf_safariextreme_client: { en: 'Digitect / Abdul Samad Al Qurashi', ar: 'ديجيتيكت / عبدالصمد القرشي' },
    pf_citywalkshops_page_title: { en: 'City Walk Shops Coverage | Portfolio Details', ar: 'تغطية محلات في السيتي ووك | تفاصيل العمل' },
    pf_citywalkshops_breadcrumb: { en: 'City Walk Shops Coverage', ar: 'تغطية محلات في السيتي ووك' },
    pf_citywalkshops_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_citywalkshops_title: { en: 'City Walk Shops Coverage', ar: 'تغطية محلات في السيتي ووك' },
    pf_citywalkshops_category: { en: 'Events', ar: 'فعاليات' },
    pf_citywalkshops_format: { en: 'Coverage Video', ar: 'فيديو تغطية' },
    pf_citywalkshops_window: { en: '2025', ar: '2025' },
    pf_citywalkshops_client: { en: 'National Events Center', ar: 'المركز الوطني للفعاليات' },
    pf_farisjewelry_page_title: { en: 'Jewelry Video | Portfolio Details', ar: 'فيديو مجوهرات | تفاصيل العمل' },
    pf_farisjewelry_breadcrumb: { en: 'Jewelry Video', ar: 'فيديو مجوهرات' },
    pf_farisjewelry_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_farisjewelry_title: { en: 'Jewelry Video', ar: 'فيديو مجوهرات' },
    pf_farisjewelry_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_farisjewelry_format: { en: 'Reel Video', ar: 'ريل فيديو' },
    pf_farisjewelry_window: { en: '2025', ar: '2025' },
    pf_farisjewelry_client: { en: 'Faris Jewelry', ar: 'مجوهرات فارس' },
    pf_fullgreenfarms_page_title: { en: 'Full Green Farms | Portfolio Details', ar: 'فول جرين فارمز | تفاصيل العمل' },
    pf_fullgreenfarms_breadcrumb: { en: 'Full Green Farms', ar: 'فول جرين فارمز' },
    pf_fullgreenfarms_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_fullgreenfarms_title: { en: 'Full Green Farms', ar: 'فول جرين فارمز' },
    pf_fullgreenfarms_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_fullgreenfarms_format: { en: 'Reel Video', ar: 'ريل فيديو' },
    pf_fullgreenfarms_window: { en: '2025', ar: '2025' },
    pf_fullgreenfarms_client: { en: 'Green Farms', ar: 'جرين فارمز' },
    pf_madeinpakistan_page_title: { en: 'Made in Pakistan | Portfolio Details', ar: 'صنع في باكستان | تفاصيل العمل' },
    pf_madeinpakistan_breadcrumb: { en: 'Made in Pakistan', ar: 'صنع في باكستان' },
    pf_madeinpakistan_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_madeinpakistan_title: { en: 'Made in Pakistan', ar: 'صنع في باكستان' },
    pf_madeinpakistan_category: { en: 'Events', ar: 'فعاليات' },
    pf_madeinpakistan_format: { en: 'Coverage Video', ar: 'فيديو تغطية' },
    pf_madeinpakistan_window: { en: '2025', ar: '2025' },
    pf_madeinpakistan_client: { en: 'Made in Pakistan', ar: 'صنع في باكستان' },
    pf_roomers_page_title: { en: 'Roomers Branch Opening | Portfolio Details', ar: 'افتتاح فرع روومرز | تفاصيل العمل' },
    pf_roomers_breadcrumb: { en: 'Roomers Branch Opening', ar: 'افتتاح فرع روومرز' },
    pf_roomers_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_roomers_title: { en: 'Roomers Branch Opening', ar: 'افتتاح فرع روومرز' },
    pf_roomers_category: { en: 'Events', ar: 'فعاليات' },
    pf_roomers_format: { en: 'Coverage Video', ar: 'فيديو تغطية' },
    pf_roomers_window: { en: '2024', ar: '2024' },
    pf_roomers_client: { en: 'Roomers', ar: 'روومرز' },
    pf_fi60_page_title: { en: 'Fi 60 | Portfolio Details', ar: 'في 60 | تفاصيل العمل' },
    pf_fi60_breadcrumb: { en: 'Fi 60', ar: 'في 60' },
    pf_fi60_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_fi60_title: { en: 'Fi 60', ar: 'في 60' },
    pf_fi60_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_fi60_format: { en: 'Video for Screens', ar: 'فيديو للشاشات' },
    pf_fi60_window: { en: '2025', ar: '2025' },
    pf_fi60_client: { en: 'Overdose', ar: 'اوفردوز' },
    pf_alfares_page_title: { en: 'Jewelry | Portfolio Details', ar: 'مجوهرات | تفاصيل العمل' },
    pf_alfares_breadcrumb: { en: 'Jewelry', ar: 'مجوهرات' },
    pf_alfares_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_alfares_title: { en: 'Jewelry', ar: 'مجوهرات' },
    pf_alfares_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_alfares_format: { en: 'Video for Screens', ar: 'فيديو للشاشات' },
    pf_alfares_window: { en: '2025', ar: '2025' },
    pf_alfares_client: { en: 'Al Fares Jewelry', ar: 'الفارس للمجوهرات' },
    pf_jewelry_page_title: { en: 'Jewelry | Portfolio Details', ar: 'مجوهرات | تفاصيل العمل' },
    pf_jewelry_breadcrumb: { en: 'Jewelry', ar: 'مجوهرات' },
    pf_jewelry_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_jewelry_title: { en: 'Jewelry', ar: 'مجوهرات' },
    pf_jewelry_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_jewelry_format: { en: 'Video for Screens', ar: 'فيديو للشاشات' },
    pf_jewelry_window: { en: '2025', ar: '2025' },
    pf_jewelry_client: { en: 'Jewelry', ar: 'مجوهرات' },
    pf_overdosegeneral_page_title: { en: 'Overdose General | Portfolio Details', ar: 'اوفردوز عام | تفاصيل العمل' },
    pf_overdosegeneral_breadcrumb: { en: 'Overdose General', ar: 'اوفردوز عام' },
    pf_overdosegeneral_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_overdosegeneral_title: { en: 'Overdose General', ar: 'اوفردوز عام' },
    pf_overdosegeneral_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_overdosegeneral_format: { en: 'General Video', ar: 'فيديو عام' },
    pf_overdosegeneral_window: { en: '2025', ar: '2025' },
    pf_overdosegeneral_client: { en: 'Overdose', ar: 'اوفردوز' },
    pf_qamariya_page_title: { en: 'Qamariya | Portfolio Details', ar: 'قيمرية | تفاصيل العمل' },
    pf_qamariya_breadcrumb: { en: 'Qamariya', ar: 'قيمرية' },
    pf_qamariya_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_qamariya_title: { en: 'Qamariya', ar: 'قيمرية' },
    pf_qamariya_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_qamariya_format: { en: 'Reel Video', ar: 'ريل فيديو' },
    pf_qamariya_window: { en: '2025', ar: '2025' },
    pf_qamariya_client: { en: 'Qamariya', ar: 'قيمرية' },
    pf_eventreel_page_title: { en: 'Reel for Al Tareeqah Al Mueinah | Portfolio Details', ar: 'ريل للطريقة المعينة | تفاصيل العمل' },
    pf_eventreel_breadcrumb: { en: 'Reel for Al Tareeqah Al Mueinah', ar: 'ريل للطريقة المعينة' },
    pf_eventreel_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_eventreel_title: { en: 'Reel for Al Tareeqah Al Mueinah', ar: 'ريل للطريقة المعينة' },
    pf_eventreel_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_eventreel_format: { en: 'Reel Video', ar: 'ريل فيديو' },
    pf_eventreel_window: { en: '2025', ar: '2025' },
    pf_eventreel_client: { en: 'Al Tareeqah Al Mueinah', ar: 'الطريقة المعينة' },
    pf_adnankhan_page_title: { en: 'Adnan Khan - Mujhse Duur | Portfolio Details', ar: 'عدنان خان - مجھ سے دور | تفاصيل العمل' },
    pf_adnankhan_breadcrumb: { en: 'Adnan Khan - Mujhse Duur', ar: 'عدنان خان - مجھ سے دور' },
    pf_adnankhan_subtitle: { en: 'Commercial Ad', ar: 'إعلان تجاري' },
    pf_adnankhan_title: { en: 'Adnan Khan - Mujhse Duur', ar: 'عدنان خان - مجھ سے دور' },
    pf_adnankhan_category: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_adnankhan_format: { en: 'Music Video', ar: 'فيديو كليب' },
    pf_adnankhan_window: { en: '2024', ar: '2024' },
    pf_adnankhan_client: { en: 'Adnan Khan', ar: 'عدنان خان' },
    pf_koozcake_page_title: { en: 'Kooz Cake | Portfolio Details', ar: 'كيكة كوز | تفاصيل العمل' },
    pf_koozcake_breadcrumb: { en: 'Kooz Cake', ar: 'كيكة كوز' },
    pf_koozcake_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_koozcake_title: { en: 'Kooz Cake', ar: 'كيكة كوز' },
    pf_koozcake_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_koozcake_format: { en: 'Reel Video', ar: 'ريل فيديو' },
    pf_koozcake_window: { en: '2023', ar: '2023' },
    pf_koozcake_client: { en: 'Kooz', ar: 'كوز' },
    pf_hungerstation_page_title: { en: 'HungerStation | Portfolio Details', ar: 'هنجرستيشن | تفاصيل العمل' },
    pf_hungerstation_breadcrumb: { en: 'HungerStation', ar: 'هنجرستيشن' },
    pf_hungerstation_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_hungerstation_title: { en: 'HungerStation', ar: 'هنجرستيشن' },
    pf_hungerstation_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_hungerstation_format: { en: 'Reel Video', ar: 'ريل فيديو' },
    pf_hungerstation_window: { en: '2023', ar: '2023' },
    pf_hungerstation_client: { en: 'HungerStation', ar: 'هنجرستيشن' },
    pf_eyewa_page_title: { en: 'Eyewa | Portfolio Details', ar: 'ايوا | تفاصيل العمل' },
    pf_eyewa_breadcrumb: { en: 'Eyewa', ar: 'ايوا' },
    pf_eyewa_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_eyewa_title: { en: 'Eyewa', ar: 'ايوا' },
    pf_eyewa_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_eyewa_format: { en: 'Reel Video', ar: 'ريل فيديو' },
    pf_eyewa_window: { en: '2023', ar: '2023' },
    pf_eyewa_client: { en: 'Eyewa Eyewear', ar: 'ايوا للنظارات' },
    pf_zedbbq_page_title: { en: 'Zed BBQ Box | Portfolio Details', ar: 'بوكس الباربكيو زد | تفاصيل العمل' },
    pf_zedbbq_breadcrumb: { en: 'Zed BBQ Box', ar: 'بوكس الباربكيو زد' },
    pf_zedbbq_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_zedbbq_title: { en: 'Zed BBQ Box', ar: 'بوكس الباربكيو زد' },
    pf_zedbbq_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_zedbbq_format: { en: 'Ad Video', ar: 'فيديو إعلاني' },
    pf_zedbbq_window: { en: '2023', ar: '2023' },
    pf_zedbbq_client: { en: 'Zed', ar: 'زد' },
    pf_coffeead_page_title: { en: 'Coffee Ad | Portfolio Details', ar: 'اعلان قهوة | تفاصيل العمل' },
    pf_coffeead_breadcrumb: { en: 'Coffee Ad', ar: 'اعلان قهوة' },
    pf_coffeead_subtitle: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_coffeead_title: { en: 'Coffee Ad', ar: 'اعلان قهوة' },
    pf_coffeead_category: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_coffeead_format: { en: 'Ad Video', ar: 'فيديو إعلاني' },
    pf_coffeead_window: { en: '2022', ar: '2022' },
    pf_coffeead_client: { en: '', ar: '' },
    pf_ferrariclub_page_title: { en: 'Saudi Ferrari Club Gathering | Portfolio Details', ar: 'تجمع نادي فيراري السعودي | تفاصيل العمل' },
    pf_ferrariclub_breadcrumb: { en: 'Saudi Ferrari Club Gathering', ar: 'تجمع نادي فيراري السعودي' },
    pf_ferrariclub_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_ferrariclub_title: { en: 'Saudi Ferrari Club Gathering', ar: 'تجمع نادي فيراري السعودي' },
    pf_ferrariclub_category: { en: 'Events', ar: 'فعاليات' },
    pf_ferrariclub_format: { en: 'Highlight Video', ar: 'فيديو هايلايت' },
    pf_ferrariclub_window: { en: '2025', ar: '2025' },
    pf_ferrariclub_client: { en: 'Saudi Ferrari Club', ar: 'نادي فيراري السعودي' },
    pf_azarad_page_title: { en: 'Azar Ad | Portfolio Details', ar: 'اعلان ازار | تفاصيل العمل' },
    pf_azarad_breadcrumb: { en: 'Azar Ad', ar: 'اعلان ازار' },
    pf_azarad_subtitle: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_azarad_title: { en: 'Azar Ad', ar: 'اعلان ازار' },
    pf_azarad_category: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    pf_azarad_format: { en: 'Ad Video', ar: 'فيديو إعلاني' },
    pf_azarad_window: { en: '2022', ar: '2022' },
    pf_azarad_client: { en: 'Azar', ar: 'ازار' },
    pf_kioskvision_page_title: { en: 'Kiosk in Vision Coverage | Portfolio Details', ar: 'تغطية كشك في ويشن | تفاصيل العمل' },
    pf_kioskvision_breadcrumb: { en: 'Kiosk in Vision Coverage', ar: 'تغطية كشك في ويشن' },
    pf_kioskvision_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_kioskvision_title: { en: 'Kiosk in Vision Coverage', ar: 'تغطية كشك في ويشن' },
    pf_kioskvision_category: { en: 'Events', ar: 'فعاليات' },
    pf_kioskvision_format: { en: 'Coverage Video', ar: 'فيديو تغطية' },
    pf_kioskvision_window: { en: '2024', ar: '2024' },
    pf_kioskvision_client: { en: 'Kiosk', ar: 'كشك' },
    pf_kikomilano_page_title: { en: 'Kiko Milano | Portfolio Details', ar: 'كيكو ميلانو | تفاصيل العمل' },
    pf_kikomilano_breadcrumb: { en: 'Kiko Milano', ar: 'كيكو ميلانو' },
    pf_kikomilano_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_kikomilano_title: { en: 'Kiko Milano', ar: 'كيكو ميلانو' },
    pf_kikomilano_category: { en: 'Events', ar: 'فعاليات' },
    pf_kikomilano_format: { en: 'Coverage Video', ar: 'فيديو تغطية' },
    pf_kikomilano_window: { en: '2024', ar: '2024' },
    pf_kikomilano_client: { en: 'Kiko Milano', ar: 'كيكو ميلانو' },
    pf_citywalkshows_page_title: { en: 'City Walk Roaming Shows | Portfolio Details', ar: 'العروض الجوالة سيتي ووك | تفاصيل العمل' },
    pf_citywalkshows_breadcrumb: { en: 'City Walk Roaming Shows', ar: 'العروض الجوالة سيتي ووك' },
    pf_citywalkshows_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_citywalkshows_title: { en: 'City Walk Roaming Shows', ar: 'العروض الجوالة سيتي ووك' },
    pf_citywalkshows_category: { en: 'Events', ar: 'فعاليات' },
    pf_citywalkshows_format: { en: 'Coverage Video', ar: 'فيديو تغطية' },
    pf_citywalkshows_window: { en: '2025', ar: '2025' },
    pf_citywalkshows_client: { en: 'National Events Center', ar: 'المركز الوطني للفعاليات' },
    pf_foundationarrar_page_title: { en: 'Founding Village Arar | Portfolio Details', ar: 'قرية التأسيس عرعر | تفاصيل العمل' },
    pf_foundationarrar_breadcrumb: { en: 'Founding Village Arar', ar: 'قرية التأسيس عرعر' },
    pf_foundationarrar_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_foundationarrar_title: { en: 'Founding Village Arar', ar: 'قرية التأسيس عرعر' },
    pf_foundationarrar_category: { en: 'Events', ar: 'فعاليات' },
    pf_foundationarrar_format: { en: 'Coverage Video', ar: 'فيديو تغطية' },
    pf_foundationarrar_window: { en: '2024', ar: '2024' },
    pf_foundationarrar_client: { en: 'Ministry of Culture', ar: 'وزارة الثقافة' },
    pf_bookfairhighlight_page_title: { en: 'Book Fair | Portfolio Details', ar: 'معرض الكتاب | تفاصيل العمل' },
    pf_bookfairhighlight_breadcrumb: { en: 'Book Fair', ar: 'معرض الكتاب' },
    pf_bookfairhighlight_subtitle: { en: 'Events', ar: 'فعاليات' },
    pf_bookfairhighlight_title: { en: 'Book Fair', ar: 'معرض الكتاب' },
    pf_bookfairhighlight_category: { en: 'Events', ar: 'فعاليات' },
    pf_bookfairhighlight_format: { en: 'Highlight Video', ar: 'فيديو هايلايت' },
    pf_bookfairhighlight_window: { en: '2025', ar: '2025' },
    pf_bookfairhighlight_client: { en: 'Literature, Publishing and Translation Commission', ar: 'هيئة الأدب والنشر والترجمة' },
    pf_selectedinterviews_page_title: { en: 'Selected Interviews | Portfolio Details', ar: 'مقابلات مختارة | تفاصيل العمل' },
    pf_selectedinterviews_breadcrumb: { en: 'Selected Interviews', ar: 'مقابلات مختارة' },
    pf_selectedinterviews_subtitle: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_selectedinterviews_title: { en: 'Selected Interviews', ar: 'مقابلات مختارة' },
    pf_selectedinterviews_category: { en: 'Social Media', ar: 'التواصل الاجتماعي' },
    pf_selectedinterviews_format: { en: 'Interviews / Podcast', ar: 'مقابلات / بودكاست' },
    pf_selectedinterviews_window: { en: '2025', ar: '2025' },
    pf_selectedinterviews_client: { en: '', ar: '' },
    blog1_page_title: { en: 'How Do You Choose a Professional Video Production Company for Your Project? | Art Ratio Blog', ar: 'كيف تختار شركة إنتاج فيديو احترافية لمشروعك؟ | Art Ratio Blog' },
    blog1_date: { en: '1 Feb 2026', ar: '1 فبراير 2026' },
    blog1_breadcrumb: { en: 'Professional Video Production', ar: 'إنتاج الفيديو الاحترافي' },
    blog1_meta_category: { en: 'Video Production', ar: 'إنتاج الفيديو' },
    blog1_title: {
      en: 'How Do You Choose a Professional Video Production Company for Your Project?',
      ar: 'كيف تختار شركة إنتاج فيديو احترافية لمشروعك؟',
    },
    blog1_card_excerpt: {
      en: 'Choosing a video production company is not simple. This guide helps you make a smart decision across quality, planning, and budget.',
      ar: 'اختيار شركة إنتاج فيديو مو قرار بسيط. هذا الدليل يساعدك تتخذ قرار مدروس واحترافي من ناحية الجودة، التخطيط، والتكلفة.',
    },
    blog1_intro_p1: {
      en: 'Choosing a video production company is not a simple decision. Today, video is essential for brand building, marketing, and audience communication.',
      ar: 'اختيار شركة إنتاج فيديو مو قرار بسيط. الفيديو اليوم عنصر أساسي في بناء العلامة التجارية، التسويق، والتواصل مع الجمهور.',
    },
    blog1_intro_p2: {
      en: 'The problem? The market is full of options, prices vary widely, and quality is not always clear at first glance.',
      ar: 'لكن المشكلة؟ السوق مليان خيارات، والأسعار متفاوتة، والجودة مو دائمًا واضحة من أول نظرة.',
    },
    blog1_intro_p3: {
      en: 'So how do you choose the right partner without risking your budget? This guide helps you make a smart, professional decision.',
      ar: 'فكيف تختار الجهة المناسبة لمشروعك بدون ما تغامر بميزانيتك؟ هذا الدليل يساعدك تتخذ قرار مدروس واحترافي.',
    },
    blog1_h1: { en: '1. Understand the Difference Between “Shooting” and “Full Production”', ar: '1. افهم الفرق بين التصوير والإنتاج الكامل' },
    blog1_h1_p1: { en: 'Many providers offer filming services, but professional production includes:', ar: 'كثير جهات تقدم خدمة تصوير، لكن الإنتاج الاحترافي يشمل:' },
    blog1_h1_li1: { en: 'Concept development', ar: 'تطوير الفكرة (Concept Development)' },
    blog1_h1_li2: { en: 'Scriptwriting', ar: 'كتابة السكريبت' },
    blog1_h1_li3: { en: 'Pre-production planning', ar: 'التخطيط المسبق (Pre-Production)' },
    blog1_h1_li4: { en: 'Production management', ar: 'إدارة التصوير' },
    blog1_h1_li5: { en: 'Lighting and sound', ar: 'الإضاءة والصوت' },
    blog1_h1_li6: { en: 'Editing and color grading', ar: 'المونتاج والتصحيح اللوني' },
    blog1_h1_li7: { en: 'Final broadcast-quality delivery', ar: 'إخراج نهائي بجودة بث' },
    blog1_h1_p2: { en: 'If the offer is limited to a “shooting day”, you are likely getting a video, not a full production project.', ar: 'إذا كان العرض اللي قدامك يقتصر على يوم تصوير، فأنت غالبًا تحصل على فيديو... مو مشروع إنتاج متكامل.' },
    blog1_h2: { en: '2. Ask to See Real Work', ar: '2. اطلب مشاهدة أعمال حقيقية' },
    blog1_h2_p1: { en: 'Cinematic shots are one thing, but building a complete story is another. When reviewing a portfolio, check:', ar: 'اللقطات السينمائية شيء، وبناء قصة متكاملة شيء ثاني. لما تشوف البورتفوليو، انتبه إلى:' },
    blog1_h2_li1: { en: 'Message clarity', ar: 'وضوح الرسالة' },
    blog1_h2_li2: { en: 'Sound quality', ar: 'جودة الصوت' },
    blog1_h2_li3: { en: 'Lighting consistency', ar: 'استقرار الإضاءة' },
    blog1_h2_li4: { en: 'Color grading quality', ar: 'مستوى تصحيح الألوان' },
    blog1_h2_li5: { en: 'Does the ad actually communicate the idea?', ar: 'هل الإعلان يوصّل فكرة فعلًا؟' },
    blog1_h2_p2: { en: 'A successful video should be understandable even without explanation.', ar: 'الفيديو الناجح لازم يكون مفهوم حتى لو شفته بدون شرح.' },
    blog1_inline_p1: { en: 'Before production starts, evaluating visual and operational quality helps reduce risk and ensures the video delivers business impact from the first version.', ar: 'قبل أي تنفيذ، تقييم جودة الجهة المنفذة بصريًا وتنظيميًا يساعدك تختصر المخاطر وتضمن أن الفيديو يحقق هدفه التجاري من أول نسخة.' },
    blog1_h3: { en: '3. Ask About Pre-Production', ar: '3. اسأل عن مرحلة ما قبل التصوير (Pre-Production)' },
    blog1_h3_p1: { en: 'Most video issues start before the camera rolls. A professional company should discuss:', ar: 'أغلب مشاكل الفيديو تبدأ قبل ما تبدأ الكاميرا. الشركة الاحترافية لازم تناقش معك:' },
    blog1_h3_li1: { en: 'Video objective', ar: 'هدف الفيديو' },
    blog1_h3_li2: { en: 'Target audience', ar: 'الجمهور المستهدف' },
    blog1_h3_li3: { en: 'Distribution platform', ar: 'المنصة اللي راح يُعرض فيها' },
    blog1_h3_li4: { en: 'Optimal duration', ar: 'مدة الفيديو المناسبة' },
    blog1_h3_li5: { en: 'Execution style', ar: 'أسلوب التنفيذ' },
    blog1_h3_p2: { en: 'Without pre-planning, even the best camera cannot save the result.', ar: 'بدون تخطيط مسبق، حتى أفضل كاميرا في العالم ما راح تنقذ النتيجة.' },
    blog1_seo_kw1: { type: 'html', en: '<strong>Key term:</strong> Professional video production company', ar: '<strong>كلمة مفتاحية مهمة:</strong> شركة إنتاج فيديو احترافية' },
    blog1_seo_kw2: { type: 'html', en: '<strong>Related terms:</strong> Commercial video production - Professional ad filming', ar: '<strong>كلمات مفتاحية مرتبطة:</strong> إنتاج فيديو تجاري - تصوير إعلانات احترافية' },
    blog1_inline_p2: { en: 'Pre-production is the backbone of any successful project, connecting message to execution and preventing time and budget waste.', ar: 'مرحلة ما قبل التصوير هي العمود الفقري لأي مشروع ناجح، لأنها تربط الرسالة بالتصوير الفعلي وتمنع الهدر في الوقت والتكلفة أثناء التنفيذ.' },
    blog1_h4: { en: '4. Do Not Be Misled by the Lowest Price', ar: '4. لا تنخدع بالسعر الأقل' },
    blog1_h4_p1: { en: 'Good production depends on a professional team, professional equipment, sufficient execution time, and polished post-production.', ar: 'الإنتاج الجيد يعتمد على فريق محترف، معدات احترافية، وقت كافي للتنفيذ، ومرحلة مونتاج متقنة.' },
    blog1_h4_p2: { en: 'Very low pricing usually means cutting corners in one of these stages, resulting in a video that soon needs re-production.', ar: 'السعر المنخفض جدًا غالبًا يعني اختصار في مرحلة من هذه المراحل، والنتيجة فيديو يحتاج إعادة إنتاج بعد فترة قصيرة.' },
    blog1_h5: { en: '5. Sound Quality Is as Important as Visual Quality', ar: '5. جودة الصوت لا تقل أهمية عن الصورة' },
    blog1_h5_p1: { en: 'One of the most common mistakes in commercial videos is neglecting sound.', ar: 'أحد أكثر الأخطاء شيوعًا في الفيديوهات التجارية هو إهمال الصوت.' },
    blog1_h5_p2: { en: 'Unclear or noisy audio reduces the professionalism of the entire project, even when visuals are excellent.', ar: 'صوت غير واضح أو مليء بالضجيج يقلل احترافية المشروع بالكامل حتى لو كانت الصورة ممتازة.' },
    blog1_h5_p3: { en: 'Clean audio reflects high professionalism and increases viewer trust.', ar: 'الصوت النظيف يعكس احترافية عالية ويزيد ثقة المشاهد.' },
    blog1_h6: { en: '6. Ask About Workflow and Timeline', ar: '6. اسأل عن آلية العمل والجدول الزمني' },
    blog1_h6_p1: { en: 'An organized company should clearly explain:', ar: 'شركة منظمة راح توضح لك:' },
    blog1_h6_li1: { en: 'Project stages', ar: 'مراحل المشروع' },
    blog1_h6_li2: { en: 'Execution timeline', ar: 'جدول التنفيذ' },
    blog1_h6_li3: { en: 'Number of revisions', ar: 'عدد المراجعات' },
    blog1_h6_li4: { en: 'File delivery process', ar: 'طريقة تسليم الملفات' },
    blog1_h6_p2: { en: 'A clear workflow saves time and reduces misunderstandings.', ar: 'وجود Workflow واضح يوفر وقت ويقلل سوء الفهم.' },
    blog1_conclusion_h: { en: 'Conclusion', ar: 'الخلاصة' },
    blog1_conclusion_p1: { en: 'Choosing a professional video production company requires more than a strong camera or a suitable price.', ar: 'اختيار شركة إنتاج فيديو احترافية يعتمد على أكثر من مجرد كاميرا قوية أو سعر مناسب.' },
    blog1_conclusion_p2: { en: 'What matters most is clear goals, solid planning, professional execution, and final delivery that reflects your project’s value.', ar: 'الأهم هو فهم عميق للهدف، تخطيط مدروس، تنفيذ احترافي، وإخراج نهائي يعكس قيمة مشروعك.' },
    blog1_conclusion_p3: { en: 'A successful video is not just content. It is a long-term investment in your brand image.', ar: 'الفيديو الناجح مو مجرد محتوى... هو استثمار طويل المدى في صورة علامتك.' },
    blog1_reply_title: { en: 'Leave A Reply', ar: 'اترك تعليقك' },
    blog1_reply_note: { en: 'Required fields: Full Name and Comment. Email is optional and will not be published.', ar: 'الحقول المطلوبة: الاسم الكامل والتعليق. البريد الإلكتروني اختياري ولن يتم نشره.' },
    blog1_form_name: { en: 'Full Name*', ar: 'الاسم الكامل*' },
    blog1_form_email: { en: 'Email', ar: 'البريد الإلكتروني' },
    blog1_form_website: { en: 'Website*', ar: 'الموقع الإلكتروني*' },
    blog1_form_comment: { en: 'Write Your Comment*', ar: 'اكتب تعليقك*' },
    blog1_form_send: { en: 'Send Message', ar: 'إرسال التعليق' },
    blog_comments_title: { en: 'Comments', ar: 'التعليقات' },
    blog_comments_title_count: { en: 'Comments ({count})', ar: 'التعليقات ({count})' },
    blog_comments_empty: { en: 'No comments yet.', ar: 'لا يوجد تعليقات حتى الآن.' },
    blog_comments_loading: { en: 'Loading comments...', ar: 'جاري تحميل التعليقات...' },
    blog_comments_load_failed: { en: 'Unable to load comments.', ar: 'تعذر تحميل التعليقات.' },
    blog_comments_submit_success: { en: 'Your comment was published.', ar: 'تم نشر تعليقك بنجاح.' },
    blog_comments_submit_pending: { en: 'Your comment was submitted and is awaiting moderation.', ar: 'تم استلام تعليقك وهو بانتظار المراجعة.' },
    blog_comments_submit_failed: { en: 'Unable to submit your comment.', ar: 'تعذر إرسال التعليق.' },
    blog_comments_invalid_name: { en: 'Name is required (at least 2 characters).', ar: 'الاسم مطلوب (حرفين على الأقل).' },
    blog_comments_invalid_email: { en: 'Please enter a valid email.', ar: 'البريد الإلكتروني غير صحيح.' },
    blog_comments_invalid_comment: { en: 'Comment is required (at least 3 characters).', ar: 'التعليق مطلوب (3 أحرف على الأقل).' },
    blog_comments_anonymous: { en: 'Visitor', ar: 'زائر' },
    blog_comments_unknown_date: { en: 'Unknown date', ar: 'تاريخ غير معروف' },
    blog1_author_name: { en: 'Art Ratio Team', ar: 'فريق آرت ريشيو' },
    blog1_sidebar_search_title: { en: 'Search', ar: 'بحث' },
    blog1_sidebar_search_placeholder: { en: 'Search...', ar: 'ابحث...' },
    blog1_sidebar_categories_title: { en: 'Categories', ar: 'التصنيفات' },
    blog1_sidebar_cat_1: { en: 'Video Production', ar: 'إنتاج الفيديو' },
    blog1_sidebar_cat_2: { en: 'Product Photography', ar: 'تصوير المنتجات' },
    blog1_sidebar_cat_3: { en: 'Filmmaking & Lighting', ar: 'تقنيات التصوير والإضاءة' },
    blog1_sidebar_cat_4: { en: 'All Articles', ar: 'كل المقالات' },
    blog1_sidebar_cat_5: { en: 'Event Coverage', ar: 'تغطية الفعاليات' },
    blog1_sidebar_recent_title: { en: 'Recent Posts', ar: 'أحدث المقالات' },
    blog1_sidebar_recent_1: { en: 'How to choose a professional video production company...', ar: 'كيف تختار شركة إنتاج فيديو احترافية لمشروعك؟' },
    blog1_sidebar_recent_2: { en: 'Professional product photography guide...', ar: 'تصوير المنتجات الاحترافي: دليل شامل لنجاح متجرك الإلكتروني' },
    blog1_sidebar_recent_3: { en: 'Cinematic lighting basics...', ar: 'أساسيات الإضاءة السينمائية: كيف تصنع صورة احترافية في الفيديو؟' },
    blog1_sidebar_recent_4: { en: 'Professional event coverage guide...', ar: 'تغطية الفعاليات الاحترافية: كيف توثق الحدث وتُبرز تأثيره؟' },
    blog1_sidebar_archives_title: { en: 'Archives', ar: 'الأرشيف' },
    blog1_sidebar_archive_1: { en: 'Full Archive', ar: 'الأرشيف الكامل' },
    blog1_sidebar_archive_2: { en: '15 Feb 2026', ar: '15 فبراير 2026' },
    blog1_sidebar_archive_3: { en: '8 Feb 2026', ar: '8 فبراير 2026' },
    blog1_sidebar_archive_4: { en: '1 Feb 2026', ar: '1 فبراير 2026' },
    blog1_sidebar_archive_5: { en: 'February 2026', ar: 'فبراير 2026' },
    blog1_sidebar_tags_title: { en: 'Tags', ar: 'الوسوم' },
    blog1_sidebar_tag_1: { en: 'Video Production', ar: 'إنتاج الفيديو' },
    blog1_sidebar_tag_2: { en: 'Product Photography', ar: 'تصوير المنتجات' },
    blog1_sidebar_tag_3: { en: 'Cinematic Lighting', ar: 'الإضاءة السينمائية' },
    blog1_sidebar_tag_4: { en: 'Commercial Ads', ar: 'الإعلانات التجارية' },
    blog1_sidebar_tag_5: { en: 'Interviews', ar: 'المقابلات' },
    blog1_sidebar_tag_6: { en: 'Color Grading', ar: 'تصحيح الألوان' },
    blog1_sidebar_tag_7: { en: 'Behind The Scenes', ar: 'خلف الكواليس' },
    blog1_sidebar_tag_8: { en: 'Event Coverage', ar: 'تغطية الفعاليات' },
    blog2_page_title: { en: 'Professional Product Photography | A Complete Guide for E-Commerce', ar: 'تصوير المنتجات الاحترافي | دليل شامل للتجارة الإلكترونية' },
    blog2_breadcrumb: { en: 'Professional Product Photography', ar: 'تصوير المنتجات الاحترافي' },
    blog2_date: { en: '8 Feb 2026', ar: '8 فبراير 2026' },
    blog2_meta_category: { en: 'Product Photography', ar: 'تصوير المنتجات' },
    blog2_title: { en: 'Professional Product Photography: A Complete Guide to E-Commerce Success', ar: 'تصوير المنتجات الاحترافي: دليل شامل لنجاح متجرك الإلكتروني' },
    blog2_intro_p1: { en: 'In e-commerce, an image is not just a visual element. It is a key factor in the purchase decision.', ar: 'في عالم التجارة الإلكترونية، الصورة ليست مجرد عنصر بصري، بل هي العامل الأساسي في اتخاذ قرار الشراء.' },
    blog2_intro_p2: { en: 'Customers cannot touch or try the product, so they rely fully on images for first impressions. That is where the gap appears between ordinary photos and professional product photography.', ar: 'العميل لا يستطيع لمس المنتج أو تجربته، لذلك يعتمد بالكامل على الصورة لتكوين انطباع أولي. وهنا يظهر الفرق بين صورة عادية وصورة ناتجة عن تصوير المنتجات الاحترافي.' },
    blog2_intro_p3: { en: 'This guide explains why product photography is critical for any online store and which foundations ensure strong results.', ar: 'هذا الدليل يوضح لماذا يعتبر تصوير المنتجات عنصرًا حاسمًا في نجاح أي متجر إلكتروني، وما هي الأسس التي تضمن نتائج قوية.' },
    blog2_h1: { en: 'Why Is Professional Product Photography Important?', ar: 'لماذا يعتبر تصوير المنتجات الاحترافي مهمًا؟' },
    blog2_h1_p1: { en: 'Consumer behavior studies show that:', ar: 'تشير دراسات سلوك المستهلك إلى أن:' },
    blog2_h1_li1: { en: 'Image quality directly affects trust.', ar: 'جودة الصورة تؤثر مباشرة على الثقة.' },
    blog2_h1_li2: { en: 'Clear images increase conversion rates.', ar: 'الصور الواضحة تزيد معدل التحويل.' },
    blog2_h1_li3: { en: 'Showing details reduces return rates.', ar: 'عرض التفاصيل يقلل نسبة المرتجعات.' },
    blog2_h1_p2: { en: 'A professional image does not just display the product. It highlights value, quality, and fine details.', ar: 'الصورة الاحترافية لا تعرض المنتج فقط، بل تبرز قيمته وجودته وتفاصيله الدقيقة.' },
    blog2_h2: { en: 'The Difference Between Ordinary and Professional Images', ar: 'الفرق بين الصورة العادية والصورة الاحترافية' },
    blog2_h2_p1: { en: 'An ordinary image often has unbalanced lighting, distracting shadows, inaccurate colors, and a noisy background.', ar: 'الصورة العادية غالبًا تكون بإضاءة غير متوازنة، ظلال مزعجة، ألوان غير دقيقة، وخلفية مشتتة.' },
    blog2_h2_p2: { en: 'A professional image uses deliberate lighting, natural light-shadow balance, accurate colors, and a clean background that supports the product.', ar: 'أما الصورة الاحترافية فتكون بإضاءة مدروسة تعكس الخامات، توزيع ظل ونور طبيعي، ألوان دقيقة متوافقة مع الواقع، وخلفية نظيفة تخدم المنتج.' },
    blog2_h2_p3: { en: 'The visual difference may seem small, but commercially it is significant.', ar: 'الفرق قد يبدو بسيطًا بصريًا، لكنه مؤثر جدًا تجاريًا.' },
    blog2_inline_p1: { en: 'Professional visuals increase perceived value and build buyer trust before reading any detailed description.', ar: 'الصورة الاحترافية ترفع القيمة المدركة للمنتج وتبني ثقة العميل قبل قراءة أي وصف تفصيلي.' },
    blog2_h3: { en: 'The Role of Lighting in Product Photography', ar: 'دور الإضاءة في تصوير المنتجات' },
    blog2_h3_p1: { en: 'Lighting is the most important element in professional product photography. Common methods include:', ar: 'الإضاءة هي العنصر الأهم في تصوير المنتجات الاحترافي. ومن أشهر الأساليب:' },
    blog2_h3_li1: { en: 'Soft lighting to highlight smoothness.', ar: 'Soft Lighting لإبراز النعومة.' },
    blog2_h3_li2: { en: 'Hard lighting to reveal texture.', ar: 'Hard Lighting لإظهار الملمس.' },
    blog2_h3_li3: { en: 'Rim light to separate the product from the background.', ar: 'Rim Light لفصل المنتج عن الخلفية.' },
    blog2_h3_p2: { en: 'Poor lighting can make a premium product look low quality.', ar: 'إضاءة خاطئة قد تجعل منتجًا فاخرًا يبدو منخفض الجودة.' },
    blog2_h4: { en: 'Why Background Matters in Product Images', ar: 'أهمية الخلفية في صور المنتجات' },
    blog2_h4_p1: { en: 'A background is not just empty space. It depends on product type, target market, and display platform (store, ad, social).', ar: 'الخلفية ليست مجرد مساحة فارغة. اختيار الخلفية يعتمد على نوع المنتج، السوق المستهدف، ومنصة العرض (متجر - إعلان - سوشال).' },
    blog2_h4_p2: { en: 'White backgrounds suit e-commerce stores, while dark backgrounds strengthen premium positioning.', ar: 'الخلفية البيضاء مناسبة للمتاجر الإلكترونية، بينما الخلفيات الداكنة تعزز الطابع الفاخر.' },
    blog2_h5: { en: 'Professional Retouching: Improve Without Misrepresenting', ar: 'التعديل الاحترافي: تحسين دون تغيير' },
    blog2_h5_p1: { en: 'Professional retouching removes dust and visual flaws, cleans reflections, balances lighting, and enhances details.', ar: 'التعديل الاحترافي يهدف إلى إزالة الغبار أو العيوب البصرية، تنظيف الانعكاسات، توحيد الإضاءة، وإبراز التفاصيل.' },
    blog2_h5_p2: { en: 'The key is realism. Over-editing can reduce credibility.', ar: 'المهم أن يبقى المنتج واقعيًا. التعديل المبالغ فيه قد يقلل المصداقية.' },
    blog2_inline_p2: { en: 'Balanced shooting and smart post-processing produce persuasive visuals while preserving product realism.', ar: 'التوازن بين التصوير الجيد والمعالجة الذكية يعطي صورة مقنعة بصريًا وتحافظ على واقعية المنتج.' },
    blog2_h6: { en: 'How Does Image Quality Affect Buying Decisions?', ar: 'كيف تؤثر جودة الصورة على قرار الشراء؟' },
    blog2_h6_p1: { en: 'Customers evaluate products in seconds. A professional image signals clarity, precision, and trust.', ar: 'العميل يقيّم المنتج خلال ثوانٍ. صورة احترافية تعني وضوح، دقة، وثقة.' },
    blog2_h6_p2: { en: 'That translates into higher conversion, less hesitation, and stronger brand perception.', ar: 'وهذا يترجم إلى زيادة معدل التحويل، تقليل التردد، وتعزيز صورة العلامة التجارية.' },
    blog2_h7: { en: 'E-Commerce Product Photography vs. Advertising Photography', ar: 'تصوير المنتجات للتجارة الإلكترونية مقابل الإعلانات' },
    blog2_h7_p1: { type: 'html', en: '<strong>E-commerce photography:</strong> Clean background, multiple angles, precise details.', ar: '<strong>تصوير التجارة الإلكترونية:</strong> خلفية نظيفة، زوايا متعددة، تفاصيل دقيقة.' },
    blog2_h7_p2: { type: 'html', en: '<strong>Advertising photography:</strong> Dramatic lighting, creative color treatment, and focus on emotion more than technical details.', ar: '<strong>تصوير الإعلانات:</strong> إضاءة درامية، معالجة لونية إبداعية، وتركيز على الإحساس أكثر من التفاصيل التقنية.' },
    blog2_h7_p3: { en: 'Each goal needs its own approach.', ar: 'لكل هدف أسلوبه.' },
    blog2_h8: { en: 'Common Product Photography Mistakes', ar: 'أخطاء شائعة في تصوير المنتجات' },
    blog2_h8_li1: { en: 'Using harsh direct lighting.', ar: 'استخدام إضاءة مباشرة وقاسية.' },
    blog2_h8_li2: { en: 'Ignoring reflections on glossy surfaces.', ar: 'تجاهل انعكاسات الأسطح اللامعة.' },
    blog2_h8_li3: { en: 'Inconsistent color across images.', ar: 'عدم توحيد الألوان بين الصور.' },
    blog2_h8_li4: { en: 'Uncoordinated backgrounds.', ar: 'خلفيات غير متناسقة.' },
    blog2_h8_li5: { en: 'Compressing images at low quality.', ar: 'ضغط الصور بجودة منخفضة.' },
    blog2_h8_p1: { en: 'Avoiding these mistakes immediately improves your store quality.', ar: 'تجنب هذه الأخطاء يرفع جودة متجرك فورًا.' },
    blog2_h9: { en: 'Tips to Improve Product Images in Your Store', ar: 'نصائح لتحسين صور المنتجات في متجرك' },
    blog2_h9_li1: { en: 'Use multiple angles.', ar: 'استخدم أكثر من زاوية.' },
    blog2_h9_li2: { en: 'Include close-up detail shots.', ar: 'اعرض لقطة قريبة للتفاصيل.' },
    blog2_h9_li3: { en: 'Keep lighting consistent.', ar: 'حافظ على اتساق الإضاءة.' },
    blog2_h9_li4: { en: 'Adjust image dimensions to platform requirements.', ar: 'اضبط أبعاد الصور بما يناسب المنصة.' },
    blog2_h9_li5: { en: 'Use WebP format to improve site speed.', ar: 'استخدم صيغة WebP لتحسين سرعة الموقع.' },
    blog2_conclusion_h: { en: 'Conclusion', ar: 'الخلاصة' },
    blog2_conclusion_p1: { en: 'Professional product photography is not a luxury. It is a direct investment in sales growth and trust building.', ar: 'تصوير المنتجات الاحترافي ليس رفاهية. هو استثمار مباشر في زيادة المبيعات وبناء الثقة.' },
    blog2_conclusion_p2: { en: 'In highly competitive e-commerce markets, images can be the difference between a product that sells and one that gets ignored.', ar: 'في بيئة تنافسية مثل التجارة الإلكترونية، الصورة قد تكون الفارق بين منتج يُباع ومنتج يُتجاهل.' },
    blog2_seo_kw1: { type: 'html', en: '<strong>Focus Keyword:</strong> Professional Product Photography', ar: '<strong>Focus Keyword:</strong> تصوير المنتجات الاحترافي' },
    blog2_seo_kw2: { type: 'html', en: '<strong>Secondary Keywords:</strong> E-commerce product photography - Professional product photography in Saudi Arabia - Product photography lighting - Product images for online stores - Product Photography', ar: '<strong>Secondary Keywords:</strong> تصوير منتجات للتجارة الإلكترونية - تصوير منتجات احترافي في السعودية - إضاءة تصوير المنتجات - صور المنتجات للمتاجر الإلكترونية - Product Photography' },
    blog2_card_excerpt: { en: 'Learn why professional product photography is essential for e-commerce, and how lighting and detail affect buying decisions and sales growth.', ar: 'تعرف على أهمية تصوير المنتجات الاحترافي في المتاجر الإلكترونية، وكيف تؤثر الإضاءة والتفاصيل الدقيقة على قرار الشراء وزيادة المبيعات.' },
    blog3_page_title: { en: 'Cinematic Lighting | A Complete Guide to Professional Video Visuals', ar: 'الإضاءة السينمائية | دليل شامل لصناعة فيديو احترافي' },
    blog3_breadcrumb: { en: 'Cinematic Lighting Basics', ar: 'أساسيات الإضاءة السينمائية' },
    blog3_date: { en: '15 Feb 2026', ar: '15 فبراير 2026' },
    blog3_meta_category: { en: 'Filmmaking & Lighting Techniques', ar: 'تقنيات التصوير والإضاءة' },
    blog3_title: { en: 'Cinematic Lighting Basics: How to Create a Professional Video Image?', ar: 'أساسيات الإضاءة السينمائية: كيف تصنع صورة احترافية في الفيديو؟' },
    blog3_card_excerpt: { en: 'A practical guide to cinematic lighting fundamentals and light-shadow distribution for deeper, more impactful professional video.', ar: 'دليل عملي يشرح أساسيات الإضاءة السينمائية وتوزيع الضوء والظل لصناعة فيديو احترافي أكثر عمقًا وتأثيرًا.' },
    blog3_intro_p1: { en: 'You may own the best camera, highest resolution, and most expensive lens, but without intentional lighting, the result remains average.', ar: 'قد تمتلك أفضل كاميرا، وأعلى دقة تصوير، وأغلى عدسة، لكن من دون إضاءة مدروسة ستبقى النتيجة عادية.' },
    blog3_intro_p2: { en: 'Cinematic lighting is not just illumination. It is a key tool for mood, depth, and directing viewer attention.', ar: 'الإضاءة السينمائية ليست مجرد إنارة للمشهد، بل أداة أساسية لصناعة المزاج، وبناء العمق، وتوجيه انتباه المشاهد.' },
    blog3_intro_p3: { en: 'This guide walks through core cinematic lighting principles and practical techniques to build stronger, more impactful visuals.', ar: 'في هذا الدليل، نستعرض أساسيات الإضاءة السينمائية وتقنيات الإضاءة الاحترافية التي تساعدك على صناعة صورة أقوى بصريًا وأكثر تأثيرًا.' },
    blog3_toc_title: { en: 'Table of Contents', ar: 'جدول المحتويات' },
    blog3_toc_1: { en: 'What is cinematic lighting?', ar: 'ما المقصود بالإضاءة السينمائية؟' },
    blog3_toc_2: { en: 'Three-point lighting rule', ar: 'قاعدة الإضاءة الثلاثية' },
    blog3_toc_3: { en: 'Soft vs hard lighting', ar: 'الإضاءة الناعمة والحادة' },
    blog3_toc_4: { en: 'Creating visual depth', ar: 'صناعة العمق البصري' },
    blog3_toc_5: { en: 'Color temperature and common mistakes', ar: 'درجة حرارة اللون والأخطاء الشائعة' },
    blog3_toc_6: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
    blog3_h1: { en: 'What is cinematic lighting?', ar: 'ما المقصود بالإضاءة السينمائية؟' },
    blog3_h1_p1: { en: 'Cinematic lighting means using light and shadow intentionally to serve story and scene. It is not light quantity, but light distribution quality.', ar: 'الإضاءة السينمائية تعني استخدام الضوء والظل بشكل مقصود لخدمة القصة والمشهد. هي ليست كمية ضوء، بل جودة توزيع الضوء.' },
    blog3_h1_p2: { en: 'When controlled correctly, lighting creates clear depth, dramatic or natural mood, subject emphasis, and professional light-shadow balance.', ar: 'عند التحكم بالإضاءة بشكل صحيح، يمكن تحقيق عمق بصري واضح، وإحساس درامي أو طبيعي، وتركيز على عنصر محدد داخل الإطار، وتوازن احترافي بين الظل والنور.' },
    blog3_h1_p3: { en: 'Light defines what viewers see, and shadow defines what they feel.', ar: 'الضوء يحدد ما يراه المشاهد، والظل يحدد ما يشعر به.' },
    blog3_h2: { en: 'Three-Point Lighting Rule', ar: 'قاعدة الإضاءة الثلاثية' },
    blog3_h2_p1: { en: 'Three-point lighting is a core foundation of professional video, especially in interviews and commercials.', ar: 'تُعتبر قاعدة الإضاءة الثلاثية أساس تصوير الفيديو الاحترافي، خاصة في المقابلات والإعلانات.' },
    blog3_h2_li1: { type: 'html', en: '<strong>Key Light:</strong> Primary source shaping direction and shadows.', ar: '<strong>الضوء الرئيسي:</strong> يحدد اتجاه الضوء وشكل الظلال.' },
    blog3_h2_li2: { type: 'html', en: '<strong>Fill Light:</strong> Reduces shadows while preserving natural contrast.', ar: '<strong>ضوء التعبئة:</strong> يخفف الظلال مع الحفاظ على التباين الطبيعي.' },
    blog3_h2_li3: { type: 'html', en: '<strong>Back Light:</strong> Separates subject from background and adds depth.', ar: '<strong>الإضاءة الخلفية:</strong> تفصل العنصر عن الخلفية وتضيف عمقًا للصورة.' },
    blog3_h2_p2: { en: 'Applying this simple rule correctly improves scene quality immediately.', ar: 'تطبيق هذه القاعدة بشكل صحيح يرفع جودة أي مشهد فورًا.' },
    blog3_inline_p1: { en: 'Smart light-shadow distribution gives the scene visual dimension and strengthens the message inside the frame.', ar: 'التوزيع الذكي للضوء والظل يمنح المشهد بعدًا بصريًا واضحًا ويقوّي الرسالة داخل الكادر.' },
    blog3_h3: { en: 'Soft Light vs Hard Light', ar: 'الفرق بين الإضاءة الناعمة والإضاءة الحادة' },
    blog3_h3_p1: { en: 'Soft light creates gentle shadows and natural balance, ideal for people and products.', ar: 'الإضاءة الناعمة تعطي ظلالًا خفيفة ومظهرًا طبيعيًا متوازنًا، وهي مثالية لتصوير الأشخاص والمنتجات.' },
    blog3_h3_p2: { en: 'Hard light creates strong contrast and clear edges, highlighting texture and dramatic style.', ar: 'الإضاءة الحادة تعطي ظلالًا واضحة وتباينًا قويًا وتبرز الملمس، وتناسب المشاهد الإعلانية أو ذات الطابع الفني.' },
    blog3_h3_p3: { en: 'The lighting style always depends on the visual objective of the scene.', ar: 'اختيار نوع الإضاءة يعتمد دائمًا على الهدف البصري للمشهد.' },
    blog3_h4: { en: 'How to Create Visual Depth with Lighting', ar: 'كيف تصنع عمقًا بصريًا باستخدام الإضاءة؟' },
    blog3_h4_li1: { en: 'Keep background brighter or darker than the subject.', ar: 'اجعل الخلفية أغمق أو أفتح بدرجة مختلفة عن العنصر الرئيسي.' },
    blog3_h4_li2: { en: 'Use subtle back light to separate subject.', ar: 'استخدم إضاءة خلفية خفيفة لفصل العنصر.' },
    blog3_h4_li3: { en: 'Use intentional contrast between light and shadow.', ar: 'اعتمد على تباين مدروس بين الضوء والظل.' },
    blog3_h4_li4: { en: 'Avoid lighting everything at equal intensity.', ar: 'لا تضيء كل شيء بنفس القوة.' },
    blog3_h4_p1: { en: 'Depth makes the shot more realistic and professional.', ar: 'العمق يجعل المشهد أكثر واقعية واحترافية.' },
    blog3_inline_p2: { en: 'Across production setups, balance between lighting and grading is what separates ordinary shots from cinematic imagery.', ar: 'في بيئات الإنتاج المختلفة، التوازن بين الإضاءة والتعديل اللوني هو ما يصنع الفارق بين مشهد عادي وصورة سينمائية.' },
    blog3_h5: { en: 'Color Temperature and Common Mistakes', ar: 'أهمية درجة حرارة اللون والأخطاء الشائعة' },
    blog3_h5_p1: { en: 'Color temperature shapes scene feeling: 3200K is warm, 5600K is daylight, and cooler values can feel modern or dramatic.', ar: 'درجة حرارة اللون تؤثر مباشرة على إحساس المشهد: 3200 كلفن دافئة، 5600 كلفن نهارية، والدرجات الأبرد قد تضيف طابعًا عصريًا أو دراميًا.' },
    blog3_h5_p2: { en: 'Unplanned mixing of temperature values often creates visual imbalance.', ar: 'الخلط غير المدروس بين درجات الحرارة المختلفة قد ينتج صورة غير متوازنة بصريًا.' },
    blog3_h5_li1: { en: 'Relying on a single light source.', ar: 'الاعتماد على مصدر ضوء واحد.' },
    blog3_h5_li2: { en: 'Ignoring unwanted shadows.', ar: 'تجاهل الظلال غير المرغوبة.' },
    blog3_h5_li3: { en: 'Lighting background at the same intensity as subject.', ar: 'إضاءة الخلفية بنفس شدة العنصر الرئيسي.' },
    blog3_h5_li4: { en: 'Mixing temperatures without purpose.', ar: 'خلط درجات حرارة مختلفة دون مبرر.' },
    blog3_h5_li5: { en: 'Flat lighting that kills depth.', ar: 'الإضاءة المسطحة التي تقتل العمق.' },
    blog3_h5_p3: { en: 'Avoiding these errors noticeably improves final video quality.', ar: 'تجنب هذه الأخطاء يرفع جودة الفيديو بشكل ملحوظ.' },
    blog3_h6: { en: 'Practical Tips to Improve Lighting in Any Project', ar: 'نصائح عملية لتحسين الإضاءة في أي مشروع' },
    blog3_h6_li1: { en: 'Test light angle before increasing intensity.', ar: 'جرّب زاوية الضوء قبل زيادة شدته.' },
    blog3_h6_li2: { en: 'Use reflectors to control shadow.', ar: 'استخدم عواكس للتحكم بالظل.' },
    blog3_h6_li3: { en: 'Use diffusion when you need to soften harsh light.', ar: 'أضف ناشرًا ضوئيًا لتنعيم الضوء الحاد عند الحاجة.' },
    blog3_h6_li4: { en: 'Check the scene in-camera before official shooting.', ar: 'اختبر المشهد على الكاميرا قبل بدء التصوير الرسمي.' },
    blog3_h6_p1: { en: 'Great lighting depends not only on gear, but on understanding, experimentation, and continuous adjustment.', ar: 'الإضاءة الجيدة لا تعتمد فقط على المعدات، بل على الفهم والتجربة والتعديل المستمر.' },
    blog3_internal_links: { type: 'html', en: 'Lighting plays a central role in every stage of <a href=\"blog/video-production/how-to-choose-professional-video-production-company/\">professional video production</a>, and also in <a href=\"blog/product-photography/professional-product-photography-ecommerce/\">product photography</a>.', ar: 'تلعب الإضاءة دورًا محوريًا في جميع مراحل <a href=\"blog/video-production/how-to-choose-professional-video-production-company/\">إنتاج الفيديو الاحترافي</a>، وكذلك في <a href=\"blog/product-photography/professional-product-photography-ecommerce/\">تصوير المنتجات</a>.' },
    blog3_faq_title: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
    blog3_faq_q1: { en: 'What is cinematic lighting?', ar: 'ما هي الإضاءة السينمائية؟' },
    blog3_faq_a1: { en: 'It is a professional way to distribute light and shadow to create depth and visual impact that serves the story.', ar: 'هي طريقة احترافية لتوزيع الضوء والظل في المشهد لخلق عمق وتأثير بصري يخدم القصة.' },
    blog3_faq_q2: { en: 'What is the difference between soft and hard lighting?', ar: 'ما الفرق بين الإضاءة الناعمة والحادة؟' },
    blog3_faq_a2: { en: 'Soft light creates gentle shadows and a natural look, while hard light creates strong contrast and defined shadows.', ar: 'الإضاءة الناعمة تعطي ظلالًا خفيفة ومظهرًا طبيعيًا، بينما الإضاءة الحادة تعطي تباينًا قويًا وظلالًا واضحة.' },
    blog3_faq_q3: { en: 'What is Three-Point Lighting?', ar: 'ما هي قاعدة الإضاءة الثلاثية؟' },
    blog3_faq_a3: { en: 'A lighting setup based on three sources: key, fill, and back light for balanced professional visuals.', ar: 'هي تقنية تعتمد على ثلاثة مصادر ضوء: رئيسي، تعبئة، وخلفي لتحقيق توازن بصري احترافي.' },
    blog3_conclusion_h: { en: 'Conclusion', ar: 'الخلاصة' },
    blog3_conclusion_p1: { en: 'Cinematic lighting is not only technical, it is a visual language on its own.', ar: 'الإضاءة السينمائية ليست عنصرًا تقنيًا فقط، بل لغة بصرية قائمة بحد ذاتها.' },
    blog3_conclusion_p2: { en: 'When light is applied intentionally, an ordinary shot becomes a professional visual with strong impact.', ar: 'عندما يوظَّف الضوء بشكل مدروس، تتحول اللقطة العادية إلى صورة احترافية ذات تأثير بصري قوي.' },
    blog3_conclusion_p3: { en: 'The difference between ordinary and professional video often starts here: with light.', ar: 'الفرق بين فيديو عادي وفيديو احترافي غالبًا يبدأ من هنا، من الضوء.' },
    blog3_seo_kw1: { type: 'html', en: '<strong>Focus Keyword:</strong> Cinematic Lighting', ar: '<strong>الكلمة المفتاحية:</strong> الإضاءة السينمائية' },
    blog3_seo_kw2: { type: 'html', en: '<strong>Secondary Keywords:</strong> Professional video lighting - Video lighting setup - Lighting techniques in cinematography - Cinematic Lighting - Three Point Lighting - Interview lighting - Light and shadow distribution', ar: '<strong>الكلمات المفتاحية الثانوية:</strong> إضاءة تصوير احترافية - إعدادات الإضاءة للفيديو - تقنيات الإضاءة في التصوير - الإضاءة السينمائية - الإضاءة الثلاثية - إضاءة المقابلات - توزيع الضوء والظل' },
    blog4_page_title: { en: 'Professional Event Coverage | Complete Guide to Event Filming', ar: 'تغطية الفعاليات الاحترافية | دليل شامل لتصوير الإفنتات' },
    blog4_breadcrumb: { en: 'Professional Event Coverage', ar: 'تغطية الفعاليات الاحترافية' },
    blog_breadcrumb: { en: 'Blog', ar: 'كشكولنا' },
    blog4_date: { en: '22 Feb 2026', ar: '22 فبراير 2026' },
    blog4_meta_category: { en: 'Event Coverage', ar: 'تغطية الفعاليات' },
    blog4_title: { en: 'Professional Event Coverage: How to Document Your Event and Maximize Its Impact?', ar: 'تغطية الفعاليات الاحترافية: كيف توثق الحدث وتُبرز تأثيره؟' },
    blog4_card_excerpt: { en: 'A complete guide to professional event coverage, from planning and filming to delivering impactful media-ready content.', ar: 'دليل شامل حول تغطية الفعاليات الاحترافية من التخطيط والتصوير إلى إخراج المحتوى بما يعكس قوة الحدث ويعزز حضوره الإعلامي.' },
    blog4_intro_p1: { en: 'Events and conferences are no longer just gatherings. They are strategic tools for brand image and media presence.', ar: 'الفعاليات والمؤتمرات لم تعد مجرد تجمعات، بل أصبحت أدوات استراتيجية لبناء الصورة وتعزيز الحضور الإعلامي.' },
    blog4_intro_p2: { en: 'But event success does not stop at organization. It extends to how it is documented and presented afterward.', ar: 'لكن نجاح الحدث لا يتوقف عند تنظيمه، بل يمتد إلى كيفية توثيقه وعرضه لاحقًا.' },
    blog4_intro_p3: { en: 'This is where professional event coverage becomes critical.', ar: 'هنا يأتي دور تغطية الفعاليات الاحترافية.' },
    blog4_h1: { en: 'What Is Event Coverage?', ar: 'ما المقصود بتغطية الفعاليات؟' },
    blog4_h1_p1: { en: 'Event coverage is the professional and structured visual documentation of an event, including:', ar: 'تغطية الفعاليات تعني توثيق الحدث بصريًا بطريقة منظمة واحترافية، وتشمل:' },
    blog4_h1_li1: { en: 'Video production.', ar: 'تصوير الفيديو.' },
    blog4_h1_li2: { en: 'Photography.', ar: 'التصوير الفوتوغرافي.' },
    blog4_h1_li3: { en: 'Capturing key moments, speeches, and producing publish-ready media content.', ar: 'التقاط اللحظات الرئيسية وتسجيل الكلمات والخطابات وإنتاج محتوى قابل للنشر الإعلامي.' },
    blog4_h1_p2: { en: 'The goal is not just documentation, but highlighting the value and impact of the event.', ar: 'الهدف ليس فقط التوثيق، بل إبراز قيمة الحدث وتأثيره.' },
    blog4_h2: { en: 'Why Is Professional Event Coverage Essential?', ar: 'لماذا تعتبر تغطية الفعاليات عنصرًا أساسيًا؟' },
    blog4_h2_p1: { en: 'Professional coverage expands post-event reach, builds a strong visual archive, and supports media campaigns.', ar: 'التغطية الاحترافية تساعد على توسيع نطاق الوصول بعد انتهاء الحدث، وبناء أرشيف بصري قوي، ودعم الحملات الإعلامية.' },
    blog4_h2_p2: { en: 'It also strengthens the organizer’s image and extends the event life cycle.', ar: 'كما تعزز صورة الجهة المنظمة وتمنح الحدث عمرًا أطول من وقت انعقاده.' },
    blog4_h2_p3: { en: 'The event may last hours, but its content can live for years.', ar: 'الحدث قد يستمر ساعات، لكن المحتوى الناتج قد يعيش لسنوات.' },
    blog4_inline_p1: { en: 'Great event coverage starts before production day by defining event type, key moments, agenda flow, camera positions, lighting, and sound.', ar: 'نجاح تغطية الفعاليات يبدأ قبل يوم التنفيذ بتحديد نوع الحدث، أهم اللحظات، جدول الفقرات، مواقع الكاميرات، والإضاءة والصوت.' },
    blog4_h3: { en: 'Core Elements in Event Filming', ar: 'عناصر مهمة في تصوير الفعاليات' },
    blog4_h3_p1: { en: 'The most important quality drivers are:', ar: 'أهم العناصر التي ترفع جودة التغطية:' },
    blog4_h3_li1: { en: 'Multiple camera angles for richer edits.', ar: 'زوايا تصوير متعددة توفر لقطات متنوعة وتغني المونتاج.' },
    blog4_h3_li2: { en: 'Clear audio capture, especially in conferences and speeches.', ar: 'تسجيل صوت واضح، خاصة في المؤتمرات والخطابات الرسمية.' },
    blog4_h3_li3: { en: 'Balanced lighting for clear visuals even in large venues.', ar: 'إضاءة متوازنة تضمن وضوح الصورة حتى في القاعات الكبيرة.' },
    blog4_h3_p2: { en: 'And rapid response in capturing moments that never repeat.', ar: 'وسرعة في التقاط اللحظات لأن بعض اللقطات لا تتكرر.' },
    blog4_h4: { en: 'Standard Coverage vs. Professional Coverage', ar: 'الفرق بين التغطية العادية والاحترافية' },
    blog4_h4_p1: { en: 'Standard coverage is often random filming with unstructured shots and weak planning.', ar: 'التغطية العادية غالبًا تكون تصويرًا عشوائيًا ولقطات غير منظمة مع غياب التخطيط.' },
    blog4_h4_p2: { en: 'Professional coverage uses a clear plan, distributed roles, story-driven filming, and publish-ready output.', ar: 'أما الاحترافية فتقوم على خطة واضحة، توزيع أدوار، وتصوير يخدم قصة الحدث مع إخراج نهائي جاهز للنشر.' },
    blog4_h5: { en: 'Why Post-Event Editing Matters', ar: 'أهمية المونتاج بعد الفعالية' },
    blog4_h5_p1: { en: 'Post-production is as important as shoot day. It can produce highlights, social clips, and a full event archive.', ar: 'مرحلة ما بعد الحدث لا تقل أهمية عن يوم التصوير، ويمكن خلالها إنتاج فيديو ملخص، مقاطع قصيرة للسوشال، وأرشيف كامل للحدث.' },
    blog4_h5_p2: { en: 'Strong post-production turns documentation into impactful media content.', ar: 'الإخراج الجيد يحول التوثيق إلى محتوى مؤثر يعكس قوة الحدث.' },
    blog4_inline_p2: { en: 'Common mistakes to avoid: single-camera coverage, skipping audio checks, ignoring dynamic lighting, and missing an agenda plan.', ar: 'أخطاء شائعة يجب تجنبها: الاعتماد على كاميرا واحدة، إهمال اختبار الصوت، تجاهل الإضاءة المتغيرة، وعدم وجود خطة لجدول الحدث.' },
    blog4_h6: { en: 'Tips for Successful Event Coverage', ar: 'نصائح لنجاح أي تغطية فعالية' },
    blog4_h6_p1: { en: 'Arrive early, review the agenda, and verify all equipment readiness.', ar: 'احضر قبل الوقت بوقت كافٍ، راجع جدول الفقرات، وتأكد من جاهزية المعدات.' },
    blog4_h6_p2: { en: 'Plan opening and closing shots, and prepare a fast-delivery version right after the event.', ar: 'خطط للقطات الافتتاحية والختامية، وجهز نسخة سريعة للنشر بعد الحدث.' },
    blog4_conclusion_h: { en: 'Conclusion', ar: 'الخلاصة' },
    blog4_conclusion_p1: { en: 'Professional event coverage is not only documenting what happened. It is producing media that reflects event value and strengthens media presence.', ar: 'تغطية الفعاليات الاحترافية لا تقتصر على توثيق ما حدث، بل على صناعة محتوى يعكس قيمة الحدث ويعزز حضوره الإعلامي.' },
    blog4_conclusion_p2: { en: 'The difference between standard and professional coverage lies in planning, organized execution, and deliberate finishing.', ar: 'الفرق بين تغطية عادية وتغطية احترافية يكمن في التخطيط، التنفيذ المنظم، والإخراج المدروس.' },
    blog4_faq_title: { en: 'FAQ', ar: 'الأسئلة الشائعة' },
    blog4_faq_q1: { en: 'What is professional event coverage?', ar: 'ما هي تغطية الفعاليات الاحترافية؟' },
    blog4_faq_a1: { en: 'It is a structured process of filming and documenting events to capture key moments and produce media-ready content.', ar: 'هي عملية تصوير وتوثيق الحدث بطريقة منظمة تبرز أهم اللحظات وتنتج محتوى قابل للنشر الإعلامي.' },
    blog4_faq_q2: { en: 'What is the difference between event filming and commercial filming?', ar: 'ما الفرق بين تصوير الفعاليات وتصوير الإعلانات؟' },
    blog4_faq_a2: { en: 'Event filming documents reality as it happens, while commercials rely on pre-planned and staged direction.', ar: 'تصوير الفعاليات يركز على توثيق الحدث كما يحدث، بينما الإعلان يعتمد على إخراج مخطط ومُعاد تمثيله.' },
    blog4_faq_q3: { en: 'Do small events need professional coverage?', ar: 'هل تحتاج الفعاليات الصغيرة لتغطية احترافية؟' },
    blog4_faq_a3: { en: 'Yes. The resulting content is valuable for marketing and strengthening media presence.', ar: 'نعم، لأن المحتوى الناتج يمكن استخدامه للتسويق وبناء الحضور الإعلامي.' },
    blog4_seo_kw1: { type: 'html', en: '<strong>Focus Keyword:</strong> Professional Event Coverage', ar: '<strong>Focus Keyword:</strong> تغطية الفعاليات الاحترافية' },
    blog4_seo_kw2: { type: 'html', en: '<strong>Secondary Keywords:</strong> Event filming - Conference coverage - Formal occasions filming - Event Coverage - Saudi event coverage', ar: '<strong>Secondary Keywords:</strong> تصوير فعاليات - تغطية مؤتمرات - تصوير مناسبات رسمية - Event Coverage - تصوير إفنتات - تغطية فعاليات في السعودية' },
    portfolio_load_more: { en: 'Load More', ar: 'تحميل المزيد' },
    team_hero_title: { en: 'Team', ar: 'فريقنا' },
    team_abdulqader_name: { en: 'Abdulqader Bdawi', ar: 'عبدالقادر البديوي' },
    team_ammar_name: { en: 'Ammar Alkhatib', ar: 'عمار الخطيب' },
    team_taha_name: { en: 'Taha Zarifah', ar: 'طه ظريفة' },
    team_adnan_name: { en: 'Adnan Alkhatib', ar: 'عدنان الخطيب' },
    team_leon_name: { en: 'Mohammed Leon', ar: 'محمد ليون' },
    team_hararah_name: { en: 'Mohammed Hararah', ar: 'محمد حرارة' },
    team_role_camera: { type: 'html', en: '<span dir=\"ltr\">Camera Dept.</span>', ar: 'قسم الكاميرا' },
    team_role_dop_director: { type: 'html', en: '<span dir=\"ltr\">DOP/Director</span>', ar: 'مدير تصوير / مخرج' },
    team_role_gaffer: { type: 'html', en: '<span dir=\"ltr\">Gaffer</span>', ar: 'رئيس قسم الإضاءة' },
    team_role_light: { type: 'html', en: '<span dir=\"ltr\">Light Dept.</span>', ar: 'قسم الإضاءة' },
    team_abdulqader_page_title: { en: 'Abdulqader Bdawi - Team Details', ar: 'عبدالقادر البديوي - تفاصيل الفريق' },
    team_abdulqader_role: { type: 'html', en: '<span dir=\"ltr\">Camera Dept.</span>', ar: 'قسم الكاميرا' },
    team_abdulqader_bio_p1: {
      en: 'Abdulqader supports camera operations with strong focus on framing consistency, lens setup, and on-set workflow discipline.',
      ar: 'عبدالقادر شغوف ومبدع، يمتلك خبرة ميدانية في التقاط وتوثيق اللحظات بأسلوب احترافي ومؤثر، ويتميّز بفهم عميق لتكوين الصورة، الإضاءة، وزوايا التصوير.',
    },
    team_abdulqader_bio_p2: {
      en: 'He contributes to smooth shot execution and helps maintain visual continuity across commercial and event productions.',
      ar: 'يسعى دائمًا لتحويل الأفكار إلى محتوى بصري يلفت الانتباه ويعبّر عن الرسالة بوضوح، ويؤمن أن كل لقطة تحمل قصة، ودوره أن يرويها بأفضل جودة وبأدق التفاصيل مع الحفاظ على انسيابية التنفيذ والاستمرارية البصرية.',
    },
    team_ammar_page_title: { en: 'Ammar Alkhatib - Team Details', ar: 'عمار الخطيب - تفاصيل الفريق' },
    team_ammar_role: { type: 'html', en: '<span dir=\"ltr\">DOP/Director</span>', ar: 'مدير تصوير / مخرج' },
    team_ammar_bio_p1: {
      en: 'Ammar leads visual direction from concept to final frame, balancing storytelling, lighting strategy, and cinematic composition.',
      ar: 'عمار مدير تصوير ومخرج يقود الصورة برؤية واضحة وحضور هادئ خلف الكاميرا. لا يتعامل مع المشهد كإطار جميل فقط، بل كبنية متكاملة من الإحساس، الإيقاع، والحركة، جامعًا بين الحس البصري العميق والدقة التقنية.',
    },
    team_ammar_bio_p2: {
      en: 'As DOP/Director, he aligns creative vision with production execution to deliver high-impact, brand-focused visuals.',
      ar: 'خبرته في الإنتاجات التجارية والمشاريع عالية المستوى منحته قدرة على قراءة الفكرة بسرعة، إدارة الفريق بثقة، وتحويل الرؤية إلى تنفيذ محكم. يفكر كمخرج ويرى كمدير تصوير، ويعتبر كل قرار بصري عنصرًا مؤثرًا في التجربة النهائية، لذلك يتعامل مع كل مشروع كمساحة لرفع السقف وتقديم نسخة أفضل مما يمكن تقديمه.',
    },
    team_taha_page_title: { en: 'Taha Zarifah - Team Details', ar: 'طه ظريفة - تفاصيل الفريق' },
    team_taha_role: { type: 'html', en: '<span dir=\"ltr\">Camera Dept.</span>', ar: 'قسم الكاميرا' },
    team_taha_bio_p1: {
      en: 'Taha works across camera prep and operation, ensuring technical readiness, clean movement, and reliable capture under production pressure.',
      ar: 'يعمل طه على إدارة تفاصيل الكاميرا بدقة عالية، من تجهيز المعدات إلى تنفيذ الحركة داخل المشهد بثبات وانضباط. يتعامل مع التصوير كعملية متكاملة تجمع بين الحس البصري والجاهزية التقنية، ليضمن صورة نظيفة وواضحة تحت ضغط التنفيذ.',
    },
    team_taha_bio_p2: {
      en: 'His role strengthens on-set precision and helps the team deliver consistent image quality in every setup.',
      ar: 'خبرته الميدانية تمنحه قدرة على قراءة متطلبات اللقطة بسرعة، والتكيّف مع تغيّر الظروف دون التأثير على جودة الناتج. يسعى دائمًا إلى دعم الفريق بإيقاع عمل منظم يرفع دقة التنفيذ ويحافظ على استمرارية الصورة في كل إعداد تصوير.',
    },
    team_adnan_page_title: { en: 'Adnan Alkhatib - Team Details', ar: 'عدنان الخطيب - تفاصيل الفريق' },
    team_adnan_role: { type: 'html', en: '<span dir=\"ltr\">Gaffer</span>', ar: 'رئيس قسم الإضاءة' },
    team_adnan_bio_p1: {
      en: 'Adnan manages lighting execution with attention to exposure control, mood design, and practical on-set safety.',
      ar: 'يعمل عدنان على صناعة الصورة بروح فنية وتقنية عالية، ويؤمن أن الإضاءة ليست مجرد إنارة للمشهد، بل لغة تحكي القصة وتعكس المشاعر. يمتلك خبرة في استخدام المعدات الاحترافية وتوظيف الظل والنور لصناعة عمق بصري مؤثر.',
    },
    team_adnan_bio_p2: {
      en: 'As Gaffer, he translates the visual plan into stable, production-ready lighting environments for every scene.',
      ar: 'كرئيس قسم الإضاءة، يسعى دائمًا لخلق أجواء بصرية تخدم الرؤية الإخراجية وتعزز هوية العمل، ويحوّل الخطة البصرية إلى بيئات إضاءة مستقرة وجاهزة إنتاجيًا لكل مشهد. طموحه أن يترك بصمة خاصة في كل مشروع يشارك فيه، وأن يرتقي بمستوى الصورة السينمائية في كل تجربة.',
    },
    team_leon_page_title: { en: 'Mohammed Leon - Team Details', ar: 'محمد ليون - تفاصيل الفريق' },
    team_leon_role: { type: 'html', en: '<span dir=\"ltr\">Light Dept.</span>', ar: 'قسم الإضاءة' },
    team_leon_bio_p1: {
      en: 'Mohammed Leon supports the lighting team in rigging, positioning, and fine adjustments that shape scene depth and clarity.',
      ar: 'يساهم ليون في تنفيذ الإضاءة بعين دقيقة تجمع بين الحس الجمالي والانضباط الفني، من التثبيت والتمركز حتى أدق التعديلات داخل المشهد. يؤمن أن توزيع الضوء ليس إجراءً تقنيًا فقط، بل عنصر أساسي في بناء العمق وإبراز التفاصيل بصريًا.',
    },
    team_leon_bio_p2: {
      en: 'He helps maintain efficient setup flow and consistent lighting quality throughout the shooting day.',
      ar: 'في كل مشروع، يعمل على خلق بيئة إضاءة متوازنة تخدم الرؤية الإخراجية وتحافظ على ثبات الجودة طوال يوم التصوير. هدفه أن يترك أثرًا واضحًا في النتيجة النهائية عبر تنفيذ منظم يرفع قيمة الصورة من أول لقطة حتى آخر مشهد.',
    },
    team_hararah_page_title: { en: 'Mohammed Hararah - Team Details', ar: 'محمد حرارة - تفاصيل الفريق' },
    team_hararah_role: { type: 'html', en: '<span dir=\"ltr\">Light Dept.</span>', ar: 'قسم الإضاءة' },
    team_hararah_bio_p1: {
      en: 'Mohammed Hararah contributes to lighting preparation and on-set support to achieve controlled, expressive visual atmospheres.',
      ar: 'يعمل حرارة على تجهيز وتنفيذ الإضاءة بروح تجمع بين الحس الفني والدقة العملية، مع فهم واضح لتأثير الظل والنور في بناء الجو البصري. يتعامل مع كل مشهد باعتباره مساحة تعبير، ويحرص على أن تكون الإضاءة أداة داعمة للإحساس والمعنى قبل الشكل.',
    },
    team_hararah_bio_p2: {
      en: 'His work ensures dependable lighting transitions and clean execution across changing production conditions.',
      ar: 'خبرته في مواقع التصوير تمنحه مرونة عالية في التعامل مع تغيّر الظروف مع الحفاظ على انتقالات إضاءة دقيقة وتنفيذ نظيف. يطمح دائمًا إلى تقديم مستوى بصري متماسك يترك بصمة واضحة، ويعزز جودة العمل في كل تجربة إنتاجية يشارك فيها.',
    },
    shop_hero_title: { en: 'Equipment List', ar: 'قائمة المعدات' },
    shop_breadcrumb: { en: 'Equipment List', ar: 'قائمة المعدات' },
    shop_search_placeholder: { en: 'Search Products...', ar: 'ابحث عن المنتجات...' },
    shop_categories_title: { en: 'Categories', ar: 'التصنيفات' },
    shop_category_design: { en: 'Design (5)', ar: 'تصميم (5)' },
    shop_category_creative: { en: 'Creative (2)', ar: 'إبداعي (2)' },
    shop_category_illustration: { en: 'Illustration (3)', ar: 'رسوم توضيحية (3)' },
    shop_price_title: { en: 'Price Filter', ar: 'تصفية السعر' },
    shop_tags_title: { en: 'Tags', ar: 'الوسوم' },
    shop_tag_brand: { en: 'Brand', ar: 'علامة تجارية' },
    shop_tag_digital: { en: 'Digital', ar: 'رقمي' },
    shop_tag_marketing: { en: 'Marketing', ar: 'تسويق' },
    shop_tag_creative: { en: 'Creative', ar: 'إبداعي' },
    shop_tag_graphics: { en: 'Graphics', ar: 'جرافيكس' },
    shop_showing_results: { en: 'Showing 1–9 of 12 results', ar: 'عرض 1–9 من 12 نتيجة' },
    shop_sort_latest: { en: 'Sort by latest', ar: 'الأحدث' },
    shop_sort_low: { en: 'Sort by low price', ar: 'السعر من الأقل إلى الأعلى' },
    shop_sort_high: { en: 'Sort by high price', ar: 'السعر من الأعلى إلى الأقل' },
    shop_product_title: { en: 'Future AI robot toys', ar: 'ألعاب روبوت الذكاء الاصطناعي المستقبلية' },
    shop_product_price: { en: 'Price: $550', ar: 'السعر: $550' },
    cart_hero_title: { en: 'Cart', ar: 'طلبات المعدات' },
    cart_breadcrumb: { en: 'Cart', ar: 'طلبات المعدات' },
    cart_request_title: { en: 'Request List', ar: 'قائمة الطلب' },
    cart_request_subtitle: {
      en: 'Review and adjust equipment before sending your request.',
      ar: 'راجع وعدّل المعدات قبل إرسال الطلب.',
    },
    cart_empty: { en: 'Your request list is empty.', ar: 'قائمة الطلب فارغة.' },
    cart_table_item: { en: 'Item', ar: 'العنصر' },
    cart_table_category: { en: 'Category', ar: 'التصنيف' },
    cart_table_qty: { en: 'Qty', ar: 'الكمية' },
    cart_send_heading: { en: 'Send Request', ar: 'إرسال الطلب' },
    cart_total_items: { en: 'Total Items', ar: 'إجمالي العناصر' },
    cart_name_label: { en: 'Your Name *', ar: 'الاسم *' },
    cart_email_label: { en: 'Email *', ar: 'البريد الإلكتروني *' },
    cart_phone_label: { en: 'Phone *', ar: 'رقم الجوال *' },
    cart_notes_label: { en: 'Notes', ar: 'ملاحظات' },
    cart_notes_placeholder: {
      en: 'Any additional details',
      ar: 'فضلا اكتب تواريخ الحجز او اي ملاحظات اضافية',
    },
    cart_send_button: { en: 'Send Request', ar: 'إرسال الطلب' },
    cart_legacy_product: { en: 'Product', ar: 'المنتج' },
    cart_legacy_price: { en: 'Price', ar: 'السعر' },
    cart_legacy_quantity: { en: 'Quantity', ar: 'الكمية' },
    cart_legacy_subtotal_label: { en: 'Subtotal', ar: 'المجموع الفرعي' },
    cart_coupon_placeholder: { en: 'Coupon Code', ar: 'رمز الكوبون' },
    cart_legacy_update: { en: 'Update Cart', ar: 'تحديث السلة' },
    cart_legacy_totals: { en: 'Cart Totals', ar: 'إجمالي السلة' },
    cart_legacy_total_label: { en: 'Total', ar: 'الإجمالي' },
  };

  const translations = {
    global: [
      {
        selector: '.cs-nav_list a[href="index.html"], .breadcrumb a[href="index.html"]',
        type: 'text',
        en: 'Home',
        ar: 'الرئيسية',
      },
      {
        selector: '.cs-nav_list a[href="about.html"]',
        type: 'text',
        en: 'About',
        ar: 'مين إحنا',
      },
      {
        selector:
          '.cs-nav_list a[href="service.html"], .cs-nav_list a[href^="service-details"]',
        type: 'text',
        en: 'Services',
        ar: 'أيش نقدم',
      },
      {
        selector: '.cs-nav_list a[href^="service-details"]',
        type: 'text',
        en: 'Service Details',
        ar: 'تفاصيل الخدمة',
      },
      {
        selector:
          '.cs-nav_list a[href="portfolio.html"], .cs-nav_list a[href="portfolio-details.html"]',
        type: 'text',
        en: 'Portfolio',
        ar: 'أعمالنا',
      },
      {
        selector: '.cs-nav_list a[href="portfolio-details.html"]',
        type: 'text',
        en: 'Portfolio Details',
        ar: 'تفاصيل الأعمال',
      },
      { selector: '.cs-nav_list a[data-i18n-key="nav_shop"]', type: 'text', en: 'Equipment List', ar: 'معداتنا' },
      { selector: '.cs-nav_list a[data-i18n-key="nav_blog"]', type: 'text', en: 'Blog', ar: 'كشكولنا' },
      {
        selector: '.cs-nav_list a[href="blog.html"], .cs-nav_list a[href="blog-details.html"]',
        type: 'text',
        en: 'Blog',
        ar: 'كشكولنا',
      },
      {
        selector: '.cs-nav_list a[href="blog-details.html"]',
        type: 'text',
        en: 'Blog Details',
        ar: 'تفاصيل المدونة',
      },
      {
        selector: '.cs-nav_list a[href="shop.html"], .cs-nav_list a[href="shop-product-details.html"]',
        type: 'text',
        en: 'Equipment List',
        ar: 'معداتنا',
      },
      {
        selector: '.cs-nav_list a[href="shop.html"]',
        type: 'text',
        en: 'Equipment List',
        ar: 'معداتنا',
      },
      {
        selector: '.cs-nav_list a[href="shop-product-details.html"]',
        type: 'text',
        en: 'Shop Details',
        ar: 'تفاصيل المنتج',
      },
      {
        selector: '.cs-nav_list a[href="shop-cart.html"]',
        type: 'text',
        en: 'Cart',
        ar: 'عربة التسوق',
      },
      {
        selector: '.cs-nav_list a[href="shop-checkout.html"]',
        type: 'text',
        en: 'Checkout',
        ar: 'الدفع',
      },
      {
        selector: '.cs-nav_list a[href="shop-order-recived.html"]',
        type: 'text',
        en: 'Success Order',
        ar: 'اكتمال الطلب',
      },
      {
        selector: '.cs-nav_list a[href="shop-wishlist.html"]',
        type: 'text',
        en: 'Wishlist',
        ar: 'قائمة الرغبات',
      },
      {
        selector: '.cs-nav_list > li > a[href="#"]',
        type: 'text',
        en: 'Pages',
        ar: 'الصفحات',
      },
      { selector: 'a[data-i18n-key="nav_pages"]', type: 'text', en: 'Pages', ar: 'الصفحات' },
      { selector: 'a[data-i18n-key="nav_contact"]', type: 'text', en: 'Contact', ar: 'تواصل معنا' },
      { selector: 'a[data-i18n-key="nav_feedback"]', type: 'text', en: 'Feedback', ar: 'رأيك يهمنا' },
      { selector: 'a[data-i18n-key="nav_login"]', type: 'text', en: 'Login', ar: 'تسجيل دخول' },
      { selector: 'a[data-i18n-key="nav_team"]', type: 'text', en: 'Team', ar: 'فريقنا' },
      {
        selector: '.cs-nav_list a[href="contact.html"]',
        type: 'text',
        en: 'Contact',
        ar: 'تواصل معنا',
      },
      {
        selector: '.cs-nav_list a[href="team.html"]',
        type: 'text',
        en: 'Team',
        ar: 'فريقنا',
      },
      {
        selector: '.cs-nav_list a[href="feedback.html"]',
        type: 'text',
        en: 'Feedback',
        ar: 'رأيك يهمنا',
      },
      {
        selector: '.cs-nav_list a[href="https://art-ratio.com/login"]',
        type: 'text',
        en: 'Login',
        ar: 'تسجيل دخول',
      },
      {
        selector: '.cs-nav_list a[href="team-details.html"]',
        type: 'text',
        en: 'Team Details',
        ar: 'تفاصيل الفريق',
      },
      {
        selector: '.cs-nav_list a[href="case-study.html"]',
        type: 'text',
        en: 'Case Study Details',
        ar: 'دراسة حالة',
      },
      {
        selector: '.cs-nav_list a[href="faq.html"]',
        type: 'text',
        en: 'FAQ',
        ar: 'الأسئلة الشائعة',
      },
      {
        selector: '.cs-side_header_box h2.cs-side_header_heading',
        type: 'html',
        en: 'Got a project in mind?<br>We’re ready to bring it to life.',
        ar: 'عندك مشروع في بالك؟<br>جاهز نحوله لواقع.',
      },
      {
        selector: '.cs-footer_item.cs-footer_brand p',
        type: 'html',
        en: 'we turn your vision into captivating visuals.<br>From commercials and events to social media stories, we blend creativity and precision to bring your ideas to life.',
        ar: 'نحوّل رؤيتك لصور تُنحس<br>من الإعلانات والفعاليات إلى قصص التواصل الاجتماعي، نشتغل بإبداع ودقة عشان نحيي أفكارك',
      },
      { selector: '.cs-footer_item_services .cs-widget_title', type: 'text', en: 'Services', ar: 'الخدمات' },
      { selector: '.cs-footer_services a:nth-child(1)', type: 'text', en: 'TV & Commercial Ads', ar: 'إعلانات تلفزيونية وتجارية' },
      { selector: '.cs-footer_services a:nth-child(2)', type: 'text', en: 'Events & Coverage', ar: 'الفعاليات والتغطيات' },
      { selector: '.cs-footer_services a:nth-child(3)', type: 'text', en: 'Social Media Visuals', ar: 'محتوى شبكات التواصل' },
      { selector: '.cs-footer_services a:nth-child(4)', type: 'text', en: 'Commercial Photography', ar: 'التصوير الفوتوغرافي التجاري' },
      { selector: '.cs-footer_services a:nth-child(5)', type: 'text', en: 'Equipment Rental', ar: 'تأجير المعدات' },
      { selector: '.cs-footer_services a:nth-child(6)', type: 'text', en: 'Cinematography & Film Production Consultancy', ar: 'الاستشارات في التصوير والإنتاج السينمائي' },
      { selector: '.cs-footer_item_contact .cs-widget_title', type: 'text', en: 'Contact Us', ar: 'خلّينا ندردش' },
      { selector: '.cs-copyright', type: 'text', en: 'Copyright © 2026 Art Ratio.', ar: 'جميع الحقوق محفوظة © 2026 آرت ريشو.' },
      { selector: '.cs-footer_links li:nth-child(1) a', type: 'text', en: 'Terms of Use', ar: 'شروط الاستخدام' },
      { selector: '.cs-footer_links li:nth-child(2) a', type: 'text', en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
    ],
    pages: {
      home: [
        { selector: '.cs-hero_title', type: 'html', en: 'Creativity In <br>Our Blood Line', ar: 'الإبداع يجري<br>في عروقنا' },
        {
          selector: '.cs-hero_subtitle',
          type: 'text',
          en: 'We turn your concepts into visual masterpieces, crafting every project with a unique blend of artistry and innovation that brings your vision to life.',
          ar: 'نحوّل أفكاركم لروائع بصرية، ونشتغل على كل مشروع بمزيج خاص من الفن والابتكار، عشان نطلع عمل يجسّد رؤيتكم',
        },
        { selector: '.cs-hero_social_title', type: 'text', en: 'Follow Us', ar: 'تابعنا' },
        { selector: '.cs-hero_social_links a[href*="instagram.com"]', type: 'text', en: 'Instagram', ar: 'إنستغرام' },
        { selector: '.cs-hero_social_links a[href*="tiktok.com"]', type: 'text', en: 'TikTok', ar: 'تيك توك' },
        { selector: '.cs-funfact_heading h2', type: 'text', en: 'Our fun fact', ar: 'أرقام تروي قصتنا' },
        {
          selector: '.cs-funfact_heading p',
          type: 'html',
          en: 'Our work blends creativity and craftsmanship, shaped by years of collaboration with clients who trust our vision.<br>These numbers offer a glimpse into our journey.',
          ar: 'أعمالنا تحمل بصمة إبداع متقن وحرفية عالية، مبنية على سنوات من الشغف والتجربة، وشراكات منحتنا ثقة عملائنا.<br>وهذي الأرقام مو مجرد بيانات… هذي خلاصة رحلتنا، والخطوات اللي شكّلتنا وخلّتْنا نوصل للي إحنا عليه اليوم.',
        },
        { selector: '.cs-funfacts .cs-funfact:nth-child(1) p', type: 'text', en: 'Happy Clients', ar: 'عميل سعيد' },
        { selector: '.cs-funfacts .cs-funfact:nth-child(2) p', type: 'text', en: 'Project Completed', ar: 'مشروع مكتمل' },
        { selector: '.cs-funfacts .cs-funfact:nth-child(3) p', type: 'text', en: 'Workshops Conducted', ar: 'ورشة عمل منفذة' },
        { selector: '.cs-funfacts .cs-funfact:nth-child(4) p', type: 'text', en: 'Products photography', ar: 'مُنتج مصور' },
        // Services
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(1) .cs-iconbox_title', type: 'text', en: 'Commercial Advertisements', ar: 'إعلانات تجارية' },
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(1) .cs-iconbox_subtitle', type: 'text', en: 'Professional commercial production that highlights products and services with creativity and impact.', ar: 'إنتاج إعلاني احترافي يبرز المنتجات والخدمات بإبداع وتأثير.' },
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(2) .cs-iconbox_title', type: 'text', en: 'Events & Coverage', ar: 'الفعاليات والتغطيات' },
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(2) .cs-iconbox_subtitle', type: 'text', en: 'We professionally document your events, delivering visuals that preserve every moment.', ar: 'نوثق فعالياتكم باحتراف، ونقدم صور تحافظ على كل لحظة.' },
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(3) .cs-iconbox_title', type: 'text', en: 'Social Media Visuals', ar: 'محتوى شبكات التواصل' },
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(3) .cs-iconbox_subtitle', type: 'text', en: 'Social media visuals creation combining photography and videography to elevate brand presence and engagement.', ar: 'نقدّم محتوى تصويري ومرئي يعزز حضور العلامة وتفاعلها' },
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(4) .cs-iconbox_title', type: 'text', en: 'Commercial Photography', ar: 'التصوير الفوتوغرافي التجاري' },
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(4) .cs-iconbox_subtitle', type: 'text', en: 'Customized photography and videography, covering food menus, professional portraits, and e-commerce product visuals.', ar: 'نظبطك بتصوير مخصّص لقوائم الطعام، والبورتريه، ومنتجات التجارة الإلكترونية.' },
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(5) .cs-iconbox_title', type: 'text', en: 'Equipment Rental', ar: 'تأجير المعدات' },
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(5) .cs-iconbox_subtitle', type: 'text', en: 'Professional filming and lighting equipment rentals to empower production teams with everything they need for seamless results.', ar: 'نأجّر معدات تصوير وإضاءة احترافية، نجهّز فيها فرق الإنتاج بكل اللي يحتاجونه عشان يشتغلون بسلاسة ويطلعوا بنتائج قوية' },
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(6) .cs-iconbox_title', type: 'text', en: 'Cinematography & Film Production Consultancy', ar: 'الاستشارات في التصوير والإنتاج السينمائي' },
        { selector: '.cs-iconbox_3_list .cs-hover_tab:nth-child(6) .cs-iconbox_subtitle', type: 'text', en: 'We provide expert film production and cinematography consultancy, guiding projects from concept to delivery to ensure they meet clients’ goals efficiently.', ar: 'نقدّم استشارات في الإنتاج السينمائي من البداية للنهاية، ونشتغل معك خطوة بخطوة لتحقيق أهدافك.' },
        // Portfolio (per-card handled via data-i18n-key)
        { selector: '.cs-portfolio_subtitle', type: 'text', en: 'See Details', ar: 'عرض التفاصيل' },
        // Process
        { selector: '.cs-process_timeline .cs-process_step:nth-child(1) .cs-process_label', type: 'text', en: 'Pre-production', ar: 'ما قبل الإنتاج' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(2) .cs-process_label', type: 'text', en: 'CPS', ar: 'اجتماع العميل' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(3) .cs-process_label', type: 'text', en: 'Director Treatment', ar: 'رؤية المخرج' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(4) .cs-process_label', type: 'text', en: 'Scriptwriting', ar: 'كتابة النص' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(5) .cs-process_label', type: 'text', en: 'Story Board', ar: 'الستوري بورد' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(6) .cs-process_label', type: 'text', en: 'Cast / Crew Selection', ar: 'اختيار الممثلين والفريق' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(7) .cs-process_label', type: 'text', en: 'Equipment Planning', ar: 'اختيار المعدات' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(8) .cs-process_label', type: 'text', en: 'Prep', ar: 'التحضير' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(9) .cs-process_label', type: 'text', en: 'PPM', ar: 'اجتماع ما قبل الإنتاج' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(10) .cs-process_label', type: 'text', en: 'Shooting', ar: 'التصوير' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(11) .cs-process_label', type: 'text', en: 'Rough Cut', ar: 'المونتاج الأولي' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(12) .cs-process_label', type: 'text', en: 'Sound Design & Mixing', ar: 'تصميم ومكساج الصوت' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(13) .cs-process_label', type: 'text', en: 'Music', ar: 'الموسيقى' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(14) .cs-process_label', type: 'text', en: 'Editing & Assembly', ar: 'التحرير والتجميع' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(15) .cs-process_label', type: 'text', en: 'VFX & CGI', ar: 'المؤثرات البصرية' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(16) .cs-process_label', type: 'text', en: 'Coloring', ar: 'تلوين' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(17) .cs-process_label', type: 'text', en: 'First Draft', ar: 'المسودة الأولى' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(18) .cs-process_label', type: 'text', en: 'Client Review', ar: 'مراجعة العميل' },
        { selector: '.cs-process_timeline .cs-process_step:nth-child(19) .cs-process_label', type: 'text', en: 'Final Video', ar: 'الفيديو النهائي' },
        { selector: '.cs-cta_title', type: 'html', en: 'Ready to bring your vision to life? <br>Together we’ll turn your ideas into something remarkable.', ar: 'جاهز تحوّل رؤيتك لواقع؟<br>خلّينا نحولها لقصة استثنائية.' },
        { selector: '.cs-cta .cs-text_btn span', type: 'text', en: 'Apply For Meeting', ar: 'احجز اجتماع، وخلي الباقي علينا' },
      ],
      'shop-checkout': [],
      shop: [
        { selector: '.cs-page_title[data-i18n-key="shop_hero_title"]', type: 'text', en: 'Equipment List', ar: 'قائمة المعدات' },
        { selector: '.breadcrumb .active[data-i18n-key="shop_breadcrumb"]', type: 'text', en: 'Equipment List', ar: 'قائمة المعدات' },
        { selector: '.cs-shop_sidebar_widget_title[data-i18n-key="shop_categories_title"]', type: 'text', en: 'Categories', ar: 'التصنيفات' },
        { selector: '.cs-shop_sidebar_widget_title[data-i18n-key="shop_price_title"]', type: 'text', en: 'Price Filter', ar: 'تصفية السعر' },
        { selector: '.cs-shop_sidebar_widget_title[data-i18n-key="shop_tags_title"]', type: 'text', en: 'Tags', ar: 'الوسوم' },
        { selector: '.cs-shop_sidebar_category_list a[data-i18n-key="shop_category_design"]', type: 'text', en: 'Design (5)', ar: 'تصميم (5)' },
        { selector: '.cs-shop_sidebar_category_list a[data-i18n-key="shop_category_creative"]', type: 'text', en: 'Creative (2)', ar: 'إبداعي (2)' },
        { selector: '.cs-shop_sidebar_category_list a[data-i18n-key="shop_category_illustration"]', type: 'text', en: 'Illustration (3)', ar: 'رسوم توضيحية (3)' },
        { selector: '.cs-shop_sidebar_tag_list a[data-i18n-key="shop_tag_brand"]', type: 'text', en: 'Brand', ar: 'علامة تجارية' },
        { selector: '.cs-shop_sidebar_tag_list a[data-i18n-key="shop_tag_digital"]', type: 'text', en: 'Digital', ar: 'رقمي' },
        { selector: '.cs-shop_sidebar_tag_list a[data-i18n-key="shop_tag_marketing"]', type: 'text', en: 'Marketing', ar: 'تسويق' },
        { selector: '.cs-shop_sidebar_tag_list a[data-i18n-key="shop_tag_creative"]', type: 'text', en: 'Creative', ar: 'إبداعي' },
        { selector: '.cs-shop_sidebar_tag_list a[data-i18n-key="shop_tag_graphics"]', type: 'text', en: 'Graphics', ar: 'جرافيكس' },
        { selector: '.cs-number_of_product[data-i18n-key="shop_showing_results"]', type: 'text', en: 'Showing 1–9 of 12 results', ar: 'عرض 1–9 من 12 نتيجة' },
        { selector: 'select option[data-i18n-key="shop_sort_latest"]', type: 'text', en: 'Sort by latest', ar: 'الأحدث' },
        { selector: 'select option[data-i18n-key="shop_sort_low"]', type: 'text', en: 'Sort by low price', ar: 'السعر من الأقل إلى الأعلى' },
        { selector: 'select option[data-i18n-key="shop_sort_high"]', type: 'text', en: 'Sort by high price', ar: 'السعر من الأعلى إلى الأقل' },
        { selector: '.cs-product_title a[data-i18n-key="shop_product_title"]', type: 'text', en: 'Future AI robot toys', ar: 'ألعاب روبوت الذكاء الاصطناعي المستقبلية' },
        { selector: '.cs-product_price[data-i18n-key="shop_product_price"]', type: 'text', en: 'Price: $550', ar: 'السعر: $550' },
      ],
      privacy: [
        { selector: '.legal-kicker', type: 'text', en: 'Legal', ar: 'قانوني' },
        { selector: '.legal-hero h1', type: 'text', en: 'Privacy Policy', ar: 'سياسة الخصوصية' },
        {
          selector: '.legal-hero .legal-intro',
          type: 'text',
          en: 'This Privacy Policy explains how Food Art Advertising Company, operating under the registered brand Art Ratio (“Art Ratio,” “we,” “us,” or “our”), collects, uses, processes, stores, discloses, and protects personal data when you use our website, contact us, request our services, or otherwise interact with us in connection with our creative, production, advertising, and business operations.',
          ar: 'توضح سياسة الخصوصية هذه كيفية قيام شركة فوود أرت للدعاية والإعلان، التي تعمل تحت العلامة المسجلة آرت ريشو، بجمع البيانات الشخصية واستخدامها ومعالجتها وتخزينها والإفصاح عنها وحمايتها عند استخدامك للموقع أو تواصلك معنا أو طلب خدماتنا.',
        },
        { selector: '.legal-toc h2', type: 'text', en: 'On This Page', ar: 'في هذه الصفحة' },
        { selector: '.legal-toc a[href="#scope"]', type: 'text', en: '1. Scope', ar: '1. النطاق' },
        { selector: '.legal-toc a[href="#personal-data"]', type: 'text', en: '2. Personal Data We Collect', ar: '2. البيانات الشخصية التي نجمعها' },
        { selector: '.legal-toc a[href="#purposes"]', type: 'text', en: '3. Purposes of Processing', ar: '3. أغراض المعالجة' },
        { selector: '.legal-toc a[href="#legal-basis"]', type: 'text', en: '4. Legal Basis for Processing', ar: '4. الأساس القانوني للمعالجة' },
        { selector: '.legal-toc a[href="#sources"]', type: 'text', en: '5. Sources of Personal Data', ar: '5. مصادر البيانات الشخصية' },
        { selector: '.legal-toc a[href="#sharing"]', type: 'text', en: '6. Sharing and Disclosure', ar: '6. المشاركة والإفصاح' },
        { selector: '.legal-toc a[href="#transfers"]', type: 'text', en: '7. International Data Transfers', ar: '7. نقل البيانات دوليًا' },
        { selector: '.legal-toc a[href="#cookies"]', type: 'text', en: '8. Cookies and Analytics', ar: '8. ملفات تعريف الارتباط والتحليلات' },
        { selector: '.legal-toc a[href="#retention"]', type: 'text', en: '9. Data Retention', ar: '9. الاحتفاظ بالبيانات' },
        { selector: '.legal-toc a[href="#security"]', type: 'text', en: '10. Data Security', ar: '10. أمن البيانات' },
        { selector: '.legal-toc a[href="#rights"]', type: 'text', en: '11. Your Rights', ar: '11. حقوقك' },
        { selector: '.legal-toc a[href="#marketing"]', type: 'text', en: '12. Marketing Communications', ar: '12. الاتصالات التسويقية' },
        { selector: '.legal-toc a[href="#children"]', type: 'text', en: '13. Children and Minors', ar: '13. الأطفال والقُصّر' },
        { selector: '.legal-toc a[href="#third-party"]', type: 'text', en: '14. Third-Party Links and Services', ar: '14. روابط وخدمات الأطراف الثالثة' },
        { selector: '.legal-toc a[href="#changes"]', type: 'text', en: '15. Changes to This Privacy Policy', ar: '15. التعديلات على سياسة الخصوصية' },
        { selector: '.legal-toc a[href="#contact"]', type: 'text', en: '16. Contact Us', ar: '16. تواصل معنا' },
        { selector: '#scope h2', type: 'text', en: '1. Scope', ar: '1. النطاق' },
        { selector: '#personal-data h2', type: 'text', en: '2. Personal Data We Collect', ar: '2. البيانات الشخصية التي نجمعها' },
        { selector: '#purposes h2', type: 'text', en: '3. Purposes of Processing', ar: '3. أغراض المعالجة' },
        { selector: '#legal-basis h2', type: 'text', en: '4. Legal Basis for Processing', ar: '4. الأساس القانوني للمعالجة' },
        { selector: '#sources h2', type: 'text', en: '5. Sources of Personal Data', ar: '5. مصادر البيانات الشخصية' },
        { selector: '#sharing h2', type: 'text', en: '6. Sharing and Disclosure', ar: '6. المشاركة والإفصاح' },
        { selector: '#transfers h2', type: 'text', en: '7. International Data Transfers', ar: '7. نقل البيانات دوليًا' },
        { selector: '#cookies h2', type: 'text', en: '8. Cookies and Analytics', ar: '8. ملفات تعريف الارتباط والتحليلات' },
        { selector: '#retention h2', type: 'text', en: '9. Data Retention', ar: '9. الاحتفاظ بالبيانات' },
        { selector: '#security h2', type: 'text', en: '10. Data Security', ar: '10. أمن البيانات' },
        { selector: '#rights h2', type: 'text', en: '11. Your Rights', ar: '11. حقوقك' },
        { selector: '#marketing h2', type: 'text', en: '12. Marketing Communications', ar: '12. الاتصالات التسويقية' },
        { selector: '#children h2', type: 'text', en: '13. Children and Minors', ar: '13. الأطفال والقُصّر' },
        { selector: '#third-party h2', type: 'text', en: '14. Third-Party Links and Services', ar: '14. روابط وخدمات الأطراف الثالثة' },
        { selector: '#changes h2', type: 'text', en: '15. Changes to This Privacy Policy', ar: '15. التعديلات على سياسة الخصوصية' },
        { selector: '#contact h2', type: 'text', en: '16. Contact Us', ar: '16. تواصل معنا' },
      ],
      terms: [
        { selector: '.legal-kicker', type: 'text', en: 'Legal', ar: 'قانوني' },
        { selector: '.legal-hero h1', type: 'text', en: 'Terms of Use', ar: 'شروط الاستخدام' },
        {
          selector: '.legal-hero .legal-intro:first-of-type',
          type: 'text',
          en: 'These Terms of Use (“Terms”) govern access to and use of the website operated by Food Art Advertising Company, operating under the registered brand Art Ratio (“Art Ratio,” “we,” “us,” or “our”).',
          ar: 'تحكم شروط الاستخدام هذه الوصول إلى واستخدام الموقع الذي تديره شركة فوود أرت للدعاية والإعلان، العاملة تحت العلامة المسجلة آرت ريشو.',
        },
        {
          selector: '.legal-hero .legal-intro:last-of-type',
          type: 'text',
          en: 'By accessing or using this website, you agree to be bound by these Terms and by our Privacy Policy. If you do not agree to these Terms, you should discontinue use of the website.',
          ar: 'باستخدامك هذا الموقع فإنك توافق على الالتزام بهذه الشروط وبسياسة الخصوصية. إذا لم توافق، يرجى التوقف عن استخدام الموقع.',
        },
        { selector: '.legal-toc h2', type: 'text', en: 'On This Page', ar: 'في هذه الصفحة' },
        { selector: '.legal-toc a[href="#about"]', type: 'text', en: '1. About Us', ar: '1. من نحن' },
        { selector: '.legal-toc a[href="#acceptance"]', type: 'text', en: '2. Acceptance of Terms', ar: '2. قبول الشروط' },
        { selector: '.legal-toc a[href="#permitted"]', type: 'text', en: '3. Permitted Use', ar: '3. الاستخدام المسموح' },
        { selector: '.legal-toc a[href="#content"]', type: 'text', en: '4. Website Content and Informational Use', ar: '4. محتوى الموقع واستخدامه المعلوماتي' },
        { selector: '.legal-toc a[href="#service-requests"]', type: 'text', en: '5. Service Requests and No Automatic Contract Formation', ar: '5. طلبات الخدمة وعدم إنشاء عقد تلقائيًا' },
        { selector: '.legal-toc a[href="#ip"]', type: 'text', en: '6. Intellectual Property Rights', ar: '6. حقوق الملكية الفكرية' },
        { selector: '.legal-toc a[href="#submissions"]', type: 'text', en: '7. User Submissions', ar: '7. محتوى المستخدم' },
        { selector: '.legal-toc a[href="#privacy"]', type: 'text', en: '8. Privacy and Personal Data', ar: '8. الخصوصية والبيانات الشخصية' },
        { selector: '.legal-toc a[href="#third-party"]', type: 'text', en: '9. Third-Party Links and Tools', ar: '9. روابط وأدوات الأطراف الثالثة' },
        { selector: '.legal-toc a[href="#availability"]', type: 'text', en: '10. Availability of the Website', ar: '10. توفر الموقع' },
        { selector: '.legal-toc a[href="#disclaimer"]', type: 'text', en: '11. Disclaimer of Warranties', ar: '11. إخلاء المسؤولية عن الضمانات' },
        { selector: '.legal-toc a[href="#liability"]', type: 'text', en: '12. Limitation of Liability', ar: '12. تحديد المسؤولية' },
        { selector: '.legal-toc a[href="#indemnity"]', type: 'text', en: '13. Indemnity', ar: '13. التعويض' },
        { selector: '.legal-toc a[href="#suspension"]', type: 'text', en: '14. Suspension or Restriction of Access', ar: '14. تعليق أو تقييد الوصول' },
        { selector: '.legal-toc a[href="#law"]', type: 'text', en: '15. Governing Law and Jurisdiction', ar: '15. القانون الحاكم والاختصاص القضائي' },
        { selector: '.legal-toc a[href="#changes"]', type: 'text', en: '16. Changes to These Terms', ar: '16. تعديل هذه الشروط' },
        { selector: '.legal-toc a[href="#severability"]', type: 'text', en: '17. Severability', ar: '17. قابلية الفصل' },
        { selector: '.legal-toc a[href="#entire"]', type: 'text', en: '18. Entire Website Terms', ar: '18. كامل شروط الموقع' },
        { selector: '.legal-toc a[href="#contact"]', type: 'text', en: '19. Contact Us', ar: '19. تواصل معنا' },
        { selector: '#about h2', type: 'text', en: '1. About Us', ar: '1. من نحن' },
        { selector: '#acceptance h2', type: 'text', en: '2. Acceptance of Terms', ar: '2. قبول الشروط' },
        { selector: '#permitted h2', type: 'text', en: '3. Permitted Use', ar: '3. الاستخدام المسموح' },
        { selector: '#content h2', type: 'text', en: '4. Website Content and Informational Use', ar: '4. محتوى الموقع واستخدامه المعلوماتي' },
        { selector: '#service-requests h2', type: 'text', en: '5. Service Requests and No Automatic Contract Formation', ar: '5. طلبات الخدمة وعدم إنشاء عقد تلقائيًا' },
        { selector: '#ip h2', type: 'text', en: '6. Intellectual Property Rights', ar: '6. حقوق الملكية الفكرية' },
        { selector: '#submissions h2', type: 'text', en: '7. User Submissions', ar: '7. محتوى المستخدم' },
        { selector: '#privacy h2', type: 'text', en: '8. Privacy and Personal Data', ar: '8. الخصوصية والبيانات الشخصية' },
        { selector: '#third-party h2', type: 'text', en: '9. Third-Party Links and Tools', ar: '9. روابط وأدوات الأطراف الثالثة' },
        { selector: '#availability h2', type: 'text', en: '10. Availability of the Website', ar: '10. توفر الموقع' },
        { selector: '#disclaimer h2', type: 'text', en: '11. Disclaimer of Warranties', ar: '11. إخلاء المسؤولية عن الضمانات' },
        { selector: '#liability h2', type: 'text', en: '12. Limitation of Liability', ar: '12. تحديد المسؤولية' },
        { selector: '#indemnity h2', type: 'text', en: '13. Indemnity', ar: '13. التعويض' },
        { selector: '#suspension h2', type: 'text', en: '14. Suspension or Restriction of Access', ar: '14. تعليق أو تقييد الوصول' },
        { selector: '#law h2', type: 'text', en: '15. Governing Law and Jurisdiction', ar: '15. القانون الحاكم والاختصاص القضائي' },
        { selector: '#changes h2', type: 'text', en: '16. Changes to These Terms', ar: '16. تعديل هذه الشروط' },
        { selector: '#severability h2', type: 'text', en: '17. Severability', ar: '17. قابلية الفصل' },
        { selector: '#entire h2', type: 'text', en: '18. Entire Website Terms', ar: '18. كامل شروط الموقع' },
        { selector: '#contact h2', type: 'text', en: '19. Contact Us', ar: '19. تواصل معنا' },
      ],
      about: [],
      service: [],
      contact: [],
    },
  };

  const localizedRouteMap = {
    'about.html': { en: '/en/about/', ar: '/ar/من-نحن/' },
    'blog.html': { en: '/en/blog/', ar: '/ar/كشكولنا/' },
    'contact.html': { en: '/en/contact/', ar: '/ar/تواصل-معنا/' },
    'faq.html': { en: '/en/faq/', ar: '/ar/الأسئلة-الشائعة/' },
    'feedback.html': { en: '/en/feedback/', ar: '/ar/آراء-العملاء/' },
    'index.html': { en: '/en/', ar: '/ar/' },
    'photography-agency.html': { en: '/en/photography-agency/', ar: '/ar/معرض-الصور/' },
    'portfolio-details-airport-executive-lounge.html': { en: '/en/portfolio-details-airport-executive-lounge/', ar: '/ar/مشروع-صالة-كبار-الشخصيات-في-المطار/' },
    'portfolio-details-golf-tournament.html': { en: '/en/portfolio-details-golf-tournament/', ar: '/ar/مشروع-بطولة-الجولف/' },
    'portfolio-details-saudi-dent.html': { en: '/en/portfolio-details-saudi-dent/', ar: '/ar/مشروع-سعودي-دنت/' },
    'portfolio-details-video-1132890882.html': { en: '/en/portfolio-details-video-1132890882/', ar: '/ar/ساندوتش-تيكا-من-الطازج/' },
    'portfolio-details-video-2.html': { en: '/en/portfolio-details-video-2/', ar: '/ar/برج-ترامب-جدة/' },
    'portfolio-details-video-3.html': { en: '/en/portfolio-details-video-3/', ar: '/ar/ريل-لأم-الزلف/' },
    'portfolio-details-video-4.html': { en: '/en/portfolio-details-video-4/', ar: '/ar/الفيلم-النهائي-للستي-ووك-٢٠٢٤/' },
    'portfolio-details-video-5.html': { en: '/en/portfolio-details-video-5/', ar: '/ar/ايفنت-هوبلو/' },
    'portfolio-details-video-6.html': { en: '/en/portfolio-details-video-6/', ar: '/ar/ريل-لميت-ذا-فيش/' },
    'portfolio-details-video-7.html': { en: '/en/portfolio-details-video-7/', ar: '/ar/معرض-الكتاب/' },
    'portfolio.html': { en: '/en/portfolio/', ar: '/ar/أعمالنا/' },
    'portfolio2-details-video-1.html': { en: '/en/portfolio2-details-video-1/', ar: '/ar/ريل-إعلاني-لعبدالصمد-القرشي/' },
    'portfolio2-details-video-2.html': { en: '/en/portfolio2-details-video-2/', ar: '/ar/ريل-للكوتش-البيتي-الفيصل/' },
    'portfolio2-details-video-3.html': { en: '/en/portfolio2-details-video-3/', ar: '/ar/نهائي-دوري-أبطال-آسيا-للنخبة/' },
    'portfolio2-details-video-4.html': { en: '/en/portfolio2-details-video-4/', ar: '/ar/توبا-ذا-ون/' },
    'portfolio2-details-video-5.html': { en: '/en/portfolio2-details-video-5/', ar: '/ar/ايفنت-معوض/' },
    'portfolio2-details-video-6.html': { en: '/en/portfolio2-details-video-6/', ar: '/ar/ريل-اليوم-الوطني/' },
    'portfolio2-details-video-7.html': { en: '/en/portfolio2-details-video-7/', ar: '/ar/موفي-بوكس-الطازج/' },
    'portfolio2.html': { en: '/en/portfolio2/', ar: '/ar/أعمالنا-2/' },
    'portfolio3-details-video-1.html': { en: '/en/portfolio3-details-video-1/', ar: '/ar/ريل-رنة-خلخال/' },
    'portfolio3-details-video-2.html': { en: '/en/portfolio3-details-video-2/', ar: '/ar/اوفردوز-ايس-كريم/' },
    'portfolio3-details-video-3.html': { en: '/en/portfolio3-details-video-3/', ar: '/ar/سفاري-اكستريم/' },
    'portfolio3-details-video-4.html': { en: '/en/portfolio3-details-video-4/', ar: '/ar/تغطية-محلات-في-السيتي-ووك/' },
    'portfolio3-details-video-5.html': { en: '/en/portfolio3-details-video-5/', ar: '/ar/فيديو-مجوهرات/' },
    'portfolio3-details-video-6.html': { en: '/en/portfolio3-details-video-6/', ar: '/ar/فول-جرين-فارمز/' },
    'portfolio3-details-video-7.html': { en: '/en/portfolio3-details-video-7/', ar: '/ar/صنع-في-باكستان/' },
    'portfolio3.html': { en: '/en/portfolio3/', ar: '/ar/أعمالنا-3/' },
    'portfolio4-details-video-1.html': { en: '/en/portfolio4-details-video-1/', ar: '/ar/افتتاح-فرع-روومرز/' },
    'portfolio4-details-video-2.html': { en: '/en/portfolio4-details-video-2/', ar: '/ar/تغطية-كشك-في-ويشن/' },
    'portfolio4-details-video-3.html': { en: '/en/portfolio4-details-video-3/', ar: '/ar/كيكو-ميلانو/' },
    'portfolio4-details-video-4.html': { en: '/en/portfolio4-details-video-4/', ar: '/ar/العروض-الجوالة-سيتي-ووك/' },
    'portfolio4-details-video-5.html': { en: '/en/portfolio4-details-video-5/', ar: '/ar/قرية-التأسيس-عرعر/' },
    'portfolio4-details-video-6.html': { en: '/en/portfolio4-details-video-6/', ar: '/ar/معرض-الكتاب-2/' },
    'portfolio4-details-video-7.html': { en: '/en/portfolio4-details-video-7/', ar: '/ar/مقابلات-مختارة/' },
    'portfolio4.html': { en: '/en/portfolio4/', ar: '/ar/أعمالنا-4/' },
    'portfolio5-details-video-1.html': { en: '/en/portfolio5-details-video-1/', ar: '/ar/في-60/' },
    'portfolio5-details-video-2.html': { en: '/en/portfolio5-details-video-2/', ar: '/ar/مجوهرات/' },
    'portfolio5-details-video-3.html': { en: '/en/portfolio5-details-video-3/', ar: '/ar/مجوهرات-2/' },
    'portfolio5-details-video-4.html': { en: '/en/portfolio5-details-video-4/', ar: '/ar/اوفردوز-عام/' },
    'portfolio5-details-video-5.html': { en: '/en/portfolio5-details-video-5/', ar: '/ar/قيمرية/' },
    'portfolio5-details-video-6.html': { en: '/en/portfolio5-details-video-6/', ar: '/ar/ريل-للطريقة-المعينة/' },
    'portfolio5-details-video-7.html': { en: '/en/portfolio5-details-video-7/', ar: '/ar/عدنان-خان-مجھ-سے-دور/' },
    'portfolio5.html': { en: '/en/portfolio5/', ar: '/ar/أعمالنا-5/' },
    'portfolio6-details-video-1.html': { en: '/en/portfolio6-details-video-1/', ar: '/ar/كيكة-كوز/' },
    'portfolio6-details-video-2.html': { en: '/en/portfolio6-details-video-2/', ar: '/ar/هنجرستيشن/' },
    'portfolio6-details-video-3.html': { en: '/en/portfolio6-details-video-3/', ar: '/ar/ايوا/' },
    'portfolio6-details-video-4.html': { en: '/en/portfolio6-details-video-4/', ar: '/ar/بوكس-الباربكيو-زد/' },
    'portfolio6-details-video-5.html': { en: '/en/portfolio6-details-video-5/', ar: '/ar/اعلان-قهوة/' },
    'portfolio6-details-video-6.html': { en: '/en/portfolio6-details-video-6/', ar: '/ar/تجمع-نادي-فيراري-السعودي/' },
    'portfolio6-details-video-7.html': { en: '/en/portfolio6-details-video-7/', ar: '/ar/اعلان-ازار/' },
    'portfolio6.html': { en: '/en/portfolio6/', ar: '/ar/أعمالنا-6/' },
    'privacy.html': { en: '/en/privacy/', ar: '/ar/سياسة-الخصوصية/' },
    'service-details-consultancy.html': { en: '/en/service-details-consultancy/', ar: '/ar/خدمة-الاستشارات-الإنتاجية/' },
    'service-details-equipment-rental.html': { en: '/en/service-details-equipment-rental/', ar: '/ar/خدمة-تأجير-المعدات/' },
    'service-details-events-coverage.html': { en: '/en/service-details-events-coverage/', ar: '/ar/خدمة-تغطية-الفعاليات/' },
    'service-details-photography.html': { en: '/en/service-details-photography/', ar: '/ar/خدمة-التصوير-التجاري/' },
    'service-details-social-media-content.html': { en: '/en/service-details-social-media-content/', ar: '/ar/خدمة-محتوى-السوشال-ميديا/' },
    'service-details-tv-commercial-ads.html': { en: '/en/service-details-tv-commercial-ads/', ar: '/ar/خدمة-إعلانات-التلفزيون-والإعلانات-التجارية/' },
    // Shop routes are kept language-neutral because production routing guarantees these paths.
    'shop.html': { en: '/shop/', ar: '/shop/' },
    'shop-cart.html': { en: '/shop-cart/', ar: '/shop-cart/' },
    'shop-checkout.html': { en: '/shop-checkout/', ar: '/shop-checkout/' },
    'shop-product-details.html': { en: '/shop-product-details/', ar: '/shop-product-details/' },
    'shop-wishlist.html': { en: '/shop-wishlist/', ar: '/shop-wishlist/' },
    'shop-order-recived.html': { en: '/shop-order-recived/', ar: '/shop-order-recived/' },
    'service.html': { en: '/en/service/', ar: '/ar/خدماتنا/' },
    'team-details-abdulqader-bdawi.html': { en: '/en/team-details-abdulqader-bdawi/', ar: '/ar/عبدالقادر-البديوي-تفاصيل-الفريق/' },
    'team-details-adnan-alkhatib.html': { en: '/en/team-details-adnan-alkhatib/', ar: '/ar/عدنان-الخطيب-تفاصيل-الفريق/' },
    'team-details-ammar-alkhatib.html': { en: '/en/team-details-ammar-alkhatib/', ar: '/ar/عمار-الخطيب-تفاصيل-الفريق/' },
    'team-details-mohammed-hararah.html': { en: '/en/team-details-mohammed-hararah/', ar: '/ar/محمد-حرارة-تفاصيل-الفريق/' },
    'team-details-mohammed-leon.html': { en: '/en/team-details-mohammed-leon/', ar: '/ar/محمد-ليون-تفاصيل-الفريق/' },
    'team-details-taha-zarifah.html': { en: '/en/team-details-taha-zarifah/', ar: '/ar/طه-ظريفة-تفاصيل-الفريق/' },
    'team.html': { en: '/en/team/', ar: '/ar/فريقنا/' },
    'terms.html': { en: '/en/terms/', ar: '/ar/شروط-الاستخدام/' }
  };

  const normalizePath = (rawPath) => {
    let p = rawPath || '/';
    try {
      p = decodeURIComponent(p);
    } catch (e) {}
    if (!p.startsWith('/')) p = '/' + p;
    p = p.replace(/\/{2,}/g, '/');
    if (p !== '/' && p.endsWith('/')) p = p.slice(0, -1);
    return p || '/';
  };

  const enPathToFile = Object.fromEntries(
    Object.entries(localizedRouteMap).map(([file, paths]) => [normalizePath(paths.en), file]),
  );
  const arPathToFile = Object.fromEntries(
    Object.entries(localizedRouteMap).map(([file, paths]) => [normalizePath(paths.ar), file]),
  );

  const resolveFileFromPath = (rawPath) => {
    const normalized = normalizePath(rawPath);
    if (normalized === '/' || normalized === '/index.html') return 'index.html';
    if (enPathToFile[normalized]) return enPathToFile[normalized];
    if (arPathToFile[normalized]) return arPathToFile[normalized];

    const htmlMatch = normalized.match(/^\/([^/]+\.html)$/i);
    if (htmlMatch) return htmlMatch[1].toLowerCase();
    return null;
  };

  const pathForLanguage = (file, lang) => {
    const route = localizedRouteMap[file] || localizedRouteMap['index.html'];
    return lang === 'ar' ? route.ar : route.en;
  };

  const getLocalizedUrlForCurrentPage = (lang) => {
    const file = resolveFileFromPath(window.location.pathname || '/');
    if (!file) return '';

    const current = normalizePath(window.location.pathname || '/');
    const target = normalizePath(pathForLanguage(file, lang));
    if (!target) return '';
    if (target === current) return '';
    return target + (window.location.search || '') + (window.location.hash || '');
  };

  const syncCurrentPathWithLanguage = (lang) => {
    const nextUrl = getLocalizedUrlForCurrentPage(lang);
    if (nextUrl) {
      window.history.replaceState({}, '', nextUrl);
    }
  };

  const localizeInternalLinks = (lang) => {
    document.querySelectorAll('a[href]').forEach((anchor) => {
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (/^(#|mailto:|tel:|javascript:)/i.test(href)) return;

      if (!anchor.dataset.i18nHrefBase) {
        anchor.dataset.i18nHrefBase = href;
      }

      let parsed;
      try {
        parsed = new URL(anchor.dataset.i18nHrefBase, window.location.origin);
      } catch (e) {
        return;
      }
      if (parsed.origin !== window.location.origin) return;

      const file = resolveFileFromPath(parsed.pathname);
      if (!file) return;

      const targetPath = pathForLanguage(file, lang);
      const nextHref = targetPath + (parsed.search || '') + (parsed.hash || '');
      anchor.setAttribute('href', nextHref);
    });
  };

  const syncSeoHead = () => {
    const title = document.title || '';
    document
      .querySelectorAll('meta[property="og:title"], meta[name="twitter:title"]')
      .forEach((meta) => meta.setAttribute('content', title));

    const absoluteUrl = window.location.origin + window.location.pathname + (window.location.search || '');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', absoluteUrl);
    document.querySelectorAll('meta[property="og:url"]').forEach((meta) => meta.setAttribute('content', absoluteUrl));

    const currentFile = resolveFileFromPath(window.location.pathname || '/');
    if (!currentFile) return;
    const enHref = window.location.origin + pathForLanguage(currentFile, 'en');
    const arHref = window.location.origin + pathForLanguage(currentFile, 'ar');

    let enAlt = document.querySelector('link[rel="alternate"][hreflang="en"]');
    if (!enAlt) {
      enAlt = document.createElement('link');
      enAlt.setAttribute('rel', 'alternate');
      enAlt.setAttribute('hreflang', 'en');
      document.head.appendChild(enAlt);
    }
    enAlt.setAttribute('href', enHref);

    let arAlt = document.querySelector('link[rel="alternate"][hreflang="ar"]');
    if (!arAlt) {
      arAlt = document.createElement('link');
      arAlt.setAttribute('rel', 'alternate');
      arAlt.setAttribute('hreflang', 'ar');
      document.head.appendChild(arAlt);
    }
    arAlt.setAttribute('href', arHref);

    let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!xDefault) {
      xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(xDefault);
    }
    xDefault.setAttribute('href', enHref);
  };

  const applyTranslations = (lang) => {
    const pageKey = (document.body && document.body.dataset.page) || '';
    document.querySelectorAll('[data-i18n-key]').forEach((el) => {
      const key = el.dataset.i18nKey;
      const rule = keyedTranslations[key];
      if (!rule) return;

      // Keep the original page copy so EN can safely fall back even if a key only defines AR.
      if (!el.dataset.i18nOriginal) {
        el.dataset.i18nOriginal = rule.type === 'html' ? el.innerHTML : el.textContent;
      }

      const value = rule[lang] || (lang === 'en' ? el.dataset.i18nOriginal : '');
      if (!value) return;

      if (rule.type === 'html') {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const rule = keyedTranslations[key];
      if (!rule) return;

      if (!el.dataset.i18nPlaceholderOriginal) {
        el.dataset.i18nPlaceholderOriginal = el.getAttribute('placeholder') || '';
      }

      const value = rule[lang] || (lang === 'en' ? el.dataset.i18nPlaceholderOriginal : '');
      if (value) el.setAttribute('placeholder', value);
    });

    const rules = [...translations.global, ...(translations.pages[pageKey] || [])];
    rules.forEach((rule) => {
      const nodes = document.querySelectorAll(rule.selector);
      nodes.forEach((el) => {
        const value = rule[lang];
        if (!value) return;
        if (rule.type === 'placeholder') {
          el.setAttribute('placeholder', value);
        } else if (rule.type === 'html') {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      });
    });
  };

  const normalizeSideHeaderTranslations = () => {
    const sideHeader = document.querySelector('.cs-side_header');
    if (!sideHeader) return;

    const heading = sideHeader.querySelector('.cs-side_header_heading');
    if (heading && !heading.dataset.i18nKey) {
      heading.dataset.i18nKey = 'side_header_heading';
    }

    const contactInfo = sideHeader.querySelector('.cs-contact_info');
    if (contactInfo) {
      const contactBox = contactInfo.closest('.cs-side_header_box');
      const contactTitle = contactBox && contactBox.querySelector('h3.cs-side_header_title');
      if (contactTitle) {
        contactTitle.dataset.i18nKey = 'side_header_contact_title';
      }
    }

    sideHeader.querySelectorAll('.cs-side_header_box .cs-login-link').forEach((link) => {
      link.dataset.i18nKey = 'side_header_login_link';
      link.setAttribute('href', 'https://art-ratio.com/login');

      // Remove duplicate title above login link to keep sidebar copy concise.
      const loginBox = link.closest('.cs-side_header_box');
      if (!loginBox) return;
      const duplicateTitle = loginBox.querySelector('h3.cs-side_header_title');
      if (duplicateTitle) {
        duplicateTitle.remove();
      }
    });
  };

  const updateToggleLabel = (lang) => {
    const toggle = document.querySelector('.cs-lang_toggle');
    if (!toggle) return;
    const isArabic = lang === 'ar';
    toggle.textContent = isArabic ? 'EN' : 'AR';
    toggle.setAttribute('aria-pressed', String(isArabic));
  };

  window.getArinoTranslation = (key, fallback = '') => {
    if (!key) return fallback;
    const rule = keyedTranslations[key];
    if (!rule) return fallback;
    let activeLang = '';
    try {
      activeLang = localStorage.getItem(STORAGE_KEY) || '';
    } catch (e) {}
    if (activeLang !== 'ar' && activeLang !== 'en') {
      activeLang = (document.documentElement.lang || '').toLowerCase().startsWith('ar') ? 'ar' : 'en';
    }
    return rule[activeLang] || rule.en || rule.ar || fallback;
  };

  const ensureCartShortcut = () => {
    const toolbox = document.querySelector('.cs-toolbox');
    if (!toolbox) return;
    if (toolbox.querySelector('.cs-header_cart')) return;

    const cart = document.createElement('a');
    cart.href = 'shop-cart.html';
    cart.className = 'cs-header_cart';
    cart.innerHTML = `
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1441_534)">
          <path d="M19.25 5.5H16.5C16.5 4.04131 15.9205 2.64236 14.8891 1.61091C13.8576 0.579463 12.4587 0 11 0C9.54131 0 8.14236 0.579463 7.11091 1.61091C6.07946 2.64236 5.5 4.04131 5.5 5.5H2.75C2.02065 5.5 1.32118 5.78973 0.805456 6.30546C0.289731 6.82118 0 7.52065 0 8.25L0 17.4167C0.00145554 18.6318 0.484808 19.7967 1.34403 20.656C2.20326 21.5152 3.3682 21.9985 4.58333 22H17.4167C18.6318 21.9985 19.7967 21.5152 20.656 20.656C21.5152 19.7967 21.9985 18.6318 22 17.4167V8.25C22 7.52065 21.7103 6.82118 21.1945 6.30546C20.6788 5.78973 19.9793 5.5 19.25 5.5ZM11 1.83333C11.9725 1.83333 12.9051 2.21964 13.5927 2.90728C14.2804 3.59491 14.6667 4.52754 14.6667 5.5H7.33333C7.33333 4.52754 7.71964 3.59491 8.40728 2.90728C9.09491 2.21964 10.0275 1.83333 11 1.83333ZM20.1667 17.4167C20.1667 18.146 19.8769 18.8455 19.3612 19.3612C18.8455 19.8769 18.146 20.1667 17.4167 20.1667H4.58333C3.85399 20.1667 3.15451 19.8769 2.63879 19.3612C2.12306 18.8455 1.83333 18.146 1.83333 17.4167V8.25C1.83333 8.00688 1.92991 7.77373 2.10182 7.60182C2.27373 7.42991 2.50688 7.33333 2.75 7.33333H5.5V9.16667C5.5 9.40978 5.59658 9.64294 5.76849 9.81485C5.94039 9.98676 6.17355 10.0833 6.41667 10.0833C6.65978 10.0833 6.89294 9.98676 7.06485 9.81485C7.23676 9.64294 7.33333 9.40978 7.33333 9.16667V7.33333H14.6667V9.16667C14.6667 9.40978 14.7632 9.64294 14.9352 9.81485C15.1071 9.98676 15.3402 10.0833 15.5833 10.0833C15.8264 10.0833 16.0596 9.98676 16.2315 9.81485C16.4034 9.64294 16.5 9.40978 16.5 9.16667V7.33333H19.25C19.4931 7.33333 19.7263 7.42991 19.8982 7.60182C20.0701 7.77373 20.1667 8.00688 20.1667 8.25V17.4167Z" fill="currentColor"/>
        </g>
        <defs>
          <clipPath id="clip0_1441_534">
            <rect width="22" height="22" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      <span class="cs-header_cart_label">0</span>
    `;
    toolbox.insertBefore(cart, toolbox.firstChild);
  };

  const getCartCount = () => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const data = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(data)) return 0;
      return data.reduce((sum, item) => sum + (item && item.qty ? Number(item.qty) || 1 : 1), 0);
    } catch (e) {
      return 0;
    }
  };

  const setBadgeValue = (badge, value) => {
    const text = String(value);
    if (badge && badge.textContent !== text) {
      badge.textContent = text;
    }
  };

  const updateCartBadge = () => {
    const badge = document.querySelector('.cs-header_cart_label');
    setBadgeValue(badge, getCartCount());
  };

  const reorderHomeTeamSlides = (lang) => {
    const path = (window.location.pathname || '').toLowerCase();
    const isHome =
      path.endsWith('/index.html') || path === '/index.html' || path === '/' || path === '';
    if (!isHome) return;

    const wrapper = document.querySelector(
      '.cs-slider_container[data-lg-slides="4"] .cs-slider_wrapper',
    );
    if (!wrapper) return;
    if (wrapper.classList.contains('slick-initialized')) return;

    const orderEn = [
      'team-details-ammar-alkhatib.html',
      'team-details-taha-zarifah.html',
      'team-details-abdulqader-bdawi.html',
      'team-details-adnan-alkhatib.html',
      'team-details-mohammed-leon.html',
      'team-details-mohammed-hararah.html',
    ];
    const targetOrder = orderEn;

    const slides = Array.from(wrapper.children).filter((el) =>
      el.classList.contains('cs-slide'),
    );
    if (!slides.length) return;

    const byHref = new Map();
    slides.forEach((slide) => {
      const link = slide.querySelector('.cs-member_name a, .cs-member_thumb a');
      const href = (link && link.getAttribute('href')) || '';
      if (href) byHref.set(href, slide);
    });

    targetOrder.forEach((href) => {
      const slide = byHref.get(href);
      if (slide) wrapper.appendChild(slide);
    });
  };

  const applyTestimonialImageSwap = (lang) => {
    const pageKey = (document.body && document.body.dataset.page) || '';
    if (pageKey !== 'home' && pageKey !== 'service') return;

    const navSliders = document.querySelectorAll('.cs-testimonial_slider .slider-nav');
    navSliders.forEach((slider) => {
      const images = Array.from(
        slider.querySelectorAll('.slider-nav_item .cs-rotate_img_in img'),
      );
      if (images.length < 2) return;

      images.forEach((img) => {
        if (!img.dataset.defaultSrc) {
          img.dataset.defaultSrc = img.getAttribute('src') || '';
        }
      });

      // Slides are arranged in groups of 3 (Tala, Yousef, Faisal).
      // For English only, swap Tala/Yousef portraits; Arabic keeps original order.
      for (let i = 0; i < images.length; i += 3) {
        const first = images[i];
        const second = images[i + 1];
        if (!first || !second) continue;

        const firstDefault = first.dataset.defaultSrc || '';
        const secondDefault = second.dataset.defaultSrc || '';
        if (!firstDefault || !secondDefault) continue;

        if (lang === 'en') {
          first.setAttribute('src', secondDefault);
          second.setAttribute('src', firstDefault);
        } else {
          first.setAttribute('src', firstDefault);
          second.setAttribute('src', secondDefault);
        }
      }
    });
  };

  const setLanguage = (lang, options = {}) => {
    const { navigate = false } = options;
    const selected = lang === 'ar' ? 'ar' : 'en';
    const localizedUrl = getLocalizedUrlForCurrentPage(selected);
    if (navigate && localizedUrl) {
      localStorage.setItem(STORAGE_KEY, selected);
      window.location.assign(localizedUrl);
      return;
    }
    syncCurrentPathWithLanguage(selected);
    const isArabic = selected === 'ar';
    document.documentElement.lang = selected;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', isArabic);
    normalizeSideHeaderTranslations();
    reorderHomeTeamSlides(selected);
    applyTranslations(selected);
    localizeInternalLinks(selected);
    syncSeoHead();
    applyTestimonialImageSwap(selected);

    updateToggleLabel(selected);
    localStorage.setItem(STORAGE_KEY, selected);
    currentLang = selected;

    try {
      window.dispatchEvent(
        new CustomEvent('arino:language-changed', {
          detail: { lang: selected },
        }),
      );
    } catch (e) {}
  };

  // Expose a safe hook for other scripts (e.g., dynamic portfolio rendering)
  // to re-apply translations using the current language.
  window.applyArinoLanguage = (lang) => {
    const next =
      lang ||
      (document.documentElement.lang || '').slice(0, 2).toLowerCase() ||
      currentLang ||
      'ar';
    setLanguage(next);
  };

  const toggleLanguage = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const next = (document.documentElement.lang || '').toLowerCase().startsWith('ar') ? 'en' : 'ar';
    setLanguage(next, { navigate: true });
  };

  const injectToggle = () => {
    ensureCartShortcut();
    const toolbox = document.querySelector('.cs-toolbox');
    let toggle = document.querySelector('.cs-lang_toggle');

    if (!toggle) {
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'cs-lang_toggle';
      toggle.textContent = currentLang === 'ar' ? 'EN' : 'AR';
      toggle.setAttribute('aria-label', 'Toggle language');
      toggle.addEventListener('click', toggleLanguage);
    }

    if (toolbox && !toolbox.contains(toggle)) {
      toggle.classList.remove('cs-lang_toggle--floating');
      toggle.classList.add('cs-lang_toggle--header');
      const cart = toolbox.querySelector('.cs-header_cart');
      if (cart && cart.nextSibling) {
        toolbox.insertBefore(toggle, cart.nextSibling);
      } else if (cart) {
        toolbox.appendChild(toggle);
      } else {
        toolbox.appendChild(toggle);
      }
    } else if (!toolbox && !toggle.parentElement) {
      toggle.classList.add('cs-lang_toggle--floating');
      document.body.appendChild(toggle);
    }

    updateCartBadge();
  };

  // Fallback: handle delegated clicks in case the button is re-rendered/cloned
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.cs-lang_toggle');
    if (!btn) return;
    if (e.defaultPrevented) return;
    toggleLanguage(e);
  });

  const normalizedInitialPath = normalizePath(window.location.pathname || '/');
  if (normalizedInitialPath === '/' || normalizedInitialPath === '/index.html') {
    if (window.location.pathname !== '/ar/' && window.location.pathname !== '/ar') {
      window.location.replace('/ar/');
      return;
    }
  }
  const pathLang = normalizedInitialPath.startsWith('/ar') ? 'ar' : normalizedInitialPath.startsWith('/en') ? 'en' : '';
  let currentLang =
    pathLang ||
    localStorage.getItem(STORAGE_KEY) ||
    (document.documentElement.lang || '').slice(0, 2).toLowerCase() ||
    'ar';

  document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    injectToggle();
    setTimeout(injectToggle, 300); // in case header is hydrated after init
    // Reapply after widgets (e.g., sliders) clone nodes
    setTimeout(() => setLanguage(currentLang), 700);
    startHeaderObserver();
  });

  window.addEventListener('load', () => {
    setLanguage(currentLang);
    injectToggle();
    setTimeout(injectToggle, 200);
    updateCartBadge();
    startHeaderObserver();
  });

  window.addEventListener('storage', (e) => {
    if (e.key === CART_KEY) {
      updateCartBadge();
    }
  });

  // If toggle gets removed/changed by dynamic scripts, re-inject
  let headerObserver;
  let syncingHeader = false;
  const startHeaderObserver = () => {
    const toolbox = document.querySelector('.cs-toolbox');
    if (!toolbox) return;
    if (headerObserver) headerObserver.disconnect();
    headerObserver = new MutationObserver(() => {
      if (syncingHeader) return;
      syncingHeader = true;
      injectToggle();
      // Yield to break any mutation loop chains before observing again
      setTimeout(() => {
        syncingHeader = false;
      }, 0);
    });
    headerObserver.observe(toolbox, { childList: true, subtree: true });
  };

  // Fallback in case DOMContentLoaded/load listeners do not fire (rare)
  startHeaderObserver();
})();
