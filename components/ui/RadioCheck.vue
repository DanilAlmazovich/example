<template>
    <label class="radio-button" :class="{'checkbox-selected': checked}" :value="radioValue">
        <div class="radio-check-icon" :class="{'radio-check-icon-active': checked}">
            <div></div>
        </div>
        <input type="radio" :name="radioId" :id="radioValue" :value="radioValue" @change="setData">
        <div class="radio-button-text">
            <span>{{ radioName }}</span>
            <b v-if="radioNameBold">{{ radioNameBold }}</b>
        </div>
    </label>
</template>

<script>
export default {
    props: {
        radioId: String,
        radioName: String,
        radioNameBold: {
            type: String,
            default: null
        },
        radioValue: [String, Number],
        vModel: [String, Number],
    },
    computed: {
        checked() {
            return this.vModel === this.radioValue
        }
    },
    methods: {
        setData() {
            this.$emit('input', this.radioValue)
        }
    }
};
</script>

<style lang="scss">
.radio-button {
    background: #ffffff;
    border: 1px solid #ebebeb;
    border-radius: 5px;
    width: auto;
    min-height: 40px;
    display: flex;
    align-items: center;
    padding: 0 25px;
    gap: 15px;
    margin: 0;
    input{
        display: none;
    }
    .radio-check-icon{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 12px;
        height: 12px;
        border-radius: 100%;
        border: 1px solid #413D38;
        div{
            background-color: none;
            width: 7px;
            height: 7px;
            border-radius: 100%;
        }
    }
    .radio-check-icon-active{
        border: 1px solid #ff741f;
        div{
            background-color: #ff741f;
        }
    }
    .radio-button-text {
        display: flex;
        flex-direction: column;
        line-height: 20px;
        span {
            width: 100%;
            line-height: 15px;
        }
    }
}
@media (max-width: 991px) {
    .radio-button{
        padding: 0 10px;
    }
    .radio-button .radio-check-icon{
        display: none;
    }
}
</style>
