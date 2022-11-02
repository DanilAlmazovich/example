<template>
    <div
            class="login_img"
            v-lazy:background-image="'./images/azor_images/login_register/login.png'"
            alt="register">
        <div class="login_form__top">
            <img v-lazy="'./images/azor_images/login_register/azor_logo.png'" alt="azor">
            <h3>Твой лучший друг в <br> мире покупок!</h3>
        </div>
        <div class="login_form__bottom">
            <p>Преимущества зарегистрированного пользователя:</p>
            <ul>
                <li>Отслеживание заказов на персональной странице</li>
                <li>Возможность настроить магазин под себя для более удобных покупок</li>
                <li>Ускоренное оформление последующих заказов</li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    name: "FormImage",
  }
</script>
