<template>
  <div class="task" @mouseover="is_visible = true" @mouseout="is_visible = false">
    <div class="task__top-container">
      <DotBtn :is_done="props.task.is_done"/>
      <div class="task__group" :class="{focused: is_focused}">
        <input class="task__name"
               :name="`name_${task.id}`"
               v-model="imageOfTask.name"
               @click.left="is_focused = true"
               @blur="saveChanges"
               @keyup.enter="saveChanges"
               ref="taskNode"
        />
        <Flag :is_flagged="task.is_flagged" :is_visible="is_visible"/>
      </div>
    </div>
    <div class="task__bottom-container"></div>
    <textarea class="task__description" :name="`description_${task.id}`"></textarea>
  </div>
</template>

<script setup>
import { ref,defineProps } from 'vue';
import {useListViewStore} from "@/stores/ListViewStore";
import DotBtn from "@/components/UI/DotBtn.vue";
import Flag from "@/components/UI/Flag.vue";
const props = defineProps({
  task: Object
});
const imageOfTask = props.task;
const is_visible = ref(false);
const is_focused = ref(false);
const listView = useListViewStore();
const taskNode = ref(null);
const saveChanges = () => {
  is_focused.value = false;
  //taskNode.value.blur();
  if (objectsEqual(props.task, imageOfTask)) {
    listView.updateTask(imageOfTask);
  }
};

const objectsEqual = (o1, o2) => {
  const entries1 = Object.entries(o1);
  const entries2 = Object.entries(o2);
  if (entries1.length !== entries2.length) {
    return false;
  }
  for (let i = 0; i < entries1.length; ++i) {
    // Ключи
    if (entries1[i][0] !== entries2[i][0]) {
      return false;
    }
    // Значения
    if (entries1[i][1] !== entries2[i][1]) {
      return false;
    }
  }
  return true;
};
</script>

<style lang="scss" scoped>
  .task {
    width: 100%;
    min-height: 50px;
    height: 50px;
    color: #C5C7CA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 5px 5px 0;
  }
  .task__top-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    grid-gap: 15px;
  }
  .task__btn {
    flex: 0 0 20px;
    height: 20px;
    transition: .3s;
    background-image: url("@/assets/svgs/dot.svg");
    background-position: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    &.active {
      background-image: url("@/assets/svgs/dot_active.svg");
    }
  }
  .task__group {
    flex: 1 0 100px;
    display: flex;
    border-bottom: 2px solid transparent;
    &.focused {
      border-bottom: 2px solid #C5C7CA;
    }
  }
  .task__name {
    flex: 1 0 100px;
    height: 25px;
    transition: .3s;
    cursor: pointer;
  }
  .task__bottom-container {
    //min-height: 25px;
    margin-left: 35px;
    border-bottom: 2px solid #494B4E;
  }
  .task__description {
    display: none;
  }
</style>
