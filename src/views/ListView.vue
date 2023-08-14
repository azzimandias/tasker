<template>
  <Transition mode="out-in" name="fade">

    <LoaderBig v-if="listView.loading"/>

    <SomethingWrong v-else-if="listView.is_somethingWrong"/>

    <div class="workspace" v-else>
      <ListHeader>{{ listView.header }}</ListHeader>
      <Task
          v-for="task in listView.tasks"
          :key="task.key"
          :task="task"
          v-if="listView.tasks.length"
      />
      <div class="empty-list__title" v-else><p>Здесь пусто.</p></div>
    </div>

  </Transition>
</template>

<script setup>
import { useListViewStore } from "@/stores/ListViewStore";
import {reactive, watchEffect} from 'vue';
import ListHeader from "@/components/UI/ListHeader.vue";
import SomethingWrong from "@/components/UI/SomethingWrong.vue";
import Task from "@/components/UI/Task.vue";
import LoaderBig from "@/components/UI/LoaderBig.vue";

const listView = useListViewStore();
</script>

<style lang="scss" scoped>
.workspace {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 20px;
  padding: 0 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #0a0a0a;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #c4c4c4;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
    background-color: #4b4b4b;
  }
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
