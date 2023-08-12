<template>
  <Transition mode="out-in" name="fade">

    <LoaderBig v-if="loading"/>

    <SomethingWrong v-else-if="is_somethingWrong"/>

    <div class="workspace" v-else>
      <div class="workspace__label">
        <p class="workspace__name">По тегам:</p>
        <TagHeader>
          {{ tag_name }}
        </TagHeader>
      </div>
      <Task
          v-for="task in tags"
          :key="task.id"
          :task="task"
          v-if="tags.length"
      />
      <div v-if="tags.length"></div>
      <div class="empty-list__title" v-else><p>Здесь пусто.</p></div>
    </div>

  </Transition>
</template>

<script setup>
import { ref,onMounted,reactive  } from "vue";
import { useRoute } from "vue-router";
import SomethingWrong from "@/components/UI/SomethingWrong.vue";
import TagHeader from "@/components/UI/TagHeader.vue";
import Task from "@/components/UI/Task.vue";
import LoaderBig from "@/components/UI/LoaderBig.vue";

const tags = reactive([]);
let tag_name = ref('');
let loading = ref(true);
let is_somethingWrong = ref(false);
let request = ref('');
const route = useRoute();
const getTags = async () => {
  loading.value = true;
  try {
    loading.value = true;
    request.value = `http://localhost/tag?id=${route.params.id_tag}`;
    const response = await fetch(request.value);
    const arr = await response.json();
    if ((typeof arr[1]) === "object" && arr.length) {
      arr[1].forEach(item => {
        tags.push(item);
      });
      tag_name = arr[0];
    } else {
      is_somethingWrong.value = true;
    }
  } catch (e) {
    console.log(e);
    is_somethingWrong.value = true;
  }
  loading.value = false;
}

onMounted(async () => {
  await getTags();
});
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
  .workspace__label {
    width: 100%;
    min-height: 60px;
    display: flex;
    align-items: end;
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
