<script setup>
  const prop = defineProps({
    isDoneTasksOpen: Boolean,
  });
  const emit = defineEmits(['openTasksDone']);
</script>

<template>
  <h2 class="list-done" @click="emit('openTasksDone')">
    <slot/>
  </h2>
</template>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";
  .list-done {
    font-size: 20px;
    @include theme('color', $description);
    position: sticky;
    top: 103px;
    @include theme('background-color', $tasker);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 0 20px;
    z-index: 1;
    cursor: pointer;
    &::after {
      content: '';
      width: 25px;
      height: 25px;
      position: absolute;
      top: 12px;
      right: 22px;
      background-image: url("../../assets/svgs/arrow-down.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 25px 25px;
    }
    &.active {
      &::after {
        transform: rotate(180deg);
      }
    }
  }
</style>
