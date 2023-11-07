<template>
  <div class="skin">
    <div style="display: none;"><router-link to="/workspace">К работе!</router-link></div>
    <div class="top-block"></div>
    <div class="header">
      <div class="logo-wrapper">
        <ApplicationName/>
      </div>
      <div class="btns-wrapper">
        <SignButton :class="'sign-in'">Sign in</SignButton>
        <SignButton :class="'sign-up'">Sign up</SignButton>
      </div>
    </div>
    <div class="main-block">

    </div>
  </div>
</template>

<script setup>
  import ApplicationName from '@/components/UI/ApplicationName.vue';
  import SignButton from '@/components/UI/SignButton.vue';
</script>

<style lang="scss" scoped>
  @import "../assets/styles/global.scss";
  .skin {
    width: 100%;
    height: 100%;
    background-color: $tasker;
  }
  .top-block {
    width: 100%;
    height: 40px;
    background-color: $personal;
  }
  .header {
    width: 100%;
    height: 90px;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo-wrapper {
    width: 200px;
    height: 100%;
  }
  .btns-wrapper {
    width: 350px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-block {
    width: 100%;
    height: calc(100vh - 130px);

  }
</style>
