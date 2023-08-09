<template>
  <button class="btn task__btn" :class="{ done: props.is_done }" @click="switchBtn"></button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  is_done: Number
});

const switchBtn = () => {

}
</script>

<style lang="scss" scoped>
.task__btn {
  flex: 0 0 20px;
  height: 20px;
  transition: .3s;
  background-position: center;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  &.done {
    background-image: url("@/assets/svgs/dot_active.svg");
  }
  &.not-done {
    background-image: url("@/assets/svgs/dot.svg");
  }
  cursor: pointer;
}
</style>
