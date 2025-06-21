<script setup>
  import Loader from './Loader.vue';
  import {inject, ref, watch} from "vue";
  const props = defineProps({
    'is_load': Boolean,
  });

  const shc = ref(null);
  const isOpenBigMenu = inject('isOpenBigMenu');

  watch(isOpenBigMenu, (newVal) => {
    if (!newVal) {
      shc.value.classList.add('hide');
    } else {
      shc.value.classList.remove('hide');
    }
  });
</script>

<template>
    <div class="section-header__container" ref="shc" :class="{hidden: !isOpenBigMenu}">
        <div class="section-header__label"><slot></slot></div>
        <Loader v-if="props.is_load"/>
    </div>
</template>

<style lang="scss">
    .section-header__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        //padding: 20px 6px 10px 12px;
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
