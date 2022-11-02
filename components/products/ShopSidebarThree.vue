<template>
  <div class="sidebar-filters">
    <div class="mobile-category-head">
      <b>Фильтры</b>
      <div @click="toggleProductsFilters">
        <hum-cross :dark="true" :cross="true"/>
      </div>
    </div>
    <div class="sidebar-filter-blocks">
      <div class="sidebar-filter-block">
        <h3>Категории</h3>
        <div class="sidebar-filters-input">
          <input placeholder="Название категории" v-model="search.categories" @input="searchCategories"
                 @submit.prevent="searchCategories"/>
          <div class="LoadingRings" v-if="loadings.categories"/>
        </div>
        <div class="wrap-badge" v-if="values.categories.length">
          <button v-for="(category, index) in values.categories" :key="category.slug"
                  @click.prevent="deleteCategory(index)">{{ category.name }}
          </button>
        </div>
        <ul @scroll="(e) => scroll(e, 'categories', 'searchData', 'categories', false)" class="scrollbar">
          <template v-if="categories">
            <li v-for="category in categories" :key="category.slug">
              <button @click.prevent="selectCategory(category)">{{ category.name }}</button>
            </li>
          </template>
          <li v-else-if="!loadings.categories">
            <span>Нет данных</span>
          </li>
          <li v-else-if="!categories.length">
            <span>Загрузка</span>
          </li>
        </ul>
      </div>


      <div class="sidebar-filter-block">
        <h3>Бренды</h3>
        <div class="sidebar-filters-input">
          <input placeholder="Название бренда" v-model="search.brands" @input="searchBrands"
                 @submit.prevent="searchBrands"/>
          <div class="LoadingRings" v-if="loadings.brands"/>
        </div>

        <div class="wrap-badge" v-if="values.brands.length">
          <button v-for="(brand, index) in values.brands" :key="brand.id" @click.prevent="deleteBrand(index)">
            {{ brand.name }}
          </button>
        </div>
        <ul @scroll="(e) => scroll(e, 'brands', 'searchData', 'brands', false)" class="scrollbar">
          <template v-if="brands">
            <li v-for="brand in brands" :key="brand.slug">
              <button @click.prevent="selectBrand(brand)">{{ brand.name }}</button>
            </li>
          </template>
          <li v-else-if="!loadings.categories">
            <span>Нет данных</span>
          </li>
          <li v-else-if="!categories.length">
            <span>Загрузка</span>
          </li>
        </ul>
      </div>


      <div class="sidebar-filter-block">
        <h3 class="widget-title">
          <span href="#widget-5">Цена</span>
        </h3>
        <div class="sidebar-price-filter">
          <input id="checkItMin" class="price_filter__input" placeholder="Мин.цена" type="number"
                 v-model="values.lowest_price"/>
          <div>до</div>
          <input id="checkItMax" class="price_filter__input" placeholder="Макс.цена" type="number"
                 v-model="values.highest_price" :min="values.lowest_price + 1"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {shopData} from '~/utilities/data';
import {mapGetters, mapActions} from 'vuex';
import HumCross from '~/components/ui/HumCross.vue';

export default {
  components: {
    HumCross
  },
  data: function () {
    return {
      loaded: true,
      toggleStates: [true, true, true, true, true],
      filterData: shopData,
      dropdown: 'Показать больше',
      dropdown2: 'Показать больше',
      dropdown3: 'Показать больше',
      collapse: "Показать больше",
      notCollapse: "Свернуть",
      collapsedDropdown: true,
      collapsedDropdown2: true,
      collapsedDropdown3: true,

      axiosSource: {
        categories: null,
        brands: null,
      },
      search: {
        categories: '',
        categories_next: null,
        brands: '',
        brands_next: null,
      },
      searchedData: {
        categories: [],
        brands: [],
      },
      timeouts: {
        categories: 0,
        brands: 0,
      },
      loadings: {
        categories: false,
        brands: false,
      },
      values: {
        categories: [],
        brands: [],
        lowest_price: null,
        highest_price: null,
      },

      context: {
        category: null,
        brand: null,
        product: null,
      }
    };
  },

  methods: {
    ...mapActions('elements', ['toggleProductsFilters']),
    searchCategories() {
      this.searchData('categories');
    },

    searchBrands() {
      this.searchData('brands');
    },

    searchData(type, clear = true) {
      this.cancelAxios(type);

      clearTimeout(this.timeouts[type]);

      this.timeouts[type] = setTimeout(() => {
        this.$set(this.loadings, type, true);

        this.$axios.get(`api/search/${type}`, {
          params: {
            search: this.search[type],
            context: {
              category: this.context.category,
              brand: this.context.brand,
            },
            cursor: clear ? null : this.search[`${type}_next`],
          },
          cancelToken: this.cancelToken(type).token
        }).then(res => res.data?.data).then(data => {
          if (clear) this.searchedData[type] = data?.items ?? [];
          else this.searchedData[type].push(...data?.items ?? []);
          this.search[`${type}_next`] = data?.cursor ?? null;
        }).catch(e => {
          this.searchedData[type] = [];
        }).finally(() => {
          this.$set(this.loadings, type, false)
        });

      }, 500);

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

    selectCategory(category) {
      this.values.categories.push(category)
    },
    deleteCategory(index) {
      this.values.categories.splice(index, 1)
    },

    selectBrand(brand) {
      this.values.brands.push(brand)
    },
    deleteBrand(index) {
      this.values.brands.splice(index, 1)
    },

    matchEmphasize(value, key) {
      let regExp = new RegExp(this.search[key], 'i');
      return `${value}`.replace(regExp, match => '<strong>' + match + '</strong>');
    },

    scroll(e, key, callback, ...params) {
      const element = e.target;

      if (!(element.offsetHeight + element.scrollTop >= element.scrollHeight)) return;

      if (this.searchedData[key].length % 25 !== 0) return;

      if (typeof this[callback] === "function") this[callback](...params);
    },

    createQuery() {
      const old = this.$route.query;
      delete old.brands;
      delete old.categories;

      const query = {}

      const brands = this.values.brands.map(({name, slug}) => `${slug}:${name}`).join(',');
      const categories = this.values.categories.map(({name, slug}) => `${slug}:${name}`).join(',');
      const lowest_price = this.values.lowest_price ?? null;
      const highest_price = this.values.highest_price ?? null;
      if (brands) query.brands = brands;
      if (categories) query.categories = categories;
      if (lowest_price !== null) query['lowest-price'] = lowest_price;
      if (highest_price !== null) query['highest-price'] = highest_price;

      this.$router.push(this.localePath({
        path: this.$route.path,
        query: {
          ...old,
          ...query,
          time: +new Date()
        }
      }));
    },
    fromQuery() {
      const brands = this.$route.query.brands?.split(',')?.map(i => {
        const [slug, name] = i.split(':');
        return {
          slug,
          name
        }
      }) ?? [];
      const categories = this.$route.query.categories?.split(',')?.map(i => {
        const [slug, name] = i.split(':');
        return {
          slug,
          name
        }
      }) ?? [];
      const lowest_price = this.$route.query['lowest-price'] ?? null;
      const highest_price = this.$route.query['highest-price'] ?? null;

      if (JSON.stringify(this.values.brands) !== JSON.stringify(brands)) this.values.brands = brands ?? [];
      if (JSON.stringify(this.values.categories) !== JSON.stringify(categories)) this.values.categories = categories ?? [];

      if (this.values.lowest_price !== lowest_price) this.values.lowest_price = lowest_price;
      if (this.values.highest_price !== highest_price) this.values.highest_price = highest_price;
    },

    createContext() {
      this.context.category = this.$route.query['category-context'] ? `${this.$route.query['category-context']}`.split(':')[0] : null;
      this.context.brand = this.$route.query['brand-context'] ? `${this.$route.query['brand-context']}`.split(':')[0] : null;
      this.context.product = this.$route.query['product'] ?? null
    }
  },
  mounted() {
    this.createContext();
    this.fromQuery();

    this.searchCategories();
    this.searchBrands();
  },
  watch: {
    values: {
      deep: true,
      handler() {
        this.createQuery();
      }
    },
    '$route.query': {
      deep: true,
      handler() {
        this.fromQuery();
        this.createContext();
      }
    },
    'context.category'() {
      this.searchCategories()
      this.searchBrands()
    },
    'context.brand'() {
      this.searchCategories()
      this.searchBrands()
    }
  },
  computed: {
    categories() {
      const categories = this.values.categories;
      return this.searchedData.categories.filter(({slug}) => !categories.some(({slug: u}) => slug === u))
    },
    brands() {
      const brands = this.values.brands;
      return this.searchedData.brands.filter(({slug}) => !brands.some(({slug: u}) => slug === u))
    },
  }
};
</script>
