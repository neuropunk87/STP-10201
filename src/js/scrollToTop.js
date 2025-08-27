document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document
      .querySelectorAll('iframe[data-src]')
      .forEach(iframe => iframe.setAttribute('src', iframe.dataset.src));
  }, 800);
});

(function () {
  const BTN_ID = 'scrollToTopBtn';
  const SHOW_AFTER = 300;
  const HIDE_DELAY_AT_TOP = 120;
  const RAF_INTERVAL = 1000 / 60;
  const btn = document.getElementById(BTN_ID);
  if (!btn) return;

  const progressEl = btn.querySelector('.js-scroll-progress');

  let docHeight = 0;
  let ticking = false;
  let scrollingToTop = false;
  let hideTimeoutId = null;

  function calcDocHeight() {
    docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  }

  function update() {
    const scrollY = window.scrollY || window.pageYOffset;
    const viewport = window.innerHeight;
    const scrollable = docHeight - viewport;
    const ratio = scrollable > 0 ? scrollY / scrollable : 0;
    const percent = Math.min(100, Math.max(0, ratio * 100));

    if (progressEl) {
      progressEl.style.setProperty('--p', percent + '%');
    }

    if (scrollY > SHOW_AFTER) {
      if (!btn.classList.contains('show')) {
        btn.classList.add('show');
        btn.setAttribute('aria-hidden', 'false');
      }
    } else {
      if (!scrollingToTop) {
        hideButtonImmediate();
      }
    }

    if (scrollingToTop && scrollY === 0) {
      scheduleHideAfterTop();
    }

    ticking = false;
  }

  function hideButtonImmediate() {
    clearTimeout(hideTimeoutId);
    btn.classList.remove('show');
    btn.setAttribute('aria-hidden', 'true');
  }

  function scheduleHideAfterTop() {
    clearTimeout(hideTimeoutId);
    hideTimeoutId = setTimeout(() => {
      hideButtonImmediate();
      scrollingToTop = false;
      btn.classList.remove('scrolling-to-top');
    }, HIDE_DELAY_AT_TOP);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function onResize() {
    calcDocHeight();
    onScroll();
  }

  btn.addEventListener('click', () => {
    clearTimeout(hideTimeoutId);
    scrollingToTop = true;
    btn.classList.add('scrolling-to-top');

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      window.scrollTo(0, 0);
      scheduleHideAfterTop();
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    monitorSmoothScrollEnd();
  });

  function monitorSmoothScrollEnd() {
    let lastY = window.scrollY;
    let stableFrames = 0;
    const REQUIRED_STABLE_FRAMES = 6;

    function step() {
      const currentY = window.scrollY;
      if (currentY === 0) {
        scheduleHideAfterTop();
        return;
      }
      if (currentY === lastY) {
        stableFrames++;
      } else {
        stableFrames = 0;
        lastY = currentY;
      }
      if (stableFrames >= REQUIRED_STABLE_FRAMES) {
        scrollingToTop = false;
        btn.classList.remove('scrolling-to-top');
        return;
      }
      if (scrollingToTop) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  calcDocHeight();
  update();

  window.addEventListener('load', () => {
    calcDocHeight();
    update();
  });
})();
