<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
  import {useListViewStore} from "@/stores/ListViewStore";
  import InputTaskHeader from "@/components/MY_UI/InputTaskHeader.vue";
  import DotBtn from "@/components/MY_UI/DotBtn.vue";
  import Flag from "@/components/MY_UI/Flag.vue";
  import TextArea from "@/components/MY_UI/TextArea.vue";
  import PersonalTag from "@/components/MY_UI/PersonalTag.vue";
  import {useRoute} from "vue-router";
  import TagCreator from "@/components/MY_UI/TagCreator.vue";
  import DeleteBtn from "@/components/MY_UI/DeleteBtn.vue";
  import {Task} from "@/types/listView";
  import DatePickerTask from "@/components/CUSTOM_UI/DatePickerTask.vue";

  const props = defineProps<({
    task:   Task,
    color:  string,
  })>();
  const emits = defineEmits<{
    (e: 'done', payload: { task: Task; is_done: boolean | number; action: string }): void;
    (e: 'flag', payload: { task: Task; is_flagged: boolean | number; action: string }): void;
    (e: 'date', payload: { task: Task; date: string; action: string }): void;
  }>();
  const route = useRoute();

  const is_visible = ref(false);
  const listView = useListViewStore();
  const taskNode = ref<HTMLElement | null>(null);

  const height = ref('');

  const isMounted = ref(false);

  watch(() => props.task.changer, () => {
    if (taskNode.value) return;
    if (isMounted.value) {
      console.log('watch')
      height.value = `${taskNode.value!.scrollHeight}px`;
      taskNode.value!.classList.remove('show-anim');
      taskNode.value!.classList.remove('hide-anim');
      if (document.documentElement.clientWidth <= 700) {
        is_visible.value = true;
      }
    }
  });

  onMounted(() => {
    if (taskNode.value) return;
    height.value = `${taskNode.value!.scrollHeight}px`;
    taskNode.value!.classList.add('show-anim');
    taskNode.value!.classList.remove('hide-anim');
    if (document.documentElement.clientWidth <= 700) {
      is_visible.value = true;
    }
    isMounted.value = true;
  });

  const saveChangesName = (newName: string) => {saveChanges('name', newName);};

  const saveChangesDescription = (description: string) => {saveChanges('description', description);};

  const saveChangesDate = (date: string) => {
    saveChanges('deadline', date);
    emits('date', {task: props.task, date, action: 'date'});
  };

  const saveChangesFlag = (is_flagged: boolean) => {
    stylesForFlagChanges(is_flagged);
    saveChanges('is_flagged', is_flagged);
    setTimeout(() => {
      emits('flag', {task: props.task, is_flagged, action: 'flag'});
    }, 1000);
  };

  const saveChangesDot = (is_done: boolean) => {
    stylesForDotChanges(is_done);
    saveChanges('is_done', is_done);
    setTimeout(() => {
      emits('done', {task: props.task, is_done, action: 'done'});
    },1000);
  };

  const stylesForFlagChanges = (is_flagged: boolean) => {
    if (!is_flagged && route.params.name === 'with_flag') hideTask();
  };

  const stylesForDotChanges = (is_done: boolean) => {
    if (route.params.id_list || route.params.name === 'done') {
      hideTask();
    } else {
      disableEnableTask(is_done);
    }
  };

  const hideTask = () => {
    if (!taskNode.value) return;
    height.value = `${taskNode.value.scrollHeight}px`;
    taskNode.value.classList.add('hide-anim');
  };

  const disableEnableTask = (is_done: boolean) => {
    if (!taskNode.value) return;
    if (is_done) taskNode.value.classList.add('done');
    else taskNode.value.classList.remove('done');
  };

  const saveChanges = (whatChanges: string, changeValue: string | number | boolean) => {
    let update: {
      id: number,
      name: string,
      value: string | number | boolean,
    } = {
      id: props.task.id ?? 0,
      name: whatChanges,
      value: changeValue,
    };
    listView.updateTask(update);
  }
  const createTask = async (newName: string) => {
    if (newName) {
      const newTask = {
        id:           0,
        id_list:      0,
        name:         newName,
        description:  null,
        deadline:     null,
        is_done:      false,
        is_flagged:   false,
        url:          null,
        priority:     null,
        tags:         [],
        possibleTags: [],
      };
      const newTaskResponse = await listView.createTask(newTask);
    } else {
      hideTask();
      setTimeout(() => {
        listView.removeNewTask();
      }, 1000);
    }
  }
  const deleteTask = () => {
    hideTask();
    setTimeout(() => {
      if (props.task.id) {
        listView.deleteTask({id: props.task.id});
      }
    }, 1000);
  };
</script>

<template>
  <div class="task"
       ref="taskNode"
       @mouseover="is_visible = true"
       @mouseout="is_visible = false"
  >
    <div class="task__top-container">
      <DotBtn
          :key="props.task.changer ?? Math.random()"
          :is_done="props.task.is_done"
          :id="props.task.id ?? 0"
          :color="props.color"
          @dot="saveChangesDot"
      />
      <div class="task__group">
        <InputTaskHeader
            :id="props.task.id ?? 0"
            :color="props.color"
            :name="`name_${props.task.id}`"
            :taskName="props.task.name ?? ''"
            :placeholder="'Задача'"
            @saveChangesName="saveChangesName"
            @createTask="createTask"
        />
        <Flag :is_flagged="props.task.is_flagged"
              :is_visible="is_visible"
              :id="props.task.id"
              @flag="saveChangesFlag"
        />
<!--        <InfoList
            @delete="deleteTask"
        />-->
        <DeleteBtn @delete="deleteTask"/>
      </div>
    </div>
    <div class="task__bottom-container">
      <TextArea
          :id="props.task.id"
          :placeholder="'Описание'"
          :name="`description_${props.task.id}`"
          :value="props.task.description ?? ''"
          @saveChangesDescription="saveChangesDescription"
      />
      <div class="info-btns__container">
        <DatePickerTask :deadline="task.deadline"
                        @setDeadline="saveChangesDate"
        />
        <TagCreator
            v-if="props.task.possibleTags"
            :key="props.task.tagCreatorKey ?? ''"
            :id_task="props.task.id ?? 0"
            :possibleTags="props.task.possibleTags"
        />
        <PersonalTag
            v-for="tag in props.task.tags"
            :key="`added-tag-${props.task.id}-${tag.id}`"
            :id_task="props.task.id ?? 0"
            :tag="tag"
            :isCanChange="true"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .task {
    width: 100%;
    color: #C5C7CA;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 5px 5px 5px 0;
    transition: .3s;
    &.show-anim {
      animation: show .5s ease;
    }
    &.hide-anim {
      animation: hide .5s ease forwards;
    }
    &.done {
      opacity: .6;
    }
  }
  @keyframes show {
    0% {
      opacity: 0;
      height: 0;
      padding: 0;
    }
    50% {
      opacity: 0;
      height: v-bind(height);
      padding: 5px 5px 5px 0;
    }
    100% {
      opacity: 1;
      height: v-bind(height);
      padding: 5px 5px 5px 0;
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
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--line);
  }
  .info-btns__container {
    width: 100%;
    min-height: 28px;
    display: flex;
    grid-gap: 5px;
    flex-wrap: wrap;
  }
</style>
