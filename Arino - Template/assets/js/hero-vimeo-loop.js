(function () {
  var hero = document.querySelector('.cs-home-hero');
  if (!hero) return;

  var heroMedia = hero.querySelector('.cs-home-hero_media');
  var frame = hero.querySelector('.cs-home-hero_video_frame');
  var frameSrc = frame ? frame.getAttribute('data-vimeo-src') : '';
  var switchButtons = hero.querySelectorAll('[data-hero-media]');
  var switchWrap = hero.querySelector('.cs-home-hero_media_switch');
  var homeHeroPrimaryMobile = '/assets/img/mob-hero-bg/untitled folder/hero_bg.jpeg';
  var homeHeroFallbackMobile = '/assets/img/mob-hero-bg/hero_bg_home_mobile.jpeg';
  var loopStartSeconds = 44;
  var loopEndSeconds = 61;
  var loopGuardSeconds = 0.35;
  var loopResetGuardSeconds = 1.5;
  var segmentDurationMs = (loopEndSeconds - loopStartSeconds) * 1000;
  var vimeoPlayer = null;
  var isLoopSeeking = false;
  var loopWatchdog = null;
  var segmentRestartTimer = null;
  var reachedLoopWindow = false;
  var downButton = hero.querySelector('.cs-down_btn[href^="#"]');
  var mobileVideoReady = false;

  function isMobileViewport() {
    return window.matchMedia('(max-width: 991px)').matches;
  }

  function syncSwitchVisibilityForViewport() {
    if (!switchWrap) return;
    if (isMobileViewport()) {
      switchWrap.style.display = 'none';
      switchWrap.setAttribute('hidden', 'hidden');
      return;
    }
    switchWrap.style.display = '';
    switchWrap.removeAttribute('hidden');
  }

  function setMobileVideoReadyState(isReady) {
    if (!heroMedia || !frame) return;

    if (!isMobileViewport()) {
      mobileVideoReady = true;
      hero.classList.remove('is-mobile-video-loading');
      frame.style.opacity = '1';
      frame.style.visibility = 'visible';
      return;
    }

    mobileVideoReady = Boolean(isReady);
    hero.classList.toggle('is-mobile-video-loading', !mobileVideoReady);
    heroMedia.style.opacity = mobileVideoReady ? '1' : '0';
    frame.style.opacity = mobileVideoReady ? '1' : '0';
    frame.style.visibility = mobileVideoReady ? 'visible' : 'hidden';
  }

  function bindDownButtonScroll() {
    if (!downButton) return;
    downButton.addEventListener('click', function (event) {
      var targetSelector = downButton.getAttribute('href');
      if (!targetSelector || targetSelector.charAt(0) !== '#') return;
      var target = document.querySelector(targetSelector);
      if (!target) return;

      event.preventDefault();
      var header = document.querySelector('.cs-site_header');
      var headerHeight = header ? header.getBoundingClientRect().height : 0;
      var targetTop = window.pageYOffset + target.getBoundingClientRect().top - headerHeight - 8;
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
    });
  }

  function resolveDesktopModeFromWrapClick(event) {
    if (!switchButtons || !switchButtons.length) return null;
    var clickX = typeof event.clientX === 'number' ? event.clientX : 0;
    var closestButton = null;
    var closestDistance = Infinity;

    switchButtons.forEach(function (button) {
      var rect = button.getBoundingClientRect();
      var centerX = rect.left + (rect.width / 2);
      var distance = Math.abs(clickX - centerX);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestButton = button;
      }
    });

    return closestButton ? closestButton.getAttribute('data-hero-media') : null;
  }

  function resolveHeroImageSrc() {
    var src = hero.getAttribute('data-src') || '';
    if (!src) return '';

    var isMobile = isMobileViewport();
    if (!isMobile) return src.indexOf('assets/') === 0 ? '/' + src : src;

    var mobileHeroMap = {
      'assets/img/hero_bg.jpeg': homeHeroPrimaryMobile,
    };
    var mapped = mobileHeroMap[src] || src;
    return mapped.indexOf('assets/') === 0 ? '/' + mapped : mapped;
  }

  function ensureHeroImageBackground() {
    var src = resolveHeroImageSrc();
    if (!src) return;
    var backgroundImage = 'url("' + encodeURI(src) + '")';
    if (src === homeHeroPrimaryMobile) {
      backgroundImage += ', url("' + homeHeroFallbackMobile + '")';
    }
    hero.style.backgroundImage = backgroundImage;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center center';
  }

  function clearLoopWatchdog() {
    if (!loopWatchdog) return;
    clearInterval(loopWatchdog);
    loopWatchdog = null;
  }

  function buildSegmentSrc() {
    var sep = frameSrc.indexOf('?') > -1 ? '&' : '?';
    return frameSrc + sep + '_ts=' + Date.now() + '#t=' + loopStartSeconds + 's';
  }

  function clearSegmentRestartTimer() {
    if (!segmentRestartTimer) return;
    clearTimeout(segmentRestartTimer);
    segmentRestartTimer = null;
  }

  function scheduleHardSegmentRestart() {
    if (isMobileViewport()) return;
    clearSegmentRestartTimer();
    if (!hero.classList.contains('cs-home-hero--video-active')) return;
    if (!frame || !frame.getAttribute('src')) return;

    segmentRestartTimer = setTimeout(function forceSegmentRestart() {
      if (!hero.classList.contains('cs-home-hero--video-active')) return;
      frame.setAttribute('src', buildSegmentSrc());
      vimeoPlayer = null;
      reachedLoopWindow = false;
      setMobileVideoReadyState(false);
      setTimeout(attachVimeoLoop, 140);
      scheduleHardSegmentRestart();
    }, Math.max(2000, segmentDurationMs - 250));
  }

  function jumpToLoopStart() {
    if (!vimeoPlayer || isLoopSeeking) return;
    isLoopSeeking = true;
    vimeoPlayer
      .setCurrentTime(loopStartSeconds)
      .then(function () { return vimeoPlayer.play(); })
      .catch(function () {})
      .finally(function () { isLoopSeeking = false; });
  }

  function startLoopWatchdog() {
    clearLoopWatchdog();
    if (!vimeoPlayer) return;

    loopWatchdog = setInterval(function () {
      if (!vimeoPlayer || typeof vimeoPlayer.getCurrentTime !== 'function') return;
      vimeoPlayer
        .getCurrentTime()
        .then(function (seconds) {
          if (typeof seconds !== 'number') return;
          if (seconds >= loopStartSeconds - 1) reachedLoopWindow = true;
          if (isMobileViewport() && !mobileVideoReady && seconds >= loopStartSeconds - 1) {
            setMobileVideoReadyState(true);
          }
          if (isLoopSeeking) return;
          if (seconds >= loopEndSeconds - loopGuardSeconds) return jumpToLoopStart();
          if (reachedLoopWindow && seconds < loopStartSeconds - loopResetGuardSeconds) jumpToLoopStart();
        })
        .catch(function () {});
    }, 90);
  }

  function ensurePlaybackWhenVisible() {
    if (!vimeoPlayer || !hero.classList.contains('cs-home-hero--video-active')) return;
    var rect = hero.getBoundingClientRect();
    var viewportH = window.innerHeight || document.documentElement.clientHeight;
    var visible = rect.bottom > 0 && rect.top < viewportH;
    if (!visible) return;
    vimeoPlayer.play().catch(function () {});
  }

  function attachVimeoLoop() {
    if (!frame || !frame.getAttribute('src')) return;
    if (!window.Vimeo || !window.Vimeo.Player) return;

    if (isMobileViewport() && !mobileVideoReady) {
      setMobileVideoReadyState(false);
    }

    if (!vimeoPlayer) vimeoPlayer = new window.Vimeo.Player(frame);
    if (!vimeoPlayer) return;

    vimeoPlayer.off('timeupdate');
    vimeoPlayer.off('ended');
    vimeoPlayer.off('pause');

    vimeoPlayer.on('timeupdate', function (data) {
      if (!data || typeof data.seconds !== 'number') return;
      if (isMobileViewport() && !mobileVideoReady && data.seconds >= loopStartSeconds - 1) {
        setMobileVideoReadyState(true);
      }
      if (isLoopSeeking) return;
      if (reachedLoopWindow && data.seconds < loopStartSeconds - loopResetGuardSeconds) return jumpToLoopStart();
      if (data.seconds >= loopEndSeconds - loopGuardSeconds) jumpToLoopStart();
    });

    vimeoPlayer.on('ended', jumpToLoopStart);

    vimeoPlayer.on('pause', function () {
      if (!vimeoPlayer || typeof vimeoPlayer.getCurrentTime !== 'function') return;
      vimeoPlayer.getCurrentTime().then(function (seconds) {
        if (typeof seconds === 'number' && seconds >= loopEndSeconds - 1) jumpToLoopStart();
      }).catch(function () {});
    });

    vimeoPlayer
      .ready()
      .then(function () {
        if (typeof vimeoPlayer.setMuted === 'function') {
          return vimeoPlayer.setMuted(true).catch(function () {});
        }
        return null;
      })
      .then(function () { return vimeoPlayer.setVolume(0).catch(function () {}); })
      .then(function () { return vimeoPlayer.setLoop(false); })
      .then(function () { return vimeoPlayer.setCurrentTime(loopStartSeconds); })
      .then(function () { return vimeoPlayer.play(); })
      .catch(function () {});

    startLoopWatchdog();
    ensurePlaybackWhenVisible();
  }

  function setHeroMedia(mode) {
    var isMobile = isMobileViewport();
    var requestedMode = isMobile ? 'video' : (mode === 'image' ? 'image' : 'video');
    var currentMode = hero.classList.contains('cs-home-hero--video-active') ? 'video' : 'image';

    if (!isMobile && requestedMode === currentMode) return;

    var isVideo = requestedMode === 'video';
    syncSwitchVisibilityForViewport();
    hero.classList.toggle('cs-home-hero--video-active', isVideo);
    ensureHeroImageBackground();
    if (heroMedia) {
      heroMedia.style.opacity = isVideo ? '1' : '0';
      heroMedia.style.pointerEvents = 'none';
    }
    if (isVideo) {
      if (isMobileViewport()) {
        setMobileVideoReadyState(false);
      } else {
        setMobileVideoReadyState(true);
      }
    } else {
      setMobileVideoReadyState(false);
    }

    switchButtons.forEach(function (button) {
      var active = button.getAttribute('data-hero-media') === (isVideo ? 'video' : 'image');
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (!frame) return;
    if (isVideo) {
      if (!frame.getAttribute('src') && frameSrc) {
        frame.setAttribute('src', buildSegmentSrc());
        vimeoPlayer = null;
        reachedLoopWindow = false;
        setTimeout(attachVimeoLoop, 120);
      }
      attachVimeoLoop();
      if (!isMobileViewport()) scheduleHardSegmentRestart();
    } else {
      if (vimeoPlayer) {
        try { vimeoPlayer.pause(); } catch (e) {}
        vimeoPlayer.off('ended');
        vimeoPlayer.off('timeupdate');
        vimeoPlayer.off('pause');
      }
      reachedLoopWindow = false;
      clearLoopWatchdog();
      clearSegmentRestartTimer();
    }

    try { localStorage.setItem('homeHeroMediaMode', isVideo ? 'video' : 'image'); } catch (e) {}
  }

  if (switchWrap) {
    switchWrap.addEventListener('click', function (event) {
      if (isMobileViewport()) return;

      event.preventDefault();
      event.stopPropagation();

      var modeButton = event.target.closest('[data-hero-media]');
      var requestedMode = modeButton
        ? modeButton.getAttribute('data-hero-media')
        : resolveDesktopModeFromWrapClick(event);
      if (requestedMode !== 'image' && requestedMode !== 'video') {
        requestedMode = hero.classList.contains('cs-home-hero--video-active')
          ? 'image'
          : 'video';
      }
      setHeroMedia(requestedMode);
    });
  }

  window.addEventListener('scroll', ensurePlaybackWhenVisible, { passive: true });
  window.addEventListener('focus', ensurePlaybackWhenVisible);
  window.addEventListener('resize', function () {
    syncSwitchVisibilityForViewport();
    if (!isMobileViewport()) setMobileVideoReadyState(true);
  });
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') ensurePlaybackWhenVisible();
  });

  syncSwitchVisibilityForViewport();
  bindDownButtonScroll();
  setMobileVideoReadyState(!isMobileViewport());
  setHeroMedia('video');
})();
