<script setup>
import {ref, watch} from "vue";
  import coloris from '@/coloris';
  const props = defineProps({
    color: String,
  });
  const emit = defineEmits(['onDroch']);
  const value = ref(props.color ? props.color : '#ffffff');

  watch(() => props.color,
      (newValue) => {
          value.value = newValue;
      })

  Coloris({
    el: '.coloris',

    themeMode: 'auto',
    format: 'hex',
    swatches: [
      '#264653',
      '#2a9d8f',
      '#e9c46a',
      '#f4a261',
      '#e76f51',
      '#d62828',
      '#023e8a',
      '#0077b6',
      '#0096c7',
      '#00b4d8',
      '#48cae4',
    ]
  });
</script>

<template>
  <input type="text"
         class="coloris inp"
         v-model="value"
         :style="{backgroundColor: value, color: value}"
         @change="emit('onDroch', value)"
  />
</template>

<style lang="scss" scoped>
@import "../../assets/styles/coloris.css";
.inp {
  width: 30px;
  height: 30px;
  color: #c4c4c4;
  border: 2px solid #706767;
  border-radius: 50%;
  cursor: pointer;
}
</style>
