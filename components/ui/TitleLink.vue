<template>
    <div class="title-link-skeleton skeleton" v-if="titleLoading">
    </div>
    <div class="title-link" v-else>
        <h4 class="title-link-title">{{title}}</h4>
        <locale-link class="title-link-link azor-right-open-big" :to="titleLink ?? '/'" v-if="titleLink">
          Смотреть все
        </locale-link>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        titleLoading: Boolean,
        titleLink: String
    }
}
</script>

<style lang="scss">
.title-link {
    display: grid;
    grid-template-columns: calc(100% - 120px) 120px;
    align-items: center;
    margin: 20px 0;
    h4 {
        margin: 0;
        font-size: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .title-link-link {
        position: relative;
        text-transform: uppercase;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        white-space: nowrap;
        color: #FF741F;

        &::before {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        }
    }
}
.title-link-skeleton{
    margin: 20px 0;
    height: 29px;
}

.title-link-title {
  line-height: 17px;
  font-weight: 700;
  font-size: 20px;
  line-height: 29px;
  color: #131921;
}

@media (max-width: 991px) {
    .title-link{
        grid-template-columns: calc(100% - 105px) 105px;
    }
    .title-link h4{
        font-size: 14px;
    }
    .title-link .title-link-link{
        font-size: 12px;
        &::before{
            font-size: 12px;
        }
    }
    .title-link-title{
        @media (max-width: 991px) {
            font-size: 14px;
            line-height: 17px;
        }
    }
    .title-link-skeleton{
        height: 17px;
    }
}

</style>