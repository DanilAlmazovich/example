<template>
  <AuthWrapper>
		<RegistrationForm />
	</AuthWrapper>
</template>

<script>
import AuthWrapper from '~/components/auth/AuthWrapper';
import RegistrationForm from '~/components/auth/RegistrationForm';
export default {
  head() {
    return {
      title: "AZOR - Регистрация",// заголовок сайта
    }
  },
	components: {
		RegistrationForm,
		AuthWrapper
	}
}
</script>
