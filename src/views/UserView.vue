<script setup>
  import api from "@/api";
  import {useRouter} from "vue-router";
  import InputBordered from "@/components/UI/InputBordered.vue";
  import ListHeader from "@/components/UI/ListHeader.vue";
  import {useBigMenuStore} from "@/stores/BigMenuStore";
  import {useListViewStore} from "@/stores/ListViewStore";
  import {onBeforeMount, onMounted, reactive, ref} from "vue";
  import LoaderBig from "@/components/UI/LoaderBig.vue";

  const router = useRouter();
  const bigMenu = useBigMenuStore();
  const listView = useListViewStore();
  const loading = ref(true);
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
    loading.value = false;
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
  <Transition mode="out-in" name="slide-up">

    <LoaderBig v-if="loading"/>

    <div class="user-view" v-else>
      <ListHeader v-if="userInfo.name">Hello {{ userInfo.name }}!</ListHeader>
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

  </Transition>
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
    border-width: 1px;
    border-style: solid;
    @include theme('border-color', $description);
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
      @include theme('background-color', $gold);
      color: black;
    }
    &:active {
      opacity: .5;
    }
  }
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: all 0.25s ease-out;
  }

  .slide-up-enter-from {
    opacity: 0;
    //transform: translateY(30px);
  }

  .slide-up-leave-to {
    opacity: 0;
    //transform: translateY(-30px);
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
