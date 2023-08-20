<template>
  <h2 class="list-header" :style="{color: props.color}">
    <slot/><Loader v-if="listView.loadingSmall"/>
  </h2>
</template>

<script setup>
import Loader from "@/components/UI/Loader.vue";
import {useListViewStore} from "@/stores/ListViewStore";
const listView = useListViewStore();
const props = defineProps({
  color: String,
})
</script>

<style lang="scss" scoped>
  .list-header {
    font-size: 35px;
    color: #c4c4c4;
    position: sticky;
    top: 0;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 0 20px;
  }
</style>
