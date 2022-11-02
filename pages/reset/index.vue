<template>
  <AuthWrapper>
		<ResetPassword />
	</AuthWrapper>
</template>
<script>
import AuthWrapper from '~/components/auth/AuthWrapper';
import ResetPassword from '~/components/auth/ResetPassword';
export default {
  head() {
    return {
      title: "AZOR - Восстановить пароля",
    }
  },
	components: {
		ResetPassword,
		AuthWrapper,
	}
};
</script>
