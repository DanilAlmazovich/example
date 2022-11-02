<template>
    <div v-if="categoryLoading">
        <div class="breadcrumbs-skeleton">
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
        </div>
    </div>
    <div class="flex" id="breadcrumbs" v-else>
        <div class="flex flex-wrap" v-if="category?.length">
            <locale-link to="/" class="bc-link active">
                Главная
            </locale-link>
            <span class="azor-right-open-big arrow"/>
            <div class="flex" v-for="(link, i) in category" :key="link.uuid">
                <locale-link  :to="toCategory(link)" class="bc-link active">
                    {{ link.name}}
                </locale-link>
                <span v-if="i !== category.length - 1" class="azor-right-open-big arrow"/>
            </div>
        </div>
    </div>
</template>

<script>
    import toCategory from '~/mixins/to-category';
    export default {
        props: {
            title: {
                type: String,
                default: '',
            },
            links: {
                type: Array,
                default: () => []
            },
            category: {
                type: Array,
                default: () => []
            },
            categoryLoading: Boolean
        },
        mixins: [toCategory],
        data() {
            return {}
        },
    }
</script>

<style lang="scss" scoped>
    @media (max-width: 991px) {
        #breadcrumbs {
            display: none;
        }
    }
    #breadcrumbs {
        padding-top: 20px;
        .flex {
            display: flex;
            align-items: center;
            &.flex-wrap {
                flex-wrap: wrap;
            }
        }
        .arrow {
            padding: 0 4px;
            color: #656D77;
        }
        .bc-link {
            border-radius: 4px;
            color: #656D77;
            border: 1px solid #afafaf;
            padding: 5px 8px;
            font-size: 14px;
            line-height: 18px;
            transition: 0.3s;
            &.active {
                &:hover {
                    border: 1px solid #FF741F;
                    color: #FF741F;
                }
            }
            &.is-active {
                border: 1px solid #FF741F;
                color: #FF741F;
            }
        }
    }

    .breadcrumbs-skeleton{
        display: flex;
        gap: 25px;
        padding-top: 20px;
        .skeleton{
            width: 150px;
            height: 30px;
        }
    }
</style>
