<template>
  <div class="subcategory scrollbar">
    <div class="subcategory-rows">
        <div class="subcategory-block" v-for="subcategory in subcategory.subcategory0" :key="subcategory.id">
            <locale-link :to="toCategory(subcategory)"><h3>{{subcategory.name}}</h3></locale-link>
            <collapse-subcategory :items="subcategory.children" />
        </div>
    </div>
    <div class="subcategory-rows">
        <div class="subcategory-block" v-for="subcategory in subcategory.subcategory1" :key="subcategory.id">
            <locale-link :to="toCategory(subcategory)"><h3>{{subcategory.name}}</h3></locale-link>
            <collapse-subcategory :items="subcategory.children" />
        </div>
    </div>
    <div class="subcategory-rows">
        <div class="subcategory-block" v-for="subcategory in subcategory.subcategory2" :key="subcategory.id">
            <locale-link :to="toCategory(subcategory)"><h3>{{subcategory.name}}</h3></locale-link>
            <collapse-subcategory :items="subcategory.children" />
        </div>
    </div>
    <div class="subcategory-rows">
        <div class="subcategory-block" v-for="subcategory in subcategory.subcategory3" :key="subcategory.id">
            <locale-link :to="toCategory(subcategory)"><h3>{{subcategory.name}}</h3></locale-link>
            <collapse-subcategory :items="subcategory.children" />
        </div>
    </div>
  </div>
</template>

<script>
import toCategory from '~/mixins/to-category';
import CollapseSubcategory from './CollapseSubcategory.vue';
export default {
  components: { CollapseSubcategory },
    props: {
        child: [Array, Object]
    },
    data() {
        return {
            subcategory: {
                subcategory0 : null,
                subcategory1 : null,
                subcategory2 : null,
                subcategory3 : null,
            }
        }
    },
    computed: {
        count() {
            if (this.child.length >= 8) {
                return Math.floor(this.child.length / 4)
            } else {
                return Math.ceil(this.child.length / 4)
            }
        },
        isInteger() {
            return (this.child.length / 4 ^ 0) === this.child.length / 4;
        }
    },
    mixins: [toCategory],
    methods: {
        setSubcategory() {
            if (this.child.length >= 4) {
                this.subcategory.subcategory0 = this.child.slice(0, this.count);
                this.subcategory.subcategory1 = this.child.slice(this.count, this.count * 2);
                this.subcategory.subcategory2 = this.child.slice(this.count * 2, this.count * 3);
                this.subcategory.subcategory3 = this.child.slice(this.count * 3, this.count * 4);
            } else {
                this.subcategory.subcategory0 = this.child.slice(0, 1);
                this.subcategory.subcategory1 = this.child.slice(1, 2);
                this.subcategory.subcategory2 = this.child.slice(2, 3);
                this.subcategory.subcategory3 = null;
            }
            if (!this.isInteger && this.child.length >= 8) {
                this.subcategory.subcategory0.push(this.child[this.child.length - 1])
            }
        }
    },
    mounted() {
        this.setSubcategory();
    },
    watch: {
        count: {
            handler: function () {
                this.setSubcategory()
            },
            deep: true,
        },
    }
}
</script>

<style lang="scss">
.subcategory{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    overflow-y: auto;
    gap: 25px;
    height: 100%;
    width: 100%;
}
.subcategory-rows{
    display: flex;
    flex-direction: column;
    div{
        display: flex;
        flex-direction: column;
    }
    .subcategory-block{
        margin-bottom: 25px;
        h3{
            line-height: 15px;
        }
    }
}
</style>