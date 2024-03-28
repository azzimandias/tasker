<script setup>
  import api from "@/api";
  import {useRouter} from "vue-router";
  import InputBordered from "@/components/UI/InputBordered.vue";
  import ListHeader from "@/components/UI/ListHeader.vue";
  import {useBigMenuStore} from "@/stores/BigMenuStore";
  import {useListViewStore} from "@/stores/ListViewStore";
  import {onBeforeMount, onMounted, reactive, ref} from "vue";

  const router = useRouter();
  const bigMenu = useBigMenuStore();
  const listView = useListViewStore();

  const userInfo = reactive({
    id:      0,
    email:   '',
    name:    '',
    surname: ''
  });
  const randomKey = ref(Math.random());
  onBeforeMount(async () => {
    await bigMenu.getUserInfo();
    userInfo.id =      bigMenu.user.id;
    userInfo.email =   bigMenu.user.email;
    userInfo.name =    bigMenu.user.name;
    userInfo.surname = bigMenu.user.surname;
    randomKey.value = Math.random();
  });

  const exit = async () => {
    const res = await api.logout();
    if (res === 'logout') {
      await router.push({ path: '/' });
    }
  };
  const getValue = (obj) => {
    userInfo[obj.name] = obj.value;
  }
  const save = async () => {
    await api.postInfo('updateUserInfo', userInfo);
  };
</script>

<template>
  <div class="user-view">
    <ListHeader>Hello Andrew!</ListHeader>
    <div class="inputs-container">
      <InputBordered
          :key="randomKey"
          :name="'email'"
          :value="userInfo.email"
          @returnValue="getValue"
      >
        Email
      </InputBordered>
      <InputBordered
          :key="randomKey"
          :name="'name'"
          :value="userInfo.name"
          @returnValue="getValue"
      >
        Name
      </InputBordered>
      <InputBordered
          :key="randomKey"
          :name="'surname'"
          :value="userInfo.surname"
          @returnValue="getValue"
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
  @media screen and (max-width: 700px) {
    .inputs-container {
      margin-left: 20px;
    }
    .wrapper {
      grid-template-columns: 1fr 1.5fr;
    }
  }
</style>
