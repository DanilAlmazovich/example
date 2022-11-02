<template>
    <div class="fixed-nav" :class="{ 'fixed-nav-active': fixHeader, 'fixed-nav-hide': scrollDown }">
        <slot></slot>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            startY: 0,
            scrollDown: false,
            fixHeader: false
        };
    },
    methods: {
        test() {
            let scrollY = window.scrollY;
            if (window.scrollY > 90) {
                scrollY > this.startY ? this.scrollDown = true : this.scrollDown = false;
                this.fixHeader = true;
            } else {
                this.fixHeader = false 
            }
            this.startY = scrollY;
            console.log(this.scrollDown);
        },
    },
    mounted: function () {
        window.addEventListener('scroll', this.test, { passive: true });
    },
    destroyed: function () {
        window.removeEventListener('scroll', this.test, { passive: true });
    },
};
</script>

<style lang="scss">
.fixed-nav{
    @media (min-width: 991px) {
        display: none;
    }
}
.fixed-nav-active{
    position: fixed;
}
.fixed-nav-hide {
    transform: translateY(-100%);
}
</style>
