<template>
    <footer ref="footer">
        <div class="container">
            <div class="top-footer">
                <locale-link to="/">
                    <img
                        v-lazy="'./images/icons/logo-full-white.svg'"
                        alt="footer Logo"
                    />
                </locale-link>
            </div>

            <div class="middle-footer">
                <div class="middle-footer-about">
                    <span>{{ footer.info.description }}</span>
                    <form class="subscribe" action="">
                        <input
                            type="email"
                            placeholder="Ваш адрес электронной почты"
                        />
                        <button>Подписаться</button>
                    </form>
                </div>
                <div v-if="mobileFooter">
                    <div v-for="(item, index) in loggedIn? footer.data : footerNotAuth.data" :key="index">
                        <drop-down
                            class="footer-mobile-block"
                            :items="item.links"
                            :buttonText="item.title"
                            itemsClass="footer-mobile-span"
                            buttonClass="footer-mobile-button"
                        />
                    </div>
                </div>
                <div v-else v-for="(item, index) in loggedIn? footer.data : footerNotAuth.data" :key="index">
                    <h4>{{ item.title }}</h4>
                    <ul>
                        <li v-for="(link, idx) in item.links" :key="idx">
                            <locale-link :to="link.to" v-if="link.to != '/login'">{{
                                link.name
                            }}</locale-link>
                            <locale-link :to="link.to" v-if="link.to === '/login' && !loggedIn">{{
                                link.name
                                }}</locale-link>
                        </li>
                    </ul>
                </div>

                <div v-if="mobileFooter">
                    <drop-down
                        class="footer-mobile-block"
                        :items="footer.info.all"
                        buttonText="Контакты"
                        itemsClass="footer-mobile-span"
                        buttonClass="footer-mobile-button"
                    />
                </div>
                <div
                    v-else
                    class="middle-footer-contact"
                    itemscope
                    itemtype="https://schema.org/ContactPoint"
                >
                    <div>
                        <h4 class="azor-marker" itemscope itemtype="">
                            Адрес
                        </h4>
                        <ul>
                            <li
                                v-for="(item, index) in footer.info.address"
                                :key="index"
                                itemprop="streetAddress"
                            >
                                <a target="_blank" :href="item.to">{{
                                    item.address
                                }}</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="azor-phone">Телефон</h4>
                        <ul>
                            <li
                                v-for="(tel, index) in footer.info.tel"
                                :key="index"
                                itemprop="telephone"
                            >
                                <a :href="`tel:${tel.replace(/\s/g, '')}`">{{ tel }}</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="azor-mail">Электронная почта</h4>
                        <ul>
                            <li itemprop="email">
                                <a
                                    target="_blank"
                                    :href="`mailto:${footer.info.email}`"
                                    >{{ footer.info.email }}</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="bottom-footer">
                <div class="law">
                    <span>© 2022 AZOR. Все права защищены.</span>
                    <locale-link to="/law/policyprivacy">Политика конфиденциальности</locale-link>
                </div>
            <social-bar></social-bar>
            </div>
        </div>
    </footer>
</template>

<script>
import footerData from '~/mixins/footer-data';
import SocialBar from '~/components/ui/SocialBar.vue';
import DropDown from '~/components/ui/DropDown.vue';
export default {
    components: {
        SocialBar,
        DropDown,
    },
    data() {
        return {
            mobileFooter: false,
        };
    },
    mixins: [footerData],
    computed: {
        loggedIn() {
            return this.$store.state.auth.loggedIn
        },
    },
    methods: {
        matchHeight() {
            this.$nextTick(function () {
                this.$refs.footer.clientWidth <= 526
                    ? (this.mobileFooter = true)
                    : null;
            });
        },
    },
    mounted() {
        this.matchHeight();
    },
};
</script>
<style lang="scss">
.footer-mobile-block {
    color: white;
    height: auto;
    border-top: 1px solid rgba(255, 255, 255, 0.25);
}
.footer-mobile-span {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    opacity: 0.75;
}
.footer-mobile-button {
    font-weight: 500;
    font-size: 18px;
    min-height: 64px;
}
</style>
