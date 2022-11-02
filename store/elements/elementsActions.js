export const CHANGE_SCROLL = 'CHANGE_SCROLL';
export const CHANGE_MOBILE_MENU = 'CHANGE_MOBILE_MENU';
export const CHANGE_MOBILE_SEARCH = 'CHANGE_MOBILE_SEARCH';
export const CHANGE_MOBILE_CATEGORY = 'CHANGE_MOBILE_CATEGORY';
export const CHANGE_MOBILE_ACCOUNT = 'CHANGE_MOBILE_ACCOUNT';
export const CHANGE_CART_LIST = 'CHANGE_CART_LIST';
export const CHANGE_HEADER_CATEGORY = 'CHANGE_HEADER_CATEGORY';
export const CHANGE_PRODUCTS_FILTERS = 'CHANGE_PRODUCTS_FILTERS';


export default {
    toggleMobileMenu: function ({ commit, state }) {
        commit( CHANGE_MOBILE_CATEGORY, false );
        commit( CHANGE_MOBILE_SEARCH, false );
        commit( CHANGE_CART_LIST, false );
        commit( CHANGE_HEADER_CATEGORY, false );
        commit( CHANGE_MOBILE_ACCOUNT, false );
        commit( CHANGE_PRODUCTS_FILTERS, false );
        if(state.mobileMenu) {
            commit( CHANGE_MOBILE_MENU, false );
            commit( CHANGE_SCROLL, 'auto' );
        } else {
            commit( CHANGE_MOBILE_MENU, true );
            commit( CHANGE_SCROLL, 'hidden' );
        }
    },
    toggleMobileAccount: function ({ commit, state }) {
        commit( CHANGE_MOBILE_CATEGORY, false );
        commit( CHANGE_MOBILE_SEARCH, false );
        commit( CHANGE_CART_LIST, false );
        commit( CHANGE_HEADER_CATEGORY, false );
        commit( CHANGE_MOBILE_MENU, false );
        commit( CHANGE_PRODUCTS_FILTERS, false );
        if(state.mobileAccount) {
            commit( CHANGE_MOBILE_ACCOUNT, false );
            commit( CHANGE_SCROLL, 'auto' );
        } else {
            commit( CHANGE_MOBILE_ACCOUNT, true );
            commit( CHANGE_SCROLL, 'hidden' );
        }
    },
    toggleCartList: function ({ commit, state }) {
        commit( CHANGE_MOBILE_CATEGORY, false );
        commit( CHANGE_MOBILE_SEARCH, false );
        commit( CHANGE_MOBILE_MENU, false );
        commit( CHANGE_HEADER_CATEGORY, false );
        commit( CHANGE_MOBILE_ACCOUNT, false );
        commit( CHANGE_PRODUCTS_FILTERS, false );
        if(state.cartList) {
            commit( CHANGE_CART_LIST, false );
            commit( CHANGE_SCROLL, 'auto' );
        } else {
            commit( CHANGE_CART_LIST, true );
            commit( CHANGE_SCROLL, 'hidden');
        }
    },
    toggleHeaderCategory: function ({ commit, state }) {
        commit( CHANGE_MOBILE_CATEGORY, false );
        commit( CHANGE_MOBILE_SEARCH, false );
        commit( CHANGE_CART_LIST, false );
        commit( CHANGE_MOBILE_MENU, false );
        commit( CHANGE_MOBILE_ACCOUNT, false );
        commit( CHANGE_PRODUCTS_FILTERS, false );
        if(state.headerCategory) {
            commit( CHANGE_HEADER_CATEGORY, false );
            commit( CHANGE_SCROLL, 'auto' );
        } else {
            commit( CHANGE_HEADER_CATEGORY, true );
            commit( CHANGE_SCROLL, 'hidden' );
        }
    },
    toggleMobileSearch: function ({ commit, state }) {
        commit( CHANGE_MOBILE_CATEGORY, false );
        commit( CHANGE_HEADER_CATEGORY, false );
        commit( CHANGE_CART_LIST, false );
        commit( CHANGE_MOBILE_MENU, false );
        commit( CHANGE_MOBILE_ACCOUNT, false );
        commit( CHANGE_PRODUCTS_FILTERS, false );
        if(state.mobileSearch) {
            commit( CHANGE_MOBILE_SEARCH, false );
            commit( CHANGE_SCROLL, 'auto' );
        } else {
            commit( CHANGE_MOBILE_SEARCH, true );
            commit( CHANGE_SCROLL, 'hidden' );
        }
    },
    toggleMobileCategory: function ({ commit, state }) {
        commit( CHANGE_MOBILE_SEARCH, false );
        commit( CHANGE_HEADER_CATEGORY, false );
        commit( CHANGE_CART_LIST, false );
        commit( CHANGE_MOBILE_MENU, false );
        commit( CHANGE_MOBILE_ACCOUNT, false );
        commit( CHANGE_PRODUCTS_FILTERS, false );
        if(state.mobileCategory) {
            commit( CHANGE_MOBILE_CATEGORY, false );
            commit( CHANGE_SCROLL, 'auto' );
        } else {
            commit( CHANGE_MOBILE_CATEGORY, true );
            commit( CHANGE_SCROLL, 'hidden' );
        }
    },
    toggleMobileCategory: function ({ commit, state }) {
        commit( CHANGE_MOBILE_SEARCH, false );
        commit( CHANGE_HEADER_CATEGORY, false );
        commit( CHANGE_CART_LIST, false );
        commit( CHANGE_MOBILE_MENU, false );
        commit( CHANGE_MOBILE_ACCOUNT, false );
        commit( CHANGE_PRODUCTS_FILTERS, false );
        if(state.mobileCategory) {
            commit( CHANGE_MOBILE_CATEGORY, false );
            commit( CHANGE_SCROLL, 'auto' );
        } else {
            commit( CHANGE_MOBILE_CATEGORY, true );
            commit( CHANGE_SCROLL, 'hidden' );
        }
    },
    toggleProductsFilters: function ({ commit, state }) {
        commit( CHANGE_MOBILE_SEARCH, false );
        commit( CHANGE_HEADER_CATEGORY, false );
        commit( CHANGE_CART_LIST, false );
        commit( CHANGE_MOBILE_MENU, false );
        commit( CHANGE_MOBILE_ACCOUNT, false );
        commit( CHANGE_HEADER_CATEGORY, false );
        if(state.productsFilters) {
            commit( CHANGE_PRODUCTS_FILTERS, false );
            commit( CHANGE_SCROLL, 'auto' );
        } else {
            commit( CHANGE_PRODUCTS_FILTERS, true );
            commit( CHANGE_SCROLL, 'hidden' );
        }
    },
    closeAll: function ({commit}) {
        commit( CHANGE_MOBILE_SEARCH, false );
        commit( CHANGE_MOBILE_MENU, false );
        commit( CHANGE_MOBILE_ACCOUNT, false );
        commit( CHANGE_MOBILE_CATEGORY, false );
        commit( CHANGE_HEADER_CATEGORY, false );
        commit( CHANGE_CART_LIST, false );
        commit( CHANGE_SCROLL, 'auto' );
    },
    closeAllNotTo: function ({commit}) {
        commit( CHANGE_PRODUCTS_FILTERS, false );
        commit( CHANGE_SCROLL, 'auto' );
    }
};