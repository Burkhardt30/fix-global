/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Pagination, Autoplay, Lazy } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';
import 'swiper/css/pagination';

// Инициализация слайдеров
function initSliders() {
    // Перечень слайдеров
    // Проверяем, есть ли слайдер на стронице
    if (document.querySelector('.ticker__slider')) {
        new Swiper('.ticker__slider', {
            modules: [Autoplay],
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            spaceBetween: 15,
            loop: true,
            allowTouchMove: false,
            autoplay: {
                delay: 0,
            },
            speed: 5000,

            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },

            breakpoints: {
                480: {
                    slidesPerView: 4,
                },
            },
        });
    }
    if (document.querySelector('.members__slider-inner')) {
        new Swiper('.members__slider-inner', {
            modules: [Navigation, Pagination, Autoplay, Lazy],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 15,
            speed: 800,
            centeredSlides: true,

            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                prevEl: '.members__prev',
                nextEl: '.members__next',
            },
            autoplay: {
                delay: 2000,
            },

            breakpoints: {
                480: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
            },

            lazy: true,
        });
    }
    if (document.querySelector('.tabs-nft__navigation')) {
        new Swiper('.tabs-nft__navigation', {
            slidesPerView: 'auto',
            spaceBetween: 20,
        });
    }

}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
    let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
    if (sliderScrollItems.length > 0) {
        for (let index = 0; index < sliderScrollItems.length; index++) {
            const sliderScrollItem = sliderScrollItems[index];
            const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
            const sliderScroll = new Swiper(sliderScrollItem, {
                observer: true,
                observeParents: true,
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: {
                    enabled: true,
                },
                scrollbar: {
                    el: sliderScrollBar,
                    draggable: true,
                    snapOnRelease: false
                },
                mousewheel: {
                    releaseOnEdges: true,
                },
            });
            sliderScroll.scrollbar.updateSize();
        }
    }
}

window.addEventListener("load", function (e) {
    // Запуск инициализации слайдеров
    initSliders();
    // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
    //initSlidersScroll();
});