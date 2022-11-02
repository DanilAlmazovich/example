<template>
    <span class="lds-ring" :class="{'dark': darkMode}">
        <span/>
        <span/>
        <span/>
    </span>
</template>
<script>
    export default {
        props: {
            darkMode: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
<style lang="scss">
    .lds-ring {
        display: flex;
        justify-content: center;
        position: relative;
        height: 100%;
        align-items: center;
        &.dark {
            span {
                border: 4px solid #293845;
                border-color: #293845 transparent transparent transparent;
                background: transparent;
            }
        }
    }

    .lds-ring span {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        border: 4px solid #fff;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }

    .lds-ring span:nth-child(1) {
        animation-delay: -0.45s;
    }

    .lds-ring span:nth-child(2) {
        animation-delay: -0.3s;
    }

    .lds-ring span:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>