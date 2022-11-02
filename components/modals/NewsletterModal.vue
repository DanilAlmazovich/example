<template>
  <div class="modal-body m-3">
    <button type="button" class="close" @click="$emit('close')">
			<span aria-hidden="true">
				<i class="icon-close"></i>
			</span>
    </button>
    <div class="form-box address-form delivery-modal">
      <h3>Пополнение кошелька</h3>
      <div class="form-tab">
        <div v-if="error" class="form-api-error">
          {{ error }}
        </div>
        <form @submit.prevent="sub">
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label class="login_label__legend">Сумма пополнения</label>
                <input
                    type="number"
                    v-model="order.amount"
                    class="form-control"
                    required
                />
              </div>
            </div>
            <div class="row">
              <h2 class="col-12">Способ оплаты</h2>
              <label
                  v-for="(payment, index) in paymentMethod"
                  :key="index"
                  v-show="payment.status"
                  class="order-payment-label col-4"
                  :class="{
                            'order-payment-label-active':
                                payment.code === order.paymentMethod,
                        }"
              >
                <input
                    v-if="payment.status"
                    style="display: none"
                    type="radio"
                    :value="payment.code"
                    :id="payment.code"
                    v-model="order.paymentMethod"
                    name="paymentMethods"
                />
                <div>
                  <img v-lazy="payment.img" :alt="payment.name" />
                </div>
                <span>{{ payment.name }}</span>
              </label>
            </div>
          </div>
          <div class="delivery_footer">
            <button type="submit" class="deliveryBtn">
              Пополнить
            </button>
            <button type="button" class="deliveryBtn2" @click="$emit('close')">
              <span>Отмена</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapMutations, mapState} from 'vuex';

export default {
  data: function () {
    return {
      error: null,
      checkState: false,
      paymentMethod: null,
      order: {
        amount: null,
        paymentMethod: null,
      },
    };
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),
    ...mapGetters('locale', ['locale']),
  },
  mounted() {
    this.checkRecharge()
    this.getPaymentMethods()
  },
  watch: {
    $route: function () {
      this.$emit('close');
    }
  },
  methods: {
    async getPaymentMethods() {
      await this.$axios
          .get('/api/checkout/order/payment-methods')
          .then((response) => {
            this.paymentMethod = response.data.data || null;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            this.paymentMethodLoading = false;
          });
    },
    async sub(){
      const payload = {
        amount: this.order.amount,
        user_id: this.user.id,
        locale: this.locale,
        redirect_to: window.location.href
      };
      console.log(payload, this.order.paymentMethod)
      window.location =`https://admin.azor.kg/payment/recharge/${this.order.paymentMethod}?amount=${this.order.amount}&user_id=${this.user.id}&locale=${this.locale}&redirect_to=${payload.redirect_to}`
    },
    totalCheck() {
      return Number(this.order.amount);
    },
    changeCheck: function () {
      this.checkState = !this.checkState;
    },
    closeModal: function () {
      if (this.checkState) {
        this.hideNewsletter();
      }

      this.$emit('close');
    },
    checkRecharge(){
      const query = this.$router.currentRoute.query??{};
      if (!query.cart_payment) return;
      this.$notify({title: 'message', type: 'success'});
      this.$notify({ title: query.message ?? 'Успешно пополнено', type: query.cart_payment === 'failed'? 'danger':'success' })
    }
  }
};
</script>

<style lang="scss" scoped>
.order-payment-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #ebebeb;
    height: 80px;
    width: 100%;
    img {
      display: block;
      max-width: 70%;
      max-height: 90%;
    }
  }
  span {
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    text-align: center;
  }
}
.order-payment-label-active {
  div {
    border: 1px solid #ff741f;
  }
  span {
    color: #ff741f;
  }
}
</style>