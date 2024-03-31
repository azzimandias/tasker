<script setup>
  import { useBigMenuStore } from "@/stores/BigMenuStore";
  import SectionHeader from '../UI/SectionHeader.vue';
  import PersonalList from '@/components/UI/PersonalList.vue';
  import {inject, watch, ref} from "vue";

  const personalLists =ref(null);
  const bigMenuStore = useBigMenuStore();
  const isOpenBigMenu = inject('isOpenBigMenu');

  watch(isOpenBigMenu, (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        personalLists.value.classList.remove('hidden');
      },450);
    }
  });
</script>

<template>
    <div v-if="bigMenuStore.personalLists.length"
         class="personal-lists"
         ref="personalLists"
         :class="{minimized: !isOpenBigMenu, hidden: !isOpenBigMenu}">
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

<style lang="scss">
    .personal-lists {
      padding: 11px;
      transition: all .3s, opacity 0s;
      position: relative;
      &.hidden {
        opacity: 0;
      }
      &.minimized {
        padding: 6px;
        &::after {
          content: '';
          width: 30px;
          height: 1px;
          background-color: #383939;
          position: absolute;
          bottom: 0;
          left: calc(50% - 15px);
        }
      }
    }
    .personal-lists__label {
        font-size: 12px;
        font-weight: 500;
        color: #5F6164;
        margin: 20px 0 3px 12px;
    }
    .personal-lists__container {
        display: grid;
        max-height: 200px;
        padding-right: 5px;
    }
</style>
