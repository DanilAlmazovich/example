<template>
    <div class="order-page container">
        <div class="order-checkout">
            <div class="default-bg">
                <div class="head-block">
                    <h2>Способ доставки</h2>
                    <button class="add" @click="addressModal = true">{{selectedAddress ? 'Изменить' : 'Выбрать'}}</button>
                </div>
                <div class="order-select-address" v-if="selectedAddress">
                    <div>
                        <span>Доставка до:</span>
                        <span>{{selectedAddress.address.address}}</span>
                    </div>
                    <div>
                        <span>Стоимость доставки:</span>
                        <span>{{totalDelivery.price}}</span>
                    </div>
                </div>
                <choose-address v-model="selectedAddress" :modal="addressModal" @close="addressModal = false"/>
            </div>
            <div class="default-bg">
                <div class="head-block">
                    <h2>Способ оплаты</h2>
                    <button class="add" @click="paymentModal = true">{{selectedPayment ? 'Изменить' : 'Выбрать'}}</button>
                </div>
                <div class="order-select-payment" v-if="selectedPayment" @click="paymentModal = true">
                    <payment-item :name="selectedPayment.name" :img="selectedPayment.img" :code="selectedPayment.code"/>
                </div>
                <payment-methods v-model="selectedPayment" :modal="paymentModal" @close="paymentModal = false"/>
            </div>
            <div class="default-bg">
                <h2 >Товары в корзине</h2>
                <cart-items></cart-items>
            </div>
        </div>
        <div class="total-layer">
            <div class="default-bg total">
                <div class="head-block"><h2>Итого</h2> <span>{{totalSum}} с</span></div>
                <div class="total-list">
                    <div class="total-table">
                        <span>Товары {{qtyTotal}} шт</span>
                        <span>{{priceTotal}} с</span>
                    </div>
                    <div class="total-table">
                        <span>Скидка</span>
                        <span>0 с</span>
                    </div>
                    <div class="total-table">
                        <span>Стоимость доставки</span>
                        <span>{{totalDelivery.price}}</span>
                    </div>
                    <div class="total-delivery">
                        <div class="total-bold"><span>Доставка:</span><span @click="selectedAddress ? null : addressModal = true">{{totalDelivery.type}}</span></div>
                        <span></span>
                    </div>
                    <div class="total-bold"><span>Оплата:</span><span @click="selectedPayment ? null : paymentModal = true">{{totalPayment}}</span></div>
                    <button @click.prevent="submit" :class="{'order-button-active': orderValidation}">Оплатить заказ</button>
                    <div class="total-law">Нажимая на кнопку "Оплатить заказ" я соглашаюсь с <locale-link to="/law/conditions">условиями</locale-link> пользования маркетплейса Azor </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import CartItems from '~/components/headers/cartList/CartItems.vue';
import LocaleLink from '~/components/locale-link.vue';
import ChooseAddress from '~/components/modals/address';
import PaymentMethods from '~/components/modals/payment';
import PaymentItem from '~/components/modals/payment/PaymentItem.vue';
export default {
    name: 'checkout',
    head() {
        return {
            title: "Оформление заказа",
        }
    },
    components: { ChooseAddress, PaymentMethods, PaymentItem, LocaleLink, CartItems },
    data() {
        return {
            addressModal: false,
            paymentModal: false,
            selectedPayment: null,
            selectedAddress: null,
            deliveryCost: null,
            order: {
                addressId: null,
                paymentMethod: null,
                deliveryType: null,
            },
        }
    },
    computed: {
        ...mapGetters('basket', ['priceTotal', 'qtyTotal']),
        ...mapState({
            basket: (state) => state.basket,
        }),

        totalSum() {
            return this.priceTotal + this.deliveryCost ?? null;
        },
        totalDelivery() {
            return {
                type: this.selectedAddress ? this.selectedAddress.deliveryType == 'pickup' ? 'самовывоз' : 'курьером' : 'Выбрать',
                price: this.selectedAddress ? this.selectedAddress.address.price == 0 ? 'Бесплатно' : `${this.selectedAddress.address.price} с` : 'Бесплатно'
            }
        },
        totalPayment() {
            return this.selectedPayment ? this.selectedPayment.name : 'Выбрать' 
        },
        orderValidation() {
            return this.order.addressId && this.order.paymentMethod && this.order.deliveryType && this.qtyTotal ? true : false
        },
    },
    methods: {
        async submit() {
            this.$store.commit('setLoading', true);
            if (this.orderValidation) {
                const cart_item_ids = [];
                this.basket.cart.map((item) => {
                    cart_item_ids.push(item.cart_id);
                });
                const payload = {
                    cart_item_ids,
                    shipping_address_id: this.order.addressId,
                    delivery_type: this.order.deliveryType,
                    payment_type: 'cart_payment',
                };
                if (this.order.paymentMethod === 'cash_on_delivery') {
                    payload.payment_type = 'cash_on_delivery';
                } else if (this.order.paymentMethod === 'waller') {
                    payload.payment_type = 'wallet_payment';
                } else {
                    payload.gateway = this.order.paymentMethod;
                }

                try {
                    const { success, go_to_payment, url, order_code, message } =
                        await this.$axios.$post(
                            '/api/checkout/order/store',
                            payload
                        );
                    if (success) {
                        await this.$store.dispatch('basket/get', {
                            temp_user_id:
                                +window.localStorage.getItem('tempUserId'),
                        });
                        if (go_to_payment) {
                            window.location = `${url}?order_code=${order_code}&redirect_to=${window.location.origin}/order/${order_code}`;
                            this.orderFalseLoading();
                        } else if (!go_to_payment) {
                            this.$router.push(this.localePath(`/order/${order_code}`));
                            this.orderFalseLoading();
                        }
                    } else if (!success && message) {
                        alert(message);
                        this.$store.commit('setLoading', false);
                    }
                } catch (error) {
                    await this.$store.dispatch('basket/get', {
                        temp_user_id:
                            +window.localStorage.getItem('tempUserId'),
                    });
                    this.$store.commit('setLoading', false);
                    const { message } = error.response.data;
                    alert(error);
                }
            }
        },
        orderFalseLoading() {
            this.componentKey++;
            setTimeout(() => {
                this.$store.commit('setLoading', false);
            }, 2000);
        },
    },
    watch: {
        selectedAddress: {
            handler() {
                this.order.addressId = this.selectedAddress.address.id;
                this.order.deliveryType = this.selectedAddress.deliveryType;
                this.deliveryCost =  Number(this.selectedAddress.address.price) ?? null;
            }
        },
        selectedPayment: {
            handler() {
                this.order.paymentMethod = this.selectedPayment.code;
            }
        },
    },
    mounted() {
        setTimeout(() => {
           this.$store.commit('setLoading', false)
        }, 2000)
    }
};
</script>

<style lang="scss">
.order-page {
    margin-top: 32px;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: calc(100% - 387px) 367px;
    gap: 20px;
    h2 {
        font-weight: 700;
        font-size: 24px;
        color: #293845;
        margin: 0;
    }
    .cart-items{
        padding: 0;
        margin-top: 10px;
    }
    label{
        margin: 0;
    }
    .order-checkout {
        display: flex;
        flex-direction: column;
        gap: 20px;
        .head-block {
            .add {
                font-weight: 700;
                font-size: 18px;
                color: #ff741f;
            }
        }
    }
    .order-select-address{
        margin-top: 20px;
        div{
            display: grid;
            grid-template-columns: 200px auto;
            font-size: 16px;
            margin-top: 15px;
            span{
                line-height: 15px;
                &:first-child{
                    color: #777777;
                }
                &:last-child{
                    color: #293845;
                }
            }
        }
    }
    .order-select-payment{
        width: 100%;
        max-width: 330px;
        margin-top: 20px;
    }


    .total-layer{
        position: relative;
    }
    .total{
        position: sticky;
        top: 70px;
        width: 100%;
        height: auto;
        .head-block{
            font-weight: 700;
            font-size: 24px;
            color: #293845;
            margin: 0;
        }
        .total-list{
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 20px;
            .total-table{
                display: flex;
                justify-content: space-between;
                font-size: 16px;
                color: #656D77;
            }
            .total-bold{
                display: flex;
                align-items: center;
                gap: 10px;
                span{
                    font-weight: 600;
                    font-size: 16px;
                    color: #293845;
                    &:last-child{
                        color: #FF741F;
                    }
                }
            }
            button{
                width: 100%;
                height: 45px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                color: white;
                background-color: #999999;

            }
            .order-button-active{
                background-color: #FF741F;
            }
            .total-law{
                font-weight: 400;
                font-size: 14px;
                line-height: 20px;
                color: #656D77;
                a{
                    color: #FF741F;
                }
            }
        }
    }
}
@media (max-width: 991px) {
    .order-page{
        display: flex;
        flex-direction: column;
        h2{
            font-size: 18px;
        }
        .order-select-address{
            margin-top: 20px;
            div{
                display: flex;
                flex-direction: column;
                span{
                    &:last-child{
                        margin-top: 5px;
                    }
                }
            }
        }
        .order-checkout {
            .head-block {
                .add {
                    font-size: 18px;
                }
            }
        }
        .order-page {
            .total-list{
                .total-bold {
                    font-size: 16px;
                    
                }
            }
        }
    }
}
</style>