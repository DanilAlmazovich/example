<template>
    <div v-if="order" class="container">
        <div class="total-order">
            <div class="total-order-header">
                <h2>Заказ: {{ $route.params.index }}</h2>
                <span>Копия вашего заказа была отправлена на: {{ order.user.email }}</span>
            </div>
            <div class="total-order-result">
                <div class="total-order-result-info">
                    <div class="total-order-result-block">
                        <div>
                            <b>Номер заказа:</b><span>{{ $route.params.index }}</span>
                        </div>
                        <div><b>Имя:</b><span>{{ order.user.name }}</span></div>
                        <div><b>Email:</b><span>{{ order.user.email }}</span></div>
                        <div><b>Телефон:</b><span>{{ order.user.phone }}</span></div>
                        <div>
                            <b>Адрес доставки:</b>
							<span>
							    {{order.address.country}} {{order.address.city}} {{order.address.address}} {{order.address.house}} {{order.address.floor}}
							</span>
                        </div>
                    </div>
                    <div class="total-order-result-block">
                        <div><b>Сумма заказа:</b><span>{{ order.grand_total }} сом</span></div>
                        <div>
                            <b>Способ платежа:</b
                            ><span>{{ paymentType }}</span>
                        </div>
                        <div><b>Способ доставки:</b><span>{{ deliveryType }}</span></div>
                        <div class="total-order-payment-status" :style="paymentStatus.style"><b>{{paymentStatus.name}}</b></div>
                    </div>
                </div>
            </div>
            <div class="total-order-error" v-if="error">
                {{error}}
            </div>
            <div class="total-order-products" v-for="(store, index) in order.orders" :key="index">
                <h3>Товары</h3>
                <progress-bar v-if="paymentStatus.status" :status="store.delivery_status"/>
                <div class="total-order-products-list">
                    <locale-link class="total-order-product" v-for="product in store.products.data" :key="product.id" :to="`/product/${product.slug}`">
                        <img :src="product.thumbnail" :alt="product.name">
                        <div>
                            <span class="total-order-product-name">{{product.name.length > 45 ? product.name.substring(0, 45) + '...' : product.name}}</span>
                            <span class="total-order-product-count">{{product.price}} сом &#215; {{product.quantity}} шт</span>
                            <!-- <span v-if="product.combinations[0] && product.combinations[0].length">{{product.combinations[0].attribute}}: {{product.combinations[0].value}}</span> -->
                            <b>Итог: {{product.total}}</b>
                        </div>
                    </locale-link>
                </div>
                <div class="total-order-products-info">
                    <b>Сумма: {{store.grand_total}} с</b>
                </div>
            </div>
			<div class="total-order-check">
                <h3>Итог заказа</h3>
                <order-check :total="order.grand_total" :productSum="subProductGrant" :deliveryCost="order.delivery_cost" :tax="totalProductTax"/>
            </div>
        </div>
    </div>
</template>

<script>
import OrderCheck from '~/components/ui/OrderCheck.vue';
import ProgressBar from '../../components/order/ProgressBar.vue';
export default {
	head() {
		return {
		    title: "AZOR - Заказ",
		}
	},
    components: {
        ProgressBar,
        OrderCheck,
    },
    data () {
		return {
			order: null,
			error: null
		}
	},
	computed: {
        paymentStatus() {
            if (this.order.payment_status == 'paid') {
                return {status: true, name: 'Заказ оплачен', style: 'background-color: #30a133'}
            } else {
                return {status: false, name: 'Заказ не оплачен', style: 'background-color: #dd3535'}
            }
        },
        paymentType(){
            if (this.order.payment_type === 'wallet_payment') {
                return 'кошелек'
            } else if (this.order.payment_type === 'cash_on_delivery') {
                return 'при доставке'
            } else {
                return 'картой'
            }
        },
        deliveryType(){
            if (this.order.address.type === 'address') {
                return 'до места назначения'
            } else if (this.order.payment_type === 'pickup') {
                return 'самовывоз'
            } 
        },
        subProductGrant() {
            let sum = 0;
            if(this.order) {
                for (const store of this.order.orders) {
                    sum += store.subtotal
                }
            }
            return sum
        },
        totalProductTax() {
            let sum = 0;
            if(this.order) {
                for (const store of this.order.orders) {
                    sum += store.tax
                }
            }
            return sum
        }
	},
	methods: {
		async fetchOrder () {
			this.$store.commit('setLoading', true);
			try {
				const { data, success, message } = await this.$axios.$get(`/api/user/${this.$route.path}`);
				this.$store.commit('setLoading', false);
				if (success) {
					this.order = data;
				} else {
					this.error = message
				}
			} catch (error) {
				this.$store.commit('setLoading', false);
				const { message } = error.response.data;
				this.error = message;
			}
		}
	},
    mounted () {
        this.fetchOrder()
	},
};
</script>

<style lang="scss">
.total-order {
    margin: 30px 0;
    color: #131921;
	h3 {
        font-weight: 700;
        font-size: 20px;
        color: #131921;
        margin-bottom: 25px;
    }
}
.total-order-header {
    display: flex;
    flex-direction: column;
    h2 {
        font-weight: 700;
        font-size: 24px;
        margin: 0 0 15px 0;
    }
    span {
        font-weight: 400;
        font-size: 16px;
        line-height: 16px;
    }
}
.total-order-result {
    border: 1px solid rgb(152, 152, 152);
    border-radius: 5px;
    padding: 20px;
	margin-top: 20px;
    .total-order-result-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 30px;
        font-size: 16px;
        .total-order-result-block {
            display: flex;
            flex-direction: column;
            gap: 16px;
            div {
                display: grid;
                gap: 20px;
                grid-template-columns: 125px calc(100% - 145px);
                align-items: center;
                b {
                    font-weight: 500;
                    color: #656d77;
                    white-space: nowrap;
                }
                span {
                    line-height: 15px;
                    font-weight: 400;
                    color: #000000;
                    align-items: baseline;
                }
            }
            .total-order-payment-status{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 40px;
                color: white;
                border-radius: 5px;
                width: 100%;
                min-width: 200px;
                b{
                    color: white;
                }
            }
        }
    }
    @media (max-width: 991px) {
        .total-order-result-info{
            flex-direction: column;
            font-size: 14px;
            .total-order-result-block{
                width: 100%;
            }
        }
    }
}
.total-order-status{
	margin-top: 20px;
}
.total-order-error{
    padding: 15px;
    border: 1px solid #b40000;
    border-radius: 5px;
    margin-top: 20px;
    background-color: rgba($color: #b40000, $alpha: 0.1);
}
.total-order-products{
    margin-top: 20px;
    margin-bottom: 40px;
    &:last-child{
        margin-bottom: 0;
    }
    .total-order-products-list{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        gap: 20px;
        margin-top: 20px;
        @media (max-width: 1200px) {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr; 
        }
        @media (max-width: 991px) {
            grid-template-columns: 1fr 1fr 1fr 1fr; 
            gap: 10px;
        }
        @media (max-width: 700px) {
            grid-template-columns: 1fr 1fr 1fr; 
        }
        @media (max-width: 500px) {
            grid-template-columns: 1fr 1fr; 
        }
        .total-order-product{
            border: 1px solid #ebebeb;
            border-radius: 4px;
            img{
                height: 190px;
                width: 100%;
                object-fit: cover;
                @media (max-width: 500px) {
                    height: 170px;
                }
            }
            div{
                display: flex;
                flex-direction: column;
                gap: 10px;
                padding: 8px 10px;
                .total-order-product-name{
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
                .total-order-product-count{
                    color: #656d77;
                    font-weight: 600;
                    line-height: 20px;
                }
            }
        }
    }
    .total-order-products-info{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border: 1px solid #adadad;
        border-radius: 5px;
        margin-top: 20px;
        padding: 10px 20px;
    }
}
.total-order-check{
	margin-top: 20px;
}

</style>

