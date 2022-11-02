<template>
    <div class="drop-down" v-if="items" :class="{'drop-down-dark' : dark}">
        <button @click="showList = !showList" class="azor-down-open-mini" :class="[{'close-list-subcategory' : showList}, buttonClass]">{{ buttonText }}</button>
        <div style="padding-bottom: 10px" v-show="showList">
            <locale-link :class="itemsClass" v-for="item in items" :key="item.id" :to="item.to" tag="span">
                {{ item.name }}
            </locale-link>
            <slot />
            <locale-link v-if="watchAll" :to="watchAll">Смотреть все</locale-link>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        buttonClass: String,
        itemsClass: String,
        buttonText: String,
        items: [Object, Array],
        watchAll: String,
        dark: Boolean
    },
    data() {
        return {
            showList: false,
        };
    },
    computed: {
        // buttonClass() {
        //     return {
        //         'close-list-subcategory': this.showList
        //     }
        // }
    }
};
</script>

<style lang="scss" scoped>

        .drop-down{
            color: white;
            button, span {
                color: white;
            }
        }
        .drop-down-dark{
            color: black;
            button, span {
                color: black;
            }
        }
        button {
            position: relative;
            border: none;
            width: 100%;
            padding: 0;
        }
        .azor-down-open-mini{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .azor-down-open-mini::before{
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
        }
        .close-list-subcategory::before {
            transform: translateY(-50%) rotate(180deg);
        }
        div {
            font-size: 16px;
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        span{
            cursor: pointer;
        }
        a {
            color: #ff741f;
        }
</style>
