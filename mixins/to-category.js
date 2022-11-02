import {mapGetters} from "vuex";

export default {
    computed: {
        ...mapGetters('locale', ['locale']),
    },
    methods: {
        toCategory(item, select = null) {
            const query = {
                'category-context': `${item.uuid}:${item.name}`,
            };
            if (select) query.categories = `${select.slug}:${select.name}`;
            return {name: `products-slug`, query};
        },
    }
}