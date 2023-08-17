<template>
    <div class="personal-lists">
        <SectionHeader :is_load="bigMenuStore.is_load_personalLists">Мои списки</SectionHeader>
        <div class="personal-lists__container">
            <PersonalList 
                v-for="list in bigMenuStore.personalLists"
                :key="list.id"
                :list="list">
                <template #name>{{ list.name }}</template>
                <template #count>{{ list.count_of_active_tasks }}</template>
            </PersonalList>
        </div>
    </div>
</template>

<script setup>
/*import { ref,reactive,onMounted } from 'vue';*/
import { useBigMenuStore } from "@/stores/BigMenuStore";
import SectionHeader from '../UI/SectionHeader.vue';
import PersonalList from '@/components/UI/PersonalList.vue';

const bigMenuStore = useBigMenuStore();

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
        max-height: 200px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 5px;
          background-color: #0a0a0a;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: #c4c4c4;
        }

        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
          background-color: #26282B;
        }
    }
</style>
