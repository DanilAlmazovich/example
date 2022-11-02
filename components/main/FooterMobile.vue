<template>
    <section class="mobile-navbar">
        <locale-link class="mobile-navbar-button" to="/" tag="a">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="icon__home">
                    <path
                        d="M21 10.9077C21.0014 10.6942 20.9584 10.4827 20.8736 10.2866C20.7889 10.0906 20.6642 9.91444 20.5077 9.76923L11 1L1.49234 9.76923C1.33576 9.91444 1.21113 10.0906 1.12637 10.2866C1.04162 10.4827 0.99859 10.6942 1.00004 10.9077V19.4615C1.00004 19.8696 1.16212 20.2609 1.45064 20.5494C1.73916 20.8379 2.13047 21 2.53849 21H19.4615C19.8695 21 20.2608 20.8379 20.5494 20.5494C20.8379 20.2609 21 19.8696 21 19.4615V10.9077Z"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
            <span>Главная</span>
        </locale-link>
        <locale-link class="mobile-navbar-button" to="/" tag="div">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <g id="icon__categories">
                    <path
                        d="M20.2306 10.2307H14.0767C13.6519 10.2307 13.3075 10.5751 13.3075 10.9999V20.2307C13.3075 20.6555 13.6519 20.9999 14.0767 20.9999H20.2306C20.6554 20.9999 20.9998 20.6555 20.9998 20.2307V10.9999C20.9998 10.5751 20.6554 10.2307 20.2306 10.2307Z"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M20.2306 1H14.0767C13.6519 1 13.3075 1.3444 13.3075 1.76923V4.86154C13.3075 5.28637 13.6519 5.63077 14.0767 5.63077H20.2306C20.6554 5.63077 20.9998 5.28637 20.9998 4.86154V1.76923C20.9998 1.3444 20.6554 1 20.2306 1Z"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M7.92289 1H1.76905C1.34421 1 0.999817 1.3444 0.999817 1.76923V11C0.999817 11.4248 1.34421 11.7692 1.76905 11.7692H7.92289C8.34772 11.7692 8.69212 11.4248 8.69212 11V1.76923C8.69212 1.3444 8.34772 1 7.92289 1Z"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M7.92289 16.3694H1.76905C1.34421 16.3694 0.999817 16.7138 0.999817 17.1386V20.2309C0.999817 20.6558 1.34421 21.0002 1.76905 21.0002H7.92289C8.34772 21.0002 8.69212 20.6558 8.69212 20.2309V17.1386C8.69212 16.7138 8.34772 16.3694 7.92289 16.3694Z"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
            <span>Категории</span>
        </locale-link>
        <locale-link class="mobile-navbar-button" to="/" tag="div">
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <g id="icon__products">
                    <path
                        d="M21.4286 1H2.57146C1.62469 1 0.857178 1.76751 0.857178 2.71429V17.2857C0.857178 18.2325 1.62469 19 2.57146 19H21.4286C22.3754 19 23.1429 18.2325 23.1429 17.2857V2.71429C23.1429 1.76751 22.3754 1 21.4286 1Z"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M0.857178 3.14282L10.9029 11.7143C11.2109 11.9708 11.5991 12.1113 12 12.1113C12.4009 12.1113 12.7891 11.9708 13.0972 11.7143L23.1429 3.14282"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
            <span>Сообщения</span>
        </locale-link>
        <locale-link class="mobile-navbar-button" to="/dashboard" tag="div">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <g id="icon__profile">
                    <path
                        d="M11 12.5385C13.1241 12.5385 14.8461 10.8165 14.8461 8.69234C14.8461 6.56817 13.1241 4.84619 11 4.84619C8.87579 4.84619 7.15381 6.56817 7.15381 8.69234C7.15381 10.8165 8.87579 12.5385 11 12.5385Z"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M4.43079 18.5386C5.11731 17.4117 6.08218 16.4804 7.23264 15.8341C8.3831 15.1878 9.68046 14.8484 11 14.8484C12.3196 14.8484 13.6169 15.1878 14.7674 15.8341C15.9178 16.4804 16.8827 17.4117 17.5692 18.5386"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
            <span>Аккаунт</span>
        </locale-link>
        <div class="mobile-navbar-button" :class="{active: popUpCart}" @click="toggleShowCart">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <g id="icon__cart">
                    <path
                        d="M19.5607 20.5607C19.2794 20.842 18.8978 21 18.5 21C18.1022 21 17.7206 20.842 17.4393 20.5607C17.158 20.2794 17 19.8978 17 19.5C17 19.1022 17.158 18.7206 17.4393 18.4393C17.7206 18.158 18.1022 18 18.5 18C18.8978 18 19.2794 18.158 19.5607 18.4393C19.842 18.7206 20 19.1022 20 19.5C20 19.8978 19.842 20.2794 19.5607 20.5607Z"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M9.56066 20.5607C9.27936 20.842 8.89782 21 8.5 21C8.10218 21 7.72064 20.842 7.43934 20.5607C7.15804 20.2794 7 19.8978 7 19.5C7 19.1022 7.15804 18.7206 7.43934 18.4393C7.72064 18.158 8.10218 18 8.5 18C8.89782 18 9.27936 18.158 9.56066 18.4393C9.84196 18.7206 10 19.1022 10 19.5C10 19.8978 9.84196 20.2794 9.56066 20.5607Z"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                    <path
                        d="M4 3H21L19 14M4 3L6 14H19M4 3C3.833 2.333 3 1 1 1M19 14H4.23C2.446 14 1.5 14.781 1.5 16C1.5 17.219 2.446 18 4.23 18H18.5"
                        stroke="#363C49" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
            </svg>
            <span>Корзина</span>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {

        }
    },
    methods: {
        ...mapActions('cart', ['toggleShowCart']),
    },
    computed: {
        ...mapGetters('cart', ['popUpCart', 'qtyTotal', 'cartList', 'priceTotal']),
    }
}
</script>
<style lang="scss">
    .mobile-navbar{
        position: fixed;
        bottom: 0;
        width: 100%;
        display: none;
        justify-content: space-around;
        align-items: center;
        height: 70px;
        background: white;
        box-shadow: 0px -2px 10px rgba(19, 25, 33, 0.1);
        z-index: 10000;
        @media screen and (max-width: 991px){
            display: flex;
        }
        .mobile-navbar-button{
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            svg{
                height: 24px;
                width: 24px;
                stroke: #363C49;
            }
            span{
                font-size: 11px;
                font-weight: 500;
                color: #363C49;
            }
        }
        .active{
            span{
                color: #F25125;
            }
            svg{
                path{
                    stroke: #F25125;
                }
            }
        }
    }

</style>ƒ