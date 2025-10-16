<script setup>
  import { useRoute } from "vue-router";
  import TheTopBar from '@/components/groups/TheTopBar.vue';
  import {ref, watch} from "vue";
  const route = useRoute();
  const isOpenSearchTopBar = ref(false);
</script>

<template>
  <div class="tasker">
      <TheTopBar :isOpenSearchTopBar="isOpenSearchTopBar"/>
      <router-view
          v-if="route.params.name"
          :key="route.params.name"
      />
      <router-view
          v-else-if="route.params.id_list"
          :key="route.params.id_list"
      />
      <router-view
          v-else-if="route.params.id_tag"
          :key="route.params.id_tag"
      />
      <router-view
          v-else
          :key="route.path"
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
