(function ($) {
  'use strict';

  // Minimal preloader escape hatch (no dependencies)
  (function () {
    const hide = () => {
      const pre = document.querySelector('.cs-preloader');
      const inner = document.querySelector('.cs-preloader_in');
      if (inner) inner.style.display = 'none';
      if (pre) pre.style.display = 'none';
      document.body && (document.body.style.overflow = 'unset');
    };
    setTimeout(hide, 3500);
    document.addEventListener('DOMContentLoaded', hide, { once: true });
    window.addEventListener('load', hide, { once: true });
  })();

  /*
  |--------------------------------------------------------------------------
  | Template Name: Arino
  | Author: Laralink
  | Version: 1.0.0
  |--------------------------------------------------------------------------
  |--------------------------------------------------------------------------
  | TABLE OF CONTENTS:
  |--------------------------------------------------------------------------
  |
  | 1. Preloader
  | 2. Mobile Menu
  | 3. Sticky Header
  | 4. Dynamic Background
  | 5. Slick Slider
  | 6. Isotop Initialize
  | 7. Review
  | 8. Modal Video
  | 9. Tabs
  | 10. Accordian
  | 11. Counter Animation
  | 12. Ripple
  | 13. Parallax
  | 14. Hobble Effect
  | 15. Social Button Hover
  | 16. Light Gallery
  | 17. Scroll Up
  | 18. Portfolio Section
  | 19. Ripple
  | 20. Parallax Swiper Slider
  | 21. Dynamic contact form
  | 22. Cursor Animation
  |
  */

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/
  $.exists = function (selector) {
    return $(selector).length > 0;
  };

  $(window).on('load', function () {
    $(window).trigger('scroll');
    $(window).trigger('resize');
    preloader();
    isotopInit();
    autoSkipHeroForPortfolio();
  });

  $(function () {
    $(window).trigger('resize');
    mainNav();
    stickyHeader();
    dynamicBackground();
    slickInit();
    isotopInit();
    review();
    modalVideo();
    tabs();
    accordian();
    counterInit();
    rippleInit();
    parallaxEffect();
    hobbleEffect();
    hoverTab();
    lightGalleryInit();
    scrollUp();
    portfolioSection();
    parallaxSwiperSlider();
    fullScreenSwiperSlider();
    ecommerce();
    relocateFooterSocial();
    applyPortfolioBreadcrumbReturn();
    if ($.exists('.wow')) {
      new WOW().init();
    }
    autoSkipHeroForPortfolio();
  });

  $(window).on('scroll', function () {
    counterInit();
    parallaxEffect();
    showScrollUp();
  });
  $(window).on('resize', function () {
    relocateFooterSocial();
  });

  function autoSkipHeroForPortfolio() {
    if (window.location.hash) return;
    if (window.__portfolioAutoSkipped) return;
    const pageKey = (document.body && document.body.dataset.page) || '';
    if (pageKey !== 'portfolio') return;

    const hero = document.querySelector('.cs-page_heading');
    if (!hero) return;

    const header = document.querySelector('.cs-site_header');
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const targetY = Math.max(0, hero.offsetTop + hero.offsetHeight - headerHeight - 8);
    window.scrollTo({ top: targetY, behavior: 'auto' });
    window.__portfolioAutoSkipped = true;
  }

  function getCurrentPageFileName() {
    var rawPath = (window.location.pathname || '').split('/').pop();
    return rawPath && rawPath.length ? rawPath : 'index.html';
  }

  function applyPortfolioBreadcrumbReturn() {
    var body = document.body;
    if (!body || body.dataset.page !== 'portfolio-video-details') return;

    var breadcrumbLink = document.querySelector('.breadcrumb .breadcrumb-item a[href^="portfolio"]');
    if (!breadcrumbLink) return;

    var currentParams = new URLSearchParams(window.location.search || '');
    var fromParam = (currentParams.get('from') || '').trim();
    var pageParam = Number(currentParams.get('page')) || 0;

    var storedPath = '';
    var storedPage = 0;
    try {
      var storedRaw = sessionStorage.getItem('arinoPortfolioReturn');
      if (storedRaw) {
        var stored = JSON.parse(storedRaw);
        storedPath = (stored && stored.path) || '';
        storedPage = Number((stored && stored.page) || 0);
      }
    } catch (e) {}

    var targetPath = fromParam || storedPath || breadcrumbLink.getAttribute('href') || 'portfolio.html';
    var targetPage = pageParam > 0 ? pageParam : storedPage;
    var hasExplicitPage = Number.isFinite(targetPage) && targetPage > 1;
    breadcrumbLink.setAttribute('href', hasExplicitPage ? targetPath + '?page=' + targetPage : targetPath);
  }

  /*--------------------------------------------------------------
    1. Preloader
  --------------------------------------------------------------*/
  function preloader() {
    $('.cs-preloader_in').fadeOut();
    $('.cs-preloader').delay(150).fadeOut('slow');
  }
  // Fallback: hide preloader even if external resources block window load
  function hidePreloaderFast() {
    const pre = document.querySelector('.cs-preloader');
    const inner = document.querySelector('.cs-preloader_in');
    if (inner) inner.style.display = 'none';
    if (pre) pre.style.display = 'none';
  }
  setTimeout(() => {
    preloader();
    hidePreloaderFast();
  }, 5000);
  document.addEventListener('DOMContentLoaded', hidePreloaderFast);

  /*--------------------------------------------------------------
    2. Mobile Menu
  --------------------------------------------------------------*/
  function mainNav() {
    function updateMobileMenuHint() {
      var isMobile = window.innerWidth <= 991;
      var $iconBtn = $('.cs-site_header.cs-style1 .cs-icon_btn').first();
      if (!$iconBtn.length) return;

      var $hint = $iconBtn.find('.cs-menu_hint');
      if (!$hint.length) {
        $hint = $('<span class="cs-menu_hint" aria-hidden="true"></span>');
        $iconBtn.append($hint);
      }

      var isArabic = document.documentElement.dir === 'rtl' || $('body').hasClass('rtl');
      $hint.text(isArabic ? 'القائمة' : 'Menu');
      $hint.toggle(isMobile);
    }

    function normalizeMobileContactMenu() {
      if (window.innerWidth > 991) return;

      $('.cs-nav_list > li.menu-item-has-children').each(function () {
        var $item = $(this);
        if ($item.data('mobileContactNormalized')) return;

        var $parentContact = $item.children('a[href*="contact.html"]').first();
        var $submenu = $item.children('ul');
        if (!$parentContact.length || !$submenu.length) return;

        var $feedbackItem = $submenu.find('a[href*="feedback.html"]').first().closest('li');
        if (!$feedbackItem.length) return;

        // Remove duplicated "Contact" inside submenu on mobile.
        $submenu.find('a[href*="contact.html"]').closest('li').remove();

        // Flatten "Feedback" under Contact in mobile list and remove + toggle.
        $item.after($feedbackItem);
        $submenu.remove();
        $item.removeClass('menu-item-has-children active');
        $item.children('.cs-munu_dropdown_toggle').remove();
        $item.data('mobileContactNormalized', true);
      });
    }

    $('.cs-nav').append('<span class="cs-munu_toggle"><span></span></span>');
    $('.menu-item-has-children').append(
      '<span class="cs-munu_dropdown_toggle"></span>',
    );
    $('.cs-munu_toggle').on('click', function () {
      $(this)
        .toggleClass('cs-toggle_active')
        .siblings('.cs-nav_list')
        .slideToggle();
    });
    $('.cs-munu_dropdown_toggle').on('click', function () {
      $(this).toggleClass('active').siblings('ul').slideToggle();
      $(this).parent().toggleClass('active');
    });
    // Close mobile menu/dropdowns on outside click.
    $(document).on('click touchstart', function (e) {
      if (window.innerWidth > 991) return;

      var $nav = $('.cs-main_header .cs-nav').first();
      if (!$nav.length) return;

      if ($(e.target).closest('.cs-main_header .cs-nav').length) return;

      var $menuToggle = $nav.find('.cs-munu_toggle');
      var $menuList = $nav.find('.cs-nav_list');
      if (!$menuToggle.hasClass('cs-toggle_active') && !$menuList.is(':visible')) return;

      $menuToggle.removeClass('cs-toggle_active');
      $menuList.stop(true, true).slideUp(200);
      $menuList.find('.cs-munu_dropdown_toggle.active').removeClass('active');
      $menuList.find('li.menu-item-has-children.active').removeClass('active');
      $menuList.find('li.menu-item-has-children > ul:visible').stop(true, true).slideUp(200);
    });
    // Mega Menu
    // $('.cs-mega_wrapper>li>a').removeAttr('href');
    // Modal Btn
    $('.cs-mode_btn').on('click', function () {
      $(this).toggleClass('active');
      $('body').toggleClass('cs-dark');
    });
    // Side Nav
    $('.cs-icon_btn').on('click', function () {
      $('.cs-side_header').addClass('active');
    });
    $('.cs-close, .cs-side_header_overlay').on('click', function () {
      $('.cs-side_header').removeClass('active');
    });

    normalizeMobileContactMenu();
    updateMobileMenuHint();
    $(window).on('resize', normalizeMobileContactMenu);
    $(window).on('resize', updateMobileMenuHint);
    $(document).on('click', '.cs-lang_toggle', function () {
      setTimeout(updateMobileMenuHint, 30);
    });
  }

  /*--------------------------------------------------------------
    3. Sticky Header
  --------------------------------------------------------------*/
  function stickyHeader() {
    var $window = $(window);
    var lastScrollTop = 0;
    var $header = $('.cs-sticky_header');
    var headerHeight = $header.outerHeight() + 30;

    $window.scroll(function () {
      var windowTop = $window.scrollTop();

      if (windowTop >= headerHeight) {
        $header.addClass('cs-gescout_sticky');
      } else {
        $header.removeClass('cs-gescout_sticky');
        $header.removeClass('cs-gescout_show');
      }

      if ($header.hasClass('cs-gescout_sticky')) {
        if (windowTop < lastScrollTop) {
          $header.addClass('cs-gescout_show');
        } else {
          $header.removeClass('cs-gescout_show');
        }
      }

      lastScrollTop = windowTop;
    });
  }

  /*--------------------------------------------------------------
    4. Dynamic Background
  --------------------------------------------------------------*/
  function dynamicBackground() {
    var isMobile = window.matchMedia('(max-width: 991px)').matches;
    var mobileHeroMap = {
      'assets/img/hero_bg.jpeg': 'assets/img/Mob Hero BG/hero_bg.jpg',
      'assets/img/about_hero_bg.jpeg':
        'assets/img/Mob Hero BG/about_hero_bg-mobile.jpeg',
      'assets/img/blog_hero_bg.jpeg':
        'assets/img/Mob Hero BG/blog_hero_bg_mobile.jpeg',
      'assets/img/contact_hero_bg.jpeg':
        'assets/img/Mob Hero BG/contact_hero_bg_mobile.jpeg',
      'assets/img/portfolio_hero_bg.jpeg':
        'assets/img/Mob Hero BG/portfolio_hero_bg_mobile.jpeg',
      'assets/img/service_hero_bg.jpeg':
        'assets/img/Mob Hero BG/service_hero_bg_mobile.jpeg',
      'assets/img/shop_hero_bg.jpeg':
        'assets/img/Mob Hero BG/shop_hero_bg_mobile.jpeg',
      'assets/img/team_hero_bg.jpeg':
        'assets/img/Mob Hero BG/team_hero_bg_mobile.jpeg',
    };

    $('[data-src]').each(function () {
      var src = $(this).attr('data-src');
      if (isMobile && mobileHeroMap[src]) {
        src = mobileHeroMap[src];
      }
      var safeSrc = encodeURI(src);
      $(this).css({
        'background-image': 'url("' + safeSrc + '")',
      });
    });
  }

  /*--------------------------------------------------------------
    5. Slick Slider
  --------------------------------------------------------------*/
  function slickInit() {
    if ($.exists('.cs-slider')) {
      $('.cs-slider').each(function () {
        // Slick Variable
        var $ts = $(this).find('.cs-slider_container');
        var $slickActive = $(this).find('.cs-slider_wrapper');

        // Auto Play
        var autoPlayVar = parseInt($ts.attr('data-autoplay'), 10);
        // Auto Play Time Out
        var autoplaySpdVar = 3000;
        if (autoPlayVar > 1) {
          autoplaySpdVar = autoPlayVar;
          autoPlayVar = 1;
        }
        // Slide Change Speed
        var speedVar = parseInt($ts.attr('data-speed'), 10);
        // Slider Loop
        var loopVar = Boolean(parseInt($ts.attr('data-loop'), 10));
        // Slider Center
        var centerVar = Boolean(parseInt($ts.attr('data-center'), 10));
        // Variable Width
        var variableWidthVar = Boolean(
          parseInt($ts.attr('data-variable-width'), 10),
        );
        // Pagination
        var paginaiton = $(this)
          .find('.cs-pagination')
          .hasClass('cs-pagination');
        // Slide Per View
        var slidesPerView = $ts.attr('data-slides-per-view');
        if (slidesPerView == 1) {
          slidesPerView = 1;
        }
        if (slidesPerView == 'responsive') {
          var slidesPerView = parseInt($ts.attr('data-add-slides'), 10);
          var lgPoint = parseInt($ts.attr('data-lg-slides'), 10);
          var mdPoint = parseInt($ts.attr('data-md-slides'), 10);
          var smPoint = parseInt($ts.attr('data-sm-slides'), 10);
          var xsPoing = parseInt($ts.attr('data-xs-slides'), 10);
        }
        // Fade Slider
        var fadeVar = parseInt($($ts).attr('data-fade-slide'));
        fadeVar === 1 ? (fadeVar = true) : (fadeVar = false);

        // Slick Active Code
        $slickActive.slick({
          autoplay: autoPlayVar,
          pauseOnHover: true,
          dots: paginaiton,
          centerPadding: '28%',
          speed: speedVar,
          infinite: loopVar,
          autoplaySpeed: autoplaySpdVar,
          centerMode: centerVar,
          fade: fadeVar,
          prevArrow: $(this).find('.cs-left_arrow'),
          nextArrow: $(this).find('.cs-right_arrow'),
          appendDots: $(this).find('.cs-pagination'),
          slidesToShow: slidesPerView,
          variableWidth: variableWidthVar,
          // slidesToScroll: slidesPerView,
          responsive: [
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: lgPoint,
                // slidesToScroll: lgPoint,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: mdPoint,
                // slidesToScroll: mdPoint,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: smPoint,
                // slidesToScroll: smPoint,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: xsPoing,
                slidesToScroll: xsPoing,
              },
            },
          ],
        });
      });
    }
    // Testimonial Slider
    $('.slider-for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      asNavFor: '.slider-nav',
    });

    $('.slider-nav').slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: true,
      centerMode: true,
      focusOnSelect: true,
      variableWidth: true,
    });
  }

  /*--------------------------------------------------------------
    6. Isotop Initialize
  --------------------------------------------------------------*/
  function isotopInit() {
    if ($.exists('.cs-isotop')) {
      var $isotopes = $('.cs-isotop');
      $isotopes.isotope({
        itemSelector: '.cs-isotop_item',
        transitionDuration: '0.60s',
        percentPosition: true,
        masonry: {
          columnWidth: '.cs-grid_sizer',
        },
      });

      var $filterList = $('.cs-isotop_filter ul');
      var $portfolioPagination = $('#portfolio-pagination');
      var $portfolioLoadMore = $('#portfolio-load-more-btn');
      var isPortfolioPagerMode =
        document.body &&
        document.body.dataset &&
        document.body.dataset.page === 'portfolio' &&
        $portfolioPagination.length &&
        $portfolioLoadMore.length;

      if (!isPortfolioPagerMode) {
        /* Active Class of Portfolio*/
        $('.cs-isotop_filter ul li')
          .off('click.isotopActive')
          .on('click.isotopActive', function (event) {
            $(this).siblings('.active').removeClass('active');
            $(this).addClass('active');
            event.preventDefault();
          });

        /*=== Portfolio filtering ===*/
        $filterList.off('click.isotopFilter').on('click.isotopFilter', 'a', function () {
          var filterElement = $(this).attr('data-filter');
          $isotopes.isotope({
            filter: filterElement,
          });
        });
        return;
      }

      var $grid = $isotopes.first();
      if ($grid.data('portfolioPagerReady')) {
        return;
      }
      $grid.data('portfolioPagerReady', true);

      var itemsPerPage = 6;
      var currentFilter = '*';
      var viewMode = 'source'; // source | filter
      var activeSourcePage = 1;
      var sourcePages = [];
      var filterPage = 1;
      var filterLoadedPages = 1;
      var filterAppendMode = false;
      var currentSourcePath = getCurrentPageFileName();

      var rememberPortfolioReturnState = function () {
        try {
          sessionStorage.setItem(
            'arinoPortfolioReturn',
            JSON.stringify({
              path: currentSourcePath,
              page: activeSourcePage,
            }),
          );
        } catch (e) {}
      };

      var decorateDetailLinksWithReturnState = function () {
        $grid.find('.cs-portfolio[href$=".html"]').each(function () {
          var originalHref = $(this).attr('href');
          if (!originalHref || originalHref.indexOf('#') === 0) return;
          var isDetailPage = /portfolio\d*-details-video-\d+\.html$/i.test(originalHref);
          if (!isDetailPage) return;

          var cleanHref = originalHref.split('?')[0];
          var nextHref = cleanHref + '?from=' + encodeURIComponent(currentSourcePath) + '&page=' + activeSourcePage;
          $(this).attr('href', nextHref);
        });
      };

      var setBgFromDataSrc = function ($scope) {
        $scope.find('[data-src]').each(function () {
          var src = $(this).attr('data-src');
          if (!src) return;
          $(this).css('background-image', 'url("' + encodeURI(src) + '")');
        });
      };

      var syncLateI18n = function () {
        // Re-apply the active site language after dynamic portfolio rendering.
        if (typeof window.applyArinoLanguage === 'function') {
          window.applyArinoLanguage();
        }
      };

      var captureCurrentItems = function () {
        return $grid
          .children('.cs-isotop_item')
          .map(function () {
            return $(this).clone(true, true)[0];
          })
          .get();
      };

      var extractItemsFromHtml = function (html) {
        var parsedNodes = $.parseHTML(html, document, true);
        var $parsed = $('<div></div>').append(parsedNodes);
        return $parsed
          .find('.cs-isotop .cs-isotop_item')
          .map(function () {
            return $(this).clone(true, true)[0];
          })
          .get();
      };

      var renderItems = function (items) {
        var nextItems = (items || []).map(function (item) {
          return $(item).clone(true, true)[0];
        });

        $grid.children('.cs-isotop_item').remove();
        if (nextItems.length) {
          $grid.append(nextItems);
        }

        var $newItems = $grid.children('.cs-isotop_item');
        setBgFromDataSrc($newItems);
        syncLateI18n();
        $grid.isotope('reloadItems');
        $grid.isotope({ filter: '*' });
        $grid.isotope('layout');
      };

      var renderPagination = function (totalPages, activePage) {
        $portfolioPagination.empty();
        if (totalPages <= 1) {
          $portfolioPagination.hide();
          return;
        }
        $portfolioPagination.show();
        for (var i = 1; i <= totalPages; i += 1) {
          var isActive = activePage === i;
          var btn = $('<button type="button" class="cs-portfolio_page_btn"></button>')
            .text(i)
            .attr('aria-label', 'Portfolio page ' + i)
            .toggleClass('active', isActive)
            .attr('aria-current', isActive ? 'page' : null)
            .data('page', i);
          $portfolioPagination.append(btn);
        }
      };

      var renderSourcePage = function (pageNumber) {
        if (!sourcePages.length) return;
        var safePageNumber = Math.max(1, Math.min(pageNumber, sourcePages.length));
        activeSourcePage = safePageNumber;
        var pageDef = sourcePages[safePageNumber - 1];
        viewMode = 'source';
        currentFilter = '*';
        renderItems(pageDef.items || []);
        decorateDetailLinksWithReturnState();
        renderPagination(sourcePages.length, activeSourcePage);
        $portfolioLoadMore.hide();
        rememberPortfolioReturnState();
      };

      var getFilteredItemsFromAllPages = function (filterValue) {
        if (!filterValue || filterValue === '*') return [];
        var className = filterValue.replace('.', '').trim();
        var matches = [];
        sourcePages.forEach(function (pageDef) {
          (pageDef.items || []).forEach(function (item) {
            if (item.classList && item.classList.contains(className)) {
              matches.push(item);
            }
          });
        });
        return matches;
      };

      var renderFilteredState = function () {
        var matches = getFilteredItemsFromAllPages(currentFilter);
        var totalPages = Math.max(1, Math.ceil(matches.length / itemsPerPage));
        filterPage = Math.max(1, Math.min(filterPage, totalPages));
        filterLoadedPages = Math.max(1, Math.min(filterLoadedPages, totalPages));

        var visibleItems;
        var activePage;
        if (filterAppendMode) {
          visibleItems = matches.slice(0, filterLoadedPages * itemsPerPage);
          activePage = Math.min(filterLoadedPages, totalPages);
        } else {
          var startIndex = (filterPage - 1) * itemsPerPage;
          visibleItems = matches.slice(startIndex, startIndex + itemsPerPage);
          activePage = filterPage;
        }

        renderItems(visibleItems);
        decorateDetailLinksWithReturnState();
        // In filter mode we use progressive loading only (no numeric pagination).
        $portfolioPagination.hide();

        var hasMore = filterAppendMode ? filterLoadedPages < totalPages : filterPage < totalPages;
        $portfolioLoadMore.toggle(hasMore);
      };

      var discoverExtraPortfolioPages = function () {
        var deferred = $.Deferred();
        var pageNo = 2;
        var maxPagesToProbe = 20;

        var probeNext = function () {
          if (pageNo > maxPagesToProbe) {
            deferred.resolve();
            return;
          }

          var pageUrl = 'portfolio' + pageNo + '.html';
          $.get(pageUrl)
            .done(function (html) {
              var items = extractItemsFromHtml(html);
              sourcePages.push({
                url: pageUrl,
                items: items,
              });
              pageNo += 1;
              probeNext();
            })
            .fail(function () {
              deferred.resolve();
            });
        };

        probeNext();
        return deferred.promise();
      };

      $('.cs-isotop_filter ul li')
        .off('click.isotopActive')
        .on('click.isotopActive', function (event) {
          $(this).siblings('.active').removeClass('active');
          $(this).addClass('active');
          event.preventDefault();
        });

      $filterList.off('click.portfolioPager').on('click.portfolioPager', 'a', function (e) {
        e.preventDefault();
        currentFilter = $(this).attr('data-filter') || '*';

        if (currentFilter === '*') {
          filterPage = 1;
          filterLoadedPages = 1;
          filterAppendMode = false;
          renderSourcePage(activeSourcePage);
          return;
        }

        viewMode = 'filter';
        filterPage = 1;
        filterLoadedPages = 1;
        filterAppendMode = false;
        renderFilteredState();
      });

      $portfolioPagination
        .off('click.portfolioPager')
        .on('click.portfolioPager', '.cs-portfolio_page_btn', function (e) {
          e.preventDefault();
          var nextPage = Number($(this).data('page')) || 1;
          if (viewMode === 'filter') {
            filterAppendMode = false;
            filterPage = nextPage;
            renderFilteredState();
            return;
          }
          renderSourcePage(nextPage);
        });

      $portfolioLoadMore.off('click.portfolioPager').on('click.portfolioPager', function (e) {
        e.preventDefault();
        if (viewMode !== 'filter') return false;
        if (!filterAppendMode) {
          filterAppendMode = true;
          filterLoadedPages = Math.max(1, filterPage) + 1;
        } else {
          filterLoadedPages += 1;
        }
        renderFilteredState();
        return false;
      });
      $portfolioLoadMore.hide();

      sourcePages = [
        {
          url: currentSourcePath,
          items: captureCurrentItems(),
        },
      ];

      discoverExtraPortfolioPages().always(function () {
        var params = new URLSearchParams(window.location.search || '');
        var requestedPage = Number(params.get('page')) || 0;
        var initialPage = requestedPage > 0 ? requestedPage : 1;
        renderSourcePage(initialPage);
      });
    }
  }

  /*--------------------------------------------------------------
    7. Review
  --------------------------------------------------------------*/
  function review() {
    $('.cs-rating').each(function () {
      var review = $(this).data('rating');
      var reviewVal = review * 20 + '%';
      $(this).find('.cs-rating_percentage').css('width', reviewVal);
    });
  }

  /*--------------------------------------------------------------
    8. Modal Video
  --------------------------------------------------------------*/
  function modalVideo() {
    $(document).on('click', '.cs-video_open', function (e) {
      e.preventDefault();
      var video = $(this).attr('href');
      video = video.split('?v=')[1].trim();
      $('.cs-video_popup_container iframe').attr(
        'src',
        `https://www.youtube.com/embed/${video}`,
      );
      $('.cs-video_popup').addClass('active');
    });
    $('.cs-video_popup_close, .cs-video_popup_layer').on('click', function (e) {
      $('.cs-video_popup').removeClass('active');
      $('html').removeClass('overflow-hidden');
      $('.cs-video_popup_container iframe').attr('src', 'about:blank');
      e.preventDefault();
    });
  }

  /*--------------------------------------------------------------
    9. Tabs
  --------------------------------------------------------------*/
  function tabs() {
    $('.cs-tabs .cs-tab_links a').on('click', function (e) {
      var currentAttrValue = $(this).attr('href');
      $('.cs-tabs ' + currentAttrValue)
        .fadeIn(400)
        .siblings()
        .hide();
      $(this).parents('li').addClass('active').siblings().removeClass('active');
      e.preventDefault();
    });
  }

  /*--------------------------------------------------------------
    10. Accordian
  --------------------------------------------------------------*/
  function accordian() {
    $('.cs-accordian').children('.cs-accordian_body').hide();
    $('.cs-accordian.active').children('.cs-accordian_body').show();
    $('.cs-accordian_head').on('click', function () {
      $(this)
        .parent('.cs-accordian')
        .siblings()
        .children('.cs-accordian_body')
        .slideUp(250);
      $(this).siblings().slideDown(250);
      $(this)
        .parent()
        .parent()
        .siblings()
        .find('.cs-accordian_body')
        .slideUp(250);
      /* Accordian Active Class */
      $(this).parents('.cs-accordian').addClass('active');
      $(this).parent('.cs-accordian').siblings().removeClass('active');
    });
  }

  /*--------------------------------------------------------------
    11. Counter Animation
  --------------------------------------------------------------*/
  function counterInit() {
    if ($.exists('.odometer')) {
      $(window).on('scroll', function () {
        function winScrollPosition() {
          var scrollPos = $(window).scrollTop(),
            winHeight = $(window).height();
          var scrollPosition = Math.round(scrollPos + winHeight / 1.2);
          return scrollPosition;
        }

        $('.odometer').each(function () {
          var elemOffset = $(this).offset().top;
          if (elemOffset < winScrollPosition()) {
            $(this).html($(this).data('count-to'));
          }
        });
      });
    }
  }

  /*--------------------------------------------------------------
    12. Ripple
  --------------------------------------------------------------*/
  function rippleInit() {
    if ($.exists('.cs-ripple_version')) {
      $('.cs-ripple_version').each(function () {
        $('.cs-ripple_version').ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        });
      });
    }
  }

  /*--------------------------------------------------------------
    13. Parallax
  --------------------------------------------------------------*/
  function parallaxEffect() {
    $('.cs-parallax_bg, .cs-parallax').each(function () {
      var windowScroll = $(document).scrollTop(),
        windowHeight = $(window).height(),
        barOffset = $(this).offset().top,
        barHeight = $(this).height(),
        barScrollAtZero = windowScroll - barOffset + windowHeight,
        barHeightWindowHeight = windowScroll + windowHeight,
        barScrollUp = barOffset <= windowScroll + windowHeight,
        barSctollDown = barOffset + barHeight >= windowScroll;

      if (barSctollDown && barScrollUp) {
        var calculadedHeight = barHeightWindowHeight - barOffset;
        var largeEffectPixel = calculadedHeight / 5 - 150;
        var mediumEffectPixel = calculadedHeight / 20;
        var miniEffectPixel = calculadedHeight / 10;

        $(this)
          .find('.cs-to_left')
          .css('transform', `translateX(-${miniEffectPixel}px)`);
        $(this)
          .find('.cs-to_right')
          .css('transform', `translateX(${miniEffectPixel}px)`);
        $(this)
          .find('.cs-to_up')
          .css('transform', `translateY(-${miniEffectPixel}px)`);
        $(this)
          .find('.cs-to_down')
          .css('transform', `translateY(${miniEffectPixel}px)`);
        $(this)
          .find('.cs-to_rotate')
          .css('transform', `rotate(${miniEffectPixel}deg)`);
        $(this).css('background-position', `center -${largeEffectPixel}px`);
      }
    });
  }

  /*--------------------------------------------------------------
    14. Hobble Effect
  --------------------------------------------------------------*/
  function hobbleEffect() {
    $(document)
      .on('mousemove', '.cs-hobble', function (event) {
        var halfW = this.clientWidth / 2;
        var halfH = this.clientHeight / 2;
        var coorX = halfW - (event.pageX - $(this).offset().left);
        var coorY = halfH - (event.pageY - $(this).offset().top);
        var degX1 = (coorY / halfH) * 8 + 'deg';
        var degY1 = (coorX / halfW) * -8 + 'deg';
        var degX2 = (coorY / halfH) * -50 + 'px';
        var degY2 = (coorX / halfW) * 70 + 'px';
        var degX3 = (coorY / halfH) * -10 + 'px';
        var degY3 = (coorX / halfW) * 10 + 'px';
        var degX4 = (coorY / halfH) * 15 + 'deg';
        var degY4 = (coorX / halfW) * -15 + 'deg';
        var degX5 = (coorY / halfH) * -30 + 'px';
        var degY5 = (coorX / halfW) * 60 + 'px';

        $(this)
          .find('.cs-hover_layer1')
          .css('transform', function () {
            return (
              'perspective( 800px ) translate3d( 0, 0, 0 ) rotateX(' +
              degX1 +
              ') rotateY(' +
              degY1 +
              ')'
            );
          });
        $(this)
          .find('.cs-hover_layer2')
          .css('transform', function () {
            return (
              'perspective( 800px ) translateY(' +
              degX2 +
              ') translateX(' +
              degY2 +
              ')'
            );
          });
        $(this)
          .find('.cs-hover_layer3')
          .css('transform', function () {
            return (
              'perspective( 800px ) translateX(' +
              degX3 +
              ') translateY(' +
              degY3 +
              ') scale(1.02)'
            );
          });
      })
      .on('mouseout', '.cs-hobble', function () {
        $(this).find('.cs-hover_layer1').removeAttr('style');
        $(this).find('.cs-hover_layer2').removeAttr('style');
        $(this).find('.cs-hover_layer3').removeAttr('style');
      });
  }
  /*--------------------------------------------------------------
    15. Social Button Hover
  --------------------------------------------------------------*/
  function hoverTab() {
    $('.cs-hover_tab a').hover(
      function () {
        $(this)
          .parents('.cs-hover_tab')
          .addClass('active')
          .siblings()
          .removeClass('active');
      },
      function () {
        $(this).parents('.cs-hover_tab').removeClass('active');
      }
    );
  }
  /*--------------------------------------------------------------
    Footer Social Relocation (mobile)
  --------------------------------------------------------------*/
  function relocateFooterSocial() {
    const isMobile = window.innerWidth <= 991;
    const socials = document.querySelectorAll(
      '.cs-footer_row .cs-social_btns.cs-style1, .cs-footer_mobile_social .cs-social_btns.cs-style1',
    );
    socials.forEach((social, index) => {
      if (!social.dataset.socialId) {
        const id = `footer-social-${index}`;
        social.dataset.socialId = id;
        const placeholder = document.createElement('span');
        placeholder.className = 'cs-footer_social_placeholder';
        placeholder.dataset.socialPlaceholder = id;
        if (social.parentNode) {
          social.parentNode.insertBefore(placeholder, social);
        }
      }
      const placeholder = document.querySelector(
        `.cs-footer_social_placeholder[data-social-placeholder="${social.dataset.socialId}"]`,
      );
      const footerRow = social.closest('.cs-footer_row');
      const contact = footerRow && footerRow.querySelector('.cs-footer_item_contact');
      const services = footerRow && footerRow.querySelector('.cs-footer_item_services');
      const brand = footerRow && footerRow.querySelector('.cs-footer_brand');
      if (!contact) return;

      if (isMobile) {
        const footerContainer = footerRow && footerRow.parentNode;
        if (footerContainer) {
          let mobileSlot = footerContainer.querySelector(
            `.cs-footer_mobile_social[data-social-slot="${social.dataset.socialId}"]`,
          );
          if (!mobileSlot) {
            mobileSlot = document.createElement('div');
            mobileSlot.className = 'cs-footer_mobile_social';
            mobileSlot.dataset.socialSlot = social.dataset.socialId;
            if (footerRow.nextSibling) {
              footerContainer.insertBefore(mobileSlot, footerRow.nextSibling);
            } else {
              footerContainer.appendChild(mobileSlot);
            }
          }
          if (social.parentNode !== mobileSlot) {
            mobileSlot.appendChild(social);
          }
        }
      } else if (services && social.parentNode !== services) {
        services.appendChild(social);
      } else if (placeholder && placeholder.parentNode) {
        placeholder.parentNode.insertBefore(social, placeholder);
      } else if (brand) {
        brand.appendChild(social);
      }
    });

    document.querySelectorAll('.cs-footer_mobile_social').forEach(slot => {
      if (!slot.children.length) {
        slot.remove();
      }
    });
  }
  /*--------------------------------------------------------------
    16. Light Gallery
  --------------------------------------------------------------*/
  function lightGalleryInit() {
    $('.cs-lightgallery').each(function () {
      $(this).lightGallery({
        selector: '.cs-lightbox_item',
        subHtmlSelectorRelative: false,
        thumbnail: false,
        mousewheel: true,
      });
    });
  }

  /*--------------------------------------------------------------
    17. Scroll Up
  --------------------------------------------------------------*/
  function scrollUp() {
    $('.cs-scrollup').on('click', function (e) {
      e.preventDefault();
      $('html,body').animate(
        {
          scrollTop: 0,
        },
        0,
      );
    });
  }
  // For Scroll Up
  function showScrollUp() {
    let scroll = $(window).scrollTop();
    if (scroll >= 350) {
      $('.cs-scrollup').addClass('cs-scrollup_show');
    } else {
      $('.cs-scrollup').removeClass('cs-scrollup_show');
    }
  }

  /*--------------------------------------------------------------
    18. Portfolio Section
  --------------------------------------------------------------*/
  function portfolioSection() {
    $('.cs-portfolio.cs-style2 .cs-text_btn').hover(
      function () {
        $(this)
          .parents('.cs-portfolio')
          .find('.cs-portfolio_img')
          .addClass('active');
      },
      function () {
        $(this)
          .parents('.cs-portfolio')
          .find('.cs-portfolio_img')
          .removeClass('active');
      },
    );
  }
  /*--------------------------------------------------------------
    20. Parallax Swiper Slider
  --------------------------------------------------------------*/
  function parallaxSwiperSlider() {
    if ($.exists('.cs-parallax_slider')) {
      // Params
      let mainSliderSelector = '.cs-parallax_slider',
        interleaveOffset = 0.5;
      // Main Slider
      let mainSliderOptions = {
        loop: true,
        speed: 1000,
        autoplay: false,
        loopAdditionalSlides: 10,
        grabCursor: true,
        watchSlidesProgress: true,
        mousewheel: true,
        navigation: {
          nextEl: '.cs-swiper_button_next',
          prevEl: '.cs-swiper_button_prev',
        },
        pagination: {
          el: '.cs-swiper_pagination',
          clickable: true,
        },
        on: {
          init: function () {
            this.autoplay.stop();
          },
          imagesReady: function () {
            this.el.classList.remove('loading');
            this.autoplay.start();
          },
          progress: function (swiper) {
            for (let i = 0; i < swiper.slides.length; i++) {
              let slideProgress = swiper.slides[i].progress,
                innerOffset = swiper.width * interleaveOffset,
                innerTranslate = slideProgress * innerOffset;

              swiper.slides[i].querySelector(
                '.cs-swiper_parallax_bg',
              ).style.transform = 'translateX(' + innerTranslate + 'px)';
            }
          },
          touchStart: function (swiper) {
            for (let i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = '';
            }
          },
          setTransition: function (swiper, transition) {
            for (let i = 0; i < swiper.slides.length; i++) {
              swiper.slides[i].style.transition = transition + 'ms';
              swiper.slides[i].querySelector(
                '.cs-swiper_parallax_bg',
              ).style.transition = transition + 'ms';
            }
          },
        },
      };
      let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);
    }
  }

  /* Vertical Full Screen Swiper Slider Active */
  function fullScreenSwiperSlider() {
    if ($.exists('.cs-fullscreen_swiper_slider')) {
      var swiper = new Swiper('.cs-fullscreen_swiper_slider', {
        direction: 'vertical',
        mousewheel: true,
        loop: true,
        speed: 1000,
        pagination: {
          el: '.cs-swiper_pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.cs-swiper_button_next',
          prevEl: '.cs-swiper_button_prev',
        },
      });
    }
  }

  /*--------------------------------------------------------------
    21. Dynamic contact form
  --------------------------------------------------------------*/
  function ecommerce() {
    // Star Rating Input
    $('.cs-input_rating i').on('click', function () {
      $(this).siblings().removeClass('fa-solid');
      $(this).addClass('fa-solid').prevAll().addClass('fa-solid');
    });
    // Product Single Slider
    $('.cs-single_product_thumb').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.cs-single_product_nav',
    });

    $('.cs-single_product_nav').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.cs-single_product_thumb',
      focusOnSelect: true,
      arrows: false,
    });
    // Check All
    $('#checkAll').change(function () {
      var isChecked = $(this).prop('checked');
      $('table input[type="checkbox"]').prop('checked', isChecked);
    });
    // Range Slider
    if ($.exists('#slider-range')) {
      $('#slider-range').slider({
        range: true,
        min: 0,
        max: 1000,
        values: [100, 600],
        slide: function (event, ui) {
          $('#amount').val('Price: $' + ui.values[0] + ' - $' + ui.values[1]);
        },
      });
    }
    if ($.exists('#amount')) {
      $('#amount').val(
        'Price: $' +
          $('#slider-range').slider('values', 0) +
          ' - $' +
          $('#slider-range').slider('values', 1),
      );
    }
    // Counter
    $('.cs-increment').click(function () {
      var countElement = $(this).siblings('.cs-quantity_input');
      var count = parseInt(countElement.text());
      count++;
      countElement.text(count);
    });

    $('.cs-decrement').click(function () {
      var countElement = $(this).siblings('.cs-quantity_input');
      var count = parseInt(countElement.text());
      if (count > 0) {
        count--;
        countElement.text(count);
      }
    });
  }
  /*--------------------------------------------------------------
    21. Dynamic contact form
  --------------------------------------------------------------*/
  if ($.exists('#cs-form')) {
    const form = document.getElementById('cs-form');
    const result = document.getElementById('cs-result');

    form.addEventListener('submit', function (e) {
      const formData = new FormData(form);
      e.preventDefault();
      var object = {};
      formData.forEach((value, key) => {
        object[key] = value;
      });
      var json = JSON.stringify(object);
      result.innerHTML = 'Please wait...';

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      })
        .then(async response => {
          let json = await response.json();
          if (response.status == 200) {
            result.innerHTML = json.message;
          } else {
            console.log(response);
            result.innerHTML = json.message;
          }
        })
        .catch(error => {
          console.log(error);
          result.innerHTML = 'Something went wrong!';
        })
        .then(function () {
          form.reset();
          setTimeout(() => {
            result.style.display = 'none';
          }, 5000);
        });
    });
  }

  /*--------------------------------------------------------------
    22. Cursor Animation
  --------------------------------------------------------------*/
  $(function () {
    $('body').append('<span class="cs-cursor_lg d"></span>');
    $('body').append('<span class="cs-cursor_sm"></span>');
    $(
      '.cs-text_btn, .cs-site_header a, .cs-down_btn, .cs-social_btns a, .cs-menu_widget',
    ).on('mouseenter', function () {
      $('.cs-cursor_lg').addClass('opacity-0');
      $('.cs-cursor_sm').addClass('opacity-0');
    });
    $(
      '.cs-text_btn, .cs-site_header a, .cs-down_btn, .cs-social_btns a, .cs-menu_widget',
    ).on('mouseleave', function () {
      $('.cs-cursor_lg').removeClass('opacity-0');
      $('.cs-cursor_sm').removeClass('opacity-0');
    });
  });
  function cursorMovingAnimation(event) {
    try {
      const timing = gsap.timeline({
        defaults: {
          x: event.clientX,
          y: event.clientY,
        },
      });

      timing
        .to('.cs-cursor_lg', {
          ease: 'power2.out',
        })
        .to(
          '.cs-cursor_sm',
          {
            ease: 'power2.out',
          },
          '-=0.4',
        );
    } catch (err) {
      console.log(err);
    }
  }
  document.addEventListener('mousemove', cursorMovingAnimation);
})(jQuery); // End of use strict
