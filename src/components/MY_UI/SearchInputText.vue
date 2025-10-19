<script setup lang="ts">
import {ref, watch, onUnmounted, onMounted} from 'vue';
  import { useListViewStore } from "@/stores/ListViewStore";

  const listView = useListViewStore();
  const props = defineProps({
    width:                { type: String, default: '100%' },
    placeholder:          String,
    border:               String,
    isNeedToClearSearch:  Boolean,
  });
  const emit = defineEmits(['needNoMore']);
  const search = ref('');
  const searchInput = ref<HTMLInputElement | null>(null);
  let timeout: number | null = null;
  let isActive = true;

  const performSearch = (searchValue: string) => {
    if (!isActive) return;

    if (searchValue) {
      listView.findTasks({ searchString: searchValue });
    } else {
      listView.clearSearchTasks();
    }
  };

  const setChanges = () => {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => {
      performSearch(search.value);
    }, 300);
  };

  onMounted(() => {
    searchInput.value?.focus();
  });

  onUnmounted(() => {
    if (!timeout) return;
    isActive = false;
    clearTimeout(timeout);
  });

  watch(search, (newValue) => {
    if (!timeout) return;
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

<style scoped>
  .searcher {
    width: 100%;
    color: #aaadae !important;
    &::placeholder {
      color: var(--placeholder);
    }
  }
</style>
