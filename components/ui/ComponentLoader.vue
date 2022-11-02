<template>
    <div class="lds-ring-wrapper">
        <span class="lds-ring">
            <span/>
            <span/>
            <span/>
        </span>
    </div>
</template>

<style lang="scss">
    .lds-ring-wrapper {
        padding: 30px 0;
        .lds-ring {
            display: flex;
            justify-content: center;
            position: relative;
            /*height: 100%;*/
            align-items: center;
            height: 30px;
        }

        .lds-ring span {
            box-sizing: border-box;
            display: block;
            position: absolute;
            width: 30px;
            height: 30px;
            border: 4px solid #FF741F;
            border-radius: 50%;
            animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            border-color: #FF741F transparent transparent transparent;
        }

        .lds-ring span:nth-child(1) {
            animation-delay: -0.45s;
        }

        .lds-ring span:nth-child(2) {
            animation-delay: -0.3s;
        }

        .lds-ring span:nth-child(3) {
            animation-delay: -0.15s;
        }

        @keyframes lds-ring {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>