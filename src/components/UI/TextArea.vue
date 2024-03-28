<script setup>
  import {onMounted, ref} from "vue";
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

  onMounted(() => {
    resize();
  });

  const resize = () => {
    taskTextareaNode.value.style.cssText = 'height: auto; padding: 0';
    taskTextareaNode.value.style.cssText = `height: ${taskTextareaNode.value.scrollHeight + 15}px`;
  };

  const saveChangesTextarea = () => {
    taskTextareaNode.value.blur();
    let valueModel = taskTextareaNode.value.value;
    if (props.value !== valueModel) {
      emit('saveChangesDescription', valueModel);
    }
  };
</script>

<template>
  <textarea
      class="task__description"
      ref="taskTextareaNode"
      :placeholder="props.placeholder"
      :name="props.name"
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
    &::placeholder { color: $placeholder; }
  }
</style>
