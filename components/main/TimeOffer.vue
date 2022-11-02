<template>
    <div class="time-offer" v-if="limitedProducts && limitedProducts.length">
        <title-link title="Ограниченное по времени предложение" :titleLoading="false"/>
        <div class="time-offer-content">
            <div class="time-offer-img" v-lazy:background-image="'./images/azor_images/time_offer.png'"></div>
            <div class="time-cards" >
                <locale-link class="time-card fly-hover" v-for="(product, index) in limitedProducts" :key="index" :to="`/product/${product.slug}`" tag="div">
                    <div class="time-card-img">
                        <img v-lazy="product.thumbnail_img" alt="time-offer-card" />
                    </div>
                    <div class="time-card-info">
                        <div class="time-card-text">
                            <span>{{ product.price }} c</span>
                            <span>{{ product.name.length > 50 ? product.name.substring(0, 50) + '...' : product.name}}</span>
                        </div>
                        <product-actions :center="true" :product="product" buttonText="Купить сейчас" />
                    </div>
                </locale-link>
            </div>
        </div>
    </div>
</template>

<script>
import ProductActions from '~/components/product-card/ProductActions.vue';
import TitleLink from '~/components/ui/TitleLink.vue';

export default {
    components: { ProductActions, TitleLink },
    props: {
        limitedProducts: {
            type: [Array, Object],
            default: () => { },
        },
    },
};
</script>
