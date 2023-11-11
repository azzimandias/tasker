<template>
  <button class="sign-btn">
    <slot/>
  </button>
</template>

<script setup>

</script>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";
  .sign-btn {
    width: 130px;
    height: 50px;
    font-size: 16px;
    cursor: pointer;
    &:active {
      opacity: .8;
    }
  }
  .sign-in {
    color: $gold;
    background-color: transparent;
    border: 1px solid $gold;
  }
  .sign-up {
    color: $textColorActive;
    background-color: $gold;
    border: 1px solid $gold;
  }
</style>
