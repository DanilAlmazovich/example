<template>
    <div v-if="relatedLoading" class="similar-products-skeleton">
        <div class="skeleton"></div>
        <div class="skeleton"></div>
    </div>
    <div class="similar-products" v-else>
        <div class="similar-products-banner">
            <locale-link :to="toBrand(zara)">
                <img v-lazy="'./images/azor_images/product_card/sidebar_image.png'" alt="zara">
                <b>Новая коллекция ZARA</b>
            </locale-link>
        </div>
        <div class="similar-products-list">
            <h5>Похожие товары</h5>
            <locale-link :to="`/product/${products.slug}`" v-for="(products, index) in related" :key="index" tag="div">
                <div class="similar-product">
                    <div class="similar-product-img">
                        <img v-lazy="products.thumbnail_img" alt="sidebar__similar_product">
                    </div>
                    <div class="similar-product-description">
                        <span>{{ products.name.length > 28 ? products.name.substring(0, 28) + '...' : products.name
                        }}</span>
                        <b>{{ products.price }} сом</b>
                    </div>
                </div>

            </locale-link>
        </div>
    </div>
</template>

<script>
import toBrand from '~/mixins/to-brand';
import {mapActions, mapGetters} from 'vuex';

export default {
    name: 'SimilarProduct',
    props: {
        related: [Array, Object],
        relatedLoading: Boolean
    },
    data() {
        return {
            zara: {
                logo: 'https://admin.azor.kg/storage/uploads/all/wCQuZZKWI70YLt2H.webp',
                name: 'Zara',
                slug: 'zara',
                type: 'brand',
                uuid: '1f2c6824-0c37-4dd1-8cad-0910979de64f'
            }
        }
    },
    mixins: [toBrand],
}
</script>

<style lang="scss">
.similar-products {
    height: 100%;
    overflow: hidden;
    .similar-products-banner {
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        max-height: 67px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        b {
            position: absolute;
            font-weight: 700;
            width: 100%;
            height: 100%;
            padding: 15px;
            top: 50%;
            left: 50%;
            color: white;
            font-size: 18px;
            line-height: 21px;
            text-align: center;
            transform: translate(-50%, -50%);
        }
    }

    .similar-products-list {
        display: flex;
        flex-direction: column;
        gap: 12px;

        h5 {
            font-weight: 500;
            font-size: 16px;
            color: #413D38;
            margin: 0;
            margin-top: 24px;
        }

        .similar-product {
            display: grid;
            grid-template-columns: 70px calc(100% - 70px);
            grid-template-rows: 70px;
            height: 70px;
            border: 1px solid #F8F8F8;
            border-radius: 5px;
            overflow: hidden;
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .similar-product-description {
                display: flex;
                flex-direction: column;
                justify-content: center;
                gap: 10px;
                padding: 0 10px;
                color: #000000;

                span {
                    display: block;
                    font-weight: 400;
                    font-size: 13px;
                    line-height: 13px;
                }

                b {
                    display: flex;
                    align-items: center;
                    height: 14px;
                    font-weight: 600;
                    font-size: 14px;
                }
            }
        }
    }
}
.similar-products-skeleton{
    display: grid;
    grid-auto-rows: 67px 500px;
    gap: 27px;
    div{
        height: 100%;
    }
}
</style>