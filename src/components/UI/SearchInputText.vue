<script setup>
import {ref, watch, onUnmounted, onMounted} from 'vue';
  import { useListViewStore } from "@/stores/ListViewStore";

  const listView = useListViewStore();
  const props = defineProps({
    placeholder: String,
    width: String,
    border: String,
    isNeedToClearSearch: Boolean,
  });
  const emit = defineEmits(['needNoMore']);
  const search = ref('');
  const searchInput = ref(null);
  let timeout = null;
  let isActive = true;

  const performSearch = (searchValue) => {
    if (!isActive) return;

    if (searchValue) {
      listView.findTasks({ searchString: searchValue });
    } else {
      listView.clearSearchTasks();
    }
  };

  const setChanges = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      performSearch(search.value);
    }, 300);
  };

  onMounted(() => {
    searchInput.value.focus();
  });

  onUnmounted(() => {
    isActive = false;
    clearTimeout(timeout);
  });

  watch(search, (newValue) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      performSearch(newValue);
    }, 300);
  });

  watch(() => props.isNeedToClearSearch, (newValue) => {
    if (newValue) {
      search.value = '';
      emit('needNoMore');
    }
  });
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
