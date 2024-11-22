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
    if (search.value) {
      listView.findTasks({searchString: search.value});
    } else {
      listView.clearSearchTasks();
    }
  };
</script>

<template>
  <input type="text"
         class="searcher"
         v-model="search"
         :placeholder="placeholder"
         :style="{width: width, borderBottom: border}"
         @keyup="setChanges"
         ref="searchInput"
  />
</template>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";
  .searcher {
    width: 100%;
    color: #aaadae !important;
    &::placeholder {
      @include theme('color', $placeholder);
    }
  }
</style>
