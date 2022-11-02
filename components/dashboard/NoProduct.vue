<template>
    <div class="no-product">
        <div>
            <h4>{{ head }}</h4>
            <span>{{ description }}</span>
        </div>
        <locale-link class="link-button" :to="to ? to : '/'">{{
            button
        }}</locale-link>
    </div>
</template>

<script>
export default {
    name: "noProduct",
    props: {
        head: String,
        description: String,
        to: String,
        button: String,
    },
};
</script>

<style lang="scss">
.no-product {
    display: flex;
    flex-direction: column;
    gap: 20px;
    div {
        h4 {
            font-size: 18px;
        }
        span {
            font-size: 14px;
        }
    }
}
</style>