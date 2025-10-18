<script setup lang="ts">
  import {Ref, ref, watch} from "vue";
  import type { UserInfo } from '@/views/UserView.vue'

  type ReturnValue = {
    name: string,
    value: string | number;
  }

  /*const emit = defineEmits(['returnValue']);*/
  const emit = defineEmits<{
    (e: 'returnValue', value: { name: keyof UserInfo; value: string }): void;
  }>();
  /*const props = defineProps({
    name: String,
    value: String,
  });*/
  const props = defineProps<{
    name: string,
    value: number | string
  }>();

  const model: Ref = ref(props.value);

  watch((): number | string => props.value,
      (newValue: number | string): void => {
    model.value = newValue;
  });

  const returnValue = (): void => {
    emit('returnValue', {name: props.name, value: model.value});
  }
</script>

<template>
  <div class="wrapper">
    <div class="label"><slot/>:</div>
    <label :for="`input-${props.name}`" class="bordered">
      <input :id="`input-${props.name}`"
             :type="props.name !== 'user_id' ? 'text': 'number'"
             v-model="model"
             @keyup="returnValue"
      />
    </label>
  </div>
</template>

<style scoped>
  .wrapper {
    width: 100%;
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    color: var(--textColor);
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
    border-color: var(--SvgColor);
    border-radius: 5px;
    input {
      width: 100%;
      height: 100%;
      font-size: 20px;
    }
  }
</style>
