<template>
  <div
      class="mobile-category"
      :class="{ 'mobile-category-active': mobileCategory }"
  >
    <div class="mobile-category-content">
      <div class="mobile-category-head">
        <b>Категории товаров</b>
        <div @click="toggleMobileCategory">
          <hum-cross :dark="true" :cross="true" />
        </div>
      </div>
      <div class="mobile-category-tabs scrollbar" v-if="headerReady">
        <div
            class="mobile-category-tab"
            v-for="(item, index) in getHeaderMenu"
            :key="index"
        >
          <button
              @click="openChild(item.children)"
              :class="item.icon"
          >
            {{ item.category.name }}
          </button>
          <locale-link
              class="mobile-category-global azor-search-1"
              :to="toCategory(item.category)"
          ></locale-link>
        </div>
      </div>
      <div v-else>loading...</div>
    </div>

    <div
        class="mobile-subcategory-content"
        :class="{ 'show-subcategory': showSubCategory }"
    >
      <div class="mobile-category-head">
        <b>Подкатегории товаров</b>
        <div @click="showSubCategory = false">
          <hum-cross :dark="true" :cross="true" />
        </div>
      </div>
      <div class="mobile-child-tabs scrollbar" v-if="child">
        <div
            class="mobile-subcategory-list"
            v-for="(item, k) in child"
            :key="k"
        >
          <mobile-category-list :item="item"/>
        </div>
      </div>
      <div v-else>loading...</div>
    </div>
  </div>
</template>

<script>
import toCategory from '~/mixins/to-category';
import { mapState, mapActions, mapGetters } from 'vuex';
import HumCross from '~/components/ui/HumCross.vue';
import MobileCategoryList from './MobileCategoryList.vue';
import DropDown from '~/components/ui/DropDown.vue';
export default {
  components: {
    HumCross,
    MobileCategoryList,
    DropDown,
  },
  data() {
    return {
      child: null,
      showSubCategory: false,
    };
  },
  computed: {
    ...mapState('elements', ['mobileCategory']),
    ...mapGetters('header', ['getHeaderMenu', 'headerReady']),
  },
  mixins: [toCategory],
  methods: {
    ...mapActions('elements', ['toggleMobileCategory']),
    openChild(child) {
      this.showSubCategory = true;
      this.child = child;
    },
  },
};
</script>
