<template>
	<div class="tab-pane user-auth-form fade show active" id="sign_in">
		<h2 class="login__title">Восстановление пароля</h2>
		<div v-if="error" class="form-api-error">
			{{ error }}
		</div>
		<div v-if="success" class="form-api-success">
			{{ success }}
		</div>
		<ResetPassword
			v-if="showResetForm"
			:payload="form"
			@setError="setError"
			@setSuccess="setSuccess"
		/>
		<form v-else @submit.prevent="validateSubmit">
			<div class="form-group">
				<label class="login_label__legend">Введите телефон или email</label>
				<input
					v-model.trim="form.username"
					type="text"
					class="form-control"
					:class="{ 'form-control--error': formError }"
					required
				/>
                <span class="form-suggest">номер через код страны, наприм: +996</span>
				<form-validate-error v-if="formError" validateError="Введите правильный email или номер телефона" />
			</div>
			<div class="form-footer">
				<div class="form_footer__buttons">
					<button type="submit" class="azor-btn">
						<span>Отправить</span>
					</button>
				</div>
			</div>
		</form>
		<login-social/>
	</div>
</template>

<script>
import { validateEmail } from '@/utilities/validations';
import FormValidateError from '~/components/auth/FormValidateError';
import ResetPassword from '~/components/auth/ResetPassword';
import LoginSocial from '~/components/auth/LoginSocial.vue';
export default {
	name: 'RecoveryPasswordForm',
	components: {
		FormValidateError,
		ResetPassword,
		LoginSocial,
	},
	data() {
		return {
			formError: false,
			showResetForm: false,
			error: null,
			success: null,
			form: {
				username: null
			}
		}
	},
	methods: {
		validateSubmit () {
			this.formError = false;
			const data = {}
			if (this.form.username.includes('@')) {
				if (validateEmail(this.form.username)) {
					data.email = this.form.username;
				} else {
					this.formError = true;
				}
			} else {
				data.phone = this.form.username.replace(/\s/g, '');
			}

			if (!this.formError) {
				this.handleSubmit(data);
			}
		},
		async handleSubmit (data) {
			this.$store.commit('setLoading', true);
			try {
				const { success, message } = await this.$axios.$post('/api/auth/password/create', data)
				this.$store.commit('setLoading', false);	
				if (success) {
					this.setSuccess(message);
					this.setError(null);
					this.showResetForm = true;
				} else {
					this.setSuccess(null);
					this.setError(message);
					this.showResetForm = false;
				}
			} catch (error) {
				this.$store.commit('setLoading', false);
				const { message } = error.response.data;
				this.setSuccess(null);
				this.setError(message);
			}
		},
		setSuccess (message) {
			this.success = message;
		},
		setError (message) {
			this.error = message;
		}
	}
}
</script>