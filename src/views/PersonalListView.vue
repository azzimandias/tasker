<template>
  <Transition mode="out-in" name="fade">

    <LoaderBig v-if="listView.loading"/>

    <SomethingWrong v-else-if="listView.is_somethingWrong"/>

    <div class="workspace" v-else>
      <ListHeader :color="listView.listInfo.color">{{ listView.listInfo.name }}</ListHeader>
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
        <div class="empty-list__title" v-else><p>Здесь пусто.</p></div>
      </div>
    </div>

  </Transition>
</template>

<script setup>
import
{ useListViewStore } from "@/stores/ListViewStore";
import {useImageDBStore} from "@/stores/imageDBStore";
import ListHeader from "@/components/UI/ListHeader.vue";
import SomethingWrong from "@/components/UI/SomethingWrong.vue";
import Task from "@/components/UI/Task.vue";
import LoaderBig from "@/components/UI/LoaderBig.vue";
import {watchEffect} from "vue";
import {useRoute} from "vue-router";

const listView = useListViewStore();
const imageDB = useImageDBStore();
const route = useRoute();
watchEffect(() => {
  if (!route.params.id_list) {
    listView.loading = true;
  }
});

const taskSlideToBottom = (obj) => {
  listView.updateTaskDone(obj.task.id, obj.is_done);
};
</script>

<style lang="scss" scoped>
.workspace {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 20px;
}
.task__container {
  width: 100%;
  padding: 0 20px;
  flex: 1 0 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  //grid-gap: 20px;
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
