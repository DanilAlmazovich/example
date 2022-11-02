<template>
    <div :key="locale" v-cloak>
        <header-notifi />
        <div class="page-wrapper">
            <header-default v-if="locale" />
            <nuxt v-if="locale"/>
            <div class="modal-bg-transparent" @click="closeModals" :class="{'modal-bg-active': headerCategory}"/>
            <div class="modal-bg-blur"
                 @click="closeModals"
                 :class="{'modal-bg-active': cartList || mobileMenu || mobileSearch || mobileCategory || mobileAccount || productsFilters}"
            />
            <footer-default v-if="locale" v-cloak/>
            <button id="scroll-top" ref="scrollTop" title="Back to Top" @click.prevent="triggerTop">
                <i class="azor-up-open-big"/>
            </button>
        </div>
        <mobile-nav/>
        <notifications width="auto" />
        <spinner v-if="loading" :viewport="loading"/>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
import scrollTop from '~/mixins/scroll-top';
import MobileNav from '~/components/footers/MobileNav';
import HeaderDefault from '~/components/headers/HeaderDefault';
import FooterDefault from '~/components/footers/FooterDefault';
import { isSafariBrowser, isEdgeBrowser } from '~/utilities/common';
import Spinner from '~/components/ui/Spinner';
import HeaderNotifi from '~/components/ui/HeaderNotifi.vue';

export default {
    components: {
        HeaderDefault,
        MobileNav,
        FooterDefault,
        Spinner,
        HeaderNotifi,
    },

    data() {
        return {
            loadingHeader: true,
        };
    },

    computed: {
        ...mapState('elements', [
            'cartList',
            'mobileMenu',
            'productsFilters',
            'headerCategory',
            'mobileSearch',
            'mobileCategory',
            'mobileAccount',
        ]),
        ...mapState({
            loading: (state) => state.loading,
        }),
        ...mapGetters('locale', ['locale']),
    },
    mixins: [scrollTop],
    methods: {
        ...mapMutations('locale', ['setLocale', 'setLocales', 'setDefault']),
        ...mapActions('elements', ['toggleHeaderCategory', 'closeAll', 'closeAllNotTo']),
        closeModals() {
            this.closeAll();
            this.closeAllNotTo();
        },
        triggerTop () {
            if (isSafariBrowser() || isEdgeBrowser()) {
                let pos = window.pageYOffset;
                let timerId = setInterval(() => {
                    if (pos <= 0) clearInterval(timerId);
                    window.scrollBy(0, -120);
                    pos -= 120;
                }, 1);
            } else {
                this.scrollTop()
            }
        },
        getLocales() {
            this.$axios
                .get('/api/locales')
                .then((response) => response.data ?? { success: false })
                .then(({ data, success }) => {
                    if (success) {
                        this.setLocales(data?.all ?? []);
                        if (window.localStorage.getItem('locale')) {
                            this.setLocale(window.localStorage.getItem('locale'));
                        }else {
                            this.setLocale(data?.default ?? 'ru');
                        }
                        this.setDefault(data?.default ?? 'ru');
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        },
    },
    mounted() {
        this.getLocales();
        let scrollTop = this.$refs.scrollTop;
        document.addEventListener(
            'scroll',
            function () {
                if (window.pageYOffset >= 400) {
                    scrollTop.classList.add('show');
                } else {
                    scrollTop.classList.remove('show');
                }
            },
            false
        );
    },
}
</script>

<style lang="scss">
.page-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.modal-bg-transparent{
    position: fixed;
    top: 0;
    right: -100%;
    height: 100%;
    width: 100%;
    z-index: 1500;
}
.modal-bg-blur {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100%;
    width: 100%;
    z-index: 2000;
}
.modal-bg-blur {
    backdrop-filter: blur(1px);
    background-color: rgba($color: #000000, $alpha: 0.2);
    transition: background-color 0.3s;
}
.modal-bg-active {
    right: 0;
}
.vue-notification-group {
    .vue-notification-wrapper {
        .vue-notification {
            padding: 6px 12px;
            margin: 0 0 0 5px;
            &.success {
                background: #54b257;
                border-left-color: transparent;
            }
            &.info {
                border-left-color: transparent;
            }
            &.error {
                background: #ed2232;
                border-left-color: transparent;
            }
            .notification-title {
                font-size: 14px;
                white-space: nowrap;
            }
        }
    }
}
</style>