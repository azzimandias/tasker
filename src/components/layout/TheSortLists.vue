<template>
    <div class="sort-lists">
        <div class="sort-lists__label"> Списки</div>
        <div class="sort-lists__container">
            <SortList v-for="item in 4"/>
        </div>
    </div>
</template>

<script>
import SortList from '@/components/UI/SortList.vue';
export default {
    components: {
        SortList
    }
}
</script>

<style lang="scss">
    .sort-lists__label {
        font-size: 12px;
        font-weight: 500;
        color: #5F6164;
        margin: 20px 0 3px 12px;
    }
    .sort-lists__container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 11px;
        grid-row-gap: 10px;
    }
</style>
