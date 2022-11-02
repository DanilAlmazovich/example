import en from '../static/locales/en.json'
import ru from '../static/locales/ru.json'
import ky from '../static/locales/ky.json'
import tr from '../static/locales/tr.json'

export default
{
    locales: ['ru', 'ky', 'en', 'tr'],
    defaultLocale: 'ru',
    strategy: 'prefix_except_default',
    vueI18n: {
        locale: 'ru',
        fallbackLocale: 'ru',
        messages: {ru, en, ky, tr}
    },
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        alwaysRedirect: true,
        fallbackLocale: 'ru'
    }
}