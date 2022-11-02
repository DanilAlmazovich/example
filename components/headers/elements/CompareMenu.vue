<template>
    <div class="dropdown compare-dropdown">
        <a href="javascript:;" class="dropdown-toggle">
            <div class="icon">
                <i class="icon-random"></i>
            </div>
            <p>Compare</p>
        </a>

        <div class="dropdown-menu dropdown-menu-right" v-if="compareList.length > 0">
            <ul class="compare-products">
                <li class="compare-product" v-for="(product, index) in compareList" :key="index">
                    <a
                        href="#"
                        class="btn-remove"
                        title="Remove Product"
                        @click.prevent="removeFromCompare({product: product})"
                    >
                        <i class="icon-close"></i>
                    </a>
                    <h4 class="compare-product-title">
                        <locale-link :to="'/product/default/' + product.slug">{{ product.name }}</locale-link>
                    </h4>
                </li>
            </ul>

            <div class="compare-actions">
                <a href="#" class="action-link" @click.prevent="clearCompare">Clear All</a>
                <a href="javascript:;" class="btn btn-outline-primary-2">
                    <span>Compare</span>
                    <i class="icon-long-arrow-right"></i>
                </a>
            </div>
        </div>
        <div class="dropdown-menu dropdown-menu-right" v-else key="noCompare">
            <p class="text-center">No products in the compare.</p>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    computed: {
        ...mapGetters('compare', ['compareList'])
    },
    methods: {
        ...mapActions('compare', ['removeFromCompare', 'clearCompare'])
    }
};
</script>