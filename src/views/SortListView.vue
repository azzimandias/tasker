<script setup>
  import { useListViewStore } from "@/stores/ListViewStore";
  import ListHeader from "@/components/UI/ListHeader.vue";
  import SomethingWrong from "@/components/UI/SomethingWrong.vue";
  import Task from "@/components/UI/Task.vue";
  import LoaderBig from "@/components/UI/LoaderBig.vue";
  import {watchEffect} from "vue";
  import {useRoute} from "vue-router";

  const listView = useListViewStore();
  const route = useRoute();
  watchEffect(() => {
    if (!route.params.name) {
      listView.loading = true;
    }
  });

  const refreshSortLists = (obj) => {
    if (route.params.name === 'done' && obj.action === 'done' ||
        route.params.name === 'with_flag' && obj.action === 'flag') {
      listView.clearTasks(obj.task.id);
    } else if (route.params.name === 'today' && obj.action === 'date') {
      if (obj.date !== getTodayDate()) {
        listView.clearTasks(obj.task.id);
      }
    }
  };

  const format = (date) => date < 10 ? `0${date}` : date.toString();

  const getTodayDate = () => {
    let date = new Date(Date.now());
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}-${format(month)}-${format(day)}`;
  }
</script>

<template>
  <Transition mode="out-in" name="fade">
    <LoaderBig v-if="listView.loading"/>

    <SomethingWrong v-else-if="listView.is_somethingWrong"/>

    <div class="workspace" v-else>
      <ListHeader :color="listView.sortListInfo.color">{{ listView.sortListInfo.name }}</ListHeader>
      <div class="task__container scroll">
        <div class="list-tasks__wrapper"
             v-for="stask in listView.stasks"
             :key="stask.key"
             v-if="listView.stasks.length"
        >
          <ListHeader :color="stask.personal_list.color"
                      :fontSize="'20px'"
                      v-if="stask.tasks.length"
          >{{ stask.personal_list.name }}</ListHeader>
          <Task
            v-for="task in stask.tasks"
            :key="task.key"
            :task="task"
            :color="task.color"
            @done="refreshSortLists"
            @flag="refreshSortLists"
            @date="refreshSortLists"
            v-if="stask.tasks.length"
          />
        </div>
        <div class="empty-list__title" v-else><p>Здесь пусто.</p></div>
      </div>
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
}
.task__container {
  width: 100%;
  padding: 0 20px;
  flex: 1 0 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 20px;
}
.list-tasks__wrapper {
  width: 100%;
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
