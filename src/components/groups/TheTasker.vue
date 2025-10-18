<script setup lang="ts">
  import { useRoute } from "vue-router";
  import TheTopBar from '@/components/groups/TheTopBar.vue';
  import {computed, ref, watch} from "vue";
  const route = useRoute();
  const isOpenSearchTopBar = ref(false);

  const routeKey = computed(() => {
    const params = route.params;
    const key = params.name ?? params.id_list ?? params.id_tag ?? route.path;
    return Array.isArray(key) ? key.join('-') : key;
  });
</script>

<template>
  <div class="tasker">
      <TheTopBar :isOpenSearchTopBar="isOpenSearchTopBar"/>
      <router-view
          :key="routeKey"
          @openSearchTopBar="isOpenSearchTopBar = true"
      />
  </div>
</template>

<style>
    .tasker {
      background-color: var(--tasker);
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 40px 1fr;
      align-items: center;
      overflow: hidden;
      position: relative;
    }
    @media screen and (max-width: 700px) {
      .tasker {
        overflow: auto;
      }
    }
</style>
