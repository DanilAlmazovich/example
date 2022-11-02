<template>
  <AuthWrapper>
		<RecoveryPasswordForm />
	</AuthWrapper>
</template>
<script>
import AuthWrapper from '~/components/auth/AuthWrapper';
import RecoveryPasswordForm from '~/components/auth/RecoveryPasswordForm';
export default {
	components: {
    head() {
      return {
        title: "AZOR - Восстановление пароля",
      }
    },
		RecoveryPasswordForm,
		AuthWrapper,
	}
};
</script>
