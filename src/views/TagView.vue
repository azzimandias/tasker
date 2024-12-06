<script setup>
  import { useListViewStore } from "@/stores/ListViewStore";
  import SomethingWrong from "@/components/UI/SomethingWrong.vue";
  import TagHeader from "@/components/UI/TagHeader.vue";
  import Task from "@/components/UI/Task.vue";
  import LoaderBig from "@/components/UI/LoaderBig.vue";
  import {useRoute} from "vue-router";
  import {onMounted, ref, watchEffect} from "vue";
  import ListHeader from "@/components/UI/ListHeader.vue";
  import PersonalTag from "@/components/UI/PersonalTag.vue";

  const listView = useListViewStore();
  const route = useRoute();
  watchEffect(() => {
    if (!route.params.id_tag) {
      listView.loading = true;
    }
  });

  const refreshSortLists = (obj) => {
    /*listView.clearTasks(obj.task.id);*/
    listView.updateSortListTasks();
  };
</script>

<template>
  <Transition mode="out-in" name="fade">

    <LoaderBig v-if="listView.loading"/>

    <SomethingWrong v-else-if="listView.is_somethingWrong"/>

    <div class="workspace scroll" v-else>
      <div class="workspace__label">
        <p class="workspace__name">По тегам:</p>
        <PersonalTag
            :key="listView.currentTag.key"
            :tag="listView.currentTag"
            :isHeader="true"
        />
      </div>
      <div class="task__container">
        <div class="list-tasks__wrapper"
             v-for="byList in listView.tags"
             :key="byList.key"
             v-if="listView.tags.length"
        >
          <ListHeader :list="byList.personal_list"
                      :isRouter="true"
                      :fontSize="'20px'"
                      v-if="byList.tasks.length"
          />
          <Task
              v-for="task in byList.tasks"
              :key="task.key"
              :task="task"
              :color="byList.personal_list.color"
              @done="refreshSortLists"
              @flag="refreshSortLists"
              @date="refreshSortLists"
              v-if="byList.tasks.length"
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
    padding: 0 20px;
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
  .empty-list__title {
    flex: 1 0 100px;
    font-size: 20px;
    color: #c4c4c4;
    display: flex;
    align-items: center;
  }
  .workspace__label {
    width: 100%;
    min-height: 60px;
    display: flex;
    align-items: flex-end;
    grid-gap: 5px;
    padding: 10px 0;
    color: #aaadae;
    font-size: 35px;
    font-weight: 600;
  }
  .workspace__name {
    padding: 5px 0;
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
