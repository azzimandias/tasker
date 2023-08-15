<template>
  <router-view/>
</template>

<script setup>
import {onMounted} from 'vue';
import api from './api'
onMounted( () => {
  api.getCookies();
})
</script>

<style lang="scss">
  @import './assets/styles/global.scss';
  #app {
    width: 100vw;
    height: 100vh;
  }
</style>
