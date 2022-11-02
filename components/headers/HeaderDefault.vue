<template>
    <header v-if="headerReady" class="header container">
        <div class="header-top">
            <a v-if="getHeader.phone" class="azor-phone" :href="`tel:${getHeader.phone.replace(/\s/g, '')}`" v-text="getHeader.phone" />
            <div class="header-top-links" v-if="getHeader.language">
                <local-lang />
                <div class="header-top-auth" v-if="loggedIn">
                    <button class="header-top-logout" @click="logout" v-if="$store.state.auth.loggedIn">
                        Выйти
                    </button>
                </div>
                <div class="header-top-auth" v-else>
                    <locale-link to="/login" v-if="getHeader.login">
                        {{ $t('header.signin') }}
                    </locale-link>
                    <template v-if="getHeader.login && getHeader.register">
                        /
                    </template>
                    <locale-link to="/signup" v-if="getHeader.register">
                        Зарегистрироваться
                    </locale-link>
                </div>
            </div>
        </div>
        <fixed-nav v-if="mobileStart">
            <button class="azor-burger" @click="toggleMobileMenu"></button>
            <locale-link v-if="getHeader.logo" to="/" class="logo cursor-pointer" tag="img" v-lazy="getHeader.logo"
                alt="AZOR" width="105" height="25" />
            <div class="header-middle-search" v-if="getHeader.search">
                <header-search />
            </div>
            <div class="mobile-search-button azor-search" @click="toggleMobileSearch"></div>
            <user-bar v-if="getHeader.account || getHeader.wishlist || getHeader.bucket" :account="getHeader.account"
                :wishList="getHeader.wishlist" :cart="getHeader.bucket" />
        </fixed-nav>
        <div class="header-middle" v-else>
            <button class="azor-burger" @click="toggleMobileMenu"></button>
            <locale-link v-if="getHeader.logo" to="/" class="logo cursor-pointer" tag="img" v-lazy="getHeader.logo"
                alt="AZOR" width="105" height="25" />
            <div class="header-middle-search" v-if="getHeader.search">
                <header-search />
            </div>
            <div class="mobile-search-button azor-search" @click="toggleMobileSearch"></div>
            <user-bar v-if="getHeader.account || getHeader.wishlist || getHeader.bucket" :account="getHeader.account"
                :wishList="getHeader.wishlist" :cart="getHeader.bucket" />
        </div>
        <sticky-header v-if="getHeader.navigations && getHeader.navigations.length">
            <div class="sticky-header">
                <div class="header-bottom">
                    <div class="header-bottom-container">
                        <button v-if="getHeader.menu && getHeader.menu.length" class="category-button"
                            @click="toggleHeaderCategory">
                            <hum-cross :dark="false" :cross="headerCategoryState" />
                            <b v-text="'Каталог товаров'" />
                        </button>
                        <header-nav :header="getHeader" />
                    </div>
                </div>
            </div>
        </sticky-header>
        <header-catalog/>
        <pop-cart />
        <mobile-search v-if="mobileStart"/>
        <mobile-menu v-if="mobileStart"/>
    </header>
    <div class="container skel-header" v-else> 
        <div class="skel-top">
            <div class="skeleton skel-tel"></div>
            <div class="skeleton skel-lang"></div>
        </div>
        <div class="skeleton skel-middle"></div>
        <div class="skeleton skel-bottom"></div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import PopCart from '~/components/headers/cartList/PopCart';
import HeaderSearch from '~/components/search/HeaderSearch';
import StickyHeader from './elements/StickyHeader';
import UserBar from './elements/UserBar.vue';
import HeaderNav from './elements/HeaderNav.vue';
import HumCross from '~/components/ui/HumCross.vue';
import MobileSearch from '../search/MobileSearch.vue';
import MobileMenu from './elements/MobileMenu.vue';
import LocalLang from '~/components/ui/LocalLang.vue';
import HeaderCatalog from '~/components/catalog//HeaderCatalog';
import HeaderNotify from '../ui/HeaderNotifi.vue';
import FixedNav from './elements/FixedNav.vue';

export default {
    components: {
    PopCart,
    HeaderSearch,
    UserBar,
    HeaderNav,
    HumCross,
    MobileSearch,
    MobileMenu,
    LocalLang,
    StickyHeader,
    HeaderCatalog,
    HeaderNotify,
    FixedNav
},
    data() {
        return {
            pageHeight: 0,
            localeLoading: true,
            mobileStart: false
        };
    },
    computed: {
        ...mapGetters('elements', ['headerCategoryState']),
        ...mapGetters('header', ['getHeader', 'headerReady']),
        ...mapState('header', ['header']),
        ...mapGetters('locale', [
            'locale',
            'locales',
            'availableLocales',
            'localeName',
        ]),
        ...mapState({
            loggedIn: (state) => state.auth.loggedIn,
        }),
    },
    methods: {
        ...mapActions('header', ['getHeaderData']),
        ...mapActions('elements', [
            'toggleHeaderCategory',
            'toggleMobileMenu',
            'toggleMobileSearch',
            'closeAll',
        ]),
        async logout() {
            this.$store.commit('setLoading', true);
            await this.$auth.logout();
            this.$store.commit('clearStore');
            this.$store.commit('setLoading', false);
            window.localStorage.setItem('tempUserId', generatedUserId());
        },
        setMobile() {
            if (this.width = window.innerWidth <= 991) {
                this.mobileStart = true;
            } else {
                this.mobileStart = false;
            }
        },
        getBasket() {
            if (!window.localStorage.getItem('tempUserId')) {
                window.localStorage.setItem('tempUserId', generatedUserId());
            }
            this.$store.commit('setLoading', false);
            if (window.localStorage.getItem('tempUserId')) {
                this.$store.dispatch(
                    'basket/get', {temp_user_id: +window.localStorage.getItem('tempUserId')}
                );
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.setMobile, { passive: true });
        this.getHeaderData();
        this.getBasket();
        if (this.$store.state.auth.loggedIn) {
            this.$store.dispatch('wishlist/get')
        };
        this.setMobile();
        this.closeAll();
    },
    destroyed () {
        window.addEventListener('resize', this.setMobile, { passive: true });
    },
    watch: {
        $route(to, from) {
            this.closeAll();
        },
    },
};
const generatedUserId = () => {
    const date = new Date();
    return date.getTime();
};
</script>
<style lang="scss">
.skel-top {
    display: flex;
    justify-content: space-between;
    height: 39px;

    .skel-tel {
        height: 100%;
        width: 138.4px;
    }

    .skel-lang {
        height: 100%;
        width: 282px;
    }
}

.skel-middle {
    height: 58px;
    margin: 23px 0;
}

.skel-bottom {
    height: 52px;
}
</style>