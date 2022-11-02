import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters('locale', ['locale']),
    },
    methods: {
        toSearch(searching) {
            const oldQuery = this.$route.query;
            delete oldQuery.product;
            delete oldQuery['category-context'];
            delete oldQuery['brand-context'];

            const query = {}
            if (searching) query.product = searching

            this.$router.push(this.localePath({
                name: `products-slug`,
                query: {
                    ...oldQuery,
                    ...query,
                    time: +new Date()
                }
            }));
        }
    }
}
