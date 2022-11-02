<template>
    <div v-if="suggestions.status === 200">
        <div
            class="search-suggest"
            v-if="suggestions.data.data.products.length"
        >
            <locale-link
                class="search-product-link"
                tag="div"
                v-for="(product, id) in suggestions.data.data.products"
                :key="id"
                :to="`/product/${product.slug}`"
            >
                <span>{{ product.name }}</span>
                <b></b>
            </locale-link>
            <button class="search-global-link" @click="toSearch(searchValue)">все товары</button
            >
        </div>

        <div
            class="search-suggest"
            v-if="suggestions.data.data.categories.length"
        >
            <locale-link
                class="search-category-link"
                tag="div"
                v-for="(category, id) in suggestions.data.data.categories"
                :key="id"
                :to="toCategory(category)"
            >
                <b>{{ category.name }}</b>
                <span>{{ category.parent_category.name }}</span>
            </locale-link>
            <locale-link tag="div" class="search-global-link" to="/categories">все категории</locale-link
            >
        </div>

        <div class="search-suggest" v-if="suggestions.data.data.brands.length">
            <locale-link
                class="search-brand-link"
                tag="div"
                v-for="(brand, id) in suggestions.data.data.brands"
                :key="id"
                :to="toBrand(brand)"
            >
                <b>{{ brand.name }}</b>
                <img v-if="brand.logo" :src="brand.logo" :alt="brand.name" />
            </locale-link>
            <locale-link tag="div" class="search-global-link" to="/brands"
                >все бренды</locale-link
            >
        </div>
    </div>
</template>

<script>
import toBrand from '~/mixins/to-brand';
import toCategory from '~/mixins/to-category';
import toSearch from '~/mixins/to-search';
export default {
    props: {
        suggestions: [Object, Array],
        background: String,
        searchValue: String
    },
    mixins: [toCategory, toBrand, toSearch],
};
</script>

<style lang="scss">
.search-suggest {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 10px 0 5px 0;
    &::before {
        content: '';
        position: absolute;
        top: -0.5px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: rgba(65, 61, 56, 0.35);
    }
    .search-product-link {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        height: 28px;
        width: 100%;
        span {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
        }
        .azor-search {
            display: flex;
            align-items: center;
            height: 28px;
            font-size: 20px;
        }
    }
    .search-category-link {
        display: flex;
        flex-direction: column;
        line-height: 20px;
        cursor: pointer;
    }
    .search-global-link {
        cursor: pointer;
        width: 100%;
        font-weight: 400;
        text-align: right;
        color: #ff741f;
        font-size: 18px;
    }
    .search-brand-link {
        display: flex;
        font-size: 16px;
        font-weight: 500;
        height: 34px;
        justify-content: space-between;
        cursor: pointer;
        align-content: center;
        img {
            object-fit: contain;
            max-width: 40px;
            max-height: 30px;
        }
    }
}
</style>