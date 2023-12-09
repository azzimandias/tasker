<template>
  <div class="user-view">
    <button class="btn exit" @click="exit">Logout</button>
  </div>
</template>

<script setup>
  import api from "@/api";
  import {useRouter} from "vue-router";

  const router = useRouter();

  const exit = async () => {
    const res = await api.logout();
    if (res === 'logout') {
      await router.push({ path: '/' });
    }
  };
</script>

<style scoped lang="scss">
  .user-view {
    width: 100%;
    height: 100%;
  }
  .btn {
    width: 100px;
    height: 40px;
    border-radius: 5px;
    cursor: pointer;
    &.exit {
      background-color: #c71938;
      color: black;
    }
    &:active {
      opacity: .5;
    }
  }
</style>
