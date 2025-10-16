<script setup>
import api from "@/api";
import { useRouter } from "vue-router";
import InputBordered from "@/components/MY_UI/InputBordered.vue";
import { useBigMenuStore } from "@/stores/BigMenuStore";
import {ref, onMounted, watch, reactive} from "vue";
import LoaderBig from "@/components/MY_UI/LoaderBig.vue";

const router = useRouter();
const bigMenu = useBigMenuStore();
const loading = ref(true);

const userInfo = reactive({
  user_id: 0,
  user_email: '',
  user_name: '',
  user_surname: ''
});

watch(() => bigMenu.user, (newUserInfo) => {
      if (!newUserInfo) return;
      console.log('User changed:', newUserInfo);
      Object.assign(userInfo, {
        user_id: newUserInfo.id,
        user_email: newUserInfo.email,
        user_name: newUserInfo.name,
        user_surname: newUserInfo.surname
      });
    }, { deep: true, immediate: true }
);

onMounted(async () => {
  try {
    /*loading.value = true;*/
    userInfo.user_id = bigMenu.user.id;
    userInfo.user_email = bigMenu.user.email;
    userInfo.user_name = bigMenu.user.name;
    userInfo.user_surname = bigMenu.user.surname;
  } catch (error) {
    console.error("Failed to load user info:", error);
  } finally {
    loading.value = false;
  }
});

const exit = async () => {
  try {
    const res = await api.logout();
    if (res === 'logout') {
      bigMenu.clearAll();
      await router.push({ path: '/' });
    }
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const getValue = (obj) => {
  userInfo[obj.name] = obj.value;
};

const save = async () => {
  try {
    await api.postInfo('updateUserInfo', userInfo);
  } catch (error) {
    console.error("Save failed:", error);
  }
};
</script>

<template>
  <Transition mode="out-in" name="fade">
    <LoaderBig v-if="loading" key="loader" />
    <div v-else class="user-view">
      <div class="inputs-container">
        <InputBordered
            :name="'user_email'"
            :value="userInfo.user_email"
            @returnValue="getValue"
        >
          Email
        </InputBordered>
        <InputBordered
            :name="'user_name'"
            :value="userInfo.user_name"
            @returnValue="getValue"
        >
          Name
        </InputBordered>
        <InputBordered
            :name="'user_surname'"
            :value="userInfo.user_surname"
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

<style scoped>
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
    border-color: var(--description);
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
      background-color: var(--gold);
      color: black;
    }
    &:active {
      opacity: .5;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.25s ease-out;
  }

  .fade-enter-from {
    opacity: 0;
  }

  .fade-leave-to {
    opacity: 0;
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
