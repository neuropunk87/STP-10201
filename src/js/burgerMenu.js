const openBtnEl = document.querySelector('[data-action="open"]');
const closeBtnEl = document.querySelector('[data-action="close"]');
const burgerMenuEl = document.querySelector('[data-visible]');

openBtnEl.addEventListener('click', e => {
  burgerMenuEl.dataset.visible = 'open';
  handleModal();
});

closeBtnEl.addEventListener('click', e => {
  burgerMenuEl.dataset.visible = 'close';
  handleModal();
});

function handleModal() {
  const isOpen = burgerMenuEl.dataset.visible === 'open';
  openBtnEl.style.display = isOpen ? 'none' : 'block';
  closeBtnEl.style.display = isOpen ? 'flex' : 'none';
  document.body.style.overflow = isOpen ? 'hidden' : 'auto';
}
