<template>
    <div class="header-catalog container" :style="{height: catalogHeight + 'px', top: catalogTop + 'px'}" v-if="showCategory">
        <div class="header-catalog-items scrollbar">
            <locale-link v-for="(catalog, index) in getHeaderMenu" :key="index" :to="toCategory(catalog.category)">
                <button :class="[{'header-catalog-active' : selected == catalog.id}, catalog.icon]" @mouseenter.prevent="hoverCategory(catalog.children, catalog.id)">
                    <span>{{catalog.category.name}}</span>
                </button>
            </locale-link>
        </div>
        <sub-category :child="child"/>
    </div>
</template>
  
<script>
import toCategory from '~/mixins/to-category';
import { mapState, mapActions, mapGetters } from 'vuex';
import SubCategory from './SubCategory.vue';
export default {
    name: "HeaderCategory",
    components: { SubCategory },
    data() {
        return {
            showCategory: false,
            catalogHeight: 0,
            catalogTop: 0,
            selected: null,
            notifi: false,
            child: null
        };
    },
    computed: {
        ...mapGetters("header", ["getHeaderMenu", "headerReady"]),
        ...mapState("elements", ["headerCategory"]),
    },
    mixins: [toCategory],
    methods: {
        ...mapActions("elements", ["toggleHeaderCategory", "closeAll"]),
        hoverCategory(children, id) {
            this.child = children;
            this.selected = id;
        },
        setCatalogStyle() {
            if (window.scrollY >= 210) {
                this.catalogHeight = window.innerHeight - 52;
                this.catalogTop = 52;
            } else if (this.notifi) {
                this.catalogHeight = window.innerHeight - 239 + window.scrollY;
                this.catalogTop = 239 - window.scrollY;
            } else {
                this.catalogHeight = window.innerHeight - 195 + window.scrollY;
                this.catalogTop = 195 - window.scrollY;
            }
        },
    },

    mounted() {
        this.$session.get("notifi") === "false" ? this.notifi = false : this.notifi = true; 
        this.hoverCategory(this.getHeaderMenu[0].children, this.getHeaderMenu[0].id);
        window.addEventListener("scroll", this.setCatalogStyle, { passive: true });
        this.setCatalogStyle();
    },
    destroyed() {
        window.removeEventListener("scroll", this.setCatalogStyle, { passive: true });
    },
    watch: {
        headerCategory: {
            handler() {
                this.$session.get("notifi") === "false" ? this.notifi = false : this.notifi = true; 
                this.setCatalogStyle();
                this.headerCategory ? this.showCategory = true : this.showCategory = false;
            },
            deep: true
        }
    }
}
</script>
  
<style lang="scss">
  .header-catalog{
    position: fixed;
    transform: translateX(-50%);
    display: grid;
    grid-template-columns: 264px calc(100% - 284px);
    gap: 20px;
    width: 100%;
    left: 50%;
    z-index: 5000;
    background-color: white;
    border-radius: 5px;
    padding-top: 15px;
    padding-bottom: 15px;
    @media (max-width: 991px) {
        display: none;
    }
  }
  .header-catalog-items{
    position: relative;
    height: 100%;
    overflow-y: auto;
    button {
        display: flex;
        align-items: center;
        padding: 0 25px;
        grid-gap: 15px;
        width: 100%;
        height: 45px;
        transition: 0.2s;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        color: #232F3E;
        &::before{
            font-size: 24px;
            margin: 0;
        }
        span{
            text-align: left;
            font-size: 14px;
            text-transform: uppercase;
            line-height: 15px;
            font-weight: 400;
        }
    }
    .header-catalog-active{
        background-color: #ff741f;
        color: white;
    }
  }

</style>