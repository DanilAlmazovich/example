export const state = () => ({
    error: null,
    success: null,
    form: {
        name: null,
        phone: null,
        email: null,
        password: null,
        repeatPassword: null,
        oldPassword: null
    },
    oldPasswordShow: false,
    passwordShow: false,
    repeatPasswordShow: false,
    formErrors: {}

})

export const mutations = {
    updateUser (state, forms) {
        state.form = forms
    }
};

export const actions = {
    async handleSubmit(ctx) {
        try {
            const form = new FormData();
            Object.keys(this.form).forEach(key=>{
                form.append(key, this.form[key])
            })
            if (this.ava) form.append('avatar', this.ava)
            const {success, message} = await this.$axios.$post('/api/user/info/update', form);
            if (success) {
                this.setSuccess(message);
                this.setError(null);
                const form = {
                    ...this.form
                }
                form.password = null;
                form.oldPassword = null;
                form.repeatPassword = null;
                this.form = form;
            } else {
                this.setSuccess(null);
                this.setError(message);
            }
            ctx.commit('updateUser', form)
        } catch (error) {
            const {message} = error.response.data;
            this.setSuccess(null);
            this.setError(message);
        }
    },

}

export const getters = {
    resent: state => state.resent,
};
