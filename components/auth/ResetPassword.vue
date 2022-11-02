<template>
  <div class="tab-pane user-auth-form fade show active" id="sign_in">
	<form @submit.prevent="validateSubmit">
		<div class="form-group">
			<label class="login_label__legend">Код подтверждения</label>
			<input
				v-model.trim="form.code"
				type="number"
				class="form-control"
				required
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
				:type="isPasswordShowRepeat ? 'text' : 'password'"
				class="form-control"
				:class="{ 'form-control--error': formErrors.repeatPassword }"
				required
			/>
			<form-validate-error v-if="formErrors.repeatPassword" validateError="Пароль не совподает" />
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
			<div class="form_footer__buttons">
				<button type="submit" class="azor-btn">
					<span>Отправить</span>
				</button>
			</div>
		</div>
	</form>
  </div>
</template>

<script>
import { validateEmail } from '@/utilities/validations';
import FormValidateError from '~/components/auth/FormValidateError';
export default {
	name: 'ResetPassword',
	components: {
		FormValidateError
	},
	props: {
		payload: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			isPasswordShow: false,
			isPasswordShowRepeat: false,
			error: null,
			form: {
				password: null,
				repeatPassword: null,
				code: null
			},
			formErrors: {}
		}
	},
	methods: {
		showPassword() {
			this.isPasswordShow = !this.isPasswordShow;
		},
		showPasswordRepeat() {
			this.isPasswordShowRepeat = !this.isPasswordShowRepeat;
		},
		validateSubmit () {
			let errors = {};
			if (this.form.password !== this.form.repeatPassword) {
				errors.repeatPassword = true
			}
			if (Object.keys(errors).length === 0) {
				const data = {
					password: this.form.password,
					code: this.form.code,
				}
				if (this.payload.username.includes('@')) {
					data.email = this.payload.username;
				} else {
					data.phone = this.payload.username;
				}
				this.handleSubmit(data);
			} else {
				this.formErrors = errors;
			}
		},
		async handleSubmit (data) {
			this.$store.commit('setLoading', true);
			try {
				const { success, message } = await this.$axios.$post('/api/auth/password/reset', data)
				this.$store.commit('setLoading', false);
				if (success) {
					this.$emit('setError', null);
					this.$emit('setSuccess', 'Вы успешно поменяли пароль');
					this.$router.push(this.localePath('/login'))
				} else {
					this.$emit('setError', message);
					this.$emit('setSuccess', null);
				}
			} catch (error) {
				this.$store.commit('setLoading', false);
				const { message } = error.response.data;
				this.$emit('setError', message);
				this.$emit('setSuccess', null);
			}
		}
	}
}
</script>