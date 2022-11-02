<template>
  <div class="addresses">
    <div class="addresses__title">
      <div class="addresses__title__text address-h4">Адреса</div>
      <!--			<button type="button" class="btn address-btn " @click="addNewAddress">Добавить новый</button>-->
    </div>
    <div class="row">
      <div v-for="address in addresses" :key="address.id" v-if="addresses && addresses.length > 0" class="col-12 col-md-6 addresses__list">
        <div class="address__wrapper">
          <div class="address ">
            <p class="fieldset">{{ address.name }}</p>
            <div>{{ address.country }}, г.{{ address.state }}</div>
            <div>Почтовый Код {{ address.postal_code }}</div>
            <div>{{ address.address }}</div>
            <button title="Удалить" class="fieldset2 btn-delete " @click="deleteAddress(address.id)">
              <img class="ic-addressCard" src="~/static/images/icons/delete-ic.svg" alt="ic-delete">
            </button>
            <button title="Изменить" class="fieldset2 btn-edit" @click="showAddressModal(address)">
              <img class="ic-addressCard" src="~/static/images/icons/edit-ic.svg" alt="ic-edit">
            </button>
          </div>
        </div>
      </div>
      <div class="address__wrapper col-12 col-md-6">
        <div class="tab-card refill address" @click="addNewAddress">
          <p class="card-name">Добавить новый адресс</p>
          <svg width="42" height="42" viewBox="0 0 42 42" stroke="#232F3E" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M21 1V41" stroke="#232F3E" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"></path>
            <path d="M1 20.877H41" stroke="#232F3E" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"></path>
          </svg>
        </div>
      </div>
    </div>
    <div v-if="addresses && addresses.length === 0" class=" addresses__list">
      У вас нет сохранненых адресов
    </div>
  </div>
</template>

<script>
import  {mapState} from 'vuex';
import deleteIc from '~/static/images/icons/delete-ic.svg'

export default {
  components: {
    deleteIc,
  },
  computed: {
    ...mapState({
      addresses: state => state.addresses.addresses
    })
  },
  methods: {
    addNewAddress() {
      this.showAddressModal();
    },
    showAddressModal(data) {
      let address;
      if (data) {
        address = {
          address: data.address,
          city: data.city_id,
          country: data.country_id,
          id: data.id,
          name: data.name,
          house: data.house,
          apartment: data.apartment,
          floor: data.floor,
          entrance: data.entrance,
          phone: data.phone,
          postal_code: data.postal_code,
          state: data.state_id
        }
      }
      this.$modal.show(
          () => import('~/components/modals/DeliveryAdress'),
          {address},
          {width: '575', height: 'auto', adaptive: true}
      );
    },
    deleteAddress(id) {
      this.$store.dispatch('addresses/deleteAddress', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.addresses {
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__text {
      font-weight: 400;
      font-size: 20px;
      line-height: 29px;
      color: #131921;
    }
  }
}
</style>
