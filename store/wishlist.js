export const state = () => (
    {
			list: null,
			follows: null,
    }
);

export const getters = {
    wishlist: state => {
        return state.data;
    },
    wishlistQty: state => {
        return state.list?.length;
    },
    isInWishlist: state => ( product ) => {
        return state.data.find( item => item.id == product.id ) ? true : false
    }
}

export const actions = {
    async get (ctx) {
        try {
            const { data, success } = await this.$axios.$get('/api/user/wishlists');
            if (success) {
                ctx.commit('set', data)
            }
        } catch (error) {
            console.log(error)
        }
    },

    async add (ctx, payload) {
        try {
            const { success, data, message } = await this.$axios.$post('/api/user/wishlists', payload.params);
            if (success) {
                await ctx.commit('add', payload.product)
                // await ctx.dispatch('get');
            }
            if (message) {
                return message
            }
        } catch (error) {
            console.log(error)
        }
    },

    async delete (ctx, payload) {
        try {
            const { success, message } = await this.$axios.$delete(`/api/user/wishlists/${payload.params.product_id}`)
            if (success) {
                await ctx.commit('delete', payload.product.id)
                // await ctx.dispatch('get');

            }
            if (message) {
                return message
            }
        } catch (error) {
            console.log(error)
        }
    },

    async getFollows (ctx) {
        try {
            const { data, success } = await this.$axios.$get('/api/user/follow');
            if (success) {
                ctx.commit('set_follow', data)
            }
        } catch (error) {
            console.log(error)
        }
    },

}

export const mutations = {

    delete(state, payload) {
        state.list = state.list.filter(item => item.id !== payload)
    },

    add (state, payload) {
        state.list.unshift(payload)
    },

	set (state, payload) {
		state.list = payload;
	},
	set_follow (state, payload) {
		state.follows = payload;
	}
}