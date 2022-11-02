<template>
  <div class="description">
    <div class="description-head" v-if="description || noDescription" :style="!this.description ? 'margin-bottom: 20px': ''">
        {{ description ? head : noDescription }}
    </div>
    <div v-if="description" class="description-text" :style="test">
        <div id="description" ref="description" v-html="description">
            .
        </div>
        <div v-if="!showDescription && heightTrigger" class="description-fade"></div>
    </div>
    <div class="description-button" @click="showDescription = !showDescription" v-if="collapse && heightTrigger && description">{{ showDescription ? collapse[0] : collapse[1] }}</div>
  </div>
</template>

<script>
export default {
    props: {
        maxHeight: String,
        head: String,
        description: String,
        noDescription: String,
        collapse: Array
    },
    data () {
        return {
            showDescription: false,
            currentHeight: null,
        }
    },
    computed: {
        heightTrigger () {
            return this.maxHeight < this.currentHeight ? true : false
        },
        test () {
            return this.showDescription ? {'max-height': 'none'} : {'max-height': this.maxHeight + 'px'}
        },
    },
    methods: {
        matchHeight () {
            this.$nextTick(function () {
                this.description ? this.currentHeight = this.$refs.description.clientHeight : null
            })
        }
    },
    mounted () {
        this.matchHeight()
    },
}
</script>

<style lang="scss" scoped>
    .description{
        gap: 20px;
        width: 100%;
        margin-top: 32px;
        .description-head{
            display: flex;
            align-items: center;
            font-weight: 700;
            font-size: 24px;
            height: 24px;
            color: #413D38;
        }
        .description-text{
            position: relative;
            margin: 15px 0;
            font-weight: 400;
            font-size: 16px;
            line-height: 23px;
            overflow: hidden;
            .description-fade{
                position: absolute;
                bottom: -2px;
                left: 0;
                width: 100%;
                height: 15px;
                background: rgb(255,255,255);
                background: linear-gradient(0deg, rgba(255,255,255,1) 26%, rgba(255,255,255,0.5) 84%, rgba(152,152,152,0) 100%);
            }
        }
        .description-button{
            display: flex;
            align-items: center;
            color: #FF741F;
            font-weight: 600;
            font-size: 16px;
            height: 16px;
            margin-bottom: 20px;
            text-decoration-line: underline;
            cursor: pointer;
        }
    }
</style>
