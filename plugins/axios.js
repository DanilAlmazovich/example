export default function ({$axios, redirect, i18n}) {
    $axios.interceptors.request.use((config) => {

        $axios.setHeader('Accept-Language', i18n.locale ?? 'ru')
        return config;
    });
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status);
        if (code === 404) {
            redirect('/pages/404');
        }
    });
}
