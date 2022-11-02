<template>
    <vue-final-modal v-model="showModal" overlay-class="black-blur-glass" :esc-to-close="true" :z-index-base="15000" classes="modal-container" content-class="modal-content">
        <div class="payment-methods">
            <div v-if="!paymentMethodLoading">
                <div class="head-block">
                    <h3>Способ оплаты</h3>
                    <div @click="showModal = false">
                        <hum-cross :cross="true" :dark="true"/>
                    </div>
                </div>
                <div class="payment-methods-list">
                    <payment-item v-for="(payment, index) in paymentMethod.data" :key="index" :model="selectedPayment.code" v-show="payment.status" :name="payment.name" :img="payment.img" :code="payment.code">
                        <input 
                            v-if="payment.status"
                            type="radio"
                            :value="payment"
                            :id="payment"
                            @change="setData"
                            v-model="selectedPayment"
                            name="paymentMethods"
                        >
                    </payment-item>
                    <payment-item v-if="!wallet && paymentMethod.wallet_system == 1" :model="selectedPayment.code" :name="azorWallet.name" :img="azorWallet.img" :code="azorWallet.code">
                        <input
                            type="radio"
                            :value="azorWallet"
                            :id="azorWallet"
                            @change="setData"
                            v-model="selectedPayment"
                            name="paymentMethods"
                        >
                    </payment-item>
                </div>

            </div>
            <div class="payment-wallet" v-if="wallet">
                <h3>Сумма пополнения (сом)</h3>
                <input type="number" v-model="amount">
                <button @click="topUpWallet" class="button">Пополнить</button>  
            </div>
        </div>
    </vue-final-modal>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import HumCross from '~/components/ui/HumCross.vue'
import PaymentItem from './PaymentItem.vue';
export default {
    name: 'PaymentMethodsModal',
    components: {
        HumCross,
        PaymentItem
    },
    props: {
        modal: Boolean,
        wallet: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return{
            showModal: false,
            selectedPayment: {
                code: null
            },
            paymentMethod: {
                data: {}, 
                wallet_system: null
            },
            paymentMethodLoading: true,
            amount: null,
            azorWallet: {
                code: 'waller',
                name: 'Azor Wallet',
                img: './images/icons/logo.svg'
            }
        }
    },
    computed: {
        ...mapState({
        user: state => state.auth.user
        }),
        ...mapGetters('locale', ['locale']),
    },
    methods: {
        async getPaymentMethods() {
            await this.$axios
                .get('/api/checkout/order/payment-methods')
                .then((response) => {
                    this.paymentMethod = response.data || null;
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.paymentMethodLoading = false;
                });
        },
        async topUpWallet(){
            const payload = {
                amount: this.amount,
                user_id: this.user.id,
                locale: this.locale,
                redirect_to: window.location.href
            };
            window.location =`https://admin.azor.kg/payment/recharge/${this.selectedPayment.code}?amount=${this.amount}&user_id=${this.user.id}&locale=${this.locale}&redirect_to=${payload.redirect_to}`
        },
        setData() {
            this.$emit('input', this.selectedPayment)
        }
    },
    watch: {
        modal: {
            handler() {
                this.modal ? this.showModal = true : this.showModal = false
            }
        },
        showModal: {
            handler() {
                this.showModal ? null : this.$emit('close')
            }
        },
        selectedPayment: {
            handler() {
                this.wallet ? null : this.showModal = false;
            }  
        }
    },
    mounted() {
        this.getPaymentMethods();
    }
}
</script>

<style lang="scss">
.payment-methods{
    max-width: 350px;
    width: calc(100vw - 40px);
    height: auto;
    label{
        margin-block: 0;
    }
    h3{
        font-size: 20px;
        color: #293845;
    }
    .payment-methods-list{
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 10px;
    }
    .payment-wallet{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
        button{
            height: 40px;
            background: #FF741F;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            color: #FFFFFF;
        }
        input{
            font-size: 16px;
            padding: 0 15px;
            height: 40px;
            border-radius: 8px;
            border: 1px solid #cecece;
        }
    }
}
</style>