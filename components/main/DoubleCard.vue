<template>
  <div class="double-cards" v-if="dynamicBanners && dynamicBanners.length">
      <div class="double-card" v-for="(banner, index) in dynamicBanners" :key="index">
        <title-link :title="banner.name" :titleLoading="false" :titleLink="banner.to"/>
        <locale-link class="fly-hover double-card" tag="div" :to="banner.to">
          <img v-lazy="banner.image" :alt="banner.name"/>
        </locale-link>
      </div>
  </div>
</template>

<script>
import TitleLink from '../ui/TitleLink.vue';
export default {
    props: {
        dynamicBanners: {
            type: [Array, Object],
            default: () => {
            }
        }
    },
    methods: {
        getColor(item, key) {
            return {
                color: item[`${key}_color`] ?? "#000"
            };
        }
    },
    components: { TitleLink }
}
</script>