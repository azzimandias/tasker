<script setup>
  import { useListViewStore } from "@/stores/ListViewStore";
  import SomethingWrong from "@/components/UI/SomethingWrong.vue";
  import TagHeader from "@/components/UI/TagHeader.vue";
  import Task from "@/components/UI/Task.vue";
  import LoaderBig from "@/components/UI/LoaderBig.vue";
  import {useRoute, useRouter} from "vue-router";
  import {onMounted, ref, watchEffect} from "vue";
  import ListHeader from "@/components/UI/ListHeader.vue";
  import PersonalTag from "@/components/UI/PersonalTag.vue";
  import InfoList from "@/components/UI/InfoList.vue";

  const listView = useListViewStore();
  const route = useRoute();
  const router = useRouter();

  onMounted(async () => {
    await listView.getTasksOrTags();
  });

  watchEffect(() => {
    if (!route.params.id_tag) {
      listView.loading = true;
    }
  });

  const refreshSortLists = (obj) => {
    /*listView.clearTasks(obj.task.id);*/
    listView.updateSortListTasks();
  };

  const deleteTag = () => {
    listView.deleteTag(listView.currentTag);
    if (+listView.currentTag.id === +route.params.id_tag) {
      router.push({ name: 'intro' });
    }
  };
</script>

<template>
  <LoaderBig v-if="listView.loading"/>

  <SomethingWrong v-else-if="listView.is_somethingWrong"/>

  <div class="workspace scroll" v-else>
    <div class="workspace__header">
      <div class="workspace__label">
        <p class="workspace__name" v-if="route.params.id_tag !== 'new'">По тегам:</p>
        <PersonalTag
            :key="listView.currentTag.key"
            :tag="listView.currentTag"
            :isHeader="true"
        />
      </div>
      <InfoList
          :idList="listView.currentTag.id"
          @delete="deleteTag"
      />
    </div>
    <div class="task__container">
      <div class="list-tasks__wrapper"
           v-for="byList in listView.tags"
           :key="byList.key"
           v-if="listView.tags.length"
      >
        <ListHeader :list="byList.list"
                    :isRouter="true"
                    :fontSize="'20px'"
                    v-if="byList.tasks.length"
        />
        <Task
            v-if="byList.tasks.length"
            v-for="task in byList.tasks"
            :key="task.key"
            :task="task"
            :color="byList.list.color"
            @done="refreshSortLists"
            @flag="refreshSortLists"
            @date="refreshSortLists"
        />
      </div>
      <div class="empty-list__title" v-else><p>Здесь пусто.</p></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/global.scss";
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
    //padding: 0 18px;
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
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .workspace__label {
    width: 100%;
    position: sticky;
    top: 0;
    min-height: 60px;
    display: flex;
    align-items: center;
    grid-gap: 5px;
    padding: 10px 0;
    color: #aaadae;
    font-size: 35px;
    font-weight: 600;
    z-index: 2;
    @include theme('background-color', $tasker);
  }
  .workspace__name {
    //padding: 5px 0;
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
