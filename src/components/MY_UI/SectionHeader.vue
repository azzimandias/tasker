<script setup lang="ts">
  import Loader from './Loader.vue';
  import {inject, Ref, ref, watch} from "vue";
  import {useBigMenuStore} from "@/stores/BigMenuStore";
  import {storeToRefs} from "pinia";
  const props = defineProps<({
    'is_load': boolean,
  })>();

  const shc = ref<HTMLElement | null>(null);
  const bigMenu = useBigMenuStore();

  watch(() => bigMenu.isOpenBigMenu, (newVal) => {
    if (!shc.value) return;
    if (!newVal) {
      shc.value!.classList.add('hide');
    } else {
      shc.value!.classList.remove('hide');
    }
  });
</script>

<template>
    <div class="section-header__container" ref="shc" :class="{hidden: !bigMenu.isOpenBigMenu}">
        <div class="section-header__label"><slot></slot></div>
        <Loader v-if="props.is_load"/>
    </div>
</template>

<style>
    .section-header__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 46px;
      &.hide {
        animation: hide .3s forwards;
      }
      &.hidden {
        display: none;
      }
    }
    @keyframes hide {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    .section-header__label {
        font-size: 12px;
        font-weight: 500;
        color: #5F6164;
        
    }
</style>
