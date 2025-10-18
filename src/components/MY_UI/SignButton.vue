<script setup lang="ts"></script>

<template>
  <button class="sign-btn">
    <slot/>
  </button>
</template>

<style scoped>
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
    color: var(--gold);
    background-color: transparent;
    border-width: 1px;
    border-style: solid;
    border-color: var(--gold);
  }
  .sign-up {
    color: var(--textColorActive);
    background-color: var(--gold);
    border-width: 1px;
    border-style: solid;
    border-color: var(--gold);
  }
  @media screen and (max-width: 730px) {
    .sign-btn {
      height: 60px;
    }
  }
</style>
