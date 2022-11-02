<template>
  <div v-if="bannersLoading" style="height: 361px" class="container promo-banners">
    <div class="skeleton"></div>
    <div class="banners-grid-second">
      <div class="skeleton"></div>
      <div class="banners-grid-third">
        <div class="skeleton"></div>
        <div class="skeleton"></div>
      </div>
    </div>
  </div>
  <div v-else class="promo-banners">
    <div class="banners-grid-first" v-if="has('first')">
      <div v-swiper:swiper1="carouselSetting0" class="promo-content-large">
        <div class="swiper-wrapper">
          <div class="swiper-slide promo-banner" v-for="(banner, index) in topBanners.first" :key="index">
            <img :src="banner.image" alt="main_banner" />
            <div class="large-banner-text">
              <div>
                <h4 :style="getColor(banner, 'description')" v-if="banner.description">
                  {{ banner.description }}
                </h4>
                <h2 :style="getColor(banner, 'name')" v-if="banner.name">
                  {{ banner.name }}
                </h2>
                <locale-link :to="banner.to ?? '/'" class="icon-long-arrow-right" v-if="banner.to" :style="getButtonStyle(banner)">
                  Узнать больше
                </locale-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img v-if="getImage('first')" class="promo-banner-size" :src="getImage('first')" alt="product" />
    </div>
    <div class="banners-grid-second" v-if="has('second')">
      <div class="promo-layer-sizing">
        <div v-swiper:swiper2="carouselSetting0" class="promo-content-large">
          <div class="swiper-wrapper">
            <div class="swiper-slide promo-banner" v-for="(banner, index) in topBanners.second" :key="index">
              <img :src="banner.image" alt="main_banner" />
              <locale-link class="large-banner-text" tag="div" :to="banner.to ?? '/'">
                <div>
                  <h2 :style="getColor(banner, 'name')" v-if="banner.name">
                    {{ banner.name }}
                  </h2>
                  <h4 :style="getColor(banner, 'description')" v-if="banner.description">
                    {{ banner.description }}
                  </h4>
                </div>
                <locale-link :to="banner.to ?? '/'" class="icon-long-arrow-right" v-if="banner.to" :style="getButtonStyle(banner)">
                  Узнать больше
                </locale-link>
              </locale-link>
            </div>
          </div>
        </div>
        <img v-if="getImage('second')" class="promo-banner-size" :src="getImage('second')" alt="product" />
      </div>

      <div class="banners-grid-third">
        <div>
          <div class="promo-layer-sizing" v-if="has('third')">
            <div v-swiper:swiper3="carouselSetting0" class="promo-content-large">
              <div class="swiper-wrapper">
                <div class="swiper-slide promo-banner" v-for="(banner, index) in topBanners.third" :key="index">
                  <img :src="banner.image" alt="main_banner" />
                  <locale-link class="small-banner-text" tag="div" :to="banner.to ?? '/'">
                    <h2 :style="getColor(banner, 'name')" v-if="banner.name">
                      {{ banner.name }}
                    </h2>
                    <locale-link :to="banner.to ?? '/'" class="icon-long-arrow-right" v-if="banner.to" :style="getButtonStyle(banner)">
                      Узнать больше
                    </locale-link>
                  </locale-link>
                </div>
              </div>
            </div>
          </div>
          <img v-if="getImage('third')" class="promo-banner-size" :src="getImage('third')" alt="product" />
        </div>

        <div>
          <div class="promo-layer-sizing" v-if="has('fourth')">
            <div v-swiper:swiper4="carouselSetting0" class="promo-content-large">
              <div class="swiper-wrapper">
                <div class="swiper-slide promo-banner" v-for="(banner, index) in topBanners.fourth" :key="index">
                  <img :src="banner.image" alt="main_banner" />
                  <locale-link class="small-banner-text" tag="div" :to="banner.to ?? '/'">
                    <h2 :style="getColor(banner, 'name')" v-if="banner.name">
                      {{ banner.name }}
                    </h2>
                    <locale-link :to="banner.to ?? '/'" class="icon-long-arrow-right" v-if="banner.to" :style="getButtonStyle(banner)">
                      Узнать больше
                    </locale-link>
                  </locale-link>
                </div>
              </div>
            </div>
          </div>
          <img v-if="getImage('fourth')" class="promo-banner-size" :src="getImage('fourth')" alt="product" hidden />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { carouselSettingSingle } from '~/utilities/carousel';

export default {
  props: {
    topBanners: {
      type: [Array, Object],
      default: () => {
      },
    },
    bannersLoading: Boolean,
  },
  data() {
    return {
      carouselSetting0: {
        ...carouselSettingSingle,
        spaceBetween: 0,
        sliding: null,
        speed: 2000,
        followFinger: false,
        on: {
          init() {
            this.el.addEventListener('mouseenter', () => {
              this.autoplay.stop();
            });

            this.el.addEventListener('mouseleave', () => {
              this.autoplay.start();
            });
          }
        },
        autoplay: {
          reverseDirection: true,
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
      },
    };
  },
  methods: {
    getButtonStyle(button) {
      return {
        color: button.description_color ?? '#fff',
        border: button.description_color
          ? `1px solid ${button.description_color}`
          : '1px solid #FFFFFF',
      };
    },
    has(key) {
      return this.topBanners && this.topBanners[key];
    },
    getColor(item, key) {
      return {
        color: item[`${key}_color`] ?? '#000',
      };
    },
    getImage(key, index = 0) {
      return this.topBanners[key]?.[index]?.image;
    }
  },
};
</script>
