<script setup lang="ts">
  import {onMounted} from 'vue';
  import api from '@/api'
  onMounted(() => {
    api.getCookies();

    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme(media);
    media.addEventListener('change', applyTheme);
  });
</script>

<template>
  <router-view/>
</template>

<style lang="scss">
  html {
    font-size: 16px;
  }
  #app {
    width: 100vw;
    max-height: 100vh;
    height: 100vh;
    background-color: var(--tasker);
    display: flex;
    justify-content: center;
  }
</style>
