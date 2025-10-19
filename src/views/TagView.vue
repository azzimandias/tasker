<script setup lang="ts">
  import { onMounted } from "vue";
  import { useListViewStore } from "@/stores/ListViewStore";
  import LoaderBig from "@/components/MY_UI/LoaderBig.vue";
  import SomethingWrong from "@/components/MY_UI/SomethingWrong.vue";
  import ListHeader from "@/components/MY_UI/ListHeader.vue";
  import Task from "@/components/MY_UI/Task.vue";
  import PersonalTag from "@/components/MY_UI/PersonalTag.vue";
  import InfoList from "@/components/MY_UI/InfoList.vue";
  import { useRoute, useRouter } from "vue-router";
  import type { List, Task as TaskType } from "@/types/listView";

  const listView = useListViewStore();
  const route = useRoute();
  const router = useRouter();

  onMounted(async () => {
    await listView.getTasksOrTags(false);
  });

  const refreshSortLists = (obj: { task: TaskType }) => {
    listView.updateSortListTasks();
  };

  const deleteTag = () => {
    if (!listView.currentTag) return;
    listView.deleteTag(listView.currentTag);
    if (+listView.currentTag.id === +route.params.id_tag) {
      router.push({ name: 'intro' });
    }
  };
</script>

<template>
  <LoaderBig v-if="listView.isLoading" />

  <SomethingWrong v-else-if="listView.isSomethingWrong" />

  <div class="workspace scroll" v-else>
    <div class="workspace__header">
      <div class="workspace__label">
        <p v-if="route.params.id_tag !== 'new'">По тегам:</p>
        <PersonalTag
            v-if="listView.currentTag"
            :key="`current-tag-${listView.currentTag.id}`"
            :tag="listView.currentTag"
            :isHeader="true"
        />
      </div>
      <InfoList
          v-if="listView.currentTag"
          :idList="listView.currentTag.id"
          @delete="deleteTag"
      />
    </div>

    <div class="task__container">
      <template v-for="list in listView.listsByTag"
                :key="list?.id ?? Math.random()"
      >
        <div v-if="list && Array.isArray(list.tasks)" :style="{width: '100%'}">
          <ListHeader
              v-if="list.tasks.length"
              :list="list"
              :isRouter="true"
              :fontSize="'20px'"
              :top="60"
              :zIndex="1"
          />
          <Task
              v-for="task in list.tasks"
              :key="task.id ?? Math.random()"
              :task="task"
              :color="list.color"
              @done="refreshSortLists"
              @flag="refreshSortLists"
              @date="refreshSortLists"
          />
        </div>
      </template>
      <div class="empty-list__title" v-if="!listView.listsByTag.length">
        <p>Здесь пусто.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .workspace {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    grid-gap: 20px;
    padding: 0 20px 150px 20px;
  }
  .task__container {
    width: 100%;
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
  .workspace__header {
    position: sticky;
    top: 0;
    z-index: 2;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .workspace__label {
    width: 100%;
    min-height: 60px;
    display: flex;
    align-items: center;
    grid-gap: 5px;
    padding: 10px 0;
    color: #aaadae;
    font-size: 35px;
    font-weight: 600;
    z-index: 2;
    background-color: var(--tasker);
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
