<template>
  <div class="task" @mouseover="is_visible = true" @mouseout="is_visible = false">
    <div class="task__top-container">
      <DotBtn
          :is_done="props.task.is_done"
          :id="props.task.id"
          :color="props.color"
          @dot="saveChangesDot"
      />
      <div class="task__group">
        <InputTaskHeader
            :id="props.task.id"
            :color="props.color"
            :name="`name_${props.task.id}`"
            :taskName="props.task.name"
            :placeholder="'Задача'"
        />
        <Flag :is_flagged="props.task.is_flagged"
              :is_visible="is_visible"
              :id="props.task.id"
              @flag="saveChangesFlag"
        />
      </div>
    </div>
    <div class="task__bottom-container">
      <TextArea
          :id="props.task.id"
          :placeholder="'Описание'"
          :name="`description_${props.task.id}`"
          :value="props.task.description"
      />
      <div class="info-btns__container">
        <InputDate
            :id="props.task.id"
            :deadline="props.task.deadline"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useListViewStore} from "@/stores/ListViewStore";
import InputTaskHeader from "@/components/UI/InputTaskHeader.vue";
import DotBtn from "@/components/UI/DotBtn.vue";
import Flag from "@/components/UI/Flag.vue";
import TextArea from "@/components/UI/TextArea.vue";
import InputDate from "@/components/UI/InputDate.vue";

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
const listView = useListViewStore();
const taskNode = ref(null);

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
  .task__bottom-container {
    margin-left: 35px;
    padding-bottom: 5px;
    border-bottom: 2px solid #494B4E;
  }
  .info-btns__container {
    width: 100%;
    height: 25px;
    display: flex;
    grid-gap: 5px;
  }
</style>
