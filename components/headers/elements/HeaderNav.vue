<template>
    <nav>
        <div v-for="(navigate, index) in header.navigations" :key="index">
            <locale-link :to="navigate.value" v-if="navigate.type === 'link'" class="link">
              <i :class="navigate.icon" />
              <b>{{ navigate.name }}</b>
            </locale-link>

            <div class="nav-dropdown" v-else-if="navigate.type === 'dropdown'" @mouseover="navDropDown = true"
                 @mouseleave="navDropDown = false">
              <i :class="navigate.icon" />
              <div>
                <button class="azor-down-open-big">{{ navigate.name }}</button>
                <div v-if="navDropDown" class="nav-dropdown-list">
                  <div v-for="(value, index) in navigate.value" :key="index">
                    <!-- <a :href="value.to ? value.to : '/'" v-if="value.to.slice(0,3) == 'http'">{{ value.name }}</a>
                    <locale-link v-else :to="value.to ? value.to : '/'">{{ value.name }}</locale-link> -->
                    <locale-link :to="value.to">{{ value.name }}</locale-link>
                  </div>
                </div>
              </div>
            </div>

        </div>
    </nav>
</template>
<script>
  export default {
    data () {
        return {
            navDropDown: false
        }
    },
    props: {
        header: Object
    },
    computed: {
      current: function () {
        if (this.$route.path.includes('elements')) return 'elements';
        if (this.$route.path.includes('shop')) return 'shop';
        if (this.$route.path.includes('blog')) return 'blog';
        if (this.$route.path.includes('product')) return 'product';
        if (this.$route.path.includes('pages')) return 'pages';
        return '/';
      }
    },
    methods: {
        openSelect() {
            this.$refs.navSelect.click()
        },
        viewAllDemos: function (e) {
            var list = document.querySelectorAll('.demo-list .hidden');
            for (let i = 0; i < list.length; i++) {
            list[i].classList.add('show');
            }

            e.currentTarget.parentElement.classList.add('d-none');
        }
    }
  };
</script>
