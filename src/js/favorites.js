import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.min.css';

initFavoriteSlider();

function initFavoriteSlider() {
  new Swiper('.swiper-favorite', {
    speed: 400,
    slidesPerView: 'auto',
    spaceBetween: 12,
    breakpoints: {
      768: {
        spaceBetween: 15,
      },
    },
  });
}
