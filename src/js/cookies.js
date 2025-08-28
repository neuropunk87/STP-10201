function handleCookies() {
  const cookiesBtns = document.querySelectorAll('[data-isAccepted]');
  const cookiesModal = document.querySelector('[data-cookies-modal]');

  if (localStorage.getItem('isAccepted') === 'true') {
    cookiesModal.classList.replace('js-is-open', 'js-is-closed');
  } else {
    cookiesModal.classList.replace('js-is-closed', 'js-is-open');
  }

  cookiesBtns.forEach(btn =>
    btn.addEventListener('click', e => {
      localStorage.setItem('isAccepted', 'true');
      cookiesModal.classList.replace('js-is-open', 'js-is-closed');
    })
  );
}
handleCookies();
