export default {
    methods: {
        async deleteBasket(item) {
            this.deleteLoading = true;
            const payload = {
                params: {
                    temp_user_id: +window.localStorage.getItem('tempUserId'),
                    cart_id: item.cart_id,
                },
                product_id: item.product_id,
            };
            const message = await this.$store.dispatch(
                'basket/deleteCart',
                payload
            );
            if (message) {
                this.deleteLoading = false;
                this.$notify({ title: message, type: 'success' });
                this.$store.dispatch(
                    'basket/get',
                    {temp_user_id: +window.localStorage.getItem('tempUserId'),}
                );
            }
        },
    }
}
