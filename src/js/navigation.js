import { refs } from '../js/refs';

refs.burger.addEventListener('click', menuToggle);

refs.navigationLinks.forEach(navItem => {
  if (navItem.querySelector('ul')) {
    navItem.insertAdjacentHTML('beforeend', refs.menuArrowMarkup);
  }
});

refs.menuBackdrop.addEventListener('click', e => {
  if (window.innerWidth < 768) {
    if (e.target.classList.contains('menu-backdrop')) {
      menuToggle();
    }
    if (e.target.classList.contains('menuArrow')) {
      e.target.classList.toggle('is-hovered');
      e.target.closest('li').querySelector('ul').classList.toggle('is-hovered');
      const submenu = e.target.closest('li').querySelector('ul');
      if (submenu.classList.contains('is-hovered')) {
        //открываем
      } else {
        //закрываем
      }
    }
  }
});

function menuToggle() {
  refs.menuBackdrop.classList.toggle('is-open');
  refs.burger.classList.toggle('is-open');
  refs.body.classList.toggle('locked');
}
