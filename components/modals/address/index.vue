<template>
    <vue-final-modal v-if="!addModal" v-model="showModal" overlay-class="black-blur-glass" :esc-to-close="true" :z-index-base="15000" classes="modal-container" content-class="modal-content">
        <div class="choose-address">
            <div>
                <div class="head-block">
                    <h3>Способ доставки</h3>
                    <div @click="showModal = false">
                        <hum-cross :cross="true" :dark="true"/>
                    </div>
                </div>
                <div class="choose-address-button">
                    <button class="border" @click="deliveryType = 'standard'" :class="{'select' : deliveryType == 'standard'}">Курьером</button>
                    <button class="border" @click="deliveryType = 'pickup'" :class="{'select' : deliveryType == 'pickup'}">Самовывоз</button>
                </div>
            </div>
            <div class="choose-address-block" v-show="deliveryType == 'standard'">
                <div class="head-block">
                    <h3>Мои адреса</h3>
                    <button @click="addModal = true">Добавить</button>
                </div>
                <div class="choose-address-list">
                    <address-item v-for="(address, index) in addresses" :key="index" :address="address" @setEdit="item => changeAddress(item)" :model="selectedAddress.id" :controll="true">
                        <input
                            type="radio"
                            :value="address"
                            :id="address"
                            @change="setData"
                            v-model="selectedAddress"
                            name="address"
                        />
                    </address-item>
                </div>
            </div>
            <div class="choose-address-block" v-show="deliveryType == 'pickup'">
                <h3>Выберите пункт выдачи</h3>
                <div class="choose-address-list" v-if="!pickupsLoading">
                    <address-item v-for="(pickup, index) in pickups.general" :key="index" :address="pickup" :model="selectedAddress.id">
                        <input 
                            type="radio"
                            :value="pickup"
                            :id="pickup"
                            @change="setData"
                            v-model="selectedAddress"
                            name="address"
                        >
                    </address-item>
                </div>
            </div>
        </div>
    </vue-final-modal>
    <create-address v-else :modal="addModal" @close="createAddressClose" :address="editAddress"/>
</template>

<script>
import { mapState } from 'vuex';
import HumCross from '~/components/ui/HumCross.vue'
import CreateAddress from './CreateAddress.vue';
import AddressItem from './AddressItem.vue';
export default {
    name: 'ChooseAddressModal',
    components: {
    HumCross,
    CreateAddress,
    AddressItem
},
    props: {
        modal: Boolean
    },
    data() {
        return{
            showModal: false,
            addModal: false,
            editAddress: null,
            deliveryType: 'standard',
            selectedAddress: {
                id: null
            },
            pickups: null,
            pickupsLoading: true,
        }
    },
    computed: {
        ...mapState({
            addresses: (state) => state.addresses.addresses,
        }),
    },
    methods: {
        async getPickups() {
            await this.$axios
                .get('/api/checkout/pickups')
                .then((response) => {
                    this.pickups = response.data.data || null;
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    this.pickupsLoading = false;
                });
        },
        setData() {
            this.$emit('input', {deliveryType: this.deliveryType, address: this.selectedAddress});
            this.showModal = false;
        },
        changeAddress(item) {
            this.editAddress = item,
            this.addModal = true
        },
        createAddressClose() {
            this.addModal = false,
            this.editAddress = null
        }
    },
    watch: {
        modal: {
            handler() {
                this.modal ? this.showModal = true : this.showModal = false
            }
        },
        showModal: {
            handler() {
                this.showModal ? null : this.$emit('close')
            }
        },
    },
    mounted() {
        this.$store.dispatch('addresses/getUserAddresses');
        this.getPickups();
    }
}
</script>

<style lang="scss">
.choose-address{
    max-width: 400px;
    width: calc(100vw - 40px);
    height: auto;
    h3{
        font-size: 20px;
        color: #293845;
    }
    .choose-address-button{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-top: 16px;
        button{
            background: #FFFFFF;
            border-radius: 8px;
            height: 40px;
        }
    }
    .choose-address-block{
        margin-top: 20px;
        .head-block{
            button{
                font-size: 16px;
                color: #ff741f;
                font-weight: 700;
            }
        }
    }
    .choose-address-list{
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 20px;
    }
}
</style>