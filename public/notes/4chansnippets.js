ImageExpansion.contract = function(img) {
  var cnt, p;

  clearTimeout(this.timeout);

  p = img.parentNode;
  cnt = p.parentNode.parentNode;

  $.removeClass(p.parentNode, 'image-expanded');

  if (Config.centeredThreads) {
    $.removeClass(cnt.parentNode, 'centre-exp');
    cnt.parentNode.style.marginLeft = '';
  }

  if (!Main.tid && Config.threadHiding) {
    $.removeClass(p, 'image-expanded-anti');
  }

  p.firstChild.style.display = '';

  p.removeChild(img);

  if (cnt.offsetTop < window.pageYOffset) {
    cnt.scrollIntoView();
  }
};



ImageExpansion.onWebmPlay = function() {
  var self = ImageExpansion;

  if (!self.activeVideos.length) {
    document.addEventListener('scroll', self.onScroll, false);
  }

  self.activeVideos.push(this);
};






ImageHover.showWebMDuration = function(el, thumb) {
  if (!el.parentNode) {
    return;
  }

  var sound, ms = $.prettySeconds(el.duration);

  if (el.mozHasAudio === true
    || el.webkitAudioDecodedByteCount > 0
    || (el.audioTracks && el.audioTracks.length)) {
    sound = ' (audio)';
  }
  else {
    sound = '';
  }

  Tip.show(thumb, ms[0] + ':' + ('0' + ms[1]).slice(-2) + sound);
};










/*CAPTCHA*/
QR.renderCaptcha = function() {
  if (!window.grecaptcha) {
    return;
  }

  QR.captchaWidgetId = grecaptcha.render(QR.captchaWidgetCnt, {
    sitekey: window.recaptchaKey,
    theme: Main.stylesheet === 'tomorrow' ? 'dark' : 'light'
  });
};

QR.renderCaptchaAlt = function() {
  if (!window.grecaptcha) {
    return;
  }

  if (!window.Recaptcha) {
    QR.initCaptchaAlt();
    return;
  }

  Recaptcha.create(window.recaptchaKey,
    'qrCaptchaContainerAlt',
    {
      theme: 'clean',
      tabindex: 0
    }
  );
};

QR.initCaptchaAlt = function(loadOnly) {
  if (QR.hasCaptchaAltJs) {
    return;
  }

  var el = document.createElement('script');
  el.type = 'text/javascript';
  el.src = '//www.google.com/recaptcha/api/js/recaptcha_ajax.js';

  if (!loadOnly) {
    el.onload = QR.renderCaptchaAlt;
  }

  QR.hasCaptchaAltJs = true;

  document.head.appendChild(el);
};

QR.resetCaptchaAlt = function(focus) {
  if (!window.grecaptcha || !$.id('recaptcha_image') || !window.RecaptchaState) {
    return;
  }

  if (focus) {
    Recaptcha.reload('t');
  }
  else {
    Recaptcha.reload();
  }
};

QR.resetCaptcha = function(focus) {
  if (Config.altCaptcha) {
    QR.resetCaptchaAlt(focus);
    return;
  }

  if (!window.grecaptcha || QR.captchaWidgetId === null) {
    return;
  }

  grecaptcha.reset(QR.captchaWidgetId);
};
