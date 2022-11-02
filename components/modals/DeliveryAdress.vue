<template>
  <div class="modal-body m-3">
    <button type="button" class="close" @click="$emit('close')">
			<span aria-hidden="true">
				<i class="icon-close"></i>
			</span>
    </button>
    <div class="form-box address-form delivery-modal">
      <h3>Добавление нового адреса доставки</h3>
      <div class="form-tab">
        <div v-if="error" class="form-api-error">
          {{ error }}
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <div class="col-12">
              <div class="form-group">
                <label class="login_label__legend">Название</label>
                <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    required
                />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="login_label__legend">Страна</label>
                <select
                    class="bg-transparent form-control"
                    v-model="form.country"
                    @change="changeCountry"
                    required
                >
                  <option :value="null">Выберите страну</option>
                  <option v-for="country in countries" :key="country.id" :value="country.id">
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="login_label__legend">Область</label>
                <select
                    class="bg-transparent form-control"
                    v-model="form.state"
                    @change="changeState"
                    required
                >
                  <option :value="null">Выберите область</option>
                  <option v-for="state in states" :key="state.id" :value="state.id">
                    {{ state.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="login_label__legend">Город</label>
                <select
                    class="bg-transparent form-control"
                    v-model="form.city"
                    required
                >
                  <option :value="null">Выберите город</option>
                  <option v-for="city in cities" :key="city.id" :value="city.id">
                    {{ city.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="login_label__legend">Почтовый код</label>
                <input
                    v-model="form.postal_code"
                    type="text"
                    class="form-control"
                    required
                />
              </div>
            </div>
            <div class="col-12">
              <div class="form-group">
                <label class="login_label__legend">Улица</label>
                <input
                    v-model="form.address"
                    type="text"
                    class="form-control"
                    required
                />
              </div>
            </div>
          </div>
          <!--<div class="custom-checkbox">
            <input
              v-model="form.default_billing"
              type="checkbox"
              name="billing_address"
              id="billing_address"
            />
            <label class="custom-control-label" for="billing_address">Основной адрес</label>
          </div>
          <div class="custom-checkbox">
            <input
              v-model="form.default_shipping"
              type="checkbox"
              name="default_shipping"
              id="default_shipping"
            />
            <label class="custom-control-label" for="default_shipping">Адрес доставки</label>
          </div>-->

          <div class="delivery_footer">
            <button type="submit" class="deliveryBtn">
              <span v-if="!loading">{{ address ? 'Обновить' : 'Создать' }}</span>
              <button-loader v-else/>
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
import { mapState } from 'vuex';
import ButtonLoader from "~/components/ui/ButtonLoader";

export default {
  props: {
    address: {
      type: Object,
      default: () => null
    }
  },
  components: {
      ButtonLoader
  },
  data() {
    return {
      loading: false,
      error: null,
      form: {
        name: null,
        country: null,
        city: null,
        state: null,
        address: null ,
        postal_code: null,
        // default_billing: false,
        // default_shipping: false,
        phone: null
      }
    }
  },
  mounted() {
    if (this.address) {
      this.form = stripAddress(this.address);
    }
    this.$store.dispatch('addresses/getCountries');
  },
  computed: {
    ...mapState({
      countries: state => state.addresses.countries,
      states: state => state.addresses.states,
      cities: state => state.addresses.cities,
    })
  },
  methods: {
    changeCountry(e) {
      this.$store.dispatch('addresses/getStates', e.target.value);
    },
    changeState(e) {
      this.$store.dispatch('addresses/getCities', e.target.value);
    },
    async handleSubmit() {
      this.loading = true
      const payload = {
        ...this.form
      }
      // payload.default_billing = payload.default_billing ? 1 : 0;
      // payload.default_shipping = payload.default_shipping ? 1 : 0;
      const crudType = this.address ? 'update' : 'create';
      try {
        const {data, success} = await this.$axios.$post(`/api/user/address/${crudType}`, payload)
        if (success) {
          this.$store.dispatch('addresses/getUserAddresses');
          this.$emit('close')
          this.loading = false
        } else {
          this.error = data.message;
          this.loading = false

        }
      } catch (error) {
        const {message} = error.response.data;
        this.error = message;
        this.loading = false
      }
    }
  }
};

const stripAddress = (address) => {
  // const default_billing = address.default_billing == 1;
  // const default_shipping = address.default_shipping == 1;
  return {
    id: address.id,
    name: address.name,
    country: address.country,
    city: address.city,
    state: address.state,
    address: address.address,
    postal_code: address.postal_code,
    phone: address.phone,
    house: address.house,
    apartment: address.apartment,
    floor: address.floor,
    entrance: address.entrance,

    // default_billing,
    // default_shipping
  }
}

</script>

<style scoped lang="scss">
.address-form {
  .tab-content {
    width: 100%;
  }
}
</style>