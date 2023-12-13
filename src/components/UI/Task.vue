<template>
  <div class="task"
       ref="taskNode"
       :class="{done: props.task.is_done}"
       @mouseover="is_visible = true"
       @mouseout="is_visible = false"
  >
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
            @saveChangesName="saveChangesName"
        />
        <Flag :is_flagged="props.task.is_flagged"
              :is_visible="is_visible"
              :id="props.task.id"
              @flag="saveChangesFlag"
        />
        <InfoList
            @delete="deleteTask"
        />
      </div>
    </div>
    <div class="task__bottom-container">
      <TextArea
          :id="props.task.id"
          :placeholder="'Описание'"
          :name="`description_${props.task.id}`"
          :value="props.task.description"
          @saveChangesDescription="saveChangesDescription"
      />
      <div class="info-btns__container">
        <InputDate
            :id="props.task.id"
            :deadline="props.task.deadline"
            @saveChangesDate="saveChangesDate"
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
import InfoList from "@/components/UI/InfoList.vue";
import TextArea from "@/components/UI/TextArea.vue";
import InputDate from "@/components/UI/InputDate.vue";

const props = defineProps({
  task: Object,
  color: String,
});
const emits = defineEmits(['done', 'flag', 'date']);

const is_visible = ref(false);
const listView = useListViewStore();
const taskNode = ref(null);

const height = ref('');

const saveChangesName = (name) => {saveChanges('name', name);};
const saveChangesDescription = (description) => {saveChanges('description', description);};
const saveChangesDate = (date) => {
  saveChanges('deadline', date);
  emits('date', {task: props.task, date, action: 'date'});
};
const saveChangesFlag = (is_flagged) => {
  saveChanges('is_flagged', is_flagged);
  emits('flag', {task: props.task, is_flagged, action: 'flag'});
};
const saveChangesDot = (is_done) => {
  hideTask();
  setTimeout(() => {
    taskNode.value.classList.remove('hide-anim');
    saveChanges('is_done', is_done);
    emits('done', {task: props.task, is_done, action: 'done'});
  },1000);
};
const hideTask = () => {
  height.value = `${taskNode.value.scrollHeight}px`;
  taskNode.value.classList.add('hide-anim');
};
const saveChanges = (whatChanges, changeValue) => {
  let update = {
    id: props.task.id,
    name: whatChanges,
    value: changeValue,
  };
  listView.updateTask(update);
}
const deleteTask = () => {
  listView.deleteTask({id: props.task.id});
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
    &.hide-anim {
      animation: hide .5s ease forwards;
    }
    &.done {
      opacity: .6;
    }
  }
  @keyframes hide {
    0% {
      opacity: 1;
      height: v-bind(height);
      padding: 5px 5px 5px 0;
    }
    50% {
      opacity: 0;
      height: v-bind(height);
      padding: 5px 5px 5px 0;
    }
    100% {
      opacity: 0;
      height: 0;
      padding: 0;
    }
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
