<template>
    <div class="shop-products-list" v-if="products">
        <ProductCard v-for="(product, index) in products" :product="product" :key="index" :productLoaded="productLoaded"/>
    </div>
</template>

<script>
import ProductCard from "~/components/product-card/ProductCard";
export default {
    name: "ShopProductsList",
    components: {ProductCard},
    props: {
        products: {
            type: [Array, Object],
            default: () => {}
        },
        productLoaded: Boolean
    },
    
}
</script>
