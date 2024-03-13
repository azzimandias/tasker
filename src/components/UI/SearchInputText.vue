<template>
  <input type="text"
         class="searcher"
         v-model="search"
         :placeholder="placeholder"
         :style="{width: width, borderBottom: border}"
         @change="setChanges"
         ref="searchInput"
  />
</template>

<script setup>
  import { ref } from 'vue';
  import {useListViewStore} from "@/stores/ListViewStore";

  const listView = useListViewStore();
  const props = defineProps({
    placeholder: String,
    width: String,
    border: String,
  });
  const search = ref('');

  const setChanges = () => {
    listView.findTasks(search.value);
  };
</script>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";
  .searcher {
    width: 100%;
    color: #aaadae !important;
    &::placeholder {
      color: $placeholder;
    }
  }
</style>
