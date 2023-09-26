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
            @saveChangesName="saveChangesName"
        />
        <Flag :is_flagged="props.task.is_flagged"
              :is_visible="is_visible"
              :id="props.task.id"
              @flag="saveChangesFlag"
        />
        <InfoList
            @deleteTask="deleteTask"
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

const is_visible = ref(false);
const listView = useListViewStore();
const taskNode = ref(null);

const saveChangesName = (name) => {saveChanges('name', name);};
const saveChangesDescription = (description) => {saveChanges('description', description);};
const saveChangesDate = (date) => {saveChanges('deadline', date);};
const saveChangesFlag = (is_flagged) => {saveChanges('is_flagged', is_flagged);};
const saveChangesDot = (is_done) => {saveChanges('is_done', is_done);};
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
