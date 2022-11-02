<template>
	<div class="wishlist">
		<div v-if="wishlist && wishlist.length == 0" class="orders__list__empty">
			<no-product 
				button="К товарам" 
				head="Нет товаров в списке" 
				description="Понравился товар и вы в раздумьях о покупке? Добавьте товар в избранное, чтобы его не потерять." 
				to="/categories"
			/>
		</div>
		<div v-if="wishlist && wishlist.length > 0" class="orders__list">
			<div class="tab-content-body">
				<h3>Мой список желаний</h3>
			</div>
			<div class="row">
				<shop-products-list :products="wishlist" :productLoaded="true"/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import ProductCard from "~/components/product-card/ProductCard";
import ShopProductsList from "~/components/main/ShopProductsList";
import NoProduct from '~/components/dashboard/NoProduct.vue';
export default {
	computed: {
		...mapState({
			wishlist: state => state.wishlist.list,
		})
	},
	components: {
    ProductCard,
    ShopProductsList,
    NoProduct
}
}
</script>