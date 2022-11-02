export default {
    methods: {
        scrollTop() {
            const scroll = window.scrollY
            window.scrollTo({
                top: scroll,
                behavior: 'smooth',
            });
        },
    }
}