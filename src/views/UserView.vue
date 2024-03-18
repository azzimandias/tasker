<script setup>
  import api from "@/api";
  import {useRouter} from "vue-router";
  import InputBordered from "@/components/UI/InputBordered.vue";
  import ListHeader from "@/components/UI/ListHeader.vue";

  const router = useRouter();

  const exit = async () => {
    const res = await api.logout();
    if (res === 'logout') {
      await router.push({ path: '/' });
    }
  };
</script>

<template>
  <div class="user-view">
    <ListHeader>Hello Andrew!</ListHeader>
    <div class="inputs-container">
      <InputBordered>Email</InputBordered>
      <InputBordered>Name</InputBordered>
      <InputBordered>Surname</InputBordered>
      <div class="btn-container">
        <button class="btn exit" @click="exit">Logout</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "../assets/styles/coloris.css";
  .user-view {
    width: 100%;
    height: 100%;
    padding: 15px 20px 15px 0;
    display: flex;
    flex-direction: column;
    grid-gap: 30px;
  }
  .inputs-container {
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    padding: 0 50% 0 20px;
  }
  .btn-container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
  }
  .btn {
    width: 100px;
    height: 100%;
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
