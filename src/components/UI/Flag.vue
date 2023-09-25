<template>
  <label
      :for="`flag_${props.id}`"
      class="flag"
      :class="{active: is_flaggedModel, not_active: !is_flaggedModel, visible: is_visible}"
      @click="changeState"
  >
    <input type="checkbox" :id="`flag_${props.id}`" class="checkbox"/>
  </label>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  is_flagged: Number,
  is_visible: Boolean,
  id: Number,
});
const emits = defineEmits(['flag']);
const is_flaggedModel = ref(Boolean(props.is_flagged));
const changeState = () => {
  is_flaggedModel.value = !is_flaggedModel.value;
  emits('flag', is_flaggedModel.value);
}
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
