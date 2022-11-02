<template>
  <div class="profile-form">
    <div v-if="error" class="form-api-error">
      {{ error }}
    </div>
    <div v-if="success" class="form-api-success">
      {{ success }}
    </div>
    <form @submit.prevent="validateSubmit">
      <div class="row">
        <div class="profile-form__column col-lg-6">
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
                required
            />
          </div>
        </div>
        <div class="profile-form__column col-lg-6">
          <div class="form-group">
            <label class="login_label__legend">Старый пароль</label>
            <input
                v-model.trim="form.oldPassword"
                :type="oldPasswordShow ? 'text' : 'password'"
                class="form-control"
                required
            />
            <div class="visible_password__toggle">
              <input
                  @click="toggleShowPassword('oldPassword')"
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
          <div class="form-group">
            <label class="login_label__legend">Пароль</label>
            <input
                v-model.trim="form.password"
                :type="passwordShow ? 'text' : 'password'"
                class="form-control"
                required
            />
            <div class="visible_password__toggle">
              <input
                  @click="toggleShowPassword('password')"
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
          <div class="form-group">
            <label class="login_label__legend">Подтвердите пароль</label>
            <input
                v-model.trim="form.repeatPassword"
                :type="repeatPasswordShow ? 'text' : 'password'"
                class="form-control"
                :class="{ 'form-control--error': formErrors.repeatPassword }"
                required
            />
            <form-validate-error v-if="formErrors.repeatPassword" validateError="Пароль не совподает"/>
            <div class="visible_password__toggle">
              <input
                  @click="toggleShowPassword('repeatPassword')"
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
        </div>
      </div>
      <div class="delivery_footer">
        <button type="reset" class="reset-btn">Отмена</button>
        <button type="submit" class="save-btn">Сохранить</button>
      </div>
    </form>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import {validateEmail} from '@/utilities/validations';

export default {
  props: {
    ava: null,
  },
  name: 'ProfileForm',
  data() {
    return {
      error: null,
      success: null,
      form: {
        name: null,
        phone: null,
        email: null,
        password: null,
        repeatPassword: null,
        oldPassword: null
      },
      oldPasswordShow: false,
      passwordShow: false,
      repeatPasswordShow: false,
      formErrors: {}
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    }),

  },
  async mounted() {
    this.form.name = this.user.name
    this.form.email = this.user.email
    this.form.phone = this.user.phone
    this.form.avatar = this.user.avatar
  },
  methods: {
    toggleShowPassword(key) {
      this[`${key}Show`] = !this[`${key}Show`];
    },
    validateSubmit() {
      const errors = {};
      if (!validateEmail(this.form.email)) {
        errors.email = true;
      }

      if (this.form.password !== this.form.repeatPassword) {
        errors.repeatPassword = true;
      }

      if (Object.keys(errors).length === 0) {
        this.handleSubmit();
      } else {
        this.formErrors = errors;
      }
    },
    async handleSubmit() {
      try {
        const form = new FormData();
        Object.keys(this.form).forEach(key=>{
          form.append(key, this.form[key])
        })
        if (this.ava) form.append('avatar', this.ava)
        const {success, message} = await this.$axios.$post('/api/user/info/update', form);
        if (success) {
          this.setSuccess(message);
          this.setError(null);
          const form = {
            ...this.form
          }
          form.password = null;
          form.oldPassword = null;
          form.repeatPassword = null;
          this.form = form;
        } else {
          this.setSuccess(null);
          this.setError(message);
        }
      } catch (error) {
        const {message} = error.response.data;
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
</script>
