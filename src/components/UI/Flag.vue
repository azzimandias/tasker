<template>
  <button class="flag"
          :class="{active: props.is_flagged, not_active: !props.is_flagged, visible: is_visible}"
          @click="emits('flag')"
  ></button>
</template>

<script setup>
import { defineProps, ref, defineEmits } from "vue";
const props = defineProps({
  is_flagged: Number,
  is_visible: Boolean
});
const emits = defineEmits(['flag']);
</script>

<style lang="scss" scoped>
  .flag {
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    background-position: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    cursor: pointer;
    opacity: 0;
    &.active {
      background-image: url("@/assets/svgs/flag_active.svg");
      opacity: 1;
    }
    &.not_active {
      background-image: url("@/assets/svgs/flag.svg");
    }
    &.visible {
      opacity: 1;
    }
  }
</style>