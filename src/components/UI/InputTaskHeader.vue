<template>
  <input class="task__name"
         :style="{color: props.color}"
         :name="props.name"
         :placeholder="props.placeholder"
         v-model="taskName"
         @blur="createOrUpdate"
         @keyup.enter="createOrUpdate"
         ref="taskNode"
  />
</template>

<script setup>
import {ref} from "vue";
import {useListViewStore} from "@/stores/ListViewStore";

const listView = useListViewStore();
const taskNode = ref(null);
const emit = defineEmits(['createOrUpdate']);
const props = defineProps({
  id: Number,
  color: String,
  name: String,
  taskName: String,
  placeholder: String,
});
let taskName = props.taskName;

const createOrUpdate = () => {
  if (taskNode.value) taskNode.value.blur();
  if (!props.id) createTask();
  else saveChanges();
};
const createTask = async () => {
  if (props.task.name) {
    const newTask = await listView.createTask({name: taskName});
  } else {
    listView.removeNewTask();
  }
}
const saveChanges = () => {
  if (props.taskName !== taskName) {
    listView.updateTask({
      id: props.id,
      name: 'name',
      value: taskName,
    });
  }
};
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .task__name {
    flex: 1 0 100px;
    height: 25px;
    transition: .3s;
    cursor: pointer;
    font-weight: 600;
    &::placeholder { color: $placeholder; }
  }
</style>