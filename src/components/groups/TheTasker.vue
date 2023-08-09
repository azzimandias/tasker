<template>
  <div class="tasker">
      <TheTopBar/>
      <router-view :key="route.path"/>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import TheTopBar from '@/components/groups/TheTopBar.vue';
const route = useRoute();
</script>

<style>
    .tasker {
        background-color: #1D1F22;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 40px 1fr;
    }
</style>
