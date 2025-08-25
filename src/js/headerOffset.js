(function initHeaderOffset() {
  const header = document.querySelector('header');
  if (!header) return;

  const EXTRA_SPACE = 16;
  let lastHeight = 0;
  let rafId = null;
  let userScrolled = false;

  function setVar(h) {
    document.documentElement.style.setProperty('--header-offset', h + 'px');
  }

  function measure(force = false) {
    const h = Math.round(header.getBoundingClientRect().height);
    if (force || h !== lastHeight) {
      lastHeight = h;
      setVar(h);
    }
  }

  function multiPass(pass = 2) {
    measure(true);
    if (pass > 0) requestAnimationFrame(() => multiPass(pass - 1));
  }
  multiPass();

  window.addEventListener(
    'scroll',
    () => {
      userScrolled = true;
    },
    { passive: true }
  );

  window.addEventListener('resize', () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const prev = lastHeight;
      measure();
      if (location.hash && lastHeight !== prev) {
        adjustHashPosition();
      }
    });
  });

  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => {
      const prev = lastHeight;
      measure();
      if (location.hash && lastHeight !== prev) adjustHashPosition();
    });
    ro.observe(header);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready
      .then(() => {
        const prev = lastHeight;
        measure(true);
        if (location.hash && lastHeight !== prev) adjustHashPosition();
      })
      .catch(() => {});
  }

  window.addEventListener('load', () => {
    const prev = lastHeight;
    measure(true);
    if (location.hash && lastHeight !== prev) adjustHashPosition();
  });

  function adjustHashPosition() {
    if (!location.hash || userScrolled) return;
    const target = document.querySelector(location.hash);
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const delta = rect.top - (lastHeight + EXTRA_SPACE);
    if (Math.abs(delta) > 1) {
      window.scrollBy({ top: delta, left: 0, behavior: 'auto' });
    }
  }

  if (location.hash) {
    setTimeout(() => adjustHashPosition(), 160);
  }

  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (hash.length <= 1) return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    userScrolled = false;

    setTimeout(() => {
      measure();
      const rect = target.getBoundingClientRect();
      const delta = rect.top - (lastHeight + EXTRA_SPACE);
      window.scrollBy({ top: delta, left: 0, behavior: 'smooth' });
      history.replaceState(null, '', hash);
    }, 50);
  });
})();
