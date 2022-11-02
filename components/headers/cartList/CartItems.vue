<template>
    <div v-if="basket && basket.cart && basket.cart.length > 0" class="cart-items scrollbar">
        <div v-for="(item, i) in basket.cart" :key="item.cart_id">
            <cart-item :index="i" :item="item"/>
        </div>
    </div>
		<div v-else class="cart-items">
			Пусто
		</div>
</template>

<script>
import { mapState } from 'vuex';
import CartItem from '~/components/headers/cartList/CartItem';
export default {
    components: {
        CartItem
    },
    computed: {
        ...mapState({
            basket: state => state.basket
        })
    },
}
</script>

<style lang="scss">
.cart-items{
  padding: 0 20px;
  height: 100%;
  overflow-y: auto;
}
</style>