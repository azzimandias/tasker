<template>
  <div class="workspace">
    <TheBigMenu/>
    <TheTasker/>
  </div>
</template>

<script setup>
import TheBigMenu from '@/components/groups/TheBigMenu.vue';
import TheTasker from '@/components/groups/TheTasker.vue';
import {useImageDBStore} from "@/stores/imageDBStore";
const imageDB = useImageDBStore();
</script>

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
  }
</style>
