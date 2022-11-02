<template>
    <label class="border" :class="{'select': model == address.id }">
        <slot></slot>
        <span>{{ address.city }}, {{ address.address }}, {{ address.house }}</span>
        <div v-if="controll">
            <button @click.prevent="setEditAddress(address)" class="azor-edit"></button>
            <button @click.prevent="removeAddress" class="azor-basket"></button>
        </div>
    </label>
</template>

<script>
import AddAddress from './CreateAddress.vue';
export default {
    components: {
        AddAddress
    },
    props: {
        address: [Object, Array],
        model: [String, Number],
        controll: Boolean
    },
    methods: {
        removeAddress() {
            this.$store.dispatch('addresses/deleteAddress', this.address.id)
        },
        setEditAddress(item) {
            this.$emit('setEdit', item)
        }
    },
};
</script>

<style lang="scss" scoped>
    label{
        display: grid;
        grid-template-columns: calc(100% - 50px) 50px;
        gap: 5px;
        align-items: center;
        height: 45px;
        border-radius: 8px;
        padding: 0 15px;
        input{
            display: none;
        }
        span{
            width: 100%;
            font-weight: 400;
            font-size: 14px;
            color: #293845;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
        div{
            display: flex;
            align-items: center;
            button{
                &::before{
                    font-size: 18px;
                }
            }
        }
    }
</style>