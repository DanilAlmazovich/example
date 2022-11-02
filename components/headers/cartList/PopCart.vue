<template>
    <div class="pop-cart-layer">
        <div class="pop-cart-icon" @click="toggleCartList">
            <div class="pop-cart-icon-qtytotal azor-cart">
                <span v-if="qtyTotal === 0">Нет товаров</span>
                <span v-else>{{ qtyTotal }} товаров</span>
            </div>

            <div class="pop-cart-price-total">
                {{ priceTotal }}
                <span class="pop-cart-icon-currencies">С</span>
            </div>
        </div>

        <div class="pop-cart-nav" :class="{ showCart: cartListState }">
            <div class="pop-cart-head">
                <div>
                    <span class="cart-total icon-shopping-cart"
                        >{{ qtyTotal }} предметов
                    </span>
                </div>
                <div class="close-pop-cart" @click="toggleCartList">
                    <hum-cross :dark="true" :cross="true" />
                </div>
            </div>
            <div>
                <div class="pop-cart-list" v-if="qtyTotal > 0">
                    <cart-items />
                </div>

                <div class="pop-cart-dog" v-else>
                    <img v-lazy="'./images/backgrounds/cart-dog.svg'" alt="AZOR"/>
                    <span>У вас нет товаров</span>
                </div>
            </div>

            <div class="pop-cart-order">
                <button @click="proceedCheckout" :disabled="basket.totalLoading">
                    <span v-if="!basket.totalLoading">Оформить заказ {{ priceTotal }} c</span>
                    <button-loader v-else/>
                </button>
            </div>
        </div>
    </div>
</template>


<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import CheckBox from '~/components/ui/CheckBox';
import HumCross from '~/components/ui/HumCross.vue';
import CartItems from './CartItems.vue';
import ButtonLoader from "~/components/ui/ButtonLoader";
export default {
    components: {
        CheckBox,
        CartItems,
        HumCross,
        ButtonLoader
    },
    data() {
        return {
            all: false,
        };
    },
    computed: {
        ...mapState({
            basket: (state) => state.basket,
        }),
        ...mapGetters('cart', ['cartList']),
        ...mapGetters('basket', ['qtyTotal', 'priceTotal']),
        ...mapGetters('elements', ['cartListState']),
    },
    methods: {
        ...mapActions('cart', ['removeFromCart']),
        ...mapActions('elements', [
            'toggleMobileMenu',
            'toggleCartList',
            'closeAll',
        ]),
        proceedCheckout() {
            if (this.basket.cart.length > 0 && this.$store.state.auth.loggedIn) {
                this.$router.push(this.localePath('/checkout'));
            }
            if(!this.$store.state.auth.loggedIn) {
                this.$router.push(this.localePath('/login'));
            }
        },
    },
    watch: {
        $route(to, from) {
            this.closeAll();
        },
    },
};
</script>

