<template>
    <section itemscope itemtype="https://schema.org/product">
        <div class="container" v-if="product">
            <breadcrumbs :category="breadcrumbs" :categoryLoading="breadcrumbsLoading" :title="product.name"/>
            <div class="product-page">
                <div>
                    <ProductView :product="product" />
                    <collapse-description head="О товаре" v-if="product.description" :description="product.description"
                                          noDescription="Описание отсутствует" maxHeight="200"
                                          :collapse="['Свернуть описание', 'Показать полное описание']" />
                    <new-products :products="bought" title="Вместе с этим покупают" :newProductsLoading="boughtLoading" :index="1"/>
                    <new-products :products="random" title="Больше товаров для вас" :newProductsLoading="randomLoading" :index="2"/>
                </div>
                <similar-product :related="related" :relatedLoading="relatedLoading" />
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex';
import NewProducts from "~/components/main/NewProducts";
import options from "~/mixins/index-slider-options";
import {fetchProduct} from '@/utilities/ssr/product';
import ShopProductsList from "~/components/main/ShopProductsList";
import CollapseDescription from "~/components/product/СollapseDescription.vue";
import ProductView from "~/components/product/ProductView";
import SimilarProduct from '~/components/product/SimilarProduct.vue';
import Breadcrumbs from '~/components/ui/Breadcrumbs.vue';

export default {
  name: 'productPage',
  components: {
    ProductView,
    ShopProductsList,
    NewProducts,
    CollapseDescription,
    SimilarProduct,
    Breadcrumbs
  },
  data() {
    return {
      related: null,
      relatedLoading: true,
      bought: null,
      boughtLoading: true,
      random: null,
      randomLoading: true,
      breadcrumbs: null,
      breadcrumbsLoading: true,
    }
  },
  mixins: [options],
  async asyncData({$axios, params, i18n}) {
    return await fetchProduct({$axios, params, i18n});
  },
  methods: {
    async getLinks() {
      await this.$axios
          .get(`/api/breadcrumb/product/${this.product.uuid}`)
          .then((response) => {

              this.breadcrumbs = response.data.data
          })
          .catch((error) => {
              console.log(error);
          })
          .finally(() => {
            this.breadcrumbsLoading = false;
          });
    },
    async getRelated() {
      await this.$axios
        .get(`/api/product/related/${this.product.id}`)
        .then((response) => {
          this.related = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.relatedLoading = false;
        });
    },
    async getBought() {
      await this.$axios
        .get(`/api/product/bought-together/${this.product.id}`)
        .then((response) => {
          this.bought = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.boughtLoading = false;
        });
    },
    async getRandom() {
      await this.$axios
        .get(`/api/product/random/${15}/${this.product.id}`)
        .then((response) => {
          this.random = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.randomLoading = false;
        });
    },
  },
  mounted() {
    if(this.product) {
      this.getRelated();
      this.getBought();
      this.getRandom();
      this.getLinks();
    }
  },
}
</script>