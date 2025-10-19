<script setup lang="ts">
  import {useListViewStore} from "@/stores/ListViewStore";
  import SomethingWrong from "@/components/MY_UI/SomethingWrong.vue";
  import LoaderBig from "@/components/MY_UI/LoaderBig.vue";
  import Task from "@/components/MY_UI/Task.vue";
  import ListHeader from "@/components/MY_UI/ListHeader.vue";
  import {onMounted, onUnmounted} from "vue";
  /*import {FoundedListWithTasks, Task as TaskType} from '@/types/listView'*/
  import {List} from '@/types/listView'

  const listView = useListViewStore();
  const emit = defineEmits<{
    (e: 'openSearchTopBar'): void;
  }>();

  /*const refreshSortLists = (obj: {
    task: TaskType;
    is_done: boolean;
    action: string
  }) => {
    //listView.updateSortListTasks();
  };*/

  onMounted(() => {
    emit('openSearchTopBar');
    listView.isLoading = false;
  });

  onUnmounted(() => {
    listView.clearSearchTasks();
  });

</script>

<template>
  <Transition mode="out-in" name="fade">
    <LoaderBig v-if="listView.isLoading"/>

    <SomethingWrong v-else-if="listView.isSomethingWrong"/>

    <div class="workspace scroll" v-else>
      <ListHeader :list="{
                    id: 0,
                    name: 'Поиск по задачам',
                    color: '#fff',
                    count: 0,
                    url: ''
                  }"
                  :zIndex="2"
      />
      <div class="task__container">
        <div class="list-tasks__wrapper"
             v-for="foundedList in listView.searchResult.filter((list: List) => list.tasks.length > 0)"
             :key="`founded-list-with-tasks-${foundedList.id}-${foundedList.name}`"
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
              :color="foundedList.color"
          />
<!--          @done="refreshSortLists"
          @flag="refreshSortLists"
          @date="refreshSortLists"-->
        </div>
        <div class="empty-list__title" v-if="!listView.searchResult.length">
          <p>Введите запрос</p>
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
