<template>
    <locale-link
        class="cart-item"
        tag="div"
        :to="`/product/${item.slug}`"
        v-if="item"
    >
        <label class="cursor-pointer">
            <!-- <check-box class="cart-check-box" :checked="all"/> -->
            <!-- <input type="checkbox" v-model="all"> -->
            <div class="cart-item-info">
                <div class="cart-item-disc">
                    <img :src="item.thumbnail" :alt="item.name" />
                    <div class="cart-wrapper">
                        <h5>{{ item.name }}</h5>
                        <div class="cart-item-values">
                            <span class="cart-item-price">{{ item.price }} c</span>
                            <div class="cart-item-counter" @click.prevent>
                                <button
                                    @click.prevent="minusQty"
                                    class="counter-button"
                                    :disabled="qty <= item.min_qty"
                                >
                                    ‒
                                </button>
                                <input
                                    class="counter-input"
                                    type="number"
                                    v-model="qty"
                                    @input="editCount"
                                />
                                <button
                                    @click.prevent="plusQty"
                                    class="counter-button"
                                    :disabled="qty >= item.max_qty"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </label>
        <button
            class="cart-item-trash"
            @click.prevent="deleteBasket(item)"
            :disabled="deleteLoading"
        >
            <button-loader dark-mode v-if="deleteLoading" />
            <i v-else class="azor-basket"></i>
        </button>
    </locale-link>
</template>

<script>
import deleteBasket from '~/mixins/delete-basket';
import CheckBox from '~/components/ui/CheckBox';
import ButtonLoader from "~/components/ui/ButtonLoader";
export default {
    props: {
        item: {
            type: Object,
            default: null,
        },
        index: {
            type: Number,
        },
    },
    components: {
        CheckBox,
        ButtonLoader,
    },
    data() {
        return {
            all: false,
            deleteLoading: false,
            qty: 0,
            axiosSource: {},
        };
    },
    mounted() {
        if (this.item) {
            this.qty = this.item.qty;
        }
    },
    mixins: [deleteBasket],
    methods: {
        minusQty() {
            this.cancelAxios('count');
            this.cancelAxios('get');
            this.qty--;
            let count = this.qty;

            let payload = {
                params: {
                    cart_id: this.item.cart_id,
                    qty: count,
                    temp_user_id: +window.localStorage.getItem('tempUserId'),
                },
                cancelToken: this.cancelToken('count').token,
                index: this.index,
            };
            this.changeQuantity(payload);
        },
        plusQty() {
            this.cancelAxios('count');
            this.cancelAxios('get');
            this.qty++;
            let count = this.qty;

            let payload = {
                params: {
                    cart_id: this.item.cart_id,
                    qty: count,
                    temp_user_id: +window.localStorage.getItem('tempUserId'),
                },
                cancelToken: this.cancelToken('count').token,
                index: this.index,
            };
            this.changeQuantity(payload);
        },
        editCount() {
            if (this.qty < this.item.min_qty) {
                this.qty = this.item.min_qty;
            }
            if (this.qty > this.item.max_qty) {
                this.qty = this.item.max_qty;
            }
            this.cancelAxios('count');
            this.cancelAxios('get');
            let payload = {
                params: {
                    cart_id: this.item.cart_id,
                    qty: this.qty,
                },
                cancelToken: this.cancelToken('count').token,
                index: this.index,
            };
            this.changeQuantity(payload);
        },
        async changeQuantity(payload) {
            const { success } = await this.$store.dispatch(
                'basket/updateQuanty',
                payload
            );
            if (success) {
                this.$store.dispatch('basket/get', {
                    temp_user_id: +window.localStorage.getItem('tempUserId'),
                    cancelToken: this.cancelToken('get').token,
                });
            } else {
                console.log(success);
            }
        },
        cancelAxios(key) {
            if (this.axiosSource[key]) {
                this.axiosSource[key].cancel();
            }
        },
        cancelToken(key) {
            const CancelToken = this.$axios.CancelToken;
            this.$set(this.axiosSource, key, CancelToken.source());
            return this.axiosSource[key];
        },
    },
};
</script>

<style lang="scss">
.cart-item {
    display: grid;
    overflow: hidden;
    grid-template-columns: calc(100% - 45px) 25px;
    gap: 20px;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    label {
        display: flex;
        gap: 11px;
        align-items: center;
        height: 86px;
        width: 100%;
    }
    .azor-basket {
        text-align: center;
        margin: 0;
        font-size: 20px;
        color: rgb(202, 0, 0);
        &::before {
            margin: 0;
        }
    }
    .cart-item-trash {
        padding: 0;
    }
}

/*.cart-item input{*/
/*display: none;*/
/*}*/
.cart-item-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: calc(100% - 2px);
    padding: 8px 8px 8px 0;
}
.cart-item-disc {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    .cart-wrapper {
        width: 100%;
    }
    h5 {
        height: 34px;
        overflow: hidden;
    }
    .cart-item-values {
        display: grid;
        grid-template-columns: 90px 70px;
        align-items: center;
        gap: 10px;
        .cart-item-price {
            font-weight: bold;
            white-space: nowrap;
        }
        .cart-item-counter {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #e8e8e8;
            height: 27px;
            border-radius: 5px;
            width: 70px;
            .counter-button {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                width: 35px;
                padding: 0;
                height: 25px;
                text-align: center;
                &:disabled {
                    cursor: not-allowed;
                }
            }
            .counter-input {
                border: none;
                outline: none;
                text-align: center;
                font-size: 14px;
                height: 25px;
                width: 100%;
                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            }
        }
    }
}
.cart-item-disc img {
    width: 70px;
    height: 70px;
    border-radius: 4px;
}
/*.cart-item-disc div{*/
/*display: flex;*/
/*flex-direction: column;*/
/*}*/
.cart-item-disc h5 {
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 6px;
}
.cart-item-disc b {
    font-size: 16px;
    font-weight: 700;
}
</style>