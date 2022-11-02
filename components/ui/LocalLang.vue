<template>
    <select v-if="locale" :value="locale" @input="changeLocale">
        <option
            v-for="{ name, code } in locales"
            :key="code"
            :value="code"
            v-text="name"
        />
    </select>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
    data() {
        return {
            localeLoading: true,
        };
    },
    computed: {
        ...mapGetters('locale', [
            'locale',
            'locales',
            'availableLocales',
            'localeName',
        ]),
    },
    methods: {
        ...mapMutations('locale', ['setLocale']),
        changeLocale(e) {
            const value = e.target.value;
            this.setLocale(value);
            this.$i18n.setLocale(value);
        },
        changeHtmlLang() {
            const html = document.getElementsByTagName('html')?.[0];
            if (html) html.setAttribute('lang', this.locale);
        },
    },
    async mounted() {
        this.changeHtmlLang(this.locale);
        addEventListener('locale', this.changeHtmlLang);
    },
    beforeDestroy() {
        removeEventListener('locale', this.changeHtmlLang);
    },
};
</script>

<style>
</style>