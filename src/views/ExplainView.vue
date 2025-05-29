<template>
  <div class="explain">
    <div class="explain__container">
      <h4 class="explain__label">Let's get started !</h4>
      <ul>
        <li class="explain__label small">create personal task lists and of course tasks</li>
        <li class="explain__label small">share with your friends (in future)</li>
        <li class="explain__label small">use calendar mode (in future)</li>
        <li class="explain__label small">enjoy your productivity ✨</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .explain {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .explain__container {
    height: 300px;
  }
  .explain__label {
    font-size: 30px;
    font-weight: 600;
    color: #c4c4c4;
    margin-bottom: 10px;
    text-align: center;
    &.small {
      font-size: 20px;
      font-weight: 500;
      text-align: left;
    }
  }
</style>
<script setup lang="ts">
</script>