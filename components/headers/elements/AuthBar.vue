<template>
    <div class="auth-bar">
        <i class="azor-user_ring"></i>
        <div class="auth-user-data" v-if="$store.state.auth.loggedIn">
            <b>{{ $store.state.auth.user.name }}</b>
            <span>{{ $store.state.auth.user.email }}</span>
        </div>
        <div class="auth-bar-link" v-else>
            <locale-link to="/signup" tag="a">Регистрация</locale-link>
            /
            <locale-link to="/login" tag="a">Войти</locale-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.auth-bar {
    display: flex;
    align-items: center;
    gap: 10px;
    height: 38px;

    .azor-user_ring {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 50px;
        height: 38px;

        &::before {
            margin: 0;
        }
    }

    .auth-user-data {
        display: flex;
        flex-direction: column;
        line-height: 23px;
    }

    .auth-bar-link {
        display: flex;
        align-items: center;
        gap: 10px;

        a {
            font-size: 14px;
            font-weight: 500;
        }
    }
}
</style>