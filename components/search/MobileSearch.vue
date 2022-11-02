<template>
    <div class="mobile-search" :class="{'acive-mobile-search' : mobileSearch}">
        <div class="mobile-input">
            <label>
                <form @submit.prevent="searching.length >= 2 ? toSearch(searching) : null">
                    <input
                        @input="delaySearch"
                        type="search"
                        v-model="searching"
                        min="2"
                        placeholder="введите товар, категорию или бренд"
                        autocomplete="off"
                    />
                </form>
                <div @click="closeAll">
                    <hum-cross :cross="true" :dark="true" />
                </div>
            </label>
            <product-suggestions :searchValue="searching" :suggestions="searchResult"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import toSearch from '~/mixins/to-search';
import ProductSuggestions from '~/components/search/ProductSuggestions.vue';
import HumCross from '~/components/ui/HumCross.vue';
export default {
    components: {
        HumCross,
        ProductSuggestions,
    },
    data() {
        return {
            searching: '',
            searchResult: [],
            axiosSource: null,
            timer: 0,
        };
    },
    computed: {
        ...mapState('elements', ['mobileSearch']),
    },
    mixins: [toSearch],
    methods: {
        ...mapActions('elements', ['closeAll']),
        delaySearch() {
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
};
</script>

<style lang="scss">
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
    display: none;
}
.mobile-search {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;
    width: 100%;
    max-width: 526px;
    padding: 20px 10px;
    background-color: white;
    z-index: 3500;
    transform: translateX(-100%);
    transition: 0.3s;
    .search-global-link {
        width: 100%;
        font-weight: 400;
        text-align: right;
        color: #ff741f;
        font-size: 18px;
    }
}
.acive-mobile-search {
    transform: translateX(0);
}

.mobile-input {
    min-height: 50px;
    border: 1px solid #EBEBEB;
    border-radius: 4px;
    padding: 0 10px;
    label {
        display: grid;
        grid-template-columns: calc(100% - 44px) 24px;
        align-items: center;
        height: 46px;
        gap: 20px;
        width: 100%;
        margin: 0;
        font-size: 18px;
        font-weight: 400;
        input {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            padding: 0;
        }
    }
}
</style>