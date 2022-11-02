export const SET_DATA = 'SET_DATA';
export const DATA_READY = 'DATA_READY';

export const state = () => (
    {
        header: {
            data: {
                loading: true,
                phone: null,
                language: null,
                login: null,
                register: null,
                search: null,
                account: null,
                wishlist: null,
                bucket: null,
                logo: null,
                navigations: [],
                menu: [],
            },
            success: false
        },
        headerReady: false
    }
);

export const getters = {
    getHeaderMenu: (state) => {
        return state.header.data.menu
    },
    getHeader: (state) => {
        return state.header.data
    },
    headerReady: (state) => {
        return state.headerReady
    },
};

export const actions = {
    async getHeaderData({ commit }) {
        await this.$axios.$get('/api/header')
            .then(response => {
                commit(SET_DATA, response)
            })
            .finally(() => {
                commit(DATA_READY, true)
            });

    }
};

export const mutations = {
    [SET_DATA](state, payload) {
        state.header = payload;
    },
    [DATA_READY](state, payload) {
        state.headerReady = payload;
    },
}