<template>
  <div class="tab-content-body dashboard profile">
    <h3>Личный кабинет</h3>
    <div class="row">
      <div class=" col-sm-12 col-md-4 mb-2">
        <div class="tab-card">
          <p class="card-name">Баланс кошелька</p>
          <p class="card-price" v-if="user?.balance">{{ user.balance }} c</p>
        </div>
      </div>
      <div v-if="info" class="col-sm-12 col-md-4 mb-2">
        <div class="tab-card">
          <p class="card-name">Последнее пополнение</p>
          <p class="card-price">{{ info.last_recharge.amount }} c</p>
          <small v-if="info.last_recharge.date">{{ info.last_recharge.date }}</small>
        </div>
      </div>
      <div v-else class="col-sm-12 col-md-4 mb-2">
        <div class="tab-card">
          <p class="card-name">Последнее пополнение</p>
          <p class="card-name">
            <ButtonLoader/>
          </p>
        </div>
      </div>

      <div class=" col-sm-12 col-md-4 mb-2" @click="openModal">
        <div class="tab-card refill">
          <p class="card-name">Пополнить кошелек</p>
          <svg width="42" height="42" viewBox="0 0 42 42" stroke="#232F3E" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M21 1V41" stroke="#232F3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1 20.877H41" stroke="#232F3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="row">
      <div class=" col-sm-12 col-lg-4 mb-2">
        <div class="row">
          <div class="col-12">
            <div class="card-body tab-card card-block-2 refill">
              <h4 class="card-amount orange">{{ cart && cart.length > 0 ? cart.length : 0 }}</h4>
              <p class="card-info orange">Товары в вашей корзине</p>
            </div>
          </div>
          <div class="col-12">
            <div class="card-body tab-card card-block-2 refill">
              <h4 class="card-amount blue">{{ wishlist && wishlist.length > 0 ? wishlist.length : 0 }}</h4>
              <p class="card-info blue">Товары в вашем списке желаний</p>
            </div>
          </div>
          <div class="col-12">
            <div class="card-body tab-card card-block-2 refill">
              <h4 class="card-amount green">{{ info && info.total_order_products ? info.total_order_products : 0 }}</h4>
              <p class="card-info green">Товары, которые вы заказывали</p>
            </div>
          </div>
        </div>
      </div>
      <!-- TODO -->
      <div class=" col-sm-12 col-lg-4 mb-2">
        <LatestPurchasedProducts :loading="load" :info="info"/>
      </div>
      <div class=" col-sm-12 col-lg-4 mb-2">
        <Addresses/>
        <div
            @click.prevent="openDeliverInModal"
            class="tab-card refill address-card">
          <div class="add-icon">
            <svg width="22" height="22" viewBox="0 0 42 42" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M21 1V41" stroke="#232F3E" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"/>
              <path d="M1 20.877H41" stroke="#232F3E" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
          </div>
          <p class="">Добавить новый адрес доставки</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-4 mb-2">
        <div class="recent-banner-card">
          <img src="https://dummyimage.com/357x400/000/fff" alt="banner" style="max-width: 900px; width: 100%">
        </div>
      </div>
      <div class="col-md-12 col-lg-4 mb-2">
        <div v-if="loading" class="recent-card">
          <div class="recent-card-title">
            <h4>Список желаний</h4>
          </div>
          <div class="recent-cards">
            <ul class="recent-card-body">
              <li class="recent-card-body-li" v-for="product in 6">
                <div class="row">
                  <div class="col col-md-2 col-lg-4">
                    <div class="skel-img">
                      <div class="skeleton"></div>
                    </div>
                  </div>
                  <div class="col col-lg-6 recent-card-body-li-text">
                    <div class="skel-info"></div>
                    <div class="skel-info"></div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div v-else class="recent-card">
          <div class="recent-card-title">
            <h4>Список желаний</h4>
          </div>
          <div v-if="wishlist && wishlist.length === 0" class="recent-card-body wishlist-list">
            <div class="wishlist-list__empty">
              Пусто
            </div>
          </div>
          <div class="recent-cards">
            <ul v-if="wishlist && wishlist.length > 0" class="recent-card-body wishlist-list">
              <li class="recent-card-body-li" v-for="product in wishlist">
                <locale-link :to="`/product/${product.slug}`">
                  <div class="row">
                    <div class="col col-md-2 col-lg-4">
                      <img :src="product.thumbnail_img" alt="product">
                    </div>
                    <div class="col col-lg-6 recent-card-body-li-text ">
                      <span>{{ product.name.length > 40 ? product.name.substring(0, 40) + '...' : product.name }}</span>
                      <p>{{ product.price }} с</p>
                    </div>
                  </div>
                </locale-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-lg-4 mb-2">
        <div class="recent-card">
          <div class="recent-card-title">
            <h4>Недавно просмотренные</h4>
          </div>
          <div class="recent-card-body wishlist-list">
            <div class="wishlist-list__empty" v-if="!resent.length">
              Пусто
            </div>
            <ul v-else class="recent-card-body-li">
              <li class="recent-card-body-li" v-for="product in resent">
                <locale-link :to="`/product/${product.slug}`">
                  <div class="row">
                    <div class="col col-md-2 col-lg-4">
                      <img :src="product.thumbnail_img" alt="product">
                    </div>
                    <div class="col col-lg-6 recent-card-body-li-text ">
                      <span>{{ product.name.length > 30 ? product.name.substring(0, 30) + '...' : product.name }}</span>
                      <p>{{ product.price }} с</p>
                    </div>
                  </div>
                </locale-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import LatestPurchasedProducts from '@/components/dashboard/dashboard/LatestPurchasedProducts';
import Addresses from '@/components/dashboard/dashboard/Addresses';
import ButtonLoader from "~/components/ui/ButtonLoader";

export default {
  data() {
    return {
      info: null,
      load: true,
    }
  },
  components: {
    LatestPurchasedProducts,
    Addresses,
    ButtonLoader,

  },
  props: {
    loading: Boolean,
  },

  computed: {
    ...mapState({
      wishlist: state => state.wishlist.list,
      follows: state => state.wishlist.follows,
      user: state => state.auth.user,
      cart: state => state.basket.cart,
      resent: state => state["previous-products"].resent,
    })
  },
  mounted() {
    this.checkRecharge();
    this.fetchDashboard();
  },
  methods: {
    log(msg) {
    },
    openDeliverInModal: function () {
      this.$modal.show(
          () => import('~/components/modals/DeliveryAdress'),
          {},
          {width: '575', height: 'auto', adaptive: true}
      );
    },
    openModal: function () {
      this.$modal.show(
          () => import('~/components/modals/NewsletterModal'),
          {},
          {width: '700', height: 'auto', adaptive: true}
      );
    },
    async fetchDashboard() {
      try {
        const response = await this.$axios.$get('/api/user/dashboard');
        if (response) {
          this.info = response;
          this.load = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    checkRecharge() {
      const query = this.$router.currentRoute.query ?? {};
      if (!query.cart_payment) return;

      this.$notify({
        title: query.message ?? 'Успешно пополнено',
        type: query.cart_payment === 'failed' ? 'danger' : 'success'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wishlist-list {
  &__empty {
    padding: 0 20px;
  }
}
</style>
