import axios from 'axios';
export const sitemap = function () {

    let items = {
        path: 'sitemap.xml',
        sitemaps: [],
        changefreq: 'hourly',
        priority: 1,
        hostname: 'https://azor.kg',
        lastmod: new Date(),
        gzip: true,

    }
    let total = 15
    const getCategories = async () => {
        try {
            for (let i = 0;i <= 2; i++) {
                let lang = ['','en','ky'];
                items.sitemaps.push({
                    path: `/sitemap_${lang[i]}_categories.xml`,
                    routes: async () => {
                        const {data} = await axios.get('http://api.dev.azor.kg/api/v1/categories', {
                            params: {
                                paginate: 40,
                                page: i,
                            }
                        })
                        return data.data.map(v => `/${lang[i]}/products?category-context=${v.uuid}%3A${v.name}`);

                    },        exclude: [
                        '/brands',
                        '/categories',
                        '/checkout',
                        '/coming-soon',
                        '/login',
                        '/recovery-password',
                        '/reset',
                        '/signup',
                        '/site-map',
                        '/total-order',
                        '/'
                    ]
                })

            }}
        catch (e) {
            console.log(e)
        }
    }
    const getBrands = async () => {
        try {
            for (let i = 0;i <= 2; i++) {

                let lang = ['','en','ky'];
                items.sitemaps.push({
                    path: `/sitemap_${lang[i]}_brands.xml`,
                    routes: async () => {
                        const {data} = await axios.get('http://api.dev.azor.kg/api/v1/brands', {
                            params: {
                                paginate: 50000,
                                page: i,
                            }
                        })
                        return data.data.map(v => `/${lang[i]}/products?brand-context=${v.uuid}%3A${v.name}`)
                    },
                })

            }}
        catch (e) {
            console.log(e)
        }
    }

    const getRusRoutes = async () => {
        try {
                for (let i = 1;i <=  total; i++) {
                    items.sitemaps.push({
                        path: `/sitemap_products_${i}.xml`,
                        routes: async () => {
                            const {data} = await axios.get('http://api.dev.azor.kg/api/v1/slugs/products', {
                                params: {
                                    paginate: 50000,
                                    page: i,
                                }
                            })
                            return data.data.map(v => `/product/${v}`);
                        },
                        exclude: [
                            '/brands',
                            '/categories',
                            '/checkout',
                            '/coming-soon',
                            '/login',
                            '/recovery-password',
                            '/reset',
                            '/signup',
                            '/site-map',
                            '/total-order',
                            '/'
                        ]
                    })

            }}
        catch (e) {
            console.log(e)
        }
    }
    const getEnRoutes = async () => {
        try {
            for (let i = 1;i <= total; i++) {
                items.sitemaps.push({
                    path: `/sitemap_en_products_${i}.xml`,
                    routes: async () => {
                        const {data} = await axios.get('http://api.dev.azor.kg/api/v1/slugs/products', {
                            params: {
                                paginate: 50000,
                                page: i,
                            }
                        })
                        return data.data.map(v => `/en/product/${v}`);

                    },        exclude: [
                        '/brands',
                        '/categories',
                        '/checkout',
                        '/coming-soon',
                        '/login',
                        '/recovery-password',
                        '/reset',
                        '/signup',
                        '/site-map',
                        '/total-order',
                        '/'
                    ]
                })

            }}
        catch (e) {
            console.log(e)
        }
    }

    const getKyRoutes = async () => {
        try {
            for (let i = 1;i <= total; i++) {
                items.sitemaps.push({
                    path: `/sitemap_ky_products_${i}.xml`,
                    routes: async () => {
                        const {data} = await axios.get('http://api.dev.azor.kg/api/v1/slugs/products', {
                            params: {
                                paginate: 50000,
                                page: i,
                            }
                        })
                        return data.data.map(v => `/ky/product/${v}`);

                    },         exclude: [
                        '/brands',
                        '/categories',
                        '/checkout',
                        '/coming-soon',
                        '/login',
                        '/recovery-password',
                        '/reset',
                        '/signup',
                        '/site-map',
                        '/total-order',
                        '/'
                    ]
                })

            }}
        catch (e) {
            console.log(e)
        }
    }

    getBrands()
    getCategories()
    getRusRoutes()
    getEnRoutes()
    getKyRoutes()

    return items
}



