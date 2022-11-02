<template>
    <div class="new-products">
        <title-link :title="title" :titleLoading="newProductsLoading" :titleLink="linkSrc"/>
        <div v-swiper:swiper{{index}}="carouselSetting1">
            <div class="swiper-wrapper">
                <template v-if="newProductsLoading">
                    <div class="swiper-slide new-product" v-for="(skelet, index) in 6" :key="index">
                        <div class="new-product-link">
                        <div class="skeleton new-product-img"></div>
                        <div class="skeleton-text">
                            <div class="skeleton"></div>
                            <div class="skeleton"></div>
                        </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <product-card v-for="(product, index) in products" :key="index" :productLoaded="true" :product="product"/>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { carouselSettingSingle } from "~/utilities/carousel";
import ProductActions from '~/components/product-card/ProductActions.vue';
import ProductCard from '../product-card/ProductCard.vue';
import TitleLink from '../ui/TitleLink.vue';

export default {
  components: { ProductActions, ProductCard, TitleLink },
    props: {
      products: {
        type: [Array, Object],
        default: () => []
      },
      linkSrc: {
        type: String,
        default: () => null
      },
      title: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 1
      },
      newProductsLoading: Boolean
    },
    data() {
        return {
            carouselSetting1: {
                ...carouselSettingSingle,
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
                slidesPerView: 6,
                spaceBetween: 20,
                freeMode: true,
                speed: 1500,
                navigation: {
                    nextEl: '.brands-slider .swiper-next',
                    prevEl: '.brands-slider .swiper-prev'
                },
                breakpoints: {
                    1500: {
                        slidesPerView: 5.5
                    },
                    1200: {
                        slidesPerView: 5
                    },
                    1100: {
                        slidesPerView: 4.5
                    },
                    950: {
                        slidesPerView: 4
                    },
                    830: {
                        slidesPerView: 3.5
                    },
                    750: {
                        slidesPerView: 2.6
                    },
                    550: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    }
                },
                autoplay: {
                    delay: 4500,
                    disableOnInteraction: false,

                },
            },
        }
    },
}
</script>

<style lang="scss">
.new-products{
    overflow: hidden;
}
</style>