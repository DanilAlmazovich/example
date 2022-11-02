<template>
    <div class="form_validate__error">
        {{ validateError }}
    </div>
</template>

<script>
  export default {
    name: 'FormValidateError',
    props: {
      validateError: {
        type: String,
        default: 'error',
      }
    },

  }
</script>