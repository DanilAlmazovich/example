<template>
    <div class="status-bar">
        <div class="status-point" :class="{'status-succes' : setStatusValue >= 0}" :style="{'padding-left': start / 2 + 'px'}">
            <div class="status-point-circle">
                <div></div>
            </div>
            <b ref="start">Заказ принят</b>
        </div>
        <div class="status-line" :class="{'status-line-process' : setStatusValue >= 0, 'status-line-success' : setStatusValue >= 1}"></div>
        <div class="status-point" :class="{'status-succes' : setStatusValue >= 1}">
            <div class="status-point-circle">
                <div></div>
            </div>
            <b>Подтвержден</b>
        </div>
        <div class="status-line" :class="{'status-line-process' : setStatusValue >= 1, 'status-line-success' : setStatusValue >= 2}"></div>
        <div class="status-point" :class="{'status-succes' : setStatusValue >= 2}">
            <div class="status-point-circle">
                <div></div>
            </div>
            <b>Отправлен</b>
        </div>
        <div class="status-line" :class="{'status-line-process' : setStatusValue >= 2, 'status-line-success' : setStatusValue >= 3}"></div>
        <div class="status-point" :class="{'status-succes' : setStatusValue >= 3}" :style="{'padding-right': end / 2 + 'px'}">
            <div class="status-point-circle">
                <div></div>
            </div>
            <b ref="end">Доставлен</b>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        status: String
    },
    data(){
        return {
            value: 0,
            start: null,
            end: null,
        }
    },
    computed: {
        setStatusValue() {
            if (this.status == "order_placed") {
                return 0
            } else if (this.status == "confirmed") {
                return 1
            } else if (this.status == "shipped") {
                return 2
            } else if (this.status == "delivered") {
                return 3
            } else if (this.status == "cancelled") {
                return null
            }
        }
    },
    methods: {
        setStart() {
            if(window.innerWidth > 800){
                this.start = this.$refs.start.clientWidth
            }
        },
        setEnd() {
            if(window.innerWidth > 800){
                this.end = this.$refs.end.clientWidth
            }
        }
    },
    mounted() {
        this.setStart();
        this.setEnd();
        
    },
};
</script>

<style lang="scss">
.status-bar{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.status-point{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 23px;
    .status-point-circle{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 23px;
        height: 23px;
        border-radius: 100%;
        border: 1px solid #EBEBEB;
        div{
            display: flex;
            align-items: center;
            justify-content: center;
            background: #EBEBEB;
            width: 12px;
            height: 12px;
            border-radius: 100%;
            color: white;
            font-size: 20px;
        }
    }
    b{
        font-weight: 700;
        font-size: 16px;
        color: #656D77;
        white-space: nowrap;
    }
}
.status-line{
    background: #EBEBEB;
    border-radius: 5px;
    width: 100%;
    height: 5px;
    margin: 9px 30px;
}
@media (max-width: 800px) {
    .status-bar{
       flex-direction: column;
       gap: 30px;
    }
    .status-point{
        flex-direction: row;
        align-items: center;
        gap: 10px;
        width: auto;
    }
    .status-line{
            transform: rotate(90deg) translateY(8.5px);
        width: 40px;
        margin: 0;
    }

}

.status-succes{
        .status-point-circle{
            border: 1px solid  #54B257;
            div{
                background: #54B257;
            }
        }
        b{
            color: #131921;
        }
}
.status-line-process{
    background: rgb(84,178,87);
    background: linear-gradient(90deg, rgb(84,178,87) 44%, rgb(235,235,235) 44%);
}
.status-line-success{
    background: rgb(84,178,87);
    background: linear-gradient(90deg, rgb(84,178,87) 100%, rgb(235,235,235) 0%);
}
</style>