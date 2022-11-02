<template>
	<form @submit.prevent="handleSubmit">
		<div class="form-group">
			<label class="login_label__legend">Код подтверждения</label>
			<input
				v-model.trim="code"
				type="text"
				class="form-control"
				required
			/>
		</div>
		<div class="form-footer">
			<div class="form_footer__forgot">
				<div v-if="timer" class="forgot-link">
					Вы можете запросить код через {{ seconds }} секунд
				</div>
				<a v-else href="#" @click.prevent="resendCode" class="forgot-link">
					Запросить код ещё раз
				</a>
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
</template>

<script>
export default {
	name: 'VerifyForm',
	props: {
		payload: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			code: null,
			timer: null,
			seconds: 60
		}
	},
	mounted () {
		this.timer = window.setInterval(() => {
			this.setSeconds();
		}, 1000);
	},
	methods: {
		setSeconds () {
			if (this.seconds < 2) {
				window.clearInterval(this.timer);
				this.timer = null;
			} else {
				this.seconds = this.seconds - 1;
			}
		},
		async resendCode () {
			this.$store.commit('setLoading', true);
			try {
				const { success, message } = await this.$axios.$post('/api/auth/resend-code', { emaik: this.payload.email })
				this.$store.commit('setLoading', false);
				if (success) {
					this.$emit('setError', null);
					this.$emit('setSuccess', 'Мы отправили код подтверждения');
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
		},
		async handleSubmit () {
			this.$store.commit('setLoading', true);
			const data = {
				code: this.code,
				email: this.payload.email
			};

			console.log('ss', data, this.payload)
			
			try {
				const { success, message } = await this.$axios.$post('/api/auth/verify', data)
				this.$store.commit('setLoading', false);
				if (success) {
					this.$emit('setError', null);
					this.$emit('setSuccess', 'Вы успешно зарегистрировались');
					this.loginSubmit({ email: this.payload.email, password: this.payload.password });
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
		},
		async loginSubmit (payload) {
			this.$store.commit('setLoading', true);
			try {
				const { data, message } = await this.$auth.loginWith('local', { data: payload });
				this.$store.commit('setLoading', false);
				if (success) {
					this.$router.push(this.localePath('/'));
				} else {
					this.$emit('setError', message);
					this.$emit('setSuccess', null);
				}
			} catch (error) {
				this.$store.commit('setLoading', false);
				const {message} = error.response.data;
				this.setSuccess(null);
				this.setError(message);
			}
		}
	}
}
</script>