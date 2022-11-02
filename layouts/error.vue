<template>
    <section class="error-page container">
        <img v-lazy="'./images/backgrounds/error.svg'" alt="error" />
        <div>
            <div class="error-page-head">
                <h3>Ой... код ошибки 404</h3>
                <span>
                    Страница не найдена <br />
                    Попробуйте вернуться назад или поищите что-нибудь другое.
                </span>
            </div>
            <div class="error-page-button">
                <locale-link :to="$store.state.auth.loggedIn ? '/account' : '/login'" tag="a">Личный кабинет</locale-link>
                <locale-link to="/" tag="a">На главную страницу</locale-link>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: ['error']
};
</script>