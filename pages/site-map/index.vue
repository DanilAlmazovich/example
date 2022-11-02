<template>
  <section 
    class="site-map-section"
    v-lazy:background-image="'./images/backgrounds/site-map.jpg'"
    >
    <locale-link to="/"
    class="site-map-logo" 
    tag="img"
            v-lazy="'./images/icons/logo-white.svg'"
            alt="AZOR"
            width="198"
            height="60"
    >
    </locale-link>
    <div class="site-map-list">
        <ul class="site-map-ul">
            <li><locale-link class="site-map-link" to="/">Главная</locale-link></li>
            <li><locale-link class="site-map-link" to="/categories">Каталог товаров</locale-link></li>
            <li><locale-link class="site-map-link" to="/brands">Страница брендов</locale-link></li>
            <li><locale-link class="site-map-link" to="/login">Вход</locale-link></li>
            <li><locale-link class="site-map-link" to="/signup">Регистрация</locale-link></li>
        </ul>
                <ul class="site-map-ul">
            <li><locale-link class="site-map-link" to="/account">Страница товаров</locale-link></li>
            <li><locale-link class="site-map-link" to="/account">Карточка товара</locale-link></li>
            <li><locale-link class="site-map-link" to="/account">Корзина</locale-link></li>
            <li><locale-link class="site-map-link" to="/account">Оформление заказа</locale-link></li>
            <li><locale-link class="site-map-link" to="/account">Итог заказа</locale-link></li>
        </ul>
                <ul class="site-map-ul">
            <li><locale-link class="site-map-link" to="/account">Личный кабинет</locale-link></li>
            <li><locale-link class="site-map-link" to="/account/purchase-history'">История покупок</locale-link></li>
            <li><locale-link class="site-map-link" to="/account/wishlist">Список желаний</locale-link></li>
            <li><locale-link class="site-map-link" to="/account/wallet">Мой кошелек</locale-link></li>
            <li><locale-link class="site-map-link" to="/account/profile-settings">Настройки профиля</locale-link></li>
        </ul>
    </div>

  </section>
</template>

<script>
export default {
  head() {
    return {
      title: "AZOR - Карта сайта",
    }
  },
    layout: 'empty',

}
</script>

<style lang="scss">

</style>