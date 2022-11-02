<template>
  <main class="main">
    <div class="dashboard">
      <div class="container">
        <div class="row">
          <Sidebar @change="getPhoto"/>
          <div class="col">
            <div class="tab-content">
              <div class="tab-pane custom-tab" v-if="!$route.params.page" id="tab1">
                <Dashboard/>
              </div>
              <div class="tab-pane custom-tab" v-if="'purchase-history' === $route.params.page" id="tab2">
                <PurchaseHistory/>
              </div>
              <div class="tab-pane custom-tab" v-if="'wishlist' === $route.params.page" id="tab3">
                <Wishlist/>
              </div>
              <div class="tab-pane custom-tab" v-if="'orders' === $route.params.page" id="tab4">
                <Orders/>
              </div>
              <div class="tab-pane custom-tab" v-if="'wallet' === $route.params.page" id="tab5">
                <WalletHistory/>
              </div>
              <div class="tab-pane custom-tab" v-if="'profile-settings' === $route.params.page" id="tab6">
                <ManageProfile :photo="photo"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import WalletHistory from '@/components/dashboard/tabs/WalletHistory';
import ManageProfile from '@/components/dashboard/tabs/ManageProfile';
import Dashboard from '@/components/dashboard/tabs/Dashboard';
import PurchaseHistory from '@/components/dashboard/tabs/PurchaseHistory';
import Wishlist from '@/components/dashboard/tabs/Wishlist';
import Orders from '@/components/dashboard/tabs/Orders';

import Sidebar from '@/components/dashboard/Sidebar';

export default {
  components: {
    WalletHistory,
    Wishlist,
    PurchaseHistory,
    Dashboard,
    ManageProfile,
    Sidebar,
    Orders,
  },
  name: 'tabs-dashboard',
  data() {
    return {
      shouTabs: {},
      tabsData: [
        {
          id: 'tab1',
          title: 'Личный кабинет',
          icon: '@/pages/static/images/dasboard-icons/dashboard-icon',
        },
        {
          id: 'tab2',
          title: 'Истроия покупок',
          icon: '@/pages/static/images/dasboard-icons/histori',
        },
        {
          id: 'tab3',
          title: 'Список ',
          icon: '@/pages/static/images/dasboard-icons/iconoir_heart',
        },
        {
          id: 'tab4',
          title: 'Мои заказы',
          icon: '@/pages/static/images/dasboard-icons/buy-icon',
        },
        {
          id: 'tab5',
          title: 'Мой кошелек',
          icon: '@/pages/static/images/dasboard-icons/money-icon',
        },
        {
          id: 'tab6',
          title: 'Настройки профиля',
          icon: '@/pages/static/images/dasboard-icons/interface_setting_cog_work_loading_cog_gear_settings_machine',
        }
      ],
      photo: null,
    };
  },
  mounted() {
    this.$store.dispatch('addresses/getCountries');
    this.$store.dispatch('addresses/getUserAddresses');
    this.$store.dispatch('basket/get', {temp_user_id: +window.localStorage.getItem('tempUserId')});
    this.$store.dispatch('wishlist/get');
    this.$store.dispatch('wishlist/getFollows');
  },
  methods: {
    getPhoto(value) {
      this.photo = value
    },
    toOrder: function () {
      document
          .querySelector('.nav-dashboard .nav-item:nth-child(2) a ')
          .click();
    },
    toAddress: function () {
      document
          .querySelector('.nav-dashboard .nav-item:nth-child(4) a')
          .click();
    },
    toAccount: function () {
      document
          .querySelector('.nav-dashboard .nav-item:nth-child(5) a')
          .click();
    }
  }
};
</script>


<style lang="scss" scoped>
.tab-content {
  width: 100%;

  .tab-pane {
    width: 100%;

    &.custom-tab {
      display: block;
    }
  }
}
</style>
