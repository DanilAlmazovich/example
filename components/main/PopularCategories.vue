<template>
    <div class="popular-categories">
        <div v-swiper:swiper1="carouselSetting1" class="popular-cards">
            <div class="swiper-wrapper">
                
                <locale-link class="swiper-slide popular-card fly-hover" to="/" tag="div">
                    <div class="popular-card-img" v-lazy:background-image="'https://www.schottnyc.com/images/1300x2000/740_NAV_frt1.jpg'"></div>
                    <div class="popular-card-text">Игрушки</div>
                </locale-link>

                <locale-link class="swiper-slide popular-card fly-hover" to="/" tag="div">
                    <div class="popular-card-img" v-lazy:background-image="'https://www.schottnyc.com/images/1300x2000/740_NAV_frt1.jpg'"></div>
                    <div class="popular-card-text">Игрушки</div>
                </locale-link>

                <locale-link class="swiper-slide popular-card fly-hover" to="/" tag="div">
                    <div class="popular-card-img" v-lazy:background-image="'https://www.schottnyc.com/images/1300x2000/740_NAV_frt1.jpg'"></div>
                    <div class="popular-card-text">Игрушки</div>
                </locale-link>

                <locale-link class="swiper-slide popular-card fly-hover" to="/" tag="div">
                    <div class="popular-card-img" v-lazy:background-image="'https://www.schottnyc.com/images/1300x2000/740_NAV_frt1.jpg'"></div>
                    <div class="popular-card-text">Игрушки</div>
                </locale-link>

                <locale-link class="swiper-slide popular-card fly-hover" to="/" tag="div">
                    <div class="popular-card-img" v-lazy:background-image="'https://www.schottnyc.com/images/1300x2000/740_NAV_frt1.jpg'"></div>
                    <div class="popular-card-text">Игрушки</div>
                </locale-link>

                <locale-link class="swiper-slide popular-card fly-hover" to="/" tag="div">
                    <div class="popular-card-img" v-lazy:background-image="'https://www.schottnyc.com/images/1300x2000/740_NAV_frt1.jpg'"></div>
                    <div class="popular-card-text">Игрушки</div>
                </locale-link>

                <locale-link class="swiper-slide popular-card fly-hover" to="/" tag="div">
                    <div class="popular-card-img" v-lazy:background-image="'https://www.schottnyc.com/images/1300x2000/740_NAV_frt1.jpg'"></div>
                    <div class="popular-card-text">Игрушки</div>
                </locale-link>

                <locale-link class="swiper-slide popular-card fly-hover" to="/" tag="div">
                    <div class="popular-card-img" v-lazy:background-image="'https://www.schottnyc.com/images/1300x2000/740_NAV_frt1.jpg'"></div>
                    <div class="popular-card-text">Игрушки</div>
                </locale-link>

                <locale-link class="swiper-slide popular-card fly-hover" to="/" tag="div">
                    <div class="popular-card-img" v-lazy:background-image="'https://www.schottnyc.com/images/1300x2000/740_NAV_frt1.jpg'"></div>
                    <div class="popular-card-text">Игрушки</div>
                </locale-link>


            </div>
        </div>
    </div>
</template>

<script>
import {carouselSettingDefault, carouselSettingSingle} from "~/utilities/carousel";

export default {
    data() {
        return {
          PopularCategorieslist: {

          },
            carouselSetting1: {
                ...carouselSettingSingle,
                slidesPerView: 8.5,
                spaceBetween: 20,
                freeMode: true,
                speed: 1000,
                navigation: {
                    nextEl: '.brands-slider .swiper-next',
                    prevEl: '.brands-slider .swiper-prev'
                },
                breakpoints: {
                    1250: {
                        slidesPerView: 7
                    },
                    1100: {
                        slidesPerView: 6
                    },
                    992: {
                        slidesPerView: 5
                    },
                    768: {
                        slidesPerView: 4
                    },
                    576: {
                        slidesPerView: 3
                    },
                    480: {
                        slidesPerView: 2
                    }
                },
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,

                },
            },
        }
    }

}
</script>
