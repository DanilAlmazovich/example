<template>
    <div class="modal-body m-3">
        <button type="button" class="close" @click="$emit('close')">
            <span aria-hidden="true">
                <i class="icon-close"></i>
            </span>
        </button>

        <div class="form-box">
            <div class="form-tab">
                <tabs class="nav-pills nav-fill" :data="tabsData"></tabs>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="sign-in">
                        <form action="#">
                            <div class="form-group">
                                <label for="singin-email">ЛОГИН</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="singin-email"
                                    name="singin-email"
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label for="singin-password">ПАРОЛЬ</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="singin-password"
                                    name="singin-password"
                                    required
                                />
                            </div>

                            <div class="form-footer">
                                <button type="submit" class="btn btn-outline-primary-2">
                                    <span>Войти</span>
                                    <i class="icon-long-arrow-right"></i>
                                </button>

                                <div class="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        id="signin-remember"
                                    />
                                    <label
                                        class="custom-control-label"
                                        for="signin-remember"
                                    >Запомнить меня</label>
                                </div>

                                <a href="javascript:;" class="forgot-link">Забыли пароль?</a>
                            </div>
                        </form>
                        <login-social/>
                    </div>

                    <div class="tab-pane fade" id="register">
                        <form action="#">
                            <div class="form-group">
                                <label for="register-email">EMAIL</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="register-email"
                                    name="register-email"
                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label for="register-password">ПАРОЛЬ</label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="register-password"
                                    name="register-password"
                                    required
                                />
                            </div>

                            <div class="form-footer">
                                <button type="submit" class="btn btn-outline-primary-2">
                                    <span>Зарегистрироваться</span>
                                    <i class="icon-long-arrow-right"></i>
                                </button>

                                <div class="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        class="custom-control-input"
                                        id="register-policy"
                                        required
                                    />
                                    <label class="custom-control-label" for="register-policy">
                                        Нажимая “Зарегистрироваться”я соглашаюсь
                                        <a href="javascript:;">  с политикой конфиденциальности</a> *
                                    </label>
                                </div>
                            </div>
                        </form>
                        <div class="form-choice">
                            <p class="text-center">Авторизоваться с помощью</p>
                            <div class="row">
                                <div class="col-sm-6">
                                    <a href="javascript:;" class="btn btn-login btn-g">
                                        <i class="icon-google"></i>
                                        Авторизоваться  с помощью Google
                                    </a>
                                </div>

                                <div class="col-sm-6">
                                    <a href="javascript:;" class="btn btn-login btn-f">
                                        <i class="icon-facebook-f"></i>
                                        Авторизоваться  с помощью Facebook
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Tabs from '~/components/dashboard/Tabs';
import LoginSocial from '~/components/auth/LoginSocial.vue';
export default {
    components: {
        Tabs,
        LoginSocial
    },
    data: function() {
        return {
            tabsData: [
                {
                    id: 'sign-in',
                    title: 'Войти',
                    active: true
                },
                {
                    id: 'register',
                    title: 'Зарегистрироваться'
                }
            ]
        };
    }
};
</script>