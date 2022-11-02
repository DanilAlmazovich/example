<template>
  <div class="dashboard profile">
    <Dashboard />
  </div>
</template>

<script>
import Dashboard from '~/components/dashboard/Account';
export default {
  head() {
    return {
      title: "AZOR - Мой профиль",
    }
  },
  components: {
    Dashboard
  },
}
</script>
