<script setup>
  import ApplicationName from '@/components/UI/ApplicationName.vue';
  import SignButton from '@/components/UI/SignButton.vue';
  import MacWindow from "@/components/UI/MacWindow.vue";
  import PhoneWindow from "@/components/UI/PhoneWindow.vue";
  import {ref} from "vue";
  import {useRoute} from "vue-router";

  const route = useRoute();

  const docWdt = ref(window.innerWidth);
  const onResize = () => docWdt.value = window.innerWidth;
  window.addEventListener('resize', onResize);
</script>

<template>
  <div class="skin">
    <img src="../assets/svgs/cloud.svg" alt="" class="cloud">
    <div>
      <div class="top-block">Reminder: This is a test project</div>
      <div class="header">
      <div class="group-wrapper">
        <div class="logo-wrapper">
          <router-link to="/">
            <ApplicationName/>
          </router-link>
        </div>
        <p class="logo-description">all your goals will be here</p>
      </div>

      <div class="btns-wrapper" v-if="route.path === '/' && docWdt >= 730">
        <router-link to="/signIn">
          <SignButton :class="'sign-in'">Sign in</SignButton>
        </router-link>
        <router-link to="/signUp">
          <SignButton :class="'sign-up'">Sign up</SignButton>
        </router-link>
      </div>
      <div class="btns-wrapper flex-right"
           v-else-if="route.path === '/signUp' || (route.path === '/' && docWdt <= 730)">
        <router-link to="/signIn">
          <SignButton :class="'sign-in'">Sign in</SignButton>
        </router-link>
      </div>
      <div class="btns-wrapper flex-right" v-else-if="route.path === '/signIn'">
        <router-link to="/signUp">
          <SignButton :class="'sign-up'">Sign up</SignButton>
        </router-link>
      </div>
    </div>
    </div>
    <div class="main-block" :class="{
      center: (docWdt <= 830 && route.path !== '/'),
    }">
      <div
          class="main-block__info"
          :class="{
            substrate: (docWdt <= 830 && route.path !== '/'),
            upper: (docWdt <= 830 && route.path === '/'),
            small1: (docWdt <= 530 && route.path !== '/'),
            small2: (docWdt <= 530 && route.path === '/'),
          }"
      >
        <router-view/>
      </div>
      <div class="main-block__right" v-if="docWdt >= 830">
        <MacWindow v-if="docWdt >= 1128"/>
        <PhoneWindow v-else/>
      </div>
      <div class="main-block__right" v-else>
        <MacWindow v-if="route.path !== '/' && route.path !== '/signUp' && route.path !== '/signIn'"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../assets/styles/global.scss";
  .skin {
    width: 100%;
    max-width: 2000px;
    height: 100%;
    background-color: $tasker;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    grid-gap: 50px;
  }
  .top-block {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: $personal;
  }
  .header {
    width: 100%;
    height: 90px;
    padding: 15px 40px 15px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .group-wrapper {
    width: 400px;
    display: flex;
    align-items: flex-start;
  }
  .logo-wrapper {
    width: 170px;
    height: 100%;
    display: flex;
    align-items: flex-start;
  }
  .logo-description {
    height: 47px;
    line-height: 50px;
    color: #5C5D5F;
  }
  .btns-wrapper {
    width: 320px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.flex-right {
      justify-content: flex-end;
    }
  }
  .main-block {
    width: 100%;
    height: calc(100vh - 130px);
    padding: 0 40px;
    display: flex;
    position: relative;
    z-index: 1;
  }
  .center {
    align-items: center;
  }
  .main-block__info {
    width: 520px;
    height: 100%;
    padding-top: 50px;
  }
  .small1 {
    width: 300px;
  }
  .small2 {
    max-width: 500px;
    width: auto;
  }
  .upper {
    padding-top: 0;
  }
  .substrate {
    height: auto;
    padding: 30px;
    border-radius: 20px;
    background-color: $personal;
  }
  .main-block__right {
    padding: 0 0 0 30px;
    width: calc(100% - 500px);
    max-width: 1500px;
    display: flex;
    justify-content: flex-end;
  }
  .cloud {
    width: 50rem;
    height: 50rem;
    position: absolute;
    bottom: -33%;
    right: -6%;
    z-index: 0;
    animation: image_blur 7s infinite;
  }
  @keyframes image_blur {
    0% {
      filter: blur(0px);
      bottom: -33%;
      right: -6%;
    }
    50% {
      filter: blur(2px);
      bottom: -30%;
      right: -4%;
    }
    100% {
      filter: blur(0px);
      bottom: -33%;
      right: -6%;
    }
  }
  @media screen and (max-width: 1410px) {
    .main-block__right {
      padding: 0 0 0 50px;
    }
  }
  @media screen and (max-width: 830px) {
    .main-block {
      flex-direction: column;
    }
  }
  @media screen and (max-width: 730px) {
    .header {
      padding: 15px 25px;
    }
    .main-block {
      padding: 0 25px;
    }
    .group-wrapper {
      height: 100%;
      flex-direction: column;
    }
    .logo-description {
      height: 20px;
      line-height: 20px;
    }
  }
</style>
