<template>
  <button class="sign-btn">
    <slot/>
  </button>
</template>

<style scoped lang="scss">
  /*@import "../../assets/styles/global.scss";*/
  .sign-btn {
    width: 130px;
    height: 50px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    &:active {
      opacity: .8;
    }
  }
  .sign-in {
    /*@include theme('color', $gold);*/
    background-color: transparent;
    border-width: 1px;
    border-style: solid;
    /*@include theme('border-color', $gold);*/
  }
  .sign-up {
    /*@include theme('color', $textColorActive);*/
    /*@include theme('background-color', $gold);*/
    border-width: 1px;
    border-style: solid;
    /*@include theme('border-color', $gold);*/
  }
  @media screen and (max-width: 730px) {
    .sign-btn {
      height: 60px;
    }
  }
</style>
