const openBtnEl = document.querySelector('[data-action="open"]');
const closeBtnEl = document.querySelector('[data-action="close"]');
const burgerMenuEl = document.querySelector('.js-header-modal');

function handleModal() {
  const isOpen = burgerMenuEl.classList.contains('is-open');
  openBtnEl.style.display = isOpen ? 'none' : 'block';
  closeBtnEl.style.display = isOpen ? 'flex' : 'none';
  document.body.style.overflow = isOpen ? 'hidden' : 'auto';
}

openBtnEl.addEventListener('click', e => {
  burgerMenuEl.classList.replace('is-closed', 'is-open');
  handleModal();
});

closeBtnEl.addEventListener('click', e => {
  burgerMenuEl.classList.replace('is-open', 'is-closed');
  handleModal();
});

function closeModal() {
  burgerMenuEl.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
      burgerMenuEl.classList.replace('is-open', 'is-closed');
      handleModal();
    }
  });
}
closeModal();
