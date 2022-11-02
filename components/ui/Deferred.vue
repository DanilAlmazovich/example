<template>
    <div ref="deferred">
        <slot v-if="loaded"/>
    </div>
</template>

<script>
    export default {
        name: 'DeferredContent',
        emits: ['load'],
        data() {
            return {
                loaded: false
            }
        },
        mounted() {
            if (!this.loaded) {
                if (this.shouldLoad())
                    this.load();
                else
                    this.bindScrollListener();
            }
        },
        beforeDestroy() {
            this.unbindScrollListener();
        },
        methods: {
            bindScrollListener() {
                this.documentScrollListener = () => {
                    if (this.shouldLoad()) {
                        this.load();
                        this.unbindScrollListener();
                    }
                };
                window.addEventListener('scroll', this.documentScrollListener);
            },
            unbindScrollListener() {
                window.removeEventListener('scroll', this.documentScrollListener);
            },
            shouldLoad() {
                if (this.loaded) {
                    return false;
                }
                else {
                    const rect = this.$refs.deferred.getBoundingClientRect();
                    const docElement = document.documentElement;
                    const winHeight = docElement.clientHeight;
                    return (winHeight >= rect.top);
                }
            },
            load(event) {
                this.loaded = true;
                this.$emit('load', event);
            }
        }
    }
</script>