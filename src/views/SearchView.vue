<script setup>
  import {useListViewStore} from "@/stores/ListViewStore";
  import SomethingWrong from "@/components/UI/SomethingWrong.vue";
  import LoaderBig from "@/components/UI/LoaderBig.vue";
  import Task from "@/components/UI/Task.vue";
  import ListHeader from "@/components/UI/ListHeader.vue";
  import {onMounted, onUnmounted} from "vue";

  const listView = useListViewStore();
  const emit = defineEmits(["openSearchTopBar"]);

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
      <Task
          v-if="listView.searchResult && listView.searchResult.length > 0"
          v-for="task in listView.searchResult"
          :key="task.id"
          :task="task"
      />
      <div v-else class="empty-list__title">Ничего не нашли.</div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
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
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  //transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  //transform: translateY(-30px);
}
.empty-list__title {
  flex: 1 0 100px;
  font-size: 20px;
  color: #c4c4c4;
  display: flex;
  align-items: center;
}
</style>
