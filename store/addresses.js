export const initialState = {
	addresses: [],
	countries: [],
	cities: [],
	states: []
};

export const state = () => ({
	...initialState
});

export const mutations = {
	set_countries (state, payload) {
		state.countries = payload;
	},
	set_states (state, payload) {
		state.states = payload;
	},
	set_cities (state, payload) {
		state.cities = payload;
	},
	set_user_addresses (state, payload) {
		state.addresses = payload;
	}
};

export const actions = {
	async getCountries (ctx) {
		try {
			const { data, success } = await this.$axios.$get('/api/all-countries');
			if (success) {
				ctx.commit('set_countries', data);
			}
		} catch (error) {
			console.log(error)
		}
	},
	async getStates (ctx, country) {
		try {
			const { data, success } = await this.$axios.$get(`/api/states/${country}`);
			if (success) {
				ctx.commit('set_states', data)
			}
		} catch (error) {
			console.log(error)
		}
	},
	async getCities (ctx, state) {
		try {
			const { data, success } = await this.$axios.$get(`/api/cities/${state}`);
			if (success) {
				ctx.commit('set_cities', data)
			}
		} catch (error) {
			console.log(error)
		}
	},
	async getUserAddresses (ctx) {
		try {
			const { data, success } = await this.$axios.$get('/api/user/addresses');
			if (success) {
				ctx.commit('set_user_addresses', data)
			}
		} catch (error) {
			console.log(error)
		}
	},
	async deleteAddress (ctx, id) {
		try {
			const { data, success } = await this.$axios.$get(`/api/user/address/delete/${id}`);
			if (success) {
				ctx.dispatch('getUserAddresses');
			}
		} catch (error) {
			console.log(error)
		}
	}
};
