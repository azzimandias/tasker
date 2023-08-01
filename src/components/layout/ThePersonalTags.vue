<template>
    <div class="personal-tags" v-if="personalTags">
        <SectionHeader>Теги</SectionHeader>
        <div class="personal-tags__container">
            <PersonalTag :key="0">{{ 'Все теги' }}</PersonalTag>
            <PersonalTag v-for="tag in personalTags" :key="tag.id">{{ tag.name }}</PersonalTag>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SectionHeader from '../UI/SectionHeader.vue';
import PersonalTag from '@/components/UI/PersonalTag.vue';

const personalTags = ref([
    {id: 1, name: 'first'},
    {id: 2, name: 'second'},
    {id: 3, name: 'third'},
    {id: 4, name: 'fourth'},
]);
</script>

<style lang="scss">
    .personal-tags__container {
        display: flex;
        flex-wrap: wrap;
        padding: 6px 15px 6px 6px;
    }
</style>
