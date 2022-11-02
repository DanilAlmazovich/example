import {sitemap} from './utilities/sitemap'
import i18n from './config/i18n'
import head from './config/head'

export default {
    components: true,

    // mode: "universal",
    // target: "server",
    // modern: true,

    head: head,

    scss: ['~/assets/scss/mixins/breakpoints.scss'],
    css: [
        'swiper/dist/css/swiper.css',
        '~/static/css/css-fonts/azor.css',
        '~/static/css/bootstrap.min.css',
        '~/assets/scss/style.scss'
    ],

    plugins: [
        {src: '~/plugins/gtag.js', ssr: false},
        {src: '~/plugins/modals.js', ssr: false},
        {src: '~/plugins/swiper.js', ssr: false},
        // {src: '~/plugins/localStorage.js', ssr: false},
        {src: '~/plugins/modal.js', ssr: false},
        {src: '~/plugins/axios.js', ssr: false},
        {src: '~/plugins/lazyLoad.js', ssr: false},
        {src: '~/plugins/sticky.js', ssr: false},
        {src: '~/plugins/notification-ssr', ssr: true},
        {src: '~/plugins/notification-client', ssr: false},
        {src: '~/plugins/v-mask.js', ssr: false},
        {src: '~/plugins/sessionStorage.js', ssr: false},
    ],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/sitemap',
        '@nuxtjs/robots',
        '@nuxtjs/i18n',
        'nuxt-compress',
        '@nuxtjs/sentry'
    ],
    sentry: {
        dsn: 'http://dd22719803d141f09de7f67d2ee400a0@62.113.108.112:9000/3',
        // https://sentry.nuxtjs.org/sentry/options
        config: {
          // https://docs.sentry.io/platforms/javascript/guides/vue/configuration/options/
        },
    },
    robots: {
        UserAgent: '*',
        Disallow: [
            '*'
        ],
        UserAent: 'Twitterbot'
    },
    router: {
        base: '/',
        linkActiveClass: 'link-active',
        linkExactActiveClass: 'active'
    },

    axios: {
        proxy: true // Can be also an object with default options
    },
    sitemap: sitemap,

    buildModules: [
        '@nuxtjs/google-analytics',
        'nuxt-compress'
    ],

    proxy: {
        // '/api/': { target: 'http://192.168.218.80:8080/api/v1', pathRewrite: { '^/api/': '' } } //ilas api
        // '/api/': { target: 'http://192.168.0.36:8080/api/v1', pathRewrite: { '^/api/': '' } } //Dastan api
        '/api/': {target: 'https://admin.azor.kg/api/v1/', pathRewrite: {'^/api/': ''}}
        // '/api/': {target: 'http://api.dev.azor.kg/api/v1', pathRewrite: {'^/api/': ''}}

    },

    auth: {
        strategies: {
            local: {
                token: {
                    property: 'access_token',
                    global: true
                },
                user: {
                    property: false
                },
                endpoints: {
                    login: {url: '/api/auth/login', method: 'post'},
                    logout: {url: '/api/auth/logout', method: 'get'},
                    user: {url: '/api/auth/user', method: 'get'}
                }
            }
        }
    },

    pageTransition: 'page',

    build: {
        extractCSS: true,
        html: {
            minify: {
                collapseBooleanAttributes: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                processConditionalComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                trimCustomFragments: true,
                useShortDoctype: true,
                preserveLineBreaks: false,
                collapseWhitespace: true
            }
        },
        filenames: {
            chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js')
        }
    },

    generate: {
        subFolders: false,
        fallback: '200.html',
        extractCSS: true,
        html: {
            minify: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                processConditionalComments: true,
                removeAttributeQuotes: false,
                removeComments: false,
                removeEmptyAttributes: true,
                removeOptionalTags: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: false,
                removeStyleLinkTypeAttributes: false,
                removeTagWhitespace: false,
                sortAttributes: true,
                sortClassName: true,
                trimCustomFragments: true,
                useShortDoctype: true
            }
        },
    },

    ssr: true,
    // mode: 'spa',

    server: {
        port: 4000,
        host: 'localhost'
        // host: '0.0.0.0'
    },

    i18n: i18n,
    render: {
        asyncScripts: true,
        http2: {
            push: true,
        }
    }
}



