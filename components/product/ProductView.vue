<template>
    <div class="product-view" v-if="product">
        <product-img :photos="product.photos"/>
        <div class="product-view-layer">
            <div class="product-view-content">
                <div>
                    <div class="product-view-head">
                        <h1>{{ product.name }}</h1>
                        <div class="product-view-article">Артикул: {{ product.id }}</div>
                        <div class="product-view-rating-wish">
                            <div class="product-view-rating"></div>
                            <button
                                class="product-view-wishlist heart azor-wishlist"
                                :class="{'azor-wishlist_fill' : inWhishlist}"
                                @click.prevent="setWishlist(product)"
                                :disabled="wishlistLoading"
                            >
                                <span>{{inWhishlist ? 'Удалить из списка желании' : 'Добавить в список желании'}}</span>
                            </button>
                        </div>
                    </div>

                    <div class="product-view-info" itemscope itemtype="https://shcema.org/Product">
                        <div class="product-view-price-brand">
                            <locale-link class="product-view-brand" v-if="product.brand.logo && product.brand.slug"
                                tag="div" :to="toBrand(product.brand)" @click="close">
                                <div class="product-view-brand-img">
                                    <img itemprop="image" v-lazy="product.brand.logo" class="brand-logo" alt="brand" />
                                </div>

                                <div class="product-view-brand-info">
                                    <b>{{ product.brand.name }}</b>
                                    <span>Посмотреть другие товары</span>
                                </div>
                            </locale-link>
                            <div class="product-view-price">
                                <span>Цена:</span>
                                <span itemprop="price">{{ product.price }} сом</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-view-options">
                    <div class="product-view-select" v-if="product.variation_options[0] && product.variations[0].code">
                        <span>Варианты:</span>
                        <div class="product-view-select-variation">
                            <button v-for="variation in variations" :key="variation.id"
                                :class="{ 'product-variation-active': variation.id === productVariationId }"
                                @click="selectVariant(variation.id, variation.name)">
                                <span>{{ variation.name }}</span>
                            </button>
                        </div>
                    </div>
                    <div class="product-view-select">
                        <span>Количество:</span>
                        <div class="product-view-select-variation">
                            <div class="product-view-count">
                                <button :disabled="productCount <= product.min_qty" v-if="product.max_qty > 1"
                                    @click="minusProduct(product.min_qty)">−</button>
                                <b>{{ productCount }}</b>
                                <button :disabled="productCount >= product.max_qty" v-if="product.max_qty > 1"
                                    @click="plusProduct(product.max_qty)">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="product-view-select-buttons">
                        <div v-if="product.stock >= 1">
                            <img v-lazy="'./images/azor_images/product_card/product_mark.svg'" alt="product_mark">
                            <b>Товар в наличии</b>
                        </div>
                        <div v-if="product.standard_delivery_time">
                            <img v-lazy="'./images/azor_images/product_card/delivery_period.svg'" alt="delivery_period">
                            <b>Срок доставки:</b>
                            <span v-if="product.standard_delivery_time < 24"> до {{ product.standard_delivery_time }}
                                <span v-if="product.standard_delivery_time > 1">часов</span><span v-else>часа</span>
                            </span>
                            <span v-if="product.standard_delivery_time >= 24"> до {{ product.standard_delivery_time / 24
                            }}
                                <span v-if="product.standard_delivery_time / 24 > 1">дней</span><span v-else>дня</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-view-links">
                <div class="product-view-links-content">
                    <social-share 
                        :size="32" 
                        :link="true"
                        :productName="product.name"
                        :productSlug="productSlug"
                    />
                    <div class="product-view-links-button">
                        <button v-if="inBasket" @click.prevent="removeFromCart" :disabled="basketButtonLoading"
                            class="product__card_add-cart product__card_add-cart--remove">
                            <span v-if="!basketButtonLoading">Удалить из корзины</span>
                            <button-loader v-else />
                        </button>
                        <button v-else class="product__card_add-cart" @click.prevent="addToCart"
                            :disabled="!productVariationId || basketButtonLoading">
                            <span v-if="!basketButtonLoading">Добавить товар в корзину</span>
                            <button-loader v-else />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import toBrand from '~/mixins/to-brand';
import setWishlist from '~/mixins/set-wishlist';
import NewProducts from "~/components/main/NewProducts";
import ShopProductsList from "~/components/main/ShopProductsList";
import ButtonLoader from "~/components/ui/ButtonLoader";
import SocialShare from '../ui/SocialShare.vue';
import ProductImg from './ProductImg.vue';


export default {
    head() {
        return {
            title: "AZOR - " + this.product.name,// заголовок сайта
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.product?.description?.replace(/\s*\<.*?\>\s*/g, '') || '', // description продукта
                },
                {
                    property: 'og:image:src',
                    itemprop: 'image',
                    content: this.selectedImage,// ссылка на изображение
                },
                {
                    property: 'og:image:type',
                    content: 'image/jpeg',
                },
                {
                    property: 'og:site_name',
                    content: 'AZOR Маркетплейс',
                },
                {
                    name: "twitter:card",
                    content: 'summary',
                },
                {
                    name: "twitter:image:src",
                    content: this.selectedImage,
                },
                {
                    name: "twitter:description",
                    content: this.product?.description?.replace(/\s*\<.*?\>\s*/g, '').substr(0, 155).substr(0, 155) || '',
                },
                {
                    name: "twitter:site",
                    content: '@azorgovorit',
                },
                {
                    name: "twitter:url",
                    content: "https://azor.kg" + (this.locale == 'ru' ? '' : this.locale) + "/" + this.$route.fullPath,
                },
                {
                    name: "twitter:image",
                    content: this.selectedImage,// ссылка на изображение
                },
                {
                    property: "og:image:width",
                    content: '300',
                },
                {
                    property: "og:image:height",
                    content: '200',
                },
                {
                    property: "og:title",
                    content: this.product.name.substr(0, 35), // Нужно доавить опсиание заголовка поста
                },
                {
                    property: "og:description",
                    content: this.product?.description?.replace(/\s*\<.*?\>\s*/g, '').substr(0, 155) || '', // Нужно добавить описание товара
                },
                {
                    property: "og:type",
                    content: "website",
                },
                {
                    property: "og:locale",
                    content: this.locale,
                },
                {
                    property: "og:url",
                    content: "https://azor.kg" + (this.locale == 'ru' ? '' : this.locale) + "/" + this.$route.fullPath,
                },
            ],
        }
    },
    name: "ProductView",
    props: {
        product: {
            type: Object, Array,
            default: () => { }
        },
        productSlug: {
            type: String,
            default: null
        },
    },
    components: {
    ShopProductsList,
    NewProducts,
    ButtonLoader,
    SocialShare,
    ProductImg
},
    data() {
        return {
            productCount: 1,
            productDescriptionText: 'Развернуть описание',
            error: null,
            productVariationId: null,
            productVariationName: null,
            basketButtonLoading: false,
            wishlistLoading: false
        }
    },
    computed: {
        ...mapGetters('locale', ['locale']),
        ...mapState({
            basket: state => state.basket
        }),
        ...mapState({
            wishlist: state => state.wishlist.list,
        }),
        variations() {
            const variations = [];
            if (this.product && this.product.variation_options[0]) {
                if (this.product.variations[0].code) {
                    this.product.variation_options[0].values.map(option => {
                        const variant = this.product.variations.find(item => item.code && item.code.split(':')[1] === option.uuid);
                        const item = {
                            ...option,
                            id: variant.id
                        }
                        variations.push(item)
                    })
                    return variations;
                } else {
                    return this.product.variations
                }
            } else {
                return this.product.variations
            }
        },
        inBasket() {
            if (this.basket && this.basket.cart) {
                return this.basket.cart.find(item => item.product_id === this.product.id && item.variation_id === this.productVariationId)
            }
            return false;
        },
        tempUserId() {
            return window.localStorage.getItem('tempUserId') ? window.localStorage.getItem('tempUserId') : generatedUserId();
        },
        inWhishlist() {
            if (this.wishlist) {
                return this.wishlist.find(item => item.id === this.product.id)
            }
            return false;
        },
    },
    mixins: [toBrand, setWishlist],
    methods: {
        close() {
            this.$emit('close');
        },
        ...mapActions('elements', ['toggleHeaderCategory', 'closeAll']),
        selectVariant(id, name) {
            this.productVariationId = id;
            this.productVariationName = name;
        },
        async removeFromCart() {
            this.basketButtonLoading = true
            const payload = {
                params: {
                    cart_id: this.inBasket.cart_id,
                    temp_user_id: this.tempUserId
                },
                product_id: this.product.id,
            }
            const message = await this.$store.dispatch('basket/deleteCart', payload)
            if (message) {
                this.$notify({ title: message, type: 'success' })
                this.basketButtonLoading = false
                this.$store.dispatch('basket/get', {temp_user_id: this.tempUserId})
            }
        },
        async addToCart() {
            this.basketButtonLoading = true
            if (this.productVariationId) {
                const payload = {
                    params: {
                        qty: this.productCount,
                        temp_user_id: this.tempUserId,
                        variation_id: this.productVariationId,
                        variation: this.productVariationName ?? null,
                    },
                    product_item: this.product,
                    qty: this.productCount,
                }
                const message = await this.$store.dispatch('basket/add', payload)
                if (message) {
                    this.$notify({ title: message, type: 'success' })
                    this.basketButtonLoading = false
                    this.$store.dispatch('basket/get', {temp_user_id: this.tempUserId})
                }
            }
        },
        async minusProduct() {
            this.productCount--
            //      if (this.inBasket) {
            //        const payload = {
            //          cart_id: this.inBasket.cart_id,
            //          temp_user_id: this.tempUserId
            //        }
            //        if (this.productCount === 1) {
            //          await this.$store.dispatch('basket/deleteCart', payload)
            //        } else {
            //          payload.type = 'minus';
            //          this.changeQuantity(payload)
            //        }
            //      }
        },
        async plusProduct() {
            this.productCount++
            //      this.changeQuantity({
            //        type: 'plus',
            //        cart_id: this.inBasket.cart_id,
            //        temp_user_id: this.tempUserId
            //      })
        },
//        async changeQuantity(payload) {
//            const { success, message } = await this.$store.dispatch('basket/updateQuanty', payload);
//            if (success) {
//                if (payload.type === 'plus') {
//                    this.productCount += 1;
//                } else {
//                    if (this.productCount <= 0) {
//                        this.productCount = 0;
//                    } else {
//                        this.productCount -= 1;
//                    }
//                }
//            } else {
//                alert(message);
//            }
//        },
    },
    mounted() {
        if (this.variations.length > 0) {
            this.productVariationId = this.variations[0].id;
        }
        if (this.product) {
            this.productCount = this.product.min_qty;
        }
    },
}
const generatedUserId = () => {
    const date = new Date();
    return date.getTime();
}
</script>
