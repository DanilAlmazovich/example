export default {
    data() {
        return {
            tabs: [
                {
                    id: 'tab1',
                    title: 'Личный кабинет',
                    icon: 'azor-dashboard',
                    slug: '',
                    active: true,
                },
                {
                    id: 'tab2',
                    title: 'Истроия покупок',
                    icon: 'azor-history',
                    slug: 'purchase-history',
                },
                {
                    id: 'tab3',
                    title: 'Список Желаний',
                    icon: 'azor-wishlist',
                    slug: 'wishlist',
                },
                {
                    id: 'tab4',
                    title: 'Мои заказы',
                    icon: 'azor-azor_bag',
                    slug: 'orders',
                },
                {
                    id: 'tab5',
                    title: 'Мой кошелек',
                    icon: 'azor-wallet',
                    slug: 'wallet',
                },
                {
                    id: 'tab6',
                    title: 'Настройки профиля',
                    icon: 'azor-profile_edit',
                    slug: 'profile-settings',
                }
            ]
        }
    }

};
