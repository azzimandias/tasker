<template>
    <div class="top-bar">
        <div class="top-bar__container">
            <TopButton :cl="cl[0]"/>
            <TopButton :cl="cl[1]"/>
        </div>
        <TopButton :cl="cl[2]"/>
    </div>
</template>

<script>
import TopButton from '@/components/UI/TopButton.vue';
export default {
    data() {
        return {
            cl: [
                'person',
                'plus',
                'loup'
            ]
        }
    },
    components: {
        TopButton
    }
}
</script>

<style lang="scss">
    .top-bar {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 11px;
        background-color: #3F4041;
    }
    .top-bar__container {
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        padding-right: 11px;
    }
</style>
