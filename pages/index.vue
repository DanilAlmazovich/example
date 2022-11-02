<template>
  <div class="main home-page">
    <promo-banners :bannersLoading="topBannersLoading" :top-banners="topBanners" />

    <!--<component-loader v-if="popularBrandsLoading && topBanners" />-->
    <deferred @load="getPopularBrands" v-if="!topBannersLoading && topBanners">
      <div class="container">
        <popular-brands :brands-loading="popularBrandsLoading" :popular-brands="popularBrands" />
      </div>
    </deferred>

    <component-loader v-if="partnersLoading && popularBrands" />
    <deferred @load="getPartners" v-if="!popularBrandsLoading && popularBrands">
      <div class="container">
        <partner-banner v-if="hasPartners" :partners="partners" :partnersLoading="partnersLoading" />
      </div>
    </deferred>

    <component-loader v-if="newProductsLoading && partners" />
    <deferred @load="getNewProducts" v-if="!partnersLoading && partners">
      <div class="container">
        <new-products
                v-if="newProducts && newProducts.length"
                title="Новинки на сайте"
                link
                :newProductsLoading="newProductsLoading"
                link-src="products?sortfield=id&sortorder=desc"
                :products="newProducts"
        />
      </div>
    </deferred>

    <component-loader v-if="secondaryMiddleBannersLoading && newProducts" />
    <deferred @load="getSecondaryMiddleBanners" v-if="!newProductsLoading && newProducts">
      <div class="container">
        <top-products v-if="secondaryMiddleBanners" :secondary-middle-banners="secondaryMiddleBanners" :topBannersLoading="topBannersLoading"/>
      </div>
    </deferred>

    <component-loader v-if="actualBannersLoading && secondaryMiddleBanners" />
    <deferred @load="getActualBanners" v-if="!secondaryMiddleBannersLoading && secondaryMiddleBanners">
      <div class="container">
        <most-relevant :actual-banners="actualBanners" />
      </div>
    </deferred>

    <component-loader v-if="dynamicBannersLoading && actualBanners" />
    <deferred @load="getDynamicBanners" v-if="!actualBannersLoading && actualBanners">
      <div class="container">
        <double-card :dynamic-banners="dynamicBanners" />
      </div>
    </deferred>

    <component-loader v-if="dynamicProductsLoading && dynamicBanners" />
    <deferred @load="getDynamicProducts" v-if="!dynamicBannersLoading && dynamicBanners">
      <template v-if="dynamicProducts && dynamicProducts.length">
        <div class="container" v-for="(products, index) in dynamicProducts" :key="index">
          <new-products v-if="products.items.length" :title="products.name" link
                        :link-src="products.to ? products.to : '/'" :products="products.items"
                        :newProductsLoading="newProductsLoading"/>
        </div>
      </template>
    </deferred>

    <component-loader v-if="secondaryBottomBannersLoading && dynamicProducts" />
    <deferred @load="getSecondaryBottomBanners" v-if="!dynamicProductsLoading && dynamicProducts">
      <div class="container">
        <product-swiper :secondary-bottom-banners="secondaryBottomBanners" />
      </div>
    </deferred>

    <component-loader v-if="limitedProductsLoading && secondaryBottomBanners" />
    <deferred @load="getLimitedProducts" v-if="!secondaryBottomBannersLoading && secondaryBottomBanners">
      <div class="container">
        <time-offer :limitedProducts="limitedProducts" />
      </div>
    </deferred>

    <component-loader v-if="brandsLoading && limitedProducts" />
    <deferred @load="getBrands" v-if="!limitedProductsLoading && limitedProducts">
      <div class="container">
        <companies-brands v-if="brands && brands.length" :brands="brands" />
      </div>
    </deferred>
  </div>
</template>
<script>
import options from '~/mixins/index-slider-options';
import PopularCategories from '~/components/main/PopularCategories';
import NewProducts from '~/components/main/NewProducts';
import TopProducts from '~/components/main/TopProducts';
import MostRelevant from '~/components/main/MostRelevant';
import DoubleCard from '~/components/main/DoubleCard';
import TimeOffer from '~/components/main/TimeOffer';
import CompaniesBrands from '~/components/main/CompaniesBrands';
import PromoBanners from '~/components/main/PromoBanners';
import PopularBrands from '~/components/main/PopularBrands';
import ProductSwiper from '~/components/main/ProductSwiper.vue';
import PartnerBanner from '~/components/main/PartnerBanner.vue';
import Deferred from '~/components/ui/Deferred.vue';
import ComponentLoader from '~/components/ui/ComponentLoader.vue';

export default {
  head() {
    return {
      title: "AZOR Маркетплейс",
    }
  },
  components: {
    CompaniesBrands,
    TimeOffer,
    DoubleCard,
    MostRelevant,
    TopProducts,
    NewProducts,
    PopularCategories,
    PromoBanners,
    PopularBrands,
    ProductSwiper,
    PartnerBanner,
    Deferred,
    ComponentLoader
  },

  mixins: [options],

  name: 'index',

  data() {
    return {
      popularBrands: null,
      topBanners: null,
      newProducts: null,
      secondaryMiddleBanners: null,
      actualBanners: null,
      dynamicBanners: null,
      dynamicProducts: null,
      secondaryBottomBanners: null,
      limitedProducts: null,
      brands: null,
      partners: null,
      loading: false,
      popularBrandsLoading: true,
      topBannersLoading: true,
      newProductsLoading: true,
      secondaryMiddleBannersLoading: true,
      actualBannersLoading: true,
      dynamicBannersLoading: true,
      dynamicProductsLoading: true,
      secondaryBottomBannersLoading: true,
      limitedProductsLoading: true,
      brandsLoading: true,
      partnersLoading: true
    };
  },
  mounted() {
    this.getAllData();
//    addEventListener('locale', this.getAllData);
  },
  beforeDestroy() {
//    removeEventListener('locale', this.getAllData);
  },

  methods: {
    async getTopBanners() {
        await this.$axios
            .get('/api/home/top-banners')
            .then((response) => {
                this.topBanners = response?.data?.data || {};
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                this.topBannersLoading = false;
            });
    },
    async getPopularBrands() {
      await this.$axios
        .get('/api/home/popular-brands')
        .then((response) => {
          this.popularBrands = response?.data?.data || {};
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.popularBrandsLoading = false;
        });
    },
    async getPartners() {
        await this.$axios
            .get('/api/home/partners')
            .then((response) => {
                this.partners = response.data.data || {};
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.partnersLoading = false;
            });
    },
    async getNewProducts() {
      await this.$axios
        .get('/api/home/new-products')
        .then((response) => {
          this.newProducts = response?.data?.data || {};
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.newProductsLoading = false;
        });
    },
    async getSecondaryMiddleBanners() {
      await this.$axios
        .get('/api/home/secondary-middle-banners')
        .then((response) => {
          this.secondaryMiddleBanners = response?.data?.data || {};
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.secondaryMiddleBannersLoading = false;
        });
    },
    async getActualBanners() {
      await this.$axios
        .get('/api/home/actual-banners')
        .then((response) => {
          this.actualBanners = response?.data?.data || {};
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.actualBannersLoading = false;
        });
    },
    async getDynamicBanners() {
      await this.$axios
        .get('/api/home/dynamic-banners')
        .then((response) => {
          this.dynamicBanners = response?.data?.data || {};
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.dynamicBannersLoading = false;
        });
    },
    async getDynamicProducts() {
      await this.$axios
        .get('/api/home/dynamic-products')
        .then((response) => {
          this.dynamicProducts = response?.data?.data || {};
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.dynamicProductsLoading = false;
        });
    },
    async getSecondaryBottomBanners() {
      await this.$axios
        .get('/api/home/secondary-bottom-banners')
        .then((response) => {
          this.secondaryBottomBanners = response?.data?.data || {};
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.secondaryBottomBannersLoading = false;
        });
    },
    async getLimitedProducts() {
      await this.$axios
        .get('/api/home/limited-products')
        .then((response) => {
          this.limitedProducts = response.data.data || {};
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.limitedProductsLoading = false;
        });
    },
    async getBrands() {
      await this.$axios
        .get('/api/home/brands')
        .then((response) => {
          this.brands = response.data.data || {};
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.brandsLoading = false;
        });
    },
    async getAllData() {
      this.setLoading(true);
      this.popularBrands = null
      this.topBanners = null
      this.partners = null
      this.newProducts = null
      this.secondaryMiddleBanners = null
      this.actualBanners = null
      this.dynamicBanners = null
      this.dynamicProducts = null
      this.secondaryBottomBanners = null
      this.limitedProducts = null
      this.brands = null
      await this.getTopBanners();
      await this.getPopularBrands();
//      await this.getNewProducts();
//      await this.getSecondaryMiddleBanners();
//      await this.getActualBanners();
//      await this.getDynamicBanners();
//      await this.getDynamicProducts();
//      await this.getSecondaryBottomBanners();
//      await this.getLimitedProducts();
//      await this.getBrands();
//      await this.getPartners();
    },

    async getAllDataWithLanguage() {
      this.popularBrandsLoading = true;
      // this.newProductsLoading = true;
      this.dynamicProductsLoading = true;
      this.limitedProductsLoading = true;
      this.brandsLoading = true;

      this.popularBrands = []
      this.newProducts = []
      this.dynamicProducts = []
      this.limitedProducts = []
      this.brands = []
      await this.getTopBanners();
      await this.getPopularBrands();
      await this.getNewProducts();
      await this.getSecondaryMiddleBanners();
      await this.getActualBanners();
      await this.getDynamicBanners();
      await this.getDynamicProducts();
      await this.getSecondaryBottomBanners();
      await this.getLimitedProducts();
      await this.getBrands();
      await this.getPartners();
    },
    setLoading(bool) {
      this.popularBrandsLoading = bool;
      this.topBannersLoading = bool;
//      this.partnersLoading = bool;
//      this.newProductsLoading = bool;
//      this.secondaryMiddleBannersLoading = bool;
//      this.actualBannersLoading = bool;
//      this.dynamicBannersLoading = bool;
//      this.dynamicProductsLoading = bool;
//      this.secondaryBottomBannersLoading = bool;
//      this.limitedProductsLoading = bool;
//      this.brandsLoading = bool;
    }
  },
  computed: {
    hasPartners() {
        if(this.partners && Array.isArray(this.partners)) {
            return this.partners && this.partners.reduce((init, array)=> init || !!array.length, false)
        }
    }
  }
};
</script>
