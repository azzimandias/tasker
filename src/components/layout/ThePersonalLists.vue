<template>
    <div class="personal-lists">
        <SectionHeader>Мои списки</SectionHeader>
        <div class="personal-lists__container">
            <PersonalList 
                v-for="list in personalLists" 
                :key="list.id"
                :color="list.color">
                <template #name>{{ list.name }}</template>
                <template #count>{{ list.count }}</template>
            </PersonalList>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SectionHeader from '../UI/SectionHeader.vue';
import PersonalList from '@/components/UI/PersonalList.vue';

const personalLists = ref([
    {
        id: 1, 
        name: 'First',
        count: 2,
        color: '#6161a3'
    },
    {
        id: 2, 
        name: 'Second', 
        count: 1,
        color: '#56b59c'
    },
    {

        id: 3, 
        name: 'Third', 
        count: 5,
        color: '#87311e'
    },
    {

        id: 4, 
        name: 'Fourth', 
        count: 10,
        color: '#923d6e'
    },
    {

        id: 5, 
        name: 'Fifth', 
        count: 4,
        color: '#bbaa48'
    },
]);
</script>

<style lang="scss">
    .personal-lists__label {
        font-size: 12px;
        font-weight: 500;
        color: #5F6164;
        margin: 20px 0 3px 12px;
    }
    .personal-lists__container {
        display: grid;
    }
</style>
