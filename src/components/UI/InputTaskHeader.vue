<script setup>
import {onMounted, ref, watch} from "vue";
  import {useListViewStore} from "@/stores/ListViewStore";

  const listView = useListViewStore();
  const taskNode = ref(null);
  const emit = defineEmits(['saveChangesName', 'createTask']);
  const props = defineProps({
    id: Number,
    color: String,
    name: String,
    taskName: String,
    placeholder: String,
  });
  let taskName = ref(props.taskName);

  watch(() => props.taskName, (newValue) => {
        taskName.value = newValue;
      }
  );

  onMounted(() => {
    if (!props.id) {
      taskNode.value.focus();
    }
  });

  const blurInput = () => {
    if (taskNode.value) taskNode.value.blur();
  };
  const createOrUpdate = () => {
    if (!props.id) createTask();
    else saveChanges();
  };
  const createTask = async () => {
    emit('createTask',taskName.value);
  }
  const saveChanges = () => {
    if (props.taskName !== taskName.value) {
      emit('saveChangesName',taskName.value);
    }
  };
</script>

<template>
  <input class="task__name"
         :style="{color: props.color}"
         :name="props.name"
         :placeholder="props.placeholder"
         v-model="taskName"
         @blur="createOrUpdate"
         @keyup.enter="blurInput"
         ref="taskNode"
  />
</template>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .task__name {
    flex: 1 0 100px;
    height: 25px;
    transition: .3s;
    cursor: pointer;
    font-weight: 600;
    &::placeholder { @include theme('color', $placeholder); }
  }
</style>
