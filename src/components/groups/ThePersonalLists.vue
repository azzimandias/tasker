<script setup lang="ts">
  import { useBigMenuStore } from "@/stores/BigMenuStore";
  import SectionHeader from '@/components/MY_UI/SectionHeader.vue';
  import PersonalList from '@/components/MY_UI/PersonalList.vue';
  import {inject, watch, ref, Ref} from "vue";
  import TopButton from "@/components/MY_UI/TopButton.vue";
  import {useRouter} from "vue-router";
  import DialogProvider from "@/components/CUSTOM_UI/DialogProvider.vue";

  const personalLists =ref<HTMLElement | null>(null);
  const bigMenuStore = useBigMenuStore();
  const isOpenBigMenu = inject<Ref<boolean>>('isOpenBigMenu');
  if (!isOpenBigMenu) throw new Error('isOpenBigMenu not provided');
  const router = useRouter();

  watch(isOpenBigMenu, (newVal: boolean) => {
    if (!newVal) {
      setTimeout(() => {
        personalLists.value!.classList.remove('hidden');
      },450);
    }
  });
</script>

<template>
    <DialogProvider>
        <div class="personal-lists"
             ref="personalLists"
             :class="{minimized: !isOpenBigMenu, hidden: !isOpenBigMenu}"
        >
            <div class="personal-lists__header"
                 :class="{minimized: !isOpenBigMenu, hidden: !isOpenBigMenu}"
            >
              <SectionHeader :is_load="bigMenuStore.is_load_personalLists">Мои списки</SectionHeader>
              <TopButton
                  :cl="'plus'"
                  @click="router.push({ name: 'list', params: { id_list: 'new' } })"
              />
            </div>
            <div class="personal-lists__container scroll"
                 v-if="bigMenuStore.personalLists.length"
                 :class="{minimized: !isOpenBigMenu}"
            >
                <PersonalList
                    v-for="list in bigMenuStore.personalLists"
                    :key="list.key ?? Math.random()"
                    :list="list"
                >
                    <template #name>{{ list.name }}</template>
                    <template #count>{{ list.count_of_active_tasks }}</template>
                </PersonalList>
            </div>
        </div>
    </DialogProvider>
</template>

<style>
    .personal-lists {
      padding: 11px;
      transition: all .3s, opacity 0s;
      position: relative;
      &.hidden {
        display: none;
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
        //padding-right: 5px;
        &.minimized {
          overflow: hidden;
          padding: 0;
        }
    }
    .personal-lists__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 10px 10px 0;
      &.hidden {
        display: none;
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
</style>
