<script setup lang="ts">
  import SignButton from "@/components/MY_UI/SignButton.vue";
  const emit = defineEmits(['clearInterval']);
</script>

<template>
<!--  <div class="bg-red-500 text-white p-20">Tailwind работает?</div>-->
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

<style scoped>
  .header_big {
    font-size: 50px;
    line-height: 60px;
    color: var(--introTextColor);
    margin-bottom: 20px;
  }
  .description {
    font-size: 20px;
    line-height: 30px;
    color: var(--introTextColor);
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
