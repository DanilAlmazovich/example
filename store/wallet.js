export const initialState = {
	history: null,
	links: null
};

export const state = () => ({
	...initialState
});

export const mutations = {
	set (state, payload) {
		state.history = payload.data;
		state.links = payload.links;
	}
};

export const actions = {
	async get (ctx) {
		try {
			const { success, data, links } = await this.$axios.$get('/api/user/wallet/history');
			if (success) {
				ctx.commit('set', { data, links })
			}
		} catch (error) {
			console.log(error)
		}
	}
};