<template>
    <div class="product-view-images">
        <vue-photo-zoom-pro :high-url="selectedImage" class="main-view-image" :width="270" :height="270" :scale="1.5" type="circle">
            <img :src="selectedImage" />
        </vue-photo-zoom-pro>
        <div class="swiper-carousel">
            <div v-swiper:swiper1="carouselSetting1" ref="swiper">
                <div class="swiper-wrapper">
                    <div
                        class="swiper-slide product-view-image"
                        :class="{ active: image === selectedImage }"
                        v-for="image in photos"
                        :key="image.id"
                        @mouseover="selectImage(image)"
                    >
                        <img v-lazy="image" alt="sub_image" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import vuePhotoZoomPro from 'vue-photo-zoom-pro';
import 'vue-photo-zoom-pro/dist/style/vue-photo-zoom-pro.css';
import { carouselSettingSingle } from "~/utilities/carousel";

export default {
    components: {
        vuePhotoZoomPro
    },
    props: {
        photos: [Array, Object]
    },
    data() {
        return {
            carouselSetting1: {
                ...carouselSettingSingle,
                slidesPerView: 3,
                spaceBetween: 20,
                freeMode: true,
                speed: 1500,
                autoplay: {
                    delay: 4500,
                    disableOnInteraction: false,
                },
            },
            selectedImage: null,
        }
    },
    methods: {
        selectImage(img) {
            this.selectedImage = img
        }
    },
    mounted() {
        this.selectedImage = this.photos[0];
    }
};
</script>

<style>
</style>