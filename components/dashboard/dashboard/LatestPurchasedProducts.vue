<template>
  <div v-if="loading" class="recent-card">
    <div class="recent-card-title">
      <h4>Недавняя история покупок</h4>
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
              <div class="skel-info "></div>
              <div class="skel-info "></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="recent-card">
    <div class="recent-card-title">
      <h4>Недавняя история покупок</h4>
    </div>
    <div class="recent-cards">
      <div v-if="info && info.recent_purchased_products && info.recent_purchased_products.data.length === 0"
           class="recent-card-body">
        <div class="recent-card-body__empty">
          Пусто
        </div>
      </div>
      <ul v-if="info && info.recent_purchased_products && info.recent_purchased_products.data.length > 0"
          class="recent-card-body">
        <li class="recent-card-body-li" v-for="product in info.recent_purchased_products.data">
          <locale-link :to="`/product/${product.slug}`">
            <div class="row">
              <div class="col col-md-2 col-lg-4">
                <img class="img-product" :src="product.thumbnail_img" alt="product">
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
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => {
      }
    },
    loading: Boolean,
  }
}
</script>

<style lang="scss" scoped>
.recent-card-body {
  &__empty {
    padding: 0 20px;
  }
}
</style>