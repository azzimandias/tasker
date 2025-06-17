<script setup>
import {ref, watch} from "vue";

  const emit = defineEmits(['returnValue'])
  const props = defineProps({
    name: String,
    value: String,
  });
  const model = ref(props.value);

  watch(() => props.value, (newValue) => {
    model.value = newValue;
  });

  const returnValue = () => {
    emit('returnValue', {name: props.name, value: model.value});
  }
</script>

<template>
  <div class="wrapper">
    <div class="label"><slot/>:</div>
    <label :for="`input-${props.name}`" class="bordered">
      <input :id="`input-${props.name}`"
             type="text"
             v-model="model"
             @keyup="returnValue"
      />
    </label>
  </div>
</template>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";
  .wrapper {
    width: 100%;
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    @include theme('color', $textColor);
    grid-gap: 20px;
  }
  .label {
    font-size: 20px;
  }
  .bordered {
    padding: 5px 10px;
    width: 100%;
    height: 100%;
    border-width: 1px;
    border-style: solid;
    @include theme('border-color', $SvgColor);
    border-radius: 5px;
    input {
      width: 100%;
      height: 100%;
      font-size: 20px;
    }
  }
</style>
