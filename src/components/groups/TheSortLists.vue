<script setup>
  import {inject, ref, watch} from 'vue';
  import { useBigMenuStore } from "@/stores/BigMenuStore";
  import SectionHeader from '../UI/SectionHeader.vue';
  import SortList from '@/components/UI/SortList.vue';

  const sortLists = ref(null);
  const bigMenuStore = useBigMenuStore();
  const isOpenBigMenu = inject('isOpenBigMenu');

  watch(isOpenBigMenu, (newVal) => {
    if (!newVal) {
      sortLists.value.classList.add('hidden');
    } else {
      sortLists.value.classList.remove('hidden');
    }
  });
</script>

<template>
    <div class="sort-lists" ref="sortLists">
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

<style lang="scss">
    .sort-lists {
      transition: .3s;
      &.hidden {
        opacity: 0;
      }
    }
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
