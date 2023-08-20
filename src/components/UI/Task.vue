<template>
  <div class="task" @mouseover="is_visible = true" @mouseout="is_visible = false">
    <div class="task__top-container">
      <DotBtn
          :is_done="props.task.is_done"
          :id="props.task.id"
          :color="props.color"
          @dot="saveChangesDot"
      />
      <div class="task__group" :class="{focused: is_focused}">
        <input class="task__name"
               :style="{color: props.color}"
               :name="`name_${task.id}`"
               placeholder="Задача"
               v-model="props.task.name"
               @click.left="is_focused = true"
               @blur="saveChanges"
               @keyup.enter="saveChanges"
               ref="taskNode"
        />
        <Flag :is_flagged="props.task.is_flagged"
              :is_visible="is_visible"
              :id="props.task.id"
              @flag="saveChangesFlag"
        />
      </div>
    </div>
    <div class="task__bottom-container">
      <textarea
                placeholder="Описание"
                class="task__description"
                :name="`description_${task.id}`"
                v-model="props.task.description"
                @blur="saveChangesTextarea"
                ref="taskTextareaNode"
      ></textarea>
      <div class="info-btns__container">
<!--        <label :for="`date_${task.id}`">
          <input :id="`date_${task.id}`" class="date_inp" type="date"/>
        </label>-->
        <div class="lb">
<!--          <VueDatePicker
              v-model="props.task.deadline"
              :dark="true"
              :position="'center'"
              :teleport="true"
              :locale="'ru'"
              :format="'dd-MM-yyyy'"
              :close-on-scroll="true"
              :placeholder="'Дата'"
              :text-input="true"
          />-->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useListViewStore} from "@/stores/ListViewStore";
import DotBtn from "@/components/UI/DotBtn.vue";
import Flag from "@/components/UI/Flag.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
  task: Object,
  color: String,
});

const imageOfTask = Object.assign({}, props.task);
const is_visible = ref(false);
const is_focused = ref(false);
const listView = useListViewStore();
const taskNode = ref(null);
const taskTextareaNode = ref(null);
const saveChanges = () => {
  is_focused.value = false;
  taskNode.value.blur();
  if (!objectsEqual(props.task, imageOfTask)) {
    imageOfTask.name = props.task.name;
    listView.updateTask(imageOfTask);
  }
};

const saveChangesTextarea = () => {
  taskTextareaNode.value.blur();
  if (!objectsEqual(props.task, imageOfTask)) {
    imageOfTask.description = props.task.description;
    listView.updateTask(imageOfTask);
    console.log(imageOfTask)
  }
};

const saveChangesFlag = () => {
  if (props.task.is_flagged) { props.task.is_flagged = 0; }
  else { props.task.is_flagged = 1; }
  if (!objectsEqual(props.task, imageOfTask)) {
    imageOfTask.is_flagged = props.task.is_flagged;
    listView.updateTask(imageOfTask);
  }
};

const saveChangesDot = () => {
  if (props.task.is_done) { props.task.is_done = 0; }
  else { props.task.is_done = 1; }
  if (!objectsEqual(props.task, imageOfTask)) {
    imageOfTask.is_done = props.task.is_done;
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
    if (entries1[i][0] !== entries2[i][0]) {
      return false;
    }
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
    //height: 50px;
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
    font-weight: 600;
  }
  .task__bottom-container {
    //min-height: 25px;
    margin-left: 35px;
    padding-bottom: 5px;
    border-bottom: 2px solid #494B4E;
  }
  .task__description {
    width: 100%;
    height: 25px;
    color: #c4c4c4;
  }
  .info-btns__container {
    width: 100%;
    height: 25px;
    display: flex;
    grid-gap: 5px;
  }
  .lb {
    width: 100px;
    height: 20px;
    //background-color: rgba(73, 75, 78, 0.4);
    background-color: white;
    border: 2px solid #494B4E;
    border-radius: 5px;
    overflow: hidden;
    &:first-child {
      opacity: 0;
      border: none;
      background: none;
    }
  }
</style>
