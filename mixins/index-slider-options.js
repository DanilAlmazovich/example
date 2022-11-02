import {
    carouselSettingSingle,
    carouselSettingDefault
} from '~/utilities/carousel';

export default {
    data() {
        return {
            carouselSetting1: {
                ...carouselSettingSingle,
                pagination: {
                    el: '.intro-slider-container .swiper-dots',
                    clickable: true
                },
                navigation: {
                    nextEl: '.intro-slider-container .swiper-next',
                    prevEl: '.intro-slider-container .swiper-prev'
                },
                sliding: null,
                loop: true,
                speed: 1000,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                }
            },
            carouselSettingProduct: {
                ...carouselSettingSingle,
                slidesPerView: 3,
                spaceBetween: 10,
                sliding: null,
                loop: false,
                speed: 1000,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                },
            },
            carouselSetting3: {
                ...carouselSettingSingle,
                pagination: {
                    el: '.intro-slider-container .swiper-dots',
                    clickable: true
                },
                navigation: {
                    nextEl: '.intro-slider-container .swiper-next',
                    prevEl: '.intro-slider-container .swiper-prev'
                },
                spaceBetween: 0,
                sliding: null,
                loop: true,
                speed: 2000,
                autoplay: {
                    reverseDirection: true,
                    delay: 2500,
                    disableOnInteraction: false,
                },

            }
            , carouselSetting4: {
                ...carouselSettingSingle,
                pagination: {
                    el: '.intro-slider-container .swiper-dots',
                    clickable: true
                },
                navigation: {
                    nextEl: '.intro-slider-container .swiper-next',
                    prevEl: '.intro-slider-container .swiper-prev'
                },
                sliding: null,
                loop: true,
                speed: 1300,
                autoplay: {
                    delay: 4000,
                    disableOnInteraction: false,
                }
            },
            carouselSetting5: {
                ...carouselSettingSingle,
                pagination: {
                    el: '.intro-slider-container .swiper-dots',
                    clickable: true
                },
                navigation: {
                    nextEl: '.intro-slider-container .swiper-next',
                    prevEl: '.intro-slider-container .swiper-prev'
                },
                sliding: null,
                loop: true,
                speed: 700,
                autoplay: {
                    reverseDirection: true,
                    delay: 2500,
                    disableOnInteraction: false,
                }
            },
            carouselSetting6: {
                ...carouselSettingSingle,
                pagination: {
                    el: '.intro-slider-container .swiper-dots',
                    clickable: true
                },
                navigation: {
                    nextEl: '.intro-slider-container .swiper-next',
                    prevEl: '.intro-slider-container .swiper-prev'
                },
                sliding: null,
                loop: true,
                speed: 1500,
                autoplay: {
                    reverseDirection: true,
                    delay: 4000,
                    disableOnInteraction: false,
                }
            },





            
        }
    }
}