export const CHANGE_SCROLL = 'CHANGE_SCROLL';
export const CHANGE_MOBILE_MENU = 'CHANGE_MOBILE_MENU';
export const CHANGE_MOBILE_SEARCH = 'CHANGE_MOBILE_SEARCH';
export const CHANGE_MOBILE_CATEGORY = 'CHANGE_MOBILE_CATEGORY';
export const CHANGE_MOBILE_ACCOUNT = 'CHANGE_MOBILE_ACCOUNT';
export const CHANGE_CART_LIST = 'CHANGE_CART_LIST';
export const CHANGE_HEADER_CATEGORY = 'CHANGE_HEADER_CATEGORY';
export const CHANGE_PRODUCTS_FILTERS = 'CHANGE_PRODUCTS_FILTERS';


export default {
    [ CHANGE_CART_LIST ] ( state, payload ) {
        state.cartList = payload
    },
    [ CHANGE_MOBILE_MENU ] ( state, payload ) {
        state.mobileMenu = payload
    },
    [ CHANGE_MOBILE_CATEGORY ] ( state, payload ) {
        state.mobileCategory = payload
    },
    [ CHANGE_HEADER_CATEGORY ] ( state, payload ) {
        state.headerCategory = payload
    },
    [ CHANGE_MOBILE_SEARCH ] ( state, payload ) {
        state.mobileSearch = payload
    },
    [ CHANGE_MOBILE_ACCOUNT ] (state, payload) {
        state.mobileAccount = payload
    },
    [ CHANGE_PRODUCTS_FILTERS ] (state, payload) {
        state.productsFilters = payload
    },
    [ CHANGE_SCROLL ] (state, payload ) {
        document.querySelector('body').style.overflow = payload
    },
}