<script setup>
  import {inject, ref, watch} from 'vue';
  import { useBigMenuStore } from "@/stores/BigMenuStore";
  import SectionHeader from '@/components/MY_UI/SectionHeader.vue';
  import SortList from '@/components/MY_UI/SortList.vue';

  const sortLists = ref(null);
  const bigMenuStore = useBigMenuStore();
  const isOpenBigMenu = inject('isOpenBigMenu');

  watch(isOpenBigMenu, (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        sortLists.value.classList.remove('hidden');
      },450)
    } else {
      //sortLists.value.classList.remove('hidden');
    }
  });
</script>

<template>
    <div class="sort-lists" ref="sortLists" :class="{minimized: !isOpenBigMenu, hidden: !isOpenBigMenu}">
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

<style>
    .sort-lists {
      padding: 11px;
      transition: all .3s, opacity 0s;
      position: relative;
      &.hidden {
        opacity: 0;
      }
      &.minimized {
        padding: 5px;
        &::after {
          content: '';
          width: 30px;
          height: 1px;
          background-color: #383939;
          position: absolute;
          bottom: 0;
          left: calc(50% - 15px);
        }
        .sort-lists__container {
          grid-template-columns: 1fr;
        }
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
