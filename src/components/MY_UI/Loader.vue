<template>
    <div class="lds-ripple">
        <div></div>
        <div></div>
    </div>
</template>

<style scoped>
    .lds-ripple {
    display: inline-block;
    position: relative;
    width: 26px;
    height: 26px;
    }
    .lds-ripple div {
    position: absolute;
    border: 1px solid #aaadae;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.5, 0.8, 1) infinite;
    }
    .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
        0% {
            top: 13px;
            left: 13px;
            width: 0;
            height: 0;
            opacity: 0;
        }
        4.9% {
            top: 13px;
            left: 13px;
            width: 0;
            height: 0;
            opacity: 0;
        }
        5% {
            top: 13px;
            left: 13px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0;
            left: 0;
            width: 26px;
            height: 26px;
            opacity: 0;
        }
    }
</style>