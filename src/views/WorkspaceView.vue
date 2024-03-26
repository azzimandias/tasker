<script setup>
  import TheBigMenu from '@/components/groups/TheBigMenu.vue';
  import TheTasker from '@/components/groups/TheTasker.vue';
  import {useImageDBStore} from "@/stores/imageDBStore";
  import {provide, ref, watch} from "vue";
  const imageDB = useImageDBStore();

  const workspace = ref(null);
  const isOpenBigMenu = ref(true);
  provide('isOpenBigMenu', isOpenBigMenu);

  watch(isOpenBigMenu, (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        workspace.value.classList.add('closed');
      }, 300);
    } else {
      workspace.value.classList.remove('closed');
    }
  });

</script>

<template>
  <div class="workspace" ref="workspace">
    <TheBigMenu/>
    <TheTasker/>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/styles/global.scss";
  .workspace {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 300px 2fr;
    grid-template-rows: 100vh;
    grid-column-gap: 2px;
    background-color: $workspace;
    transition: .3s;
    &.closed {
      grid-template-columns: 50px 1fr;
    }
  }
</style>
