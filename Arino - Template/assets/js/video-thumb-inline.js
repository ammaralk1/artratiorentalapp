(function () {
  var thumb = document.querySelector('.cs-video_thumb');
  var playBtn = document.querySelector('.cs-video_play_btn');
  if (!thumb || !playBtn) return;

  var src = thumb.getAttribute('data-video-src');
  playBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var existing = thumb.querySelector('iframe');
    if (existing) existing.remove();

    var iframe = document.createElement('iframe');
    iframe.src = src || '';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share';
    iframe.style.position = 'absolute';
    iframe.style.inset = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    thumb.appendChild(iframe);
    thumb.classList.add('is-playing');
    playBtn.style.display = 'none';
  });

  thumb.addEventListener('click', function (e) {
    if (!thumb.classList.contains('is-playing')) return;
    if (e.target.closest('.cs-video_play_btn')) return;

    var existing = thumb.querySelector('iframe');
    if (existing) existing.remove();
    thumb.classList.remove('is-playing');
    playBtn.style.display = 'flex';
  });
})();
