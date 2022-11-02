<template>
    <label class="border" :class="{'select' : model == code}">
        <slot></slot>
        <span>{{ name }}</span>
        <img v-lazy="img" :alt="name" />
    </label>
</template>

<script>
export default {
    props: {
        img: String,
        name: String,
        model: String,
        code: String
    },
};
</script>

<style lang="scss" scoped>
label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    background-color: white;
    border: 1px solid #cecece;
    border-radius: 8px;
    padding: 0 15px;
    img {
        height: 30px;
        max-width: 70px;
    }
    span {
        font-weight: 400;
        font-size: 14px;
        color: #293845;
    }
    input {
        display: none;
    }
}
</style>