<template>
    <div class="sort-lists">
        <SectionHeader :is_load="is_load">Списки</SectionHeader>
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
import { ref,reactive,onMounted } from 'vue';
import SectionHeader from '../UI/SectionHeader.vue';
import SortList from '@/components/UI/SortList.vue';

let is_load = ref(true);
const sortLists = reactive([
    {
        id: 1, 
        name: 'Сегодня',
        count: '—',
        color: 'gray'
    },
    {

        id: 2, 
        name: 'С флажком',
        count: '—',
        color: '#be5252'
    },
    {

        id: 3, 
        name: 'Завершено',
        count: '—',
        color: '#daadad'
    },
    {

        id: 4, 
        name: 'Все',
        count: '—',
        color: '#a66f0a'
    },
]);

const getSortLists = async () => {
  try {
    const response = await fetch('http://localhost/sortLists');
    const arr = await response.json();
    if ((typeof arr) === "object") {
      arr.forEach(item => {
        sortLists[item.id-1].count = item.count;
      });
      is_load = false;
    }
  } catch (e) {
    console.log(e);
  }
}

onMounted(async () => {
  await getSortLists();
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
