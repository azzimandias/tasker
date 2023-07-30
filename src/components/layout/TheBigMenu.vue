<template>
    <div class="big-menu">
        <div class="big-menu__wrapper">
            <ApplivationName/>
            <TheSortLists/>
            <ThePersonalLists/>
            <ThePersonalTags/>
        </div>
        <button class="new-personal-list-btn">Новый список</button>
    </div>
</template>

<script>
import ApplivationName from '@/components/UI/ApplicationName.vue';
import TheSortLists from '@/components/layout/TheSortLists.vue';
import ThePersonalLists from '@/components/layout/ThePersonalLists.vue';
import ThePersonalTags from '@/components/layout/ThePersonalTags.vue';
export default {
    components: {
        ApplivationName,
        TheSortLists,
        ThePersonalLists,
        ThePersonalTags,
    }
}
</script>

<style scoped lang="scss">
    .big-menu {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 10px;
        background-color: #26282B;
        user-select: none;
    }
    .big-menu__wrapper {
        > div {
            padding: 0 11px;
        }
    }
    .new-personal-list-btn {
        width: 155px;
        color: white;
        cursor: pointer;
        position: relative;
        &::before {
            content: '';
            display: block;
            width: 15px;
            height: 15px;
            position: absolute;
            top: 2px;
            left: 12px;
            background-image: url('../../assets/svgs/plus-circle.svg');
            background-position: center;
            background-size: 15px 15px;
            background-repeat: no-repeat;
        }
    }
</style>
