<script setup lang="ts">
import {onMounted, PropType, ref, watch} from "vue";
  import {useListViewStore} from "@/stores/ListViewStore";

  const listView = useListViewStore();
  const emit = defineEmits(['saveChangesDescription'])
  const props = defineProps({
    id:          { type: Number as PropType<number | null>, required: false },
    placeholder: { type: String as PropType<string | null>, required: false },
    name:        String,
    value:       String,
  });
  const taskTextareaNode = ref<HTMLElement | null>(null);
  const valueModel = ref(props.value);

  watch(() => props.value, (newValue) => {
    valueModel.value = newValue;
  });

  onMounted(() => {
    resize();
  });

  const resize = () => {
    if (!taskTextareaNode.value) return;
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
      :placeholder="props.placeholder ?? ''"
      :name="props.name"
      v-model="valueModel"
      @blur="saveChangesTextarea"
      @keyup="resize"
  >{{ props.value }}</textarea>
</template>

<style scoped>
  .task__description {
    width: 100%;
    height: 25px;
    color: var(--description);
  }
  .task__description::placeholder {
    color: var(--placeholder);
  }
</style>
