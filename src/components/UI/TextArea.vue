<template>
  <textarea
      class="task__description"
      ref="taskTextareaNode"
      :placeholder="props.placeholder"
      :name="props.name"
      v-model="valueModel"
      @blur="saveChangesTextarea"
  ></textarea>
</template>

<script setup>
  import {ref} from "vue";
  import {useListViewStore} from "@/stores/ListViewStore";

  const listView = useListViewStore();
  const props = defineProps({
    id: Number,
    placeholder: String,
    name: String,
    value: String,
  });
  const taskTextareaNode = ref(null);
  const valueModel = props.value;

  const saveChangesTextarea = () => {
    taskTextareaNode.value.blur();
    if (props.value !== valueModel) {
      listView.updateTask({
        id: props.id,
        name: 'description',
        value: valueModel,
      });
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