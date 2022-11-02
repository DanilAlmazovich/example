<template>
    <div class="humburger cursor-pointer" :class="{ cross: cross, dark: dark }">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
export default {
    props: {
        cross: Boolean,
        dark: Boolean,
    },
};
</script>

<style  lang="scss">
.humburger {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    width: 24px;
    height: 24px;
    transition: 0.3s;
    span {
        width: 100%;
        height: 2px;
        border-radius: 5px;
        background-color: white;
    }
}
.dark {
    span {
        background-color: black;
    }
}
.cross {
    transform: rotate(180deg);
    span {
        &:nth-child(2) {
            opacity: 0;
        }
        &:first-child {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
        }
        &:last-child {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
        }
    }
}
</style>