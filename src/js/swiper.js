import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Autoplay],
  spaceBetween: 10,
  loop: true,
  slidesPerView: 2,
  navigation: {
    nextEl: '.swiper-button-next',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    1200: {
      slidesPerView: 2.7,
      spaceBetween: 32,
      simulateTouch: false,
    },
  },
});
