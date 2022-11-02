import {mapGetters} from "vuex";
export default {
    computed: {
        ...mapGetters('locale', ['locale']),
    },
    methods: {
        toBrand(item, select = null) {
            const query = {
              'brand-context': `${item.uuid}:${item.name}`,
            };
            if (select) query.categories = `${select.slug}:${select.name}`;
            return {name: `products-slug`, query};
        }
    }
}
