<script setup>
  /*import { ref,reactive,onMounted } from 'vue';*/
  import { useBigMenuStore } from "@/stores/BigMenuStore";
  import SectionHeader from '../UI/SectionHeader.vue';
  import PersonalTag from '@/components/UI/PersonalTag.vue';
  import {inject, watch} from "vue";

  const bigMenuStore = useBigMenuStore();
  const isOpenBigMenu = inject('isOpenBigMenu');
</script>

<template>
    <div class="personal-tags" :class="{hidden: !isOpenBigMenu}" v-if="bigMenuStore.personalTags.length > 1">
        <SectionHeader :is_load="bigMenuStore.is_load_personalTags">Теги</SectionHeader>
        <div class="personal-tags__container scroll">
            <PersonalTag
                v-for="tag in bigMenuStore.personalTags"
                :key="tag.key"
                :tag="tag"
                :isRoute="true"
            />
        </div>
    </div>
</template>

<style lang="scss">
    .personal-tags {
      padding: 11px;
      transition: all 0.3s, opacity 0s;
      position: relative;
    }
    .personal-tags__container {
        display: flex;
        flex-wrap: wrap;
        //padding: 6px 15px 6px 6px;
        max-height: 205px;
    }
    .hidden {
      display: none;
    }
</style>
