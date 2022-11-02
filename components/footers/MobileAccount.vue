<template>
        <div class="mobile-account" :class="{ 'activ-mobile-account': mobileAccount }">
            <div class="mobile-account-head">
                <auth-bar/>
                <div class="close-mobile-account" @click="toggleMobileAccount">
                    <hum-cross  :dark="true" :cross="true" />
                </div>
            </div>
            <div class="mobile-account-list">
                <div v-if="true">
                    <locale-link v-for="(tab, index) in tabs" :key="index" :to="`/account/${tab.slug}`">
                        <span :class="tab.icon">{{tab.title}}</span>
                    </locale-link>
                    <button @click="$auth.logout()">
                        <span class="azor-sing_out">Выйти</span>
                    </button>
                </div>
            </div>
        </div>
</template>

<script>
import tabs from '~/mixins/tabs-data';
import { mapState, mapActions } from 'vuex';
import HumCross from '~/components/ui/HumCross.vue';
import AuthBar from '../headers/elements/AuthBar.vue';
export default {
    components: {
        HumCross,
        AuthBar,
    },
    mixins: [tabs],
    computed: {
        ...mapState('elements', ['mobileAccount']),

    },
    methods: {
        ...mapActions('elements', ['toggleMobileAccount', 'toggleCartList', 'closeAll']),

    }
};
</script>
