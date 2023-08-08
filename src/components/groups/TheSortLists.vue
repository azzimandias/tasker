<template>
    <div class="sort-lists">
        <SectionHeader>Списки</SectionHeader>
        <div class="sort-lists__container">
            <SortList 
                v-for="sortList in sortLists" 
                :key="sortList.id"
                :color="sortList.color">
                <template #name>{{ sortList.name }}</template>
                <template #count>{{ sortList.count }}</template>
            </SortList>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SectionHeader from '../UI/SectionHeader.vue';
import SortList from '@/components/UI/SortList.vue';

const sortLists = ref([
    {
        id: 1, 
        name: 'First', 
        count: 2,
        color: 'gray'
    },
    {

        id: 2, 
        name: 'Second', 
        count: 1,
        color: '#be5252'
    },
    {

        id: 3, 
        name: 'Third', 
        count: 5,
        color: '#daadad'
    },
    {

        id: 4, 
        name: 'Fourth', 
        count: 10,
        color: '#a66f0a'
    },
]);
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
