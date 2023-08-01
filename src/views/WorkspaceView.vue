<template>
  <div class="workspace">
    <TheBigMenu/>
    <TheTasker/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import api from '@/api';
import TheBigMenu from '@/components/layout/TheBigMenu.vue';
import TheTasker from '@/components/layout/TheTasker.vue';

onMounted( async () => {
  api.getTags();
});
</script>

<style scoped lang="scss">
  .workspace {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 300px 2fr;
    grid-column-gap: 2px;
    background-color: black;
  }
</style>
