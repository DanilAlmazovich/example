<template>
    <div
        class="main-search"
        @click="clickInput"
        v-click-outside="onClickOutside"
    >
        <form class="main-search-input" @mouseenter="showSuggest = true" @submit.prevent="searching.length >= 2 ? toSearch(searching) : null">
            <input
                @input="delaySearch"
                type="search"
                placeholder="Поиск..."
                v-model="searching"
                min="2"
                id="search"
                autocomplete="off"
            />
            <div
                class="main-search-close"
                @click="clearResult"
                v-if="searching.length != 0"
            >
                <hum-cross :cross="true" :dark="true" />
            </div>
            <label v-else for="search" @submit.prevent="toSearch(searching)" class="azor-search" />
        </form>
        <div class="main-search-suggestions" v-show="showSuggest && searching.length >= 2">
            <product-suggestions
                :searchValue="searching"
                :suggestions="searchResult"
            />
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import Vue from 'vue';
import toSearch from '~/mixins/to-search';
import HumCross from '~/components/ui/HumCross.vue';
import ProductSuggestions from '~/components/search/ProductSuggestions.vue';
Vue.directive('click-outside', {
    bind(el, binding, vnode) {
        el.clickOutsideEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unbind(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
});
export default {
    components: {
        ProductSuggestions,
        HumCross,
    },
    data() {
        return {
            searching: '',
            searchResult: [],
            axiosSource: null,
            timer: 0,
            showSuggest: false,
        };
    },
    mixins: [toSearch],
    methods: {
        ...mapActions('elements', ['closeAll']),
        clickInput() {
            (this.showSuggest = true), this.closeAll();
        },
        onClickOutside() {
            this.showSuggest = false
        },
        delaySearch() {
            if (this.searching.length >= 2) {
                this.showSuggest = true 
            } else {
                this.showSuggest = false 
            }
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.submitDelayForm();
            }, 200);
        },
        clearResult() {
            (this.searching = ''), (this.searchResult = []);
        },
        async submitDelayForm() {
            this.cancelAxios();
            if (this.searching.length >= 2) {
                try {
                    const api = 'api/search/mobile';
                    this.searchResult = await this.$axios.get(api, {
                        params: { search: this.searching },
                        cancelToken: this.cancelToken().token,
                    });
                } catch (error) {
                    this.searchResult = [];
                }
            }
        },
        cancelAxios() {
            if (this.axiosSource) {
                this.axiosSource.cancel();
            }
        },
        cancelToken() {
            const CancelToken = this.$axios.CancelToken;
            this.axiosSource = CancelToken.source();
            return this.axiosSource;
        },
    },
    watch: {
        $route(to, from) {
            this.showSuggest = false;
            this.searching = '';
        },
    },
};
</script>

<style lang="scss">
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
    display: none;
}
.main-search {
    position: absolute;
    top: calc(50% - 23px);
    left: 50%;
    transform: translateX(-50%);
    height: auto;
    width: calc(100% - 40px);
    max-width: 826px;
    border: 1px solid #ebebeb;
    background-color: #f8f8f8;
    border-radius: 4px;
    z-index: 2000;
}
.main-search-input {
    position: relative;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: calc(100% - 70px) 70px;
    height: 46px;
    input {
        border: none;
        background: none;
        height: 100%;
        width: 100%;
        padding: 0 20px;
        outline: none;
        font-size: 18px;
    }
    .azor-search {
        position: absolute;
        right: -1px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ff741f;
        height: calc(100% + 2px);
        border-radius: 0px 4px 4px 0px;
        width: 70px;
        &::before {
            color: white;
            font-size: 18px;
        }
    }
    .main-search-close {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
    }
}
.main-search-suggestions {
    padding: 0 20px 0 20px;
}
</style>