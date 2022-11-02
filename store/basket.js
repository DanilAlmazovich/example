export const state = () => ({
    cart: null,
    shops: null,
    totalLoading: false
});

export const mutations = {
    set (state, payload) {
        state.cart = payload;
    },
    add (state, payload) {
        if (!state.cart) {
            state.cart = []
        }
        state.cart.unshift({
            name: payload.product.name,
            price: payload.product.price,
            product_id: payload.product.id,
            qty: payload.qty,
            thumbnail: payload.product.thumbnail_img,
            variation_id: payload.variation_id,
            variation: payload.variation
        })
    },
    delete(state, payload) {
        state.cart = state.cart.filter(item => item.product_id !== payload)
    },
    qtyEdit(state, payload) {
        state.cart[payload.index].qty = payload.params.qty
    },
    showLoading(state, payload) {
        state.totalLoading = payload
    }
};

export const getters = {
    getTotalLoading(state) {
        return state.totalLoading
    },
    qtyTotal (state) {
        if (state.cart) {
            return state.cart.length;
        }
        return 0;
    },
    priceTotal (state) {
        if (state.cart) {
            return state.cart.reduce((acc, cart) => { return acc + (cart.price * cart.qty) }, 0);
        }
        return 0;
    }
}

export const actions = {
    async get (ctx, {temp_user_id, cancelToken}) {
        try {
            const { cart_items, success } = await this.$axios.$post('/api/carts', { temp_user_id }, {cancelToken});
            if (success) {
                ctx.commit('set', cart_items.data)
            }
        } catch (error) {
            console.log(error)
        }
    },
    async add (ctx, payload) {
        try {
            const { success, data, message } = await this.$axios.$post('/api/carts/add', payload.params);
            if (success) {
                let item = {
                    product: payload.product_item,
                    qty: payload.qty,
                    variation_id: payload.params.variation_id,
                    variation: payload.params.variation
                }
                ctx.commit('add', item)
                // window.localStorage.setItem('tempUserId', payload.temp_user_id);
                // await ctx.dispatch('get', payload.temp_user_id);
                if (message) {
                    return message || null
                }
            }
        } catch (error) {
            console.log(error)
            return { message: null }
        }
    },
    async deleteCart (ctx, payload) {
        try {
            const { success, message } = await this.$axios.$post('/api/carts/destroy', payload.params);
            if (success) {
                ctx.commit('delete', payload.product_id)
                // await ctx.dispatch('get', payload.temp_user_id);
            }
            if (message) {
                return message
            }
        } catch (error) {
            console.log(error)
        }
    },
    async updateQuanty (ctx, payload) {
        ctx.commit('showLoading', true)
        try {
            const { success, message } = await this.$axios.$post('/api/carts/change-quantity', payload.params, {cancelToken: payload.cancelToken});
            if (success) {
                ctx.commit('qtyEdit', payload)
                // await ctx.dispatch('get', payload.temp_user_id);
                ctx.commit('showLoading', false)
                return { success, message }
            } else {
                ctx.commit('showLoading', false)
                return { success, message } || { success: null, message: null }
            }
        } catch (error) {
            console.log(error)

            return { success: false }
        }
    },
};