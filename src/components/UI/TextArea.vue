<template>
  <textarea
      class="task__description"
      ref="taskTextareaNode"
      :placeholder="props.placeholder"
      :name="props.name"
      @blur="saveChangesTextarea"
  >{{ props.value }}</textarea>
</template>

<script setup>
  import {ref} from "vue";
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

  const saveChangesTextarea = () => {
    taskTextareaNode.value.blur();
    let valueModel = taskTextareaNode.value.value;
    if (props.value !== valueModel) {
      emit('saveChangesDescription', valueModel);
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .task__description {
    width: 100%;
    height: 25px;
    color: $description;
    &::placeholder { color: $placeholder; }
  }
</style>
