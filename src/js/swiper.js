import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const gallerySwiper = new Swiper('.gallery-swiper', {
  modules: [Navigation],
  slidesPerView: 2,
  spaceBetween: 11,
  navigation: {
    nextEl: '.gallery-swiper-btn-next',
    prevEl: '.gallery-swiper-btn-prev',
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
  loop: false,
  grabCursor: true,
  watchSlidesProgress: true,
  watchOverflow: true,
});
