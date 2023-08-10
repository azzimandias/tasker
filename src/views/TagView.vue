<template>
  <Transition mode="out-in" name="fade">

    <LoaderBig v-if="loading"/>

    <SomethingWrong v-else-if="is_somethingWrong"/>

    <div class="workspace" v-else>
      <Task
          v-for="task in tags"
          :key="task.id"
          :task="task"
          v-if="tags.length"
      />
      <div class="empty-list__title" v-else><p>Здесь пусто.</p></div>
    </div>

  </Transition>
</template>

<script setup>
import { ref,onMounted,reactive  } from "vue";
import { useRoute } from "vue-router";
import SomethingWrong from "@/components/UI/SomethingWrong.vue";
import Task from "@/components/UI/Task.vue";
import LoaderBig from "@/components/UI/LoaderBig.vue";
import ListHeader from "@/components/UI/ListHeader.vue";

const tags = reactive([]);
let loading = ref(true);
let is_somethingWrong = ref(false);
let request = ref('');
const route = useRoute();
const getTags = async () => {
  try {
    is_somethingWrong.value = false;
    loading.value = true;
    request.value = `http://localhost/tag?id=${route.params.id_tag}`;
    const response = await fetch(request.value);
    const arr = await response.json();
    /*if ((typeof arr[1]) === "object" && arr.length) {
      arr[1].forEach(item => {
        tags.push(item);
      });
      loading.value = false;
    } else {
      is_somethingWrong.value = true;
    }*/
  } catch (e) {
    console.log(e);
    loading.value = false;
    is_somethingWrong.value = true;
  }
}

onMounted(async () => {
  await getTags();
});
</script>

<style lang="scss" scoped>
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