<template>
    <div class="tab-pane user-auth-form fade show active" id="register">
        <h2 class="login__title">Регистрация</h2>
        <div v-if="error" class="form-api-error">
            {{ error }}
        </div>
        <div v-if="success" class="form-api-success">
            {{ success }}
        </div>
        <VerifyForm
            v-if="showVerifyForm"
            :payload="form"
            @setError="setError"
            @setSuccess="setSuccess"
        />
        <form v-else @submit.prevent="validateSubmit">
            <div class="form-group">
                <label class="login_label__legend">Имя</label>
                <input
                    v-model.trim="form.name"
                    type="text"
                    class="form-control"
                    required
                />
            </div>
            <div class="form-group">
                <label class="login_label__legend">Телефон</label>
                <input
                    v-mask="'+996 ### ### ###'"
                    v-model.trim="form.phone"
                    type="tel"
                    class="form-control"
                    required
                />
            </div>
            <div class="form-group">
                <label class="login_label__legend">Email</label>
                <input
                    v-model.trim="form.email"
                    type="email"
                    class="form-control"
                    :class="{ 'form-control--error': formErrors.email }"
                    required
                />
                <form-validate-error
                    v-if="formErrors.email"
                    validateError="Введите правильный email"
                />
            </div>
            <div class="form-group">
                <label class="login_label__legend">Пароль</label>
                <input
                    v-model.trim="form.password"
                    :type="isPasswordShow ? 'text' : 'password'"
                    class="form-control"
                    required
                />
                <div class="visible_password__toggle">
                    <input
                        @click="showPassword"
                        class="visible_password"
                        type="checkbox"
                    />
                    <img
                        v-lazy="
                            './images/azor_images/login_register/forgot_password.svg'
                        "
                        alt="visible_password"
                        class="visible_password_icon"
                    />
                </div>
            </div>
            <div class="form-group">
                <label class="login_label__legend">Подтвердите пароль</label>
                <input
                    v-model.trim="form.repeatPassword"
                    :type="isPasswordShowRepeat ? 'text' : 'password'"
                    class="form-control"
                    :class="{
                        'form-control--error': formErrors.repeatPassword,
                    }"
                    required
                />
                <form-validate-error
                    v-if="formErrors.repeatPassword"
                    validateError="Пароль не совподает"
                />
                <div class="visible_password__toggle">
                    <input
                        @click="showPasswordRepeat"
                        class="visible_password"
                        type="checkbox"
                    />
                    <img
                        v-lazy="
                            './images/azor_images/login_register/forgot_password.svg'
                        "
                        alt="visible_password"
                        class="visible_password_icon"
                    />
                </div>
            </div>

            <div class="form-footer">
                <div class="form_footer__forgot">
                    <span class="custom-control-label accept_confidenc">
                        Нажимая “Зарегистрироваться” я соглашаюсь с <locale-link to="law/policyprivacy">политикой конфиденциальности*</locale-link>
                    </span>
                    <locale-link to="/login"> У вас уже есть аккаунт? </locale-link>
                </div>
                <div class="form_footer__buttons">
                    <button type="submit" class="azor-btn">
                        <span>Зарегистрироваться</span>
                    </button>
                    <locale-link to="/login"> Войти </locale-link>
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
    name: 'FormRegister',
    components: {
        FormValidateError,
        VerifyForm,
        LoginSocial,
    },
    data() {
        return {
            isPasswordShow: false,
            isPasswordShowRepeat: false,
            error: null,
            success: null,
            showVerifyForm: false,
            form: {
                name: null,
                email: null,
                phone: null,
                password: null,
                repeatPassword: null,
            },
            formErrors: {},
        };
    },
    methods: {
        showPassword() {
            this.isPasswordShow = !this.isPasswordShow;
        },
        showPasswordRepeat() {
            this.isPasswordShowRepeat = !this.isPasswordShowRepeat;
        },
        validateSubmit() {
            let errors = {};
            if (this.form.password !== this.form.repeatPassword) {
                errors.repeatPassword = true;
            }
            if (!validateEmail(this.form.email)) {
                errors.email = true;
            }

            if (Object.keys(errors).length === 0) {
                this.handleSubmit();
            } else {
                this.formErrors = errors;
            }
        },
        async handleSubmit() {
            this.$store.commit('setLoading', true);
            const payload = {
                email: this.form.email,
                phone: this.form.phone.replace(/\s/g, ''),
                password: this.form.password,
                name: this.form.name,
            };
            try {
                const { message, success } = await this.$axios.$post(
                    '/api/auth/signup',
                    payload
                );
                this.$store.commit('setLoading', false);
                if (success) {
                    this.setSuccess(message);
                    this.setError(null);
                    this.showVerifyForm = true;
                } else {
                    this.setSuccess(null);
                    this.setError(message);
                }
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
        },
    },
    mounted() {
        this.form.phone = '.';
        //show mask костыль
    },
};
</script>

<
