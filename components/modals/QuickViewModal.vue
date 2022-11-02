<template>
  <div class="quick-view-modal">
    <div class="quick-view-close" aria-hidden="true" @click="$emit('close')">
      <hum-cross :cross="true" :dark="true"/>
    </div>
    <div v-if="loading">
    </div>
    <ProductView v-else @close="closeModal" :product="productCard" :productSlug="product.slug"/>
  </div>
</template>
<script>
import ProductView from "~/components/product/ProductView";
import HumCross from '~/components/ui/HumCross.vue';

export default {
  data() {
    return {
      prod1: {},
      loading: true,
    }
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    },
  },
  components: {
    ProductView,
    HumCross,
  },

  mounted() {
    this.getData()
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    async getData() {
      try {
        await this.$axios.get(`/api/product/details/${this.product.slug}`)
          .then((response) => {
            return response.data;
          }).then(({ data }) => {
            this.productCard = data
          }).finally(() => {
            this.loading = false;
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
}
</script>
<style>
.quick-view-modal {
  position: relative;
  padding: 60px 25px 25px 25px;
}
.quick-view-close{
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 100;
}
</style>
