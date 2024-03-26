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
      personalLists.value.classList.add('hidden');
    } else {
      personalLists.value.classList.remove('hidden');
    }
  });
</script>

<template>
    <div class="personal-lists" ref="personalLists" v-if="bigMenuStore.personalLists.length">
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
      transition: .3s;
      &.hidden {
        opacity: 0;
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
