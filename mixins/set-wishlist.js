export default {
    methods: {
        async setWishlist(product) {
            if (this.$store.state.auth.loggedIn) {
                this.wishlistLoading = true;
                const payload = {
                    params: {product_id: product.id,},
                    product: product
                };
                let message = null;
                if(this.inWhishlist) {
                    message = await this.$store.dispatch('wishlist/delete', payload);
                } else {
                    message = await this.$store.dispatch('wishlist/add', payload);
                }
                message ? this.$notify({title: message, type: 'success'}) : null
                this.wishlistLoading = false;
                this.$store.dispatch('wishlist/get')
            } else {
                this.message = true;
                setTimeout(() => {this.message = false}, 2200);
                this.$router.push(this.localePath('/login'));
            }
        },
    }
}
