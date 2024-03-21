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
  html {
    font-size: 16px;
  }
  #app {
    width: 100vw;
    max-height: 100vh;
    background-color: $tasker;
    display: flex;
    justify-content: center;
  }
</style>
