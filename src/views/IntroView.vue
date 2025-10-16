<script setup lang="ts">
  /*import SignButton from "@/components/UI/SignButton.vue";*/
  import { Button } from "@/components/UI/button"
  const emits = defineEmits(['clearInterval']);
</script>

<template>
  <div class="bg-red-500 text-white p-4">Tailwind работает?</div>
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
  <Button>Button</Button>
</template>

<style scoped lang="scss">
  /*@import "../assets/styles/global.scss";*/
  .header_big {
    font-size: 50px;
    line-height: 60px;
    /*@include theme('color', $introTextColor);*/
    margin-bottom: 20px;
  }
  .description {
    font-size: 20px;
    line-height: 30px;
    /*@include theme('color', $introTextColor);*/
    margin-bottom: 20px;
    text-align: justify;
  }
  @media screen and (max-width: 540px) {
    .header_big {
      font-size: 37px;
      text-align: center;
    }
    .description {
      text-align: justify;
    }
  }
</style>
