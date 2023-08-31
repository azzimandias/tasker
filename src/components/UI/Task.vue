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
               @blur="createOrUpdate"
               @keyup.enter="createOrUpdate"
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
        <div class="lb" @mousedown="openDatePicker" ref="datePicker">
          <VueDatePicker
              v-model="props.task.deadline"
              :dark="true"
              :position="'center'"
              :teleport="true"
              :locale="'ru'"
              :format="'yyyy-MM-dd'"
              :close-on-scroll="true"
              :placeholder="'Дата'"
              :text-input="true"
          />
          <div class="date__wrapper">
            <img class="date-pic" src="../../assets/svgs/calendar.svg" alt="calendar">
            <p class="date" v-if="props.task.deadline">{{ transitDate(props.task.deadline) }}</p>
            <p class="date" v-else>Дата</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useListViewStore} from "@/stores/ListViewStore";
import DotBtn from "@/components/UI/DotBtn.vue";
import Flag from "@/components/UI/Flag.vue";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

onMounted(() => {
  if (!props.task.id) {
    taskNode.value.focus();
  }
});

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
const datePicker = ref(null);
const deadline = ref();

const openDatePicker = () => {
  const node = datePicker.value.firstElementChild;
  node.querySelector('.dp__input').click();
};
const transitDate = (date) => {
  console.log(date)
  deadline.value = Date.parse(date);
  console.log(deadline.value)
  saveChangesDate();
  return 0//('0' + deadline.value.getDate()).slice(-2) + '.' + ('0' + (deadline.value.getMonth() + 1)).slice(-2) + '.' + deadline.value.getFullYear();
};
const saveChangesDate = () => {
  if (!objectsEqual(props.task, imageOfTask)) {
    imageOfTask.deadline = deadline.value;
    listView.updateTask(imageOfTask);
  }
};
const createOrUpdate = () => {
  if (taskNode.value) taskNode.value.blur();
  if (!imageOfTask.id) createTask();
  else saveChanges();
};
const createTask = async () => {
  if (props.task.name) {
    imageOfTask.name = props.task.name;
    const newTask = await listView.createTask(imageOfTask);
    imageOfTask.id = newTask.id;
  } else {
    listView.removeNewTask();
  }
}
const saveChanges = () => {
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
  @import "../../assets/styles/global.scss";
  .task {
    width: 100%;
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
    &::placeholder { color: $placeholder; }
  }
  .task__bottom-container {
    margin-left: 35px;
    padding-bottom: 5px;
    border-bottom: 2px solid #494B4E;
  }
  .task__description {
    width: 100%;
    height: 25px;
    color: $description;
    &::placeholder { color: $placeholder; }
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
    background-color: rgba(73, 75, 78, 0.3);
    border-radius: 5px;
    overflow: hidden;
    padding: 0 1px 1px 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .dp__main {
      opacity: 0;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: circle(1%);
    }
  }
  .date__wrapper {
    width: 100%;
    height: 100%;
    padding: 0 5px 0 2px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .date {
    width: 100%;
    color: $smallTextColor;
    text-align: right;
    font-size: 12px;
  }
  .date-pic {
    width: 18px;
    height: 18px;
  }
</style>
