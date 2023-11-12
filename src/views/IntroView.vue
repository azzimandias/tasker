<template>
  <h2 class="header_big">Are you constantly planning something?</h2>
  <p class="description">
    Then we have a solution for you — TASKER.
    With this application you can easily plan your day and learn to manage your life.
  </p>
  <p class="description">
    The frontend part of the application is developed on the basis of Vue.js, the backend part is developed on Laravel.
  </p>
  <router-link to="/signUp">
    <SignButton :class="'sign-up'">Start using</SignButton>
  </router-link>
</template>

<script setup>
  import SignButton from "@/components/UI/SignButton.vue";
</script>

<style scoped lang="scss">
  @import "../assets/styles/global.scss";
  .header_big {
    font-size: 50px;
    line-height: 60px;
    color: $description;
    margin-bottom: 20px;
  }
  .description {
    font-size: 20px;
    line-height: 30px;
    color: $description;
    margin-bottom: 20px;
  }
</style>
