<script setup>
  /*import { ref,reactive,onMounted } from 'vue';*/
  import { useBigMenuStore } from "@/stores/BigMenuStore";
  import SectionHeader from '../UI/SectionHeader.vue';
  import PersonalTag from '@/components/UI/PersonalTag.vue';
  import {inject, watch} from "vue";
  import TopButton from "@/components/UI/TopButton.vue";
  import {useRouter} from "vue-router";

  const bigMenuStore = useBigMenuStore();
  const isOpenBigMenu = inject('isOpenBigMenu');
  const router = useRouter();
</script>

<template>
    <div class="personal-tags" :class="{hidden: !isOpenBigMenu}" v-if="bigMenuStore.personalTags.length > 1">
        <div class="personal-lists__header">
          <SectionHeader :is_load="bigMenuStore.is_load_personalTags">Теги</SectionHeader>
          <TopButton
              :cl="'plus'"
              @click="router.push({ name: 'tag', params: { id_tag: 'new' } })"
          />
        </div>
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
        grid-gap: 5px;
        //padding: 6px 15px 6px 6px;
        max-height: 205px;
    }
    .hidden {
      display: none;
    }
    .personal-lists__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 10px 10px 0;
    }
</style>
