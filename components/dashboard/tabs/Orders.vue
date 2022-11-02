<template>
  <div v-if="load">
    <div class="orders__list">
      <table class="table">
        <thead class="thead">
        <tr>
          <th v-for="key in gridColumns" >
            {{key}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in 10" style="cursor: pointer; margin: 10px 0">
          <td v-for="i in 5">
            <p class="skel" style="height: 25px;"></p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
  <div v-else class="orders">
    <div v-if="orders && orders.length == 0" class="orders__list__empty">
      <no-product
          button="К товарам"
          head="Нет товаров в списке"
          description="Вы еще не совершили ни одной покупки"
          to="/categories"
      />
    </div>
    <div v-if="orders && orders.length > 0" class="orders__list">
      <table class="table">
        <thead class="thead">
        <tr>
          <th class="table-td-th" v-for="key in gridColumns" >
            {{key}}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="order in orders" @click="viewDetails(order.code)" style="cursor: pointer">
          <td class="table-td-th" data-label="Код заказа">
            {{ order.code }}
          </td>
          <td class="table-td-th" data-label="Дата">
            {{ order.date }}
          </td>
          <td class="table-td-th" data-label="Количество">
<!--            {{ order.orders[0].products.data.length }}-->
          </td>
          <td class="table-td-th" data-label="Сумма">
            {{ order.grand_total }} с
          </td>
          <td class="table-td-th" data-label="Статус">
<!--            {{ getStatus(order.orders[0].payment_status) }}-->
          </td>
        </tr>
        </tbody>
      </table>
      <!-- <div class="mt-5">
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item ">
              <button class="page-link" :disabled="pageNumber === 0" @click="prevPage">
                <
              </button>
            </li>
            <li class="page-item " v-for="p in data" :id="p">
              <button class="page-link"  :disabled="pageNumber === p " v-on:click="setPage">
                {{p}}
              </button>
            </li>
            <li class="page-item">
              <button class="page-link" :disabled="pageNumber >= pageCount -1" @click="nextPage">
                >
              </button>
            </li>
          </ul>
        </nav>
      </div> -->
    </div>
  </div>
</template>

<script>
import { paymentStatusMap } from '@/constants/order';
import NoProduct from '~/components/dashboard/NoProduct.vue';
export default {
  components: { NoProduct },
  data () {
    return {
      load: true,
      orders: null,
      links: null,
      gridColumns: ['Код заказа:', 'Дата:', 'Количество:', 'Сумма:', 'Статус:'],
    }
  },
  mounted () {
    this.fetchOrders();
  },
  methods: {
    viewDetails (code) {
      this.$router.push(this.localePath(`/order/${code}`))
    },
    async fetchOrders () {
      try {
        const { success, data, links } = await this.$axios.$get('/api/user/orders');
        if (success) {
          this.orders = data;
          this.links = links;
          this.load = false;
        }
      } catch (error) {
        console.log(error)
      }
    },
    getStatus (status) {
      return paymentStatusMap[status];
    }
  }
}
</script>
<style lang="scss" scoped>
.skel {
  position: relative;
  overflow: hidden;
  background: #f4f4f4;
  &:before {
    content: '';
    height: 20px;
    display: block;
    width: 100%;
    background-repeat: no-repeat;
    background-image: linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0), linear-gradient(#f4f4f4 100%, transparent 0);
  }
  &:after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 80%);
    animation: skeletonloading 1.5s infinite;
  }
}
</style>