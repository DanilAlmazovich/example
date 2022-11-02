<template>
  <div class="companies">
    <title-link title="Все бренды" :titleLoading="false" titleLink="/brands"/>
    <div class="companies-brends">
      <locale-link
          class="companies-brend fly-hover"
          v-for="(brand, index) in brands"
          :key="index"
          :to="toBrand(brand)"
      ><img v-lazy="brand.logo" :alt="brand.name" />
      </locale-link>
    </div>
  </div>
</template>

<script>
import toBrand from '~/mixins/to-brand';
import { carouselSettingSingle } from '~/utilities/carousel';
import { mapActions, mapGetters } from 'vuex';
import TitleLink from '../ui/TitleLink.vue';
export default {
  components: { TitleLink },
  props: {
    brands: {
      type: [Array, Object],
      default: () => [],
    },
  },
  data() {
    return {
      carouselSetting1: {
        ...carouselSettingSingle,
        slidesPerView: 3.5,
        slidesPerColumn: 4,
        spaceBetween: 50,
        freeMode: true,
        speed: 1000,
        navigation: {
          nextEl: '.brands-slider .swiper-next',
          prevEl: '.brands-slider .swiper-prev',
        },
        breakpoints: {
          526: {
            slidesPerView: 3.5,
          },
          412: {
            slidesPerView: 2.5,
          },
        },
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false,
        //
        // },
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      },
    };
  },
  mixins: [toBrand],
  methods: {
    ...mapActions('elements', ['toggleHeaderCategory', 'closeAll']),
  },
};
</script>
