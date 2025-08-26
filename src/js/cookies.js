function handleCookies() {
  const cookiesBtns = document.querySelectorAll('[data-isAccepted]');
  const cookiesModal = document.querySelector('[data-cookies-modal]');

  if (localStorage.getItem('isAccepted') === 'true') {
    cookiesModal.classList.replace('is-open', 'is-closed');
    localStorage.setItem('isAccepted', 'true');
    return;
  } else {
    cookiesModal.classList.replace('is-closed', 'is-open');
  }

  cookiesBtns.forEach(btn =>
    btn.addEventListener('click', e => {
      localStorage.setItem('isAccepted', 'true');
      cookiesModal.classList.replace('is-open', 'is-closed');
    })
  );
}
handleCookies();
