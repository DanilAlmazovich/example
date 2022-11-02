<template>
  <locale-link v-if="!isGlobal" :to="to" :tag="tag"> <slot /> </locale-link>
  <a :href="to" target="_blank" v-else>
    <slot />
  </a>
</template>

<script>
export default {
  name: 'AzorLink',
  props: {
      to: {
          type: String,
          default: '/'
      },
      tag: String
  },
  computed: {

  }
}
</script>