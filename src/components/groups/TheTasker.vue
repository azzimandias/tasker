<template>
  <div class="tasker">
      <TheTopBar/>
      <router-view v-if="route.params.name" :key="route.params.name"/>
      <router-view v-else-if="route.params.id_list" :key="route.params.id_list"/>
      <router-view v-else-if="route.params.id_tag" :key="route.params.id_tag"/>
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
        align-items: center;
    }
</style>
