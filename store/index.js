export const state = () => ({
	error: null,
	loading: false
});
export const mutations = {
	setError(state, error) {
		state.error = error;
	},
	clearError(state) {
		state.error = null;
	},
	setLoading (state, payload) {
		state.loading = payload;
	},
    clearStore(state) {
        state.wishlist.list = null
        state.basket.cart = null
	}
};
export const getters = {
	error: (state) => state.error,
};
