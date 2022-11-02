export const state = () => ({
    locale: null,
    default: null,
    locales: [],
});

export const mutations = {
    setLocale(state, locale) {
        window.localStorage.setItem('locale', locale);
        state.locale = locale;
        // window.dispatchEvent(new Event('locale', {
        //     detail: {locale}
        // }));
    },
    setLocales(state, locales) {
        window.localStorage.setItem('locales', locales);
        state.locales = locales;
    },
    setDefault(state, locale) {
        state.default = locale;
    }
};

export const actions = {
}

export const getters = {
    locale: state => state.locale,
    localeName: state => state.locales.find(({code}) => code === state.locale)?.name ?? 'Русский',
    locales: state => state.locales,
    availableLocales: state => state.locales.filter(({code}) => code !== state.locale),
    default: state => state.default,
};
