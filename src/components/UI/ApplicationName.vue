<template>
    <div class="application-name__container">
        <h1 class="application-name__label" @click="label_animation" ref="name_container">
            <span>t</span>
            <span>a</span>
            <span>s</span>
            <span>k</span>
            <span>e</span>
            <span>r</span>
        </h1>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    const name_container = ref(null);
    function label_animation(ev) {
        Array.from(name_container.value.children).forEach(letter => {
            letter.classList.add('animated');
        });
    }
</script>

<style lang="scss">
    .application-name__container {
        width: 100%;
        height: 40px;
        cursor: pointer;
    }
    .application-name__label {
        width: 70%;
        margin: 0 auto;
        line-height: 47px;
        font-size: 25px;
        font-weight: 600;
        text-transform: uppercase;
        text-align: center;
        color: #5C5D5F;
        display: flex;
        justify-content: center;
        transition: all .3s;
        & span {
            margin: 0 10px;
            &.animated { animation: to_center .5s ease forwards; }
        }
    }
    @keyframes to_center {
        0% {
            margin: 0 10px;
        }
        100% {
            margin: 0;
        }
    }
</style>
