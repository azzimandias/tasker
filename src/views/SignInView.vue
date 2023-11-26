<template>
  <h2 class="header_big">Sign In</h2>

  <form>
    <div class="input-block">
      <p class="input-label">Login or Email</p>
      <label for="loginOrEmail">
        <input id="loginOrEmail" ref="loginOrEmail" class="inputText" name="loginOrEmail" type="text">
      </label>
    </div>

    <div class="input-block">
      <p class="input-label">Password</p>
      <label for="password">
        <input id="password" ref="password" class="inputText" name="password" type="password">
      </label>
    </div>
  </form>

  <button class="submit-log" @click="signIn"></button>
</template>

<script setup>
  import {ref} from "vue";
  import api from "@/api";
  import {useRouter} from "vue-router"

  const router = useRouter();
  const emits = defineEmits(['clearInterval']);
  const loginOrEmail = ref(null);
  const password = ref(null);

  const signIn = async () => {
    removeHighlight();
    const signInData = {
      email:      String(loginOrEmail.value.value),
      password:   String(password.value.value),
    };
    if (signInData.email !== '' && signInData.password !== '') {
      removeHighlight();
      const response = await api.signIn(signInData);
      await show(response);
    } else {
      if (signInData.email === '') {
        loginOrEmail.value.parentElement.classList.add('empty');
      }
      if (signInData.password === '') {
        password.value.parentElement.classList.add('empty');
      }
    }
  };

  const show = (res) => {
    console.log(res);
    if (res === 'done') {
      emits('clearInterval');
      router.push({ path: 'workspace' })
    }
  };

  const removeHighlight = () => {
    loginOrEmail.value.parentElement.classList.remove('empty');
    password.value.parentElement.classList.remove('empty');
  };

</script>

<style scoped lang="scss">
  @import "../assets/styles/global.scss";
  .header_big {
    font-size: 50px;
    line-height: 60px;
    color: $description;
    margin-bottom: 20px;
    text-align: center;
  }
  .input-block {
    width: 100%;
    height: 70px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    & label {
      width: 100%;
      height: 35px;
      border-bottom: 1px solid white;
      &.empty {
        border-bottom: 1px solid darkred;
      }
    }
    & input {
      width: 90%;
      height: 28px;
      font-size: 28px;
      color: $description;
    }
  }
  .input-label {
    font-size: 18px;
    color: $description;
  }
  .submit-log {
    width: 50px;
    height: 50px;
    padding: 0;
    background-image: url("../assets/svgs/arrow-circle.svg");
    background-size: 50px 50px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }
</style>