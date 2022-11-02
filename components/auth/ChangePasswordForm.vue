<template>
    <div class="tab-pane fade show active" id="sign_in">
        <h2 class="login__title">Поменять пароль</h2>
        <form action="#">
            <div class="form-group">
                <label class="login_label__legend">Логин</label>
                <input
                        type="email"
                        class="form-control"
                        required
                />
        <form-validate-error v-if="validateError" :LoginValidateError="validateError" />
            </div>
            <div class="form-group ">
                <label class="login_label__legend">Старый пароль</label>
                <input
                        :type="isPasswordShowOld ? 'text' : 'password'"
                        class="form-control "
                        required
                />
                <div class="visible_password__toggle">
                    <input
                            @click="showOldPassword"
                            class="visible_password"
                            type="checkbox"
                    />
                    <img
                            v-lazy="'./images/azor_images/login_register/forgot_password.svg'"
                            alt="visible_password"
                            class="visible_password_icon"
                    >
                </div>
            </div>
            <div class="form-group ">
                <label class="login_label__legend">Новый пароль</label>
                <input
                        :type="isPasswordShow ? 'text' : 'password'"
                        class="form-control "
                        required
                />
                <div class="visible_password__toggle">
                    <input
                            @click="showPassword"
                            class="visible_password"
                            type="checkbox"
                    />
                    <img
                            v-lazy="'./images/azor_images/login_register/forgot_password.svg'"
                            alt="visible_password"
                            class="visible_password_icon"
                    >
                </div>
            </div>
            <div class="form-group ">
                <label class="login_label__legend">Подтвердите новый пароль</label>
                <input
                        :type="isPasswordShowRepeat ? 'text' : 'password'"
                        class="form-control "
                        required
                />
                <div class="visible_password__toggle">
                    <input
                            @click="showPasswordRepeat"
                            class="visible_password"
                            type="checkbox"
                    />
                    <img
                            v-lazy="'./images/azor_images/login_register/forgot_password.svg'"
                            alt="visible_password"
                            class="visible_password_icon"
                    >
                </div>
            </div>
            <div class="form-footer">
                <div class="form_footer__forgot">
                    <locale-link to="/" class="forgot-link">
                        Забыли пароль?
                    </locale-link>
                    <locale-link
                            to="/signup"
                    >
                        Впервые у нас?
                    </locale-link>
                </div>
                <div class="form_footer__buttons">
                    <button type="submit" class="azor-btn">
                        <span>Поменять пароль</span>
                    </button>
                    <locale-link to="/signup">
                        Зарегистрироваться
                    </locale-link>
                </div>
            </div>
        </form>
        <login-social/>
    </div>
</template>

<script>
import LoginSocial from '~/components/auth/LoginSocial.vue';
  export default {
  components: { LoginSocial },
    name: "ChangePasswordForm",
    data() {
      return {
        isPasswordShow: false,
        isPasswordShowRepeat: false,
        isPasswordShowOld: false,
      }
    },
    methods: {
      showOldPassword() {
        this.isPasswordShowOld = !this.isPasswordShowOld;
      },
      showPassword() {
        this.isPasswordShow = !this.isPasswordShow;
      },
      showPasswordRepeat() {
        this.isPasswordShowRepeat = !this.isPasswordShowRepeat;
      }
    }
  }
</script>

<style scoped>

</style>