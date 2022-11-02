<template>
    <locale-link v-if="productLoaded" class="swiper-slide new-product" :to="`/product/${product.slug}`" tag="a">
        <div class="new-product-link cursor-pointer">
            <div class="new-product-img" ref="imgLayer" :style="{'height': aspectHeight + 'px'}">
                <img v-lazy="product.thumbnail_img" :alt="product.name"/>
            </div>
            <div class="new-product-info">
                <div class="new-product-head">
                    <span>{{ product.price }} c</span>
                    <span v-if="product.name">{{product.name.length > 40 ? product.name.substring(0, 40) + '...' : product.name}}</span>
                </div>
                <product-actions :product="product" buttonText="В корзину" />
            </div>
        </div>
    </locale-link>
    <div v-else class="swiper-slide new-product">
        <div class="new-product-link">
            <div class="skeleton new-product-img" ref="imgLayer" :style="{'height': 203 + 'px'}"></div>
            <div class="skeleton-text">
                <div class="skeleton"></div>
                <div class="skeleton"></div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductActions from '~/components/product-card/ProductActions.vue';
export default {
    name: 'ProductCard',
    components: {
        ProductActions,
    },
    props: {
        product: [Object, Array],
        productLoaded: Boolean
    },
    data() {
        return {
            aspectHeight: 0
        }
    },
    watch: {
        productLoaded: {
            handler() {
                this.setAspect();
            }
        }
    },
    computed: {
        setHeight() {
            return `height: ${this.aspectHeight} px`;
        }
    },
    methods: {
        setAspect() {
            if (this.productLoaded) {
                this.aspectHeight = this.$refs.imgLayer.clientWidth;
            }
            
        }
    },
    mounted() {
        window.addEventListener('resize', this.setAspect, { passive: true });
        this.setAspect();
    },
    destroyed () {
        window.addEventListener('resize', this.setAspect, { passive: true });
    },
};
</script>

<style lang="scss">
.new-product {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: auto;
    border: 1px solid #ebebeb;
    border-radius: 4px;
    height: auto;
    .new-product-link {
        display: flex;
        flex-direction: column;
    }

    .new-product-img {
        width: 100%;
        overflow: hidden;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .new-product-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 8px 10px;
        height: 130px;
        cursor: pointer;
        overflow: hidden;

        .new-product-head {
            display: flex;
            flex-direction: column;
            min-height: 30px;
            span{
            &:first-child{
                font-weight: 700;
                font-size: 16px;
                transition: 0.3s;
            }
            &:last-child{
                color: #656d77;
                font-weight: 400;
                height: 40px;
                line-height: 20px;
                text-overflow: ellipsis;
                overflow: hidden;
                line-clamp: 2;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            }
        }
    }

    .product-card-buttons {
        position: absolute;
        width: 100%;
        padding: 0 10px;
        bottom: 8px;
    }

    @media (max-width: 400px) {
        .product-card-buttons {
            padding: 0 5px;
        }
        .new-product-info {
            padding: 8px 5px;
            .new-product-head {
                span{
                    &:first-child{
                        color: #FF741F;
                        font-size: 14px;
                    }
                    &:last-child{
                        font-size: 13px;
                        height: 40px;
                    }
                }
            }
        }
        
    }
    .skeleton-text{
        display: grid;
        grid-auto-rows: calc(70% - 15px) 30%;
        gap: 15px;
        padding: 10px;
        height: 130px;
        div{
            height: 100%;
        }
    }
}
</style>
