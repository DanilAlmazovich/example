<template>
  <AuthWrapper>
    <LogInForm/>
  </AuthWrapper>
</template>
<script>
import AuthWrapper from '~/components/auth/AuthWrapper';
import LogInForm from '~/components/auth/LoginForm';

export default {
  head() {
    return {
      title: "AZOR - Авторизация",// заголовок сайта
    }
  },
  components: {
    LogInForm,
    AuthWrapper,
  }
};
</script>