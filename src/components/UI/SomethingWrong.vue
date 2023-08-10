<template>
  <div class="something-wrong">
    <p class="something-wrong__label">Something went wrong</p>
    <p class="something-wrong__label-small">try reloading or go <router-link to="/workspace">here</router-link></p>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .something-wrong {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .something-wrong__label {
    font-size: 30px;
    font-weight: 600;
    color: #c4c4c4;
    margin-bottom: 10px;
  }
  .something-wrong__label-small {
    font-size: 20px;
    color: #c4c4c4;
  }
  a {
    color: #d7bc76;
  }
</style>