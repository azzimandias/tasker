<template>
  <div class="workspace">
    <TheBigMenu/>
    <TheTasker/>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import {useDefaultStore} from "@/stores/DefaultStore";
import TheBigMenu from '@/components/groups/TheBigMenu.vue';
import TheTasker from '@/components/groups/TheTasker.vue';

const defaultStore = useDefaultStore();

onMounted(  () => {
  //defaultStore.startIntervalUpdate();
});
</script>

<style scoped lang="scss">
  .workspace {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 300px 2fr;
    grid-template-rows: 100vh;
    grid-column-gap: 2px;
    background-color: black;
  }
</style>
