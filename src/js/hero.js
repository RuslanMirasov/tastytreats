import Swiper from 'swiper/swiper-bundle.min.mjs';
import 'swiper/swiper-bundle.min.css';
import { refs } from '../js/refs';
import { getFromDB } from '../js/axios';

initEvents();

async function initEvents() {
  const eventsData = await getFromDB(`${refs.db}/events`);
  if (refs.heroSlider && eventsData) {
    renderEvents(eventsData);
    initEventsSwiper();
  }
}

function renderEvents(events) {
  const sliderMarkup = events.map(
    ({ cook, topic, _id }) =>
      `
    <div class="swiper-slide" data-id="${_id}">
      <div class="event event--cook">
        <picture>
          <source srcset="${cook.imgWebpUrl}" type="image/webp" />
          <source srcset="${cook.imgUrl}" type="image/jpeg" />
          <img src="${cook.imgUrl}" alt="${cook.name}" width="137" height="442" />
        </picture>
      </div>
      <div class="event event--preview">
        <picture>
          <source srcset="${topic.previewWebpUrl}" type="image/webp" />
          <source srcset="${topic.previewUrl}" type="image/jpeg" />
          <img src="${topic.previewUrl}" alt="${topic.name}" width="304" height="271" />
        </picture>
        <div class="info">
          <strong>${topic.name}</strong>
          <p>${topic.area}</p>
        </div>
      </div>
      <div class="event event--image">
        <picture>
          <source srcset="${topic.imgWebpUrl}" type="image/webp" />
          <source srcset="${topic.imgUrl}" type="image/jpeg" />
          <img src="${topic.imgUrl}" alt="${topic.name}" width="137" height="442" />
        </picture>
      </div>
    </div>
    `
  );
  refs.heroSlider.insertAdjacentHTML('afterbegin', sliderMarkup.join(''));
}

function initEventsSwiper() {
  new Swiper('.swiper-hero', {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 8,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.js-hero-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
    },
  });
}
