<template>
  <div class="workspace">
    <TheBigMenu/>
    <TheTasker/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import TheBigMenu from '@/components/groups/TheBigMenu.vue';
import TheTasker from '@/components/groups/TheTasker.vue';

onMounted( async () => {

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
