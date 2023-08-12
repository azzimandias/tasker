<template>
    <div class="sort-lists">
        <SectionHeader :is_load="bigMenuStore.is_load_sortLists">Списки</SectionHeader>
        <div class="sort-lists__container">
            <SortList 
                v-for="sortList in bigMenuStore.sortLists"
                :key="sortList.id"
                :color="sortList.color"
                :url="sortList.url"
            >
                <template #name>{{ sortList.name }}</template>
                <template #count>{{ sortList.count }}</template>
            </SortList>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBigMenuStore } from "@/stores/BigMenuStore";
import SectionHeader from '../UI/SectionHeader.vue';
import SortList from '@/components/UI/SortList.vue';

const bigMenuStore = useBigMenuStore();

onMounted( () => {
  //defaultStore.getSortListsCount();
});
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
