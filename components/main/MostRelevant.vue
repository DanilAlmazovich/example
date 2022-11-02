<template>
    <section class="relevant" v-if="actualBanners && actualBanners.length">
      <title-link title="Самое актуальное" :titleLoading="false"/>
      <div class="relevant-cards">
        <locale-link v-for="(banner, index) in actualBanners" :key="index" :to="banner.to ?? '/'">
			<div class="relevant-card fly-hover">
				<img v-lazy="banner.image" :alt="banner.name">
				<div class="relevant-card-text">
					<div :style="banner.description_bg_color ? `background-color: ${banner.description_bg_color}` : 'background-color: #66839D;'"> 
					<span :style="banner.description_color ? `color: ${banner.description_color}` : 'color: white;'">{{banner.description}} </span>
					</div>
					<div>
					<b :style="banner.name_color ? `color: ${banner.name_color}` : 'color: white;'"> {{ banner.name }} </b>
					<span :style="banner.name_color ? `color: ${banner.name_color}` : 'color: white;'" class="icon-long-arrow-right"> {{ banner.name_lower }}</span>
					</div>
				</div>
			</div>
        </locale-link>
      </div>
    </section>
</template>

<script>
import TitleLink from '../ui/TitleLink.vue';
  export default {
    components: { TitleLink },
    props: {
      actualBanners: {
        type: [Array, Object],
        default: () => []
      }
    },
}
</script>
