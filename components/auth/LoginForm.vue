<template>
    <div class="tab-pane user-auth-form fade show active" id="sign_in">
        <h2 class="login__title">Войти в личный кабинет</h2>
        <div v-if="error" class="form-api-error">
            {{ error }}
        </div>
        <div v-if="success" class="form-api-success">
            {{ success }}
        </div>
        <VerifyForm v-if="showVerifyForm" :payload="{ 'password': form.password, 'email': form.username }"
            @setError="setError" @setSuccess="setSuccess" />
        <form v-else @submit.prevent="validateSubmit">
            <div class="form-group">
                <label class="login_label__legend">Номер телефона или почта</label>
                <input v-model.trim="form.username" type="text" class="form-control"
                    :class="{ 'form-control--error': formErrors.username }" required />
                <form-validate-error v-if="formErrors.username" validateError="Введите правильный email или номер телефона" />
                <span class="form-suggest">номер через код страны, наприм: +996</span>
            </div>
            <div class="form-group ">
                <label class="login_label__legend">Пароль</label>
                <input v-model.trim="form.password" :type="isPasswordShow ? 'text' : 'password'" class="form-control "
                    required />
                <div class="visible_password__toggle">
                    <input @click="showPassword" class="visible_password" type="checkbox" />
                    <img v-lazy="'./images/azor_images/login_register/forgot_password.svg'" alt="visible_password"
                        class="visible_password_icon">
                </div>
            </div>
            <div class="form-footer">
                <div class="form_footer__forgot">
                    <locale-link to="/recovery-password" class="forgot-link">
                        Забыли пароль?
                    </locale-link>
                    <locale-link to="/signup">
                        Впервые у нас?
                    </locale-link>
                </div>
                <div class="form_footer__buttons">
                    <button type="submit" class="azor-btn">
                        <span>Войти в кабинет</span>
                    </button>
                    <locale-link to="/signup">
                        Зарегистрироваться
                    </locale-link>
                </div>
            </div>
        </form>
        <login-social />
    </div>
</template>

<script>
import { validateEmail } from '@/utilities/validations';
import FormValidateError from '~/components/auth/FormValidateError';
import VerifyForm from '~/components/auth/VerifyForm';
import LoginSocial from '~/components/auth/LoginSocial.vue';
export default {
    name: 'LogInForm',
    components: {
        FormValidateError,
        VerifyForm,
        LoginSocial
    },
    data() {
        return {
            showVerifyForm: false,
            isPasswordShow: false,
            formErrors: {
                username: false
            },
            error: null,
            success: null,
            form: {
                username: null,
                password: null,
            }
        }
    },
    methods: {
        showPassword() {
            this.isPasswordShow = !this.isPasswordShow;
        },
        validateSubmit() {
            this.formErrors.username = false;
            const data = {
                password: this.form.password
            }
            if (this.form.username.includes('@')) {
                if (validateEmail(this.form.username)) {
                    data.email = this.form.username;
                } else {
                    this.formErrors.username = true;
                }
            } else {
                data.phone = this.form.username;
            }

            if (!this.formErrors.username) {
                this.handleSubmit(data);
            }
        },
        async handleSubmit(payload) {
            this.$store.commit('setLoading', true);
            try {
                payload['temp_user_id'] = window.localStorage.getItem('tempUserId')
                const { data } = await this.$auth.loginWith('local', { data: payload });
                this.$store.commit('setLoading', false);
                if (data.success) {
                    if (!data.email_verified || !data.phone_verified) {
                        this.showVerifyForm = true;
                        // try {
                        // 	const { success, message } = await this.$axios.$post('/api/auth/resend-code', { email: payload.email })
                        // 	if (success) {
                        // 		this.setError(null);
                        // 		this.setSuccess(message);
                        // 	} else {
                        // 		this.setError(message);
                        // 		this.setSuccess(null);
                        // 	}
                        // } catch (error) {
                        // 	this.$store.commit('setLoading', false);
                        // 	const { message } = error.response.data;
                        // 	this.setError(message);
                        // 	this.setSuccess(null);
                        // }
                    }
                    this.setSuccess(data.message);
                    this.setError(null);
                    if (this.$store.state.auth.loggedIn) {
                        this.$store.dispatch('wishlist/get')
                        this.$store.dispatch('basket/get', {temp_user_id: +window.localStorage.getItem('tempUserId')})
                    }
                } else {
                    this.setSuccess(null);
                    this.setError(data.message);
                }
                this.$store.commit('setLoading', false);
            } catch (error) {
                this.$store.commit('setLoading', false);
                const { message } = error.response.data;
                this.setSuccess(null);
                this.setError(message);
            }
        },
        setSuccess(message) {
            this.success = message;
        },
        setError(message) {
            this.error = message;
        }
    }
}
const generatedUserId = () => {
    const date = new Date();
    return date.getTime();
}
</script>
