<template>
    <section>
        <div class="mobile-navbar">
            <locale-link class="mobile-navbar-button" :class="mainClass" id="mobile-home-button" to="/" tag="button">
                <span class="azor-shop">Главная</span>
            </locale-link>
            <button class="mobile-navbar-button" id="mobile-home-category" @click="toggleMobileCategory"
                :class="{ active: mobileCategory }">
                <span class="azor-history">Каталог</span>
            </button>
            <button class="mobile-navbar-button" :class="{ active: cartList }" @click="toggleCartList">
                <span class="azor-cart">Корзина</span>
                <div class="count" v-text="qtyTotal" />
            </button>
            <locale-link class="mobile-navbar-button" :class="wishListClass"
                :to="$store.state.auth.loggedIn ? '/account/wishlist' : '/login'" tag="button">
                <span class="azor-wishlist">Избранное</span>
                <div class="count" v-text="wishlistQtyTotal" />
            </locale-link>
            <button class="mobile-navbar-button" :class="{ active: mobileAccount }" @click="toggleMobileAccount">
                <span class="azor-user_ring">Профиль</span>
            </button>
        </div>      
        <mobile-category v-if="mobileStart"/>
        <mobile-account v-if="mobileStart"/>
    </section>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import MobileAccount from './MobileAccount.vue';
import MobileCategory from '~/components/catalog/MobileCategory';
export default {
    components: {
    MobileAccount,
        MobileCategory,
},
    data() {
        return {
            mobileStart: false
        }
    },
    computed: {
        ...mapGetters('wishlist', ['wishlistQty'], 'cart', ['qtyTotal']),
        ...mapState({
            basket: state => state.basket
        }),
        ...mapState('elements', ['cartList', 'mobileMenu', 'mobileCategory', 'mobileAccount']),
        mainClass() {
            if (this.cartList || this.mobileCategory || this.mobileAccount) {
                return 'isActive'
            } else if (this.$route.path === '/') {
                return 'active'
            }
        },
        wishListClass() {
            if (this.cartList || this.mobileCategory || this.mobileAccount) {
                return 'isActive'
            } else if (this.$route.path === '/account/wishlist') {
                return 'active'
            }
        },
        qtyTotal() {
            if (this.basket && this.basket.cart) {
                return this.basket.cart.length;
            }
            return 0;
        },
        wishlistQtyTotal() {
            if (this.wishlistQty) {
                return this.wishlistQty
            }
            return 0
        }
    },
    methods: {
        ...mapActions('elements', ['toggleMobileMenu', 'toggleMobileAccount', 'toggleCartList', 'toggleMobileCategory']),
        setMobile() {
            if (this.width = window.innerWidth <= 991) {
                this.mobileStart = true;
            }
        },
    },
    mounted() {
        this.setMobile();
    },

};
</script>