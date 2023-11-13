<template>
  <h2 class="header_big">Sign In</h2>

  <div class="input-block">
    <p class="input-label">Login</p>
    <label for="login">
      <input id="login" class="inputText" name="login" type="text">
    </label>
  </div>

  <div class="input-block">
    <p class="input-label">Password</p>
    <label for="password">
      <input id="password" class="inputText" name="password" type="password">
    </label>
  </div>

  <button class="submit-log"></button>
</template>

<script setup>

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
    }
    & input {
      width: 100%;
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