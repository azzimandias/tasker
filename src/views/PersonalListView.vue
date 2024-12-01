<script setup>
  import { useListViewStore } from "@/stores/ListViewStore";
  import {useImageDBStore} from "@/stores/imageDBStore";
  import ListHeader from "@/components/UI/ListHeader.vue";
  import ListDone from "@/components/UI/ListDone.vue";
  import SomethingWrong from "@/components/UI/SomethingWrong.vue";
  import Task from "@/components/UI/Task.vue";
  import LoaderBig from "@/components/UI/LoaderBig.vue";
  import {ref, watchEffect} from "vue";
  import {useRoute} from "vue-router";

  const listView = useListViewStore();
  const imageDB = useImageDBStore();
  const route = useRoute();
  const isDoneTasksOpen = ref(false);
  watchEffect(() => {
    if (!route.params.id_list) {
      listView.loading = true;
    }
  });

  const taskSlideToBottom = (obj) => {
    listView.updateTaskDone(obj.task.id, obj.is_done);
  };

  const openTasksDone = () => {
    isDoneTasksOpen.value = !isDoneTasksOpen.value;
  };
</script>

<template>
  <Transition mode="out-in" name="fade">

    <LoaderBig v-if="listView.loading"/>

    <SomethingWrong v-else-if="listView.is_somethingWrong"/>

    <div class="workspace" v-else>
      <div class="top-header">
        <ListHeader :list="listView.listInfo"
                    :isCanChange="true"
                    :top="40"
        />
      </div>
      <div class="task__container scroll">
        <Task
            v-for="task in listView.tasks"
            :key="task.key"
            :task="task"
            :color="listView.listInfo.color"
            :is_new="false"
            @done="taskSlideToBottom"
            v-if="listView.tasks.length"
        />
      </div>
      <ListDone v-if="listView.tasksDone.length"
                :isOpen="isDoneTasksOpen"
                :class="{active: isDoneTasksOpen}"
                @openTasksDone="openTasksDone"
      >
        Выполненные
      </ListDone>
      <div class="task__container scroll" v-if="listView.tasksDone.length && isDoneTasksOpen">
        <Task
            v-for="task in listView.tasksDone"
            :key="task.key"
            :task="task"
            :color="listView.listInfo.color"
            :is_new="false"
            @done="taskSlideToBottom"
            v-if="listView.tasksDone.length"
        />
      </div>
      <div class="empty-list__title" v-if="!listView.tasks.length && !listView.tasksDone.length"><p>Здесь пусто.</p></div>
    </div>

  </Transition>
</template>

<style lang="scss" scoped>
.workspace {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 20px;
  padding-bottom: 150px;
}
.top-header {
  width: 100%;
  padding-right: 18px;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 28px 28px;
  grid-gap: 11px;
}
.task__container {
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.empty-list__title {
  flex: 1 0 100px;
  font-size: 20px;
  color: #c4c4c4;
  display: flex;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
