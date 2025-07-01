<script setup>
import {onMounted, ref, watch} from "vue";
  import {useListViewStore} from "@/stores/ListViewStore";

  const listView = useListViewStore();
  const emit = defineEmits(['saveChangesDescription'])
  const props = defineProps({
    id: Number,
    placeholder: String,
    name: String,
    value: String,
  });
  const taskTextareaNode = ref(null);
  const valueModel = ref(props.value);

  watch(() => props.value, (newValue) => {
    valueModel.value = newValue;
  });

  onMounted(() => {
    resize();
  });

  const resize = () => {
    taskTextareaNode.value.style.cssText = 'height: auto; padding: 0';
    taskTextareaNode.value.style.cssText = `height: ${taskTextareaNode.value.scrollHeight + 15}px`;
  };

  const saveChangesTextarea = () => {
    console.log(props.value)
    console.log(valueModel.value)
    if (props.value !== valueModel.value && valueModel.value) {
      emit('saveChangesDescription', valueModel.value);
    }
  };
</script>

<template>
  <textarea
      class="task__description scroll"
      ref="taskTextareaNode"
      :placeholder="props.placeholder"
      :name="props.name"
      v-model="valueModel"
      @blur="saveChangesTextarea"
      @keyup="resize"
  >{{ props.value }}</textarea>
</template>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .task__description {
    width: 100%;
    height: 25px;
    color: $description;
    @include theme('color', $description);
    &::placeholder { @include theme('color', $placeholder); }
  }
</style>
