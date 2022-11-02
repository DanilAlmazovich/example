<template>
  <div>
    <locale-link class="header-subcatalog-item" v-for="item in sliceChildren" :key="item.id" :to="toCategory(item)">{{item.name}}</locale-link>
    <button v-if="items.length > 7" class="header-catalog-many" @click="show = !show">{{show ? 'Свернуть' : 'Еще'}}</button>
  </div>
</template>

<script>
import toCategory from '~/mixins/to-category';
export default {
    props: {
        items: [Array, Object],
        show: false
    },
    computed: {
        sliceChildren() {
            return this.show ? this.items : this.items.slice(0, 7);
        }
    },
    mixins: [toCategory],

}
</script>

<style lang="scss">
    .header-subcatalog-item{
        line-height: 15px;
        margin-top: 7px;
    }
    .header-catalog-many{
        color: #ff741f;
        text-align: left;
        font-weight: 400;
        margin-top: 5px;
    }

</style>