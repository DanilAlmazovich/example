<template>
  <div class="top-products" v-swiper:swiper1="carouselSetting1">
    <div class="swiper-wrapper" v-if="!topBannersLoading">
      <locale-link class="swiper-slide top-product fly-hover" v-for="(banner, index) in secondaryMiddleBanners"
        :key="index" :to="banner.to ? banner.to : '/'">
        <img :src="banner.image" :alt="banner.name">
        <div class="top-product-text">
          <span :style="banner.description_color ? `color: ${banner.description_color}` : 'color: white'">{{
              banner.description
          }}</span>
        </div>
      </locale-link>
    </div>
    <div class="swiper-wrapper" v-else>
      <div class="swiper-slide skeleton" />
      <div class="swiper-slide skeleton" />
      <div class="swiper-slide skeleton" />
    </div>
  </div>
</template>

<script>
import { carouselSettingSingle } from "~/utilities/carousel";

export default {
  props: {
    secondaryMiddleBanners: {
      type: [Array, Object],
      default: () => []
    },
    topBannersLoading: Boolean
  },
  data() {
    return {
      carouselSetting1: {
        ...carouselSettingSingle,
        slidesPerView: 3,
        spaceBetween: 20,
        freeMode: true,
        speed: 1500,
        navigation: {
          nextEl: '.brands-slider .swiper-next',
          prevEl: '.brands-slider .swiper-prev'
        },
        breakpoints: {
          992: {
            slidesPerView: 2.2
          },
          768: {
            slidesPerView: 1.9
          },
          576: {
            slidesPerView: 1.5
          },
          480: {
            slidesPerView: 1
          }
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,

        },
      },
    }
  },
  methods: {
    getColor(item, key) {
      return {
        color: item[`${key}_color`] ?? '#000'
      };
    }
  }
}
</script>
