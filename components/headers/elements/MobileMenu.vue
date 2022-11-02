<template>
    <div class="mobile-menu" :class="{ 'acive-mobile-menu': mobileMenu }">
        <div class="mobile-menu-head">
            <div class="mobile-menu-lang">
                <div>
                    <span>Выберите язык:</span>
                    <local-lang />
                </div>
                <div class="close-mobile-menu" @click="toggleMobileMenu">
                    <hum-cross :dark="true" :cross="true" />
                </div>
            </div>
            <auth-bar />
        </div>
        <div class="mobile-menu-list">
            <div
                class="mobile-menu-item"
                v-for="(navigate, index) in getHeader.navigations"
                :key="index + 1"
            >
                <locale-link
                    class="mobile-menu-link"
                    :to="navigate.value"
                    v-if="navigate.type === 'link'"
                    >{{ navigate.name }}</locale-link
                >
                <drop-down
                    :dark="true"
                    v-else-if="navigate.type === 'dropdown'"
                    :buttonText="navigate.name"
                    :items="navigate.value"
                    buttonClass="mobile-menu-link"
                />
            </div>
        </div>
        <div class="mobile-menu-social">
            <social-bar />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import SocialBar from '~/components/ui/SocialBar.vue';
import DropDown from '~/components/ui/DropDown.vue';
import HumCross from '~/components/ui/HumCross.vue';
import AuthBar from './AuthBar.vue';
import LocalLang from '~/components/ui/LocalLang.vue';
export default {
    components: {
        HumCross,
        AuthBar,
        DropDown,
        SocialBar,
        LocalLang,
    },
    data() {
        return {
            header: {},
        };
    },
    computed: {
        ...mapState('elements', ['mobileMenu']),
        ...mapGetters('header', ['getHeader']),
    },
    methods: {
        ...mapActions('elements', ['toggleMobileMenu', 'closeAll']),
    },
};
</script>

<style lang="scss">
.mobile-menu {
    display: grid;
    padding-bottom: 5px;
    grid-template-rows: 132px calc(100% - 210px) 38px;
    gap: 20px;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    overflow-y: auto;
    width: 100%;
    max-width: 526px;
    background-color: white;
    z-index: 3500;
    transform: translateX(-100%);
    transition: 0.3s;
}
.acive-mobile-menu {
    transform: translateX(0);
}

.mobile-menu-head {
    padding: 20px 10px;
    box-shadow: 0px 2px 10px rgba(19, 25, 33, 0.1);
    .mobile-menu-lang {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        div {
            &:first-child {
                display: grid;
                grid-template-rows: 12px 20px;
                gap: 2px;
                span {
                    display: flex;
                    align-items: center;
                    font-size: 12px;
                }
                select {
                    margin-left: -3px;
                    border: none;
                }
            }
        }
    }
}

.mobile-menu-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100%;
    gap: 10px;
    .mobile-menu-item {
        background-color: #fcfcfc;
        padding: 10px 10px;
        .mobile-menu-link {
            font-weight: 600;
            font-size: 18px;
            text-align: left;
            padding: 0;
        }
    }
}
.mobile-menu-social {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 100%;
    padding: 0 10px;
}
</style>