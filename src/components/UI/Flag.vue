<script setup>
import {ref, watch} from "vue";
  const props = defineProps({
    is_flagged: Number,
    is_visible: Boolean,
    id: Number,
  });
  const emits = defineEmits(['flag']);
  const is_flaggedModel = ref(props.is_flagged);
  watch(() => props.is_flagged, (newValue) => {
    is_flaggedModel.value = newValue;
  })
  const changeState = () => {
    is_flaggedModel.value = !is_flaggedModel.value;
    emits('flag', is_flaggedModel.value);
  }
</script>

<template>
  <label
      :for="`flag_${props.id}`"
      class="flag"
      :class="{active: is_flaggedModel, not_active: !is_flaggedModel, visible: is_visible}"
      @mouseup="changeState"
  >
    <input type="checkbox" :id="`flag_${props.id}`" class="checkbox"/>
  </label>
</template>

<style lang="scss" scoped>
  .flag {
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    margin: 0 10px;
    background-position: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    cursor: pointer;
    opacity: 0;
    transition: .3s;
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
  .checkbox {
    opacity: 0;
    cursor: pointer;
  }
</style>
