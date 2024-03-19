<script setup>
  import api from "@/api";
  import {useRouter} from "vue-router";
  import InputBordered from "@/components/UI/InputBordered.vue";
  import ListHeader from "@/components/UI/ListHeader.vue";
  import {useBigMenuStore} from "@/stores/BigMenuStore";
  import {useListViewStore} from "@/stores/ListViewStore";

  const router = useRouter();
  const bigMenu = useBigMenuStore();
  const listView = useListViewStore();

  const userInfo = bigMenu.user;

  const exit = async () => {
    const res = await api.logout();
    if (res === 'logout') {
      await router.push({ path: '/' });
    }
  };
  const save = async () => {

  };
</script>

<template>
  <div class="user-view">
    <ListHeader>Hello Andrew!</ListHeader>
    <div class="inputs-container">
      <InputBordered
          :value="userInfo.email"
      >
        Email
      </InputBordered>
      <InputBordered
          :value="userInfo.name"
      >
        Name
      </InputBordered>
      <InputBordered
          :value="userInfo.surname"
      >
        Surname
      </InputBordered>
      <div class="btn-container">
        <button class="btn save" @click="save">Save</button>
        <button class="btn exit" @click="exit">Logout</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "../assets/styles/global.scss";
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
    margin: 0 auto;
    padding: 20px;
    border: 1px solid $description;
    border-radius: 5px;
  }
  .btn-container {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    grid-gap: 30px;
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
    &.save {
      background-color: $gold;
      color: black;
    }
    &:active {
      opacity: .5;
    }
  }
</style>
