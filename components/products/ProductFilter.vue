<template>
    <div
        class="product-list-filter azor-sort_dowm"
        :class="{'azor-sort_up' : showFilterItem}"
        @click="showFilterItem = !showFilterItem"
    >
        <span>{{ selectedFilter }}</span>
        <div v-if="showFilterItem">
            <span
                v-for="item in filterOptions"
                :key="item.id"
                @click="selectFilter(item.value, item.direction)"
                >{{ item.name }}</span
            >
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data() {
        return {
            showFilterItem: false,
            filterValue: 'num_of_sale',
            filterDirection: 'desc',
            filterOptions: [
                {
                    name: 'По популярности',
                    value: 'num_of_sale',
                    direction: 'desc',
                },
                { name: 'По рейтингу', value: 'rating', direction: 'desc' },
                { name: 'По дате', value: 'created_at', direction: 'desc' },
            ],
        };
    },
    computed: {
        ...mapGetters('locale', ['locale']),
        selectedFilter() {
            let selectedOption = this.filterOptions.filter((item) =>
                item.value === this.filterValue ? item.name : null
            );
            return selectedOption[0].name;
        },
    },
    methods: {
        selectFilter(value, direction) {
            this.filterValue = value;
            this.filterDirection = direction;
            this.setOrderValue();
        },
        setOrderValue() {
            const query = this.$route.query;
            query.sortfield = this.filterValue;
            query.sortorder = this.filterDirection ?? 'asc';
            this.$router.push(this.localePath({
                name: `products-slug`,
                query: {
                    ...query,
                    time: +new Date(),
                },
            }));
        },
    },
};
</script>

<style lang="scss">
.product-list-filter {
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    width: auto;
    color: #232f3e;
    font-weight: 400;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 5px 10px;
    @media (max-width: 991px) {
        font-size: 14px;
        border: none;
        padding: 0;
    } 
    &::before {
        order: 2;
        font-size: 25px;
        color: #ff741f;
        margin: 0;
    }
    span {
        white-space: nowrap;
    }
    div {
        display: flex;
        flex-direction: column;
        width: auto;
        position: absolute;
        bottom: 0;
        left: 50%;
        background-color: white;
        padding: 5px 10px;
        width: auto;
        box-shadow: 0px 2px 10px rgba(19, 25, 33, 0.1);
        border-radius: 4px;
        transform: translate(-50%, calc(100% + 5px));
        z-index: 100;
    }
}
</style>