import { refs } from './refs';
import throttle from 'lodash.throttle';
import { animate } from './scroll-animation';

window.addEventListener('load', function () {
  setTimeout(() => {
    removePreloader();

    animate();
  }, 250);
});

mainPaddingTop();
window.addEventListener('resize', throttle(mainPaddingTop, 500));

function mainPaddingTop() {
  const headerHeight = refs.header.getBoundingClientRect().height;
  refs.main.style.paddingTop = headerHeight + 'px';
}

function removePreloader() {
  document.querySelector('.preloader').classList.add('is-hidden');
}
