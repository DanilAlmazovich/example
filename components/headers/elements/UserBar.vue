<template>
  <div class="user-bar">
    <locale-link :to="$store.state.auth.loggedIn ? '/account' : '/login'" class="user-bar-button"
      :class="{ 'user-button-active': $route.path === '/account' }" tag="div" v-if="account">
      <div class="azor-user_ring" />
      <span v-if="$store.state.auth.loggedIn">{{ $store.state.auth.user.name.length > 6 ?
          $store.state.auth.user.name.substring(0, 6) + '...' : $store.state.auth.user.name
      }}</span>
      <span v-else>Профиль</span>
    </locale-link>
    <locale-link :to="$store.state.auth.loggedIn ? '/account/wishlist' : '/login'" class="user-bar-button"
      :class="{ 'user-button-active': $route.path === '/account/wishlist' }" tag="div" v-if="wishList" :prefetch="false">
      <div class="azor-wishlist">
        <div class="count" v-text="wishlistQtyTotal" />
      </div>
      <span>Избранное</span>
    </locale-link>
    <div @click="toggleCartList" class="user-bar-button" tag="div" v-if="true">
      <div class="azor-cart">
        <div class="count" v-text="qtyTotal" />
      </div>
      <span>Корзина</span>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
  props: {
    account: {
      type: [Boolean, Number],
      default: () => false
    },
    wishList: {
      type: [Boolean, Number],
      default: () => false
    },
    cart: {
      type: [Boolean, Number],
      default: () => false
    },
  },
  methods: {
    ...mapActions('elements', ['toggleCartList'])
  },
  computed: {
    ...mapState({
      basket: state => state.basket
    }),
    ...mapGetters('wishlist', ['wishlistQty'], 'cart', ['qtyTotal']),
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
};
</script>