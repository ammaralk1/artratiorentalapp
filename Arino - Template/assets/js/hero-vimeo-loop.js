(function () {
  var hero = document.querySelector('.cs-home-hero');
  if (!hero) return;

  var heroMedia = hero.querySelector('.cs-home-hero_media');
  var frame = hero.querySelector('.cs-home-hero_video_frame');
  var frameSrc = frame ? frame.getAttribute('data-vimeo-src') : '';
  var switchButtons = hero.querySelectorAll('[data-hero-media]');
  var switchWrap = hero.querySelector('.cs-home-hero_media_switch');
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

  function resolveHeroImageSrc() {
    var src = hero.getAttribute('data-src') || '';
    if (!src) return '';

    var isMobile = window.matchMedia('(max-width: 991px)').matches;
    if (!isMobile) return src.indexOf('assets/') === 0 ? '/' + src : src;

    var mobileHeroMap = {
      'assets/img/hero_bg.jpeg': '/assets/img/mob-hero-bg/hero_bg_home_mobile.jpeg',
    };
    var mapped = mobileHeroMap[src] || src;
    return mapped.indexOf('assets/') === 0 ? '/' + mapped : mapped;
  }

  function ensureHeroImageBackground() {
    var src = resolveHeroImageSrc();
    if (!src) return;
    hero.style.backgroundImage = 'url("' + encodeURI(src) + '")';
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
    clearSegmentRestartTimer();
    if (!hero.classList.contains('cs-home-hero--video-active')) return;
    if (!frame || !frame.getAttribute('src')) return;

    segmentRestartTimer = setTimeout(function forceSegmentRestart() {
      if (!hero.classList.contains('cs-home-hero--video-active')) return;
      frame.setAttribute('src', buildSegmentSrc());
      vimeoPlayer = null;
      reachedLoopWindow = false;
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

    if (!vimeoPlayer) vimeoPlayer = new window.Vimeo.Player(frame);
    if (!vimeoPlayer) return;

    vimeoPlayer.off('timeupdate');
    vimeoPlayer.off('ended');
    vimeoPlayer.off('pause');

    vimeoPlayer.on('timeupdate', function (data) {
      if (!data || typeof data.seconds !== 'number') return;
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
      .then(function () { return vimeoPlayer.setVolume(0); })
      .then(function () { return vimeoPlayer.setLoop(false); })
      .then(function () { return vimeoPlayer.setCurrentTime(loopStartSeconds); })
      .then(function () { return vimeoPlayer.play(); })
      .catch(function () {});

    startLoopWatchdog();
    ensurePlaybackWhenVisible();
  }

  function setHeroMedia(mode) {
    var isVideo = mode !== 'image';
    hero.classList.toggle('cs-home-hero--video-active', isVideo);
    ensureHeroImageBackground();
    if (heroMedia) {
      heroMedia.style.opacity = isVideo ? '1' : '0';
      heroMedia.style.pointerEvents = isVideo ? 'auto' : 'none';
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
      scheduleHardSegmentRestart();
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
    switchButtons.forEach(function (button) {
      button.addEventListener('click', function (event) {
        event.preventDefault();
        event.stopPropagation();
        var requestedMode = button.getAttribute('data-hero-media');
        if (requestedMode === 'image' || requestedMode === 'video') {
          setHeroMedia(requestedMode);
        }
      });
    });
  }

  window.addEventListener('scroll', ensurePlaybackWhenVisible, { passive: true });
  window.addEventListener('focus', ensurePlaybackWhenVisible);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') ensurePlaybackWhenVisible();
  });

  var savedMode = null;
  try { savedMode = localStorage.getItem('homeHeroMediaMode'); } catch (e) {}
  setHeroMedia(savedMode === 'image' ? 'image' : 'video');
})();
