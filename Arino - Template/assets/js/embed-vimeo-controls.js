window.addEventListener('load', function () {
  if (typeof window.Vimeo === 'undefined') return;
  document.querySelectorAll('.cs-video_embed_wrap').forEach(function (wrap) {
    var iframe = wrap.querySelector('iframe');
    var overlay = wrap.querySelector('.cs-play_over_embed');
    if (!iframe || !overlay) return;

    var player = new window.Vimeo.Player(iframe);

    overlay.addEventListener('click', function (e) {
      e.preventDefault();
      overlay.style.display = 'none';
      player.play().catch(function () {});
    });

    player.on('pause', function () {
      overlay.style.display = 'flex';
    });
    player.on('ended', function () {
      overlay.style.display = 'flex';
    });
    player.on('play', function () {
      overlay.style.display = 'none';
    });
  });
});
