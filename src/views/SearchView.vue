<script setup lang="ts">
  import {useListViewStore} from "@/stores/ListViewStore";
  import SomethingWrong from "@/components/MY_UI/SomethingWrong.vue";
  import LoaderBig from "@/components/MY_UI/LoaderBig.vue";
  import Task from "@/components/MY_UI/Task.vue";
  import ListHeader from "@/components/MY_UI/ListHeader.vue";
  import {onMounted, onUnmounted} from "vue";
  import {FoundedListWithTasks, Task as TaskType} from '@/types/listView'

  const listView = useListViewStore();
  const emit = defineEmits<(["openSearchTopBar"])>();

  const refreshSortLists = (obj: {
    task: TaskType;
    is_done: boolean;
    action: string
  }) => {
    //listView.updateSortListTasks();
  };

  onMounted(() => {
    emit('openSearchTopBar');
    listView.loading = false;
  });

  onUnmounted(() => {
    listView.clearSearchTasks();
  });

</script>

<template>
  <Transition mode="out-in" name="fade">
    <LoaderBig v-if="listView.loading"/>

    <SomethingWrong v-else-if="listView.is_somethingWrong"/>

    <div class="workspace scroll" v-else>
      <ListHeader :list="{name: 'Поиск по задачам'}"/>
      <div class="task__container">
        <div class="list-tasks__wrapper"
             v-for="foundedList in listView.searchResult.filter((list: FoundedListWithTasks) => list.tasks.length > 0)"
             :key="foundedList.changer ?? Math.random()"
             v-if="listView.searchResult.length"
        >
          <ListHeader :list="foundedList"
                      :isRouter="true"
                      :fontSize="'20px'"
                      :top="60"
                      :zIndex="1"
          />
          <Task
              v-for="task in foundedList.tasks"
              :key="task?.changer ?? Math.random()"
              :task="task"
              :color="list.color"
              @done="refreshSortLists"
              @flag="refreshSortLists"
              @date="refreshSortLists"
          />
        </div>
        <div class="empty-list__title" v-if="!listView.searchResult.length">
          <p>Здесь пусто.</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped >
.workspace {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 20px;
  padding: 0 20px;
  overflow-y: auto;
}

.task__container {
  width: 100%;
  padding: 0 18px;
  flex: 1 0 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 20px;
  overflow: revert;
}

.list-tasks__wrapper {
  width: 100%;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
}

.slide-up-leave-to {
  opacity: 0;
}
.empty-list__title {
  flex: 1 0 100px;
  font-size: 20px;
  color: #c4c4c4;
  display: flex;
  align-items: center;
}
</style>
