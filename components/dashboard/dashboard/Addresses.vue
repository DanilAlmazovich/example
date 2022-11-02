<template>

  <div class="recent-card delivery-block">
    <div class="recent-card-title">
      <h4>Адрес доставки</h4>
    </div>
    <div v-if="addresses && addresses.length === 0" class="recent-card-body wishlist-list">
      <div class="recent-card-cont">
        Пусто
      </div>
    </div>
    <div v-else class="recent-card-body" >
      <ul class="recent-card-cont" v-for="address in addresses" :key="address.id">
        <li>{{ address.country }}</li>
        <li>{{ address.state }}</li>
        <li>г.{{ address.city }}</li>
        <li>ул.{{ address.address }}, д.{{address.house}}, кв.{{address.apartment}}</li>
      </ul>
    </div>
  </div>

</template>

<script>
import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState({
      addresses: state => state.addresses.addresses
    })
  },
}
</script>

<style lang="scss" scoped>
.recent-card-cont {
  font-size: 14px;
  line-height: 14px;
  &__name {
    color: #ff741f;
    font-weight: bold;
  }
}

.address-card {
  &__add {
    cursor: pointer;
  }


  .recent-card-title {
    margin-bottom: 20px;
  }
}

.recent-card-body {
  height: 230px !important;
}
.recent-card-cont {
  margin: 0 20px;
  padding: 15px 20px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
}
.addresses-list {
  &__card {
    height: auto !important;
  }
}
</style>
