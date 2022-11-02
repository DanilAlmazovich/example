export const state = () => ({
    resent: [],
});

export const mutations = {
    add(state, product){
        state.resent = state.resent.filter(({id}, i)=> id !== product.id && i < 10);
        state.resent.unshift(product);
    }
};

export const actions = {
}

export const getters = {
    resent: state => state.resent,
};
