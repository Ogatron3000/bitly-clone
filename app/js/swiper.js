import Swiper, {Navigation} from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation'

export function initSwiper() {
    new Swiper(".feedback__slider", {
            modules: [Navigation],
            loop: true,
            autoHeight: true,
            speed: 1000,
            spaceBetween: 50,
            navigation: {
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
            },
        }
    )
}