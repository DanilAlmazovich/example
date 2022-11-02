<template>
  <div  v-swiper:swiper2="carouselSetting2" class="brand-bar">
    <div v-if="BrandsLoading" class="swiper-wrapper">
      <div v-for="(brand, index) in 20" :key="index" class="skeleton brand-img swiper-slide" style="height: 50px"></div>
    </div>
    <div v-else class="swiper-wrapper">
      <locale-link
          class="swiper-slide brand-img fly-hover"
          v-for="(brand, index) in popularBrands"
          :key="index"
          :to="toBrand(brand)"
      >
        <img :src="brand.logo" :alt="brand.name"/>
      </locale-link>
    </div>
  </div>
</template>
<script>
import toBrand from '~/mixins/to-brand';
import {carouselSettingSingle} from '~/utilities/carousel';
import {mapActions, mapGetters} from "vuex";
export default {
  props: {
    popularBrands: {
      type: [Array, Object],
      default: () => {
      },
    },
    BrandsLoading: Boolean,
  },
  data() {
    return {
      carouselSetting2: {
        ...carouselSettingSingle,
        slidesPerView: 14,
        spaceBetween: 30,
        freeMode: true,
        speed: 1500,
        navigation: {
          nextEl: '.brands-slider .swiper-next',
          prevEl: '.brands-slider .swiper-prev',
        },
        breakpoints: {
          1350: {
            slidesPerView: 13,
          },
          1200: {
            slidesPerView: 12,
          },
          1150: {
            slidesPerView: 10,
          },
          950: {
            slidesPerView: 8.5,
          },
          800: {
            slidesPerView: 7.2,
          },
          650: {
            slidesPerView: 6,
          },
          500: {
            slidesPerView: 4.5,
          },
          400: {
            slidesPerView: 3.5,
          },
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
      },
    }
  },
  mixins: [toBrand],
  methods: {
    ...mapActions('elements', ['toggleHeaderCategory', 'closeAll']),
  },
};
</script>

