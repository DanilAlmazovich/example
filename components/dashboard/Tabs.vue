<template>
  <ul class="nav">
    <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
        <locale-link class="nav-link"
                   :to="`/account/${tab.slug}`"
                   :class="{'active': tab.slug === $route.params.page}"
        >
          <i
              :class="tab.icon"></i>
          {{ tab.title }}
        </locale-link>
    </li>
  </ul>
</template>
<script>
import tabs from '~/mixins/tabs-data';

export default {
  props: {
    id: String,
  },
  data: function () {
    return {
      isHid: false,
    };
  },
  mixins: [tabs],
  methods: {


  }
};
</script>