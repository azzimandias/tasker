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
      if (taskName.value) {
        emit('saveChangesName',taskName.value);
      } else {
        listView.addAlert({
          id: Math.random(),
          name: "У задачи должно быть название",
          description: "Добавьте имя задаче"
        });
      }
    }
  };
</script>

<template>
  <label   :for="`input-task-header-${id}`"
           class="input-task-header-label"
  >
    <input :id="`input-task-header-${id}`"
           class="task__name"
           :style="{color: props.color}"
           :name="props.name"
           :placeholder="props.placeholder"
           v-model="taskName"
           @blur="createOrUpdate"
           @keyup.enter="blurInput"
           ref="taskNode"
    />
  </label>
</template>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .input-task-header-label {
    flex: 1 0 100px;
    height: 25px;
  }
  .task__name {
    width: 100%;
    height: 25px;
    transition: .3s;
    cursor: pointer;
    font-weight: 600;
    &::placeholder { @include theme('color', $placeholder); }
  }
</style>
