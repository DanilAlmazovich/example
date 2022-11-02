<template>
    <aside class="col-md-4 col-lg-3 block-left d-none d-xl-inline-block dashboard-sidebar">
        <div class="pa-5 text-center border-bottom">
            <div class="img-user mb-2">
                <img v-if="user?.avatar && user" class="user-ava" :src="user.avatar" alt="avatar">
                <img v-else class="user-ava" :src="'https://dummyimage.com/160x160/000/fff'" alt="avatar">
                <label for="file" class="manage-user-icon" v-if="$route.params.page === 'profile-settings'">
                    <img src="../../static/images/icons/user-manage.svg" alt="avatar">
                    <input @change="getFileName" id="file" type="file" class="manage-user-icon-input" accept="image/*">
                </label>
            </div>
            <h4 v-if="user?.name" class="user-name">{{ user.name }}</h4>
            <div v-if="user?.email" class="user-mail">{{ user.email }}</div>
        </div>
        <tabs class="nav-dashboard flex-column mb-3 mb-md-0" />
    </aside>
</template>

<script>
    import {mapState} from 'vuex';
    import Tabs from '@/components/dashboard/Tabs';
    import SidebarSVG from '@/components/dashboard/SidebarSVG';
    export default {
        components: {
            Tabs,
            SidebarSVG
        },
        data () {
            return {
                imageSrc: null
            }
        },
        computed: {
            ...mapState({
                user: state => state.auth.user
            })
        },
        methods: {
            getFileName(event) {
                let input = event.target
                if (input.files && input.files[0]) {
                    let reader = new FileReader()
                    let that = this;

                    reader.onload = (e) => {
                        that.imageSrc = e.target.result
                    }

                    reader.readAsDataURL(input.files[0])

                   this.$emit('change', input.files[0])
                }
            }
        }
    }
</script>

<style lang="scss">
    .manage-user-icon-input {
        display: none;
    }
    .dashboard-sidebar {
        margin: 30px 0;
        .nav-dashboard {
            margin-top: 0;
        }
        .border-bottom {
            padding-bottom: 20px;
        }
    }
    .d-xl-inline-block{
        display: block !important;
        @media (max-width: 991px) {
            display: none !important;
        }
    }
</style>
