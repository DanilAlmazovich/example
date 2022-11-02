<template>
  <div class="container">
    <div class="categories-title">
      <h1 class="all-brands-title">Все категории</h1>
      <button
          class="all-link"
          @click="toggleShowAll">
        {{ showAll ? 'Скрыть' : 'Посмотреть все категории раздела' }}
      </button>
    </div>
    <div class="all-brand-nav-container">
      <ul class="nav">
        <li
            @click="navElecton(category.id)"
            v-for="category in withChild"
            :key="category.id"
            class="all-brand"
            :class="{activeLink: selectedId === category.id && !showAll}"
            v-text="category.name"
        />
      </ul>
    </div>
    <div
        v-for="(item, index) in selectedElements" :key="index"
        class="all-brand-categories"
    >
      <div class="all-brand-categories-title">
        <locale-link :to="toCategory(item)" tag="h2">{{ item.name }}</locale-link>
      </div>
      <div class="all-brands-nav">
        <div class="all-brands-nav-categories-container">
          <ul v-for="(i, k) in item.children" :key="k"
              class="all-brandNav-categories-link"
          >
            <locale-link tag="li" :to="toCategory(i)">{{ i.name }}</locale-link>
            <li v-for="(child, j) in i.children" :key="j"
                class="all-brands-nav-sub-categories">
                <locale-link class="product-link" :to="toCategory(child)">
                  {{ child.name }}
                </locale-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toCategory from '~/mixins/to-category';

export default {
  head() {
    return {
      title: "AZOR - Все категории",
    }
  },
  data() {
    return {
      items: [],
      loading: true,
      selectedId: null,
      showAll: false
    }
  },
  mounted() {
    this.getBrands()
  },
  mixins: [toCategory],
  computed: {
    withChild() {
      return this.items.filter(({children}) => children && children.length)
    },
    selected() {
      if (!this.selectedId) return [];
      const selectedId = this.selectedId
      return this.items.filter(({id}) => id === selectedId)
    },
    selectedElements() {
      if (this.showAll) return this.items;
      return this.selected;
    }
  },
  methods: {
    async getBrands() {
      try {
        this.$axios.get(`/api/categories`)
            .then((response) => {
              return response.data;
            }).then(({data}) => {
          this.items = this.getChildren(null, data ?? []);
        }).finally(() => {
          if (this.withChild.length) this.selectedId = this.withChild[0]?.id ?? null;
          this.loading = false;
        });
      } catch (e) {
        console.log(e);
      }
    },
    getChildren(parentID, items) {
      return items.filter(({parent_id}) => parent_id === parentID).map(i => {
        const children = this.getChildren(i.id, items);
        if (children.length) {
          return {
            ...i,
            children
          }
        }
        return i;
      })
    },
    navElecton(id) {
      if (this.selectedId === id) return;
      this.selectedId = id;
    },

    toggleShowAll() {
      this.showAll = !this.showAll
    }

  },
}

</script>

<style scoped>

</style>