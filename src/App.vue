<script setup>
  import {onMounted} from 'vue';
  import api from './api'
  onMounted( () => {
    api.getCookies();
  })
</script>

<template>
  <router-view/>
</template>

<style lang="scss">
  /*@import './assets/styles/global.scss';*/
  html {
    font-size: 16px;
  }
  #app {
    width: 100vw;
    max-height: 100vh;
    height: 100vh;
    /*background-color: 'tasker';*/
    /*@include theme('background-color', tasker);*/
    display: flex;
    justify-content: center;
  }
</style>
