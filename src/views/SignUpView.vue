<script setup lang="ts">
  import api from "@/api";
  import {ref} from "vue";
  import {useRouter} from "vue-router";

  const router = useRouter();
  const emits = defineEmits(['clearInterval']);

  const name =     ref<HTMLInputElement | null>(null);
  const surname =  ref<HTMLInputElement | null>(null);
  const email =    ref<HTMLInputElement | null>(null);
  const login =    ref<HTMLInputElement | null>(null);
  const password = ref<HTMLInputElement | null>(null);

  interface SignUpData {
    email: string;
    login: string;
    password: string;
    name: string;
    surname: string;
  }

  const signUp = async () => {
    const fields = { email, login, password, name, surname };
    removeHighlight();

    const signUpData = Object.fromEntries(
        Object.entries(fields).map(([key, ref]) => [key, ref.value?.value.trim() || ''])
    ) as unknown as SignUpData;
    const requiredFields = ['email', 'login', 'password'] as const;
    const emptyFields = requiredFields.filter((key) => !signUpData[key]);

    if (emptyFields.length > 0) {
      emptyFields.forEach((key) => {
        fields[key].value?.parentElement?.classList.add('empty');
      });
      return;
    }

    const response = await api.signUp(signUpData);
    show(response);
  };

  const show = (res: string) => {
    //console.log(res);
    if (res === 'done') {
      emits('clearInterval');
      router.push({ path: 'workspace' })
    }
  }
  const removeHighlight = () => {
    email.value?.parentElement?.classList.remove('empty');
    login.value?.parentElement?.classList.remove('empty');
    password.value?.parentElement?.classList.remove('empty');
  }
</script>

<template>
  <h2 class="header_big">Sign Up</h2>

  <div class="input-blocks__wrapper">
    <div class="input-block half">
      <p class="input-label">Name</p>
      <label for="userName">
        <input id="userName" ref="name" class="inputText" name="userName" type="text">
      </label>
    </div>

    <div class="input-block half">
      <p class="input-label">Surname</p>
      <label for="userSurname">
        <input id="userSurname" ref="surname" class="inputText" name="userSurname" type="text">
      </label>
    </div>
  </div>

  <div class="input-block">
    <p class="input-label">Email <span>*</span></p>
    <label for="email">
      <input id="email" ref="email" class="inputText" name="email" type="text">
    </label>
  </div>

  <div class="input-block">
    <p class="input-label">Login <span>*</span></p>
    <label for="login">
      <input id="login" ref="login" class="inputText" name="login" type="text">
    </label>
  </div>

  <div class="input-block">
    <p class="input-label">Password <span>*</span></p>
    <label for="password">
      <input id="password" ref="password" class="inputText" name="password" type="password">
    </label>
  </div>

  <button class="submit-log" @click="signUp"></button>
</template>

<style scoped>
  .header_big {
    font-size: 50px;
    line-height: 60px;
    color: var(--introTextColor);
    margin-bottom: 20px;
    text-align: center;
  }
  .input-blocks__wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
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
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-bottom-color: var(--line);
      &.empty {
        border-bottom: 1px solid darkred;
      }
    }
    & .inputText {
      width: 90%;
      height: 100%;
      font-size: 28px;
      color: var(--introTextColor);
    }
    &.half {
      width: 45%;
    }
  }
  .input-label {
    font-size: 18px;
    color: var(--introTextColor);
    span {
      color: darkred;
    }
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

  @media screen and (max-width: 730px) {
    .input-block .inputText {
      font-size: 18px;
      width: 100%;
      height: 100%;
    }
  }
</style>
