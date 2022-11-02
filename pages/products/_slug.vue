<template>
  <div class="container">
    <breadcrumbs v-if="breadcrumbs && breadcrumbs?.length" :category="breadcrumbs" :title="title"/>
    <div class="product-list-layer" v-if="products">
      <div class="product-list">
        <aside class="product-list-aside" :class="{ 'mobile-filters-active': productsFilters }"
               :is-sidebar="isSidebar">
          <shop-sidebar-three/>
        </aside>

        <div class="skeleton-body" :class="{ loaded: loaded }">
          <div class="product-list-header">
            <div class="product-list-title">
              <h2 v-text="title"/>
              <div v-if="products">
                Найдено
                <span>{{
                    products.total ? products.total : 0
                  }}</span>
                товаров
              </div>
            </div>
            <div class="product-list-filter-bar">
              <product-filter/>
              <button class="azor-setting_vert" @click="toggleProductsFilters">
                Фильтры
              </button>
            </div>
          </div>
          <shop-products-list :products="products.data" :productLoaded="productLoaded"/>
        </div>
      </div>
      <div class="product-list-paginator" v-if="products.last_page">
        <pagination :per-page="1" :total="products.last_page"/>
      </div>
    </div>
  </div>
</template>
<script>
import ShopSidebarThree from '~/components/products/ShopSidebarThree';
import scrollTop from '~/mixins/scroll-top';
import Pagination from '~/components/products/Pagination';
import ProductFilter from '~/components/products/ProductFilter';
import ShopProductsList from '~/components/main/ShopProductsList';
import {fetchProducts} from '@/utilities/ssr/products';
import {mapActions, mapState} from 'vuex';
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue';

export default {
  name: 'ProductsList',
  head() {
    return {
      title: 'AZOR' + (this.title ? ' - ' + this.title : ' - Все товары'),
    };
  },
  async asyncData({$axios, route}) {
    return await fetchProducts($axios, {
      ...{sortfield: 'num_of_sale', sortorder: 'desc'},
      ...route.query,
    });
  },

  components: {
    ShopProductsList,
    ShopSidebarThree,
    Pagination,
    ProductFilter,
    Breadcrumbs
  },

  data() {
    return {
      showFilters: false,
      products: {
        last_page: null,
      },
      error: null,
      fetched: null,
      type: 'list',
      orderBy: 'default',
      isSidebar: true,
      loaded: false,
      token: false,
      productLoaded: false,
      context: {
        category: null,
        brand: null,
        product: null,
      },
      breadcrumbs: null
    };
  },
  mounted() {
    this.createContext();
    this.getProducts();
    if (this.context.category) {
      this.getLinks()
    } else {
      this.breadcrumbs = []
    }
  },
  computed: {
    ...mapState('elements', ['productsFilters']),
    title() {
      return this.context.product
          ? `Поиск по запросу: "${this.context.product}"`
          : this.context.category
              ? `${this.context.category}`.split(':')[1] ??
              `${this.context.category}`.split(':')[0]
              : this.context.brand
                  ? `${this.context.brand}`.split(':')[1] ??
                  `${this.context.brand}`.split(':')[0]
                  : '';
    },
  },
  mixins: [scrollTop],
  methods: {
    ...mapActions('elements', ['toggleProductsFilters']),
    async getProducts() {
      this.cancelAxios();
      this.productLoaded = false
      const data = await fetchProducts(this.$axios, this.$route.query, {
        cancelToken: this.cancelToken().token,
      });
      if (data.canceled) {
        return;
      }
      this.products = data.products ?? null;
      this.products ? this.productLoaded = true : this.productLoaded = false

    },
    cancelAxios() {
      if (this.token) {
        this.token.cancel();
      }
    },
    cancelToken() {
      const CancelToken = this.$axios.CancelToken;
      this.token = CancelToken.source();

      return this.token;
    },

    createContext() {
      this.context.category =
          this.$route.query['category-context'] ?? null;
      this.context.brand = this.$route.query['brand-context'] ?? null;
      this.context.product = this.$route.query['product'] ?? null;
    },
    async getLinks() {
      if (this.context.category) {
        this.breadcrumbs = null
        await this.$axios
            .get(`/api/breadcrumb/category/${this.context.category.split(':')[0]}`)
            .then((response) => {
              if (response.data.data.length > 1) {
                this.breadcrumbs = response.data.data.filter((item, i) => i !== response.data.data.length - 1)
              } else {
                this.breadcrumbs = response.data.data
              }
            })
            .catch((error) => {
              console.log(error);
            })
      }
    },
  },
  watch: {
    '$route.query': {
      deep: true,
      handler() {
        this.getProducts();
        this.createContext();
        this.scrollTop();
        this.getLinks();
      },
    },
  },
};
</script>
