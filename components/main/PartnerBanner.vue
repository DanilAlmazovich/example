<template>
    <div class="partner-banners">
        <title-link title="Партнеры" :titleLoading="false" />
        <div class="partner-banners-grid">
            <div class="partner-banner" v-swiper:swiper10="carouselSetting1">
                <div class="swiper-wrapper">
                    <template v-if="!partnersLoading">
                        <a
                            target="_blank"
                            :href="banner.to"
                            class="swiper-slide"
                            v-for="(banner, idx) in partners[0]"
                            :key="idx + 1"
                        >
                            <img v-lazy="banner.image" alt="partners" />
                        </a>
                    </template>
                    <template v-else>
                        <div class="skeleton"></div>
                    </template>
                </div>
            </div>
            <div class="partner-banner" v-swiper:swiper11="carouselSetting1">
                <div class="swiper-wrapper">
                    <template v-if="!partnersLoading">
                        <a
                            target="_blank"
                            :href="banner.to"
                            class="swiper-slide"
                            v-for="(banner, idx) in partners[1]"
                            :key="idx + 2"
                        >
                            <img v-lazy="banner.image" alt="partners" />
                        </a>
                    </template>
                    <template v-else>
                        <div class="skeleton"></div>
                    </template>
                </div>
            </div>
            <div class="partner-banner" v-swiper:swiper12="carouselSetting1">
                <div class="swiper-wrapper">
                    <template v-if="!partnersLoading">
                        <a
                            target="_blank"
                            :href="banner.to"
                            class="swiper-slide"
                            v-for="(banner, idx) in partners[2]"
                            :key="idx + 3"
                        >
                            <img v-lazy="banner.image" alt="partners" />
                        </a>
                    </template>
                    <template v-else>
                        <div class="skeleton"></div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { carouselSettingSingle } from '~/utilities/carousel';
import TitleLink from '~/components/ui/TitleLink.vue';

export default {
    components: {
        TitleLink,
    },
    props: {
		partners: [Array, Object],
        partnersLoading: Boolean,
    },
    data() {
        return {
            carouselSetting1: {
                ...carouselSettingSingle,
                slidesPerView: 1,
                spaceBetween: 0,
                freeMode: true,
                speed: 1500,
                autoplay: {
                    delay: 7000,
                    disableOnInteraction: false,
                },
            },
        };
    },
};
</script>

<style lang="scss">
.partner-banners-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
    @media (max-width: 805px) {
        grid-template-columns: 1fr;
    }

    .partner-banner {
        position: relative;
        width: 100%;
        height: auto;
        overflow: hidden;
        border-radius: 4px;
		aspect-ratio: 453 / 200;
		overflow: hidden;
		img{
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

        .skeleton {
            aspect-ratio: 453 / 200;
            width: 100%;
        }
    }
}
</style>