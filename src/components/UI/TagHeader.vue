<script setup></script>

<template>
  <div class="tag-header">
    <slot/>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .tag-header {
    width: auto;
    height: auto;
    @include theme('background-color', $gold);
    color: #171515;
    font-size: 20px;
    padding: 5px 8px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 8.5px;
  }
</style>
