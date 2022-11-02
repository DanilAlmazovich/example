<template>
    <vue-final-modal v-model="showModal" overlay-class="black-blur-glass" :esc-to-close="true" :z-index-base="15000" classes="modal-container" content-class="modal-content">    
        <div class="add-address">
            <div class="head-block">
                <h3>Способ доставки</h3>
                <div @click="showModal = false">
                    <hum-cross :cross="true" :dark="true"/>
                </div>
            </div>
            <span class="error">{{error && 'Заполните необходимые поля'}}</span>
            <form class="add-address-form" @submit.prevent="addressSubmit">
                
                <label>
                    <span>Страна</span>
                    <select class="form-input" v-model="form.country" @change="setState" required>
                        <option :value="address?.country ?? null">{{address?.country ?? 'Выберите страну'}}</option>
                        <option
                            v-for="country in countries"
                            :key="country.id"
                            :value="country.id"
                        >
                            {{ country.name }}
                        </option>
                    </select>
                </label>

                <label>
                    <span>Область</span>
                    <select class="form-input" v-model="form.state" @change="setCity" required>
                        <option :value="address?.state ?? null">{{address?.state ?? 'Выберите область'}}</option>
                        <option
                            v-for="state in states"
                            :key="state.id"
                            :value="state.id"
                        >
                            {{ state.name }}
                        </option>
                    </select>
                </label>
                <label>
                    <span>Город</span>
                    <select class="form-input" v-model="form.city" required>
                        <option :value="address?.city ?? null">{{address?.city ?? 'Выберите город'}}</option>
                        <option v-for="city in cities" :key="city.id" :value="city.id">
                            {{ city.name }}
                        </option>
                    </select>
                </label>
                <label>
                    <span>Улица</span>
                    <input v-model="form.address" type="text">
                </label>
                <div>
                    <label>
                        <span>Дом</span>
                        <input v-model="form.house" type="text">
                    </label>
                    <label>
                        <span>Квартира/Дом</span>
                        <input v-model="form.apartment" type="number">
                    </label>
                </div>
                <button type="submit">
                    <span v-if="!loading">{{ address ? 'Изменить' : 'Создать' }}</span>
				    <button-loader v-else />
                </button>
            </form>
        </div>
    </vue-final-modal>
</template>

<script>
import { mapState } from 'vuex';
import ButtonLoader from '~/components/ui/ButtonLoader.vue';
import HumCross from '~/components/ui/HumCross.vue';
export default {
    name: 'CreateAddress',
    components: { HumCross, ButtonLoader },
    props: {
        modal: Boolean,
        address: [Object, Array]
    },
    data() {
        return {
            showModal: false,
            loading: false,
            error: null,
            form: {
                country: null,
                city: null,
                state: null,
                address: null,
                house: null,
                apartment: null,
            },
        };
    },
    computed: {
        ...mapState({
            countries: (state) => state.addresses.countries,
            states: (state) => state.addresses.states,
            cities: (state) => state.addresses.cities,
        }),
    },
    methods: {
        setState(e) {
            this.$store.dispatch('addresses/getStates', e.target.value);
        },
        setCity(e) {
            this.$store.dispatch('addresses/getCities', e.target.value);
        },
        async addressSubmit() {
            this.loading = true;
            const payload = {
                ...this.form,
            };
            try {
                const { data, success } = await this.$axios.$post(
                    `/api/user/address/${this.address ? 'update' : 'create'}`,
                    payload
                );
                if (success) {
                    this.$store.dispatch('addresses/getUserAddresses');
                    this.loading = false;
                    this.showModal = false;
                } else {
                    this.error = data.message;
                    this.loading = false;
                }
            } catch (error) {
                const { message } = error.response.data;
                this.error = message;
                this.loading = false;
            }
        },
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
        this.modal ? this.showModal = true : this.showModal = false;
        if (this.address) {
            this.form = stripAddress(this.address);
        }
        this.$store.dispatch('addresses/getCountries');
    },
};

const stripAddress = (address) => {
    return {
        address: address.address,
        city: address.city_id,
        country: address.country_id,
        state: address.state_id,
        id: address.id,
        house: address.house,
        apartment: address.apartment,
        
    };
};
</script>

<style lang="scss">
.add-address{
    max-width: 400px;
    width: calc(100vw - 40px);
    h3{    
        font-size: 20px;
        color: #293845;
        margin: 0;
    }
    .error{
        font-weight: 400;
        color: rgb(246, 76, 76);
    }
    .add-address-form{
        display: flex;
        flex-direction: column;
        gap: 15px;
        margin-top: 10px;
        div{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        label{
            display: flex;
            flex-direction: column;
            input{
                width: 100%;
            }
        }
        button{
            background-color: #FF741F;
            width: 100%;
            height: 40px;
            border-radius: 5px;
            color: white;
            font-size: 18px;
            font-weight: 600;
            margin-top: 10px;
        }
    }
}
</style>