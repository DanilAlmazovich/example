<template>
    <div v-swiper:swiper1="carouselSetting1" class="products-swiper">
        <div class="swiper-wrapper">
            <locale-link class="swiper-slide product-swiper fly-hover" v-for="(product, index) in secondaryBottomBanners" :key="index" :to="product.to ? product.to : '/'" tag="a">
                <img :src="product.image" :alt="product.name">
                <div class="product-swiper-text" :style="product.description_bg_color ? `background-color: ${product.description_bg_color}` : 'background-color: rgba(0, 130, 152, 0.75);'">
                    <span v-if="product.name" :style="product.name_color ? `color: ${product.name_color}` : 'color: white;'">{{ product.name.length > 35 ? product.name.substring(0, 35) + '...' : product.name  }}</span>
                </div>
            </locale-link>
        </div>
    </div>
</template>

<script>
import { carouselSettingSingle } from '~/utilities/carousel';

export default {
    props: {
        secondaryBottomBanners: {
            type: [Array, Object],
            default: () => [],
        },
    },
    data() {
        return {
            carouselSetting1: {
                ...carouselSettingSingle,
                slidesPerView: 4,
                spaceBetween: 20,
                freeMode: true,
                speed: 1500,
                navigation: {
                    nextEl: '.brands-slider .swiper-next',
                    prevEl: '.brands-slider .swiper-prev',
                },
                breakpoints: {
                    1220: {
                        slidesPerView: 3,
                    },
                    980: {
                        slidesPerView: 2,
                    },
                    650: {
                        slidesPerView: 1,
                    },
                },
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
            },
        };
    },
};
</script>

<style lang="scss" scoped>
    .products-swiper{
        padding-top: 20px;
        .product-swiper{
            position: relative;
            border-radius: 4px;
            overflow: hidden;
            img{
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
            .product-swiper-text{
                position: absolute;
                display: flex;
                align-items: center;
                bottom: 0;
                width: 100%;
                height: auto;
                padding: 9.5px 19px;
                font-size: 16px;
                height: 40px;
                font-weight: 300;
                span{
                    white-space: nowrap;
                }
            }
        }
    }
</style>