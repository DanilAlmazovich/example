<template>
  <nuxt-link v-if="!isGlobal" v-bind="$attrs" v-on="$listeners" :to="nuxtTo"><slot/></nuxt-link>
  <a :href="to" target="_blank" v-else><slot /></a>
</template>

<script>
export default {
  name: 'LocaleLink',
  props: {
    to: null
  },
  tag: {
    type: String,
    default: null
  },
  computed: {
    nuxtTo() {
      if(typeof this.to === 'string' && this.to[0] !== '/') {
        return this.localePath(`/${this.to}`)
      } else {
        return this.localePath(this.to)
      }
      // return this.to ? this.localePath(this.to) : null
    },
    isGlobal(){
      if (typeof this.to === 'object') return false;
      return `${this.to}`.match(/^http/gm);
    },
  }
}
</script>