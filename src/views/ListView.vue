<template>
  <Transition mode="out-in" name="slide-up">

    <LoaderBig v-if="loading"/>

    <div class="workspace" v-else>
      <ListHeader>{{ header }}</ListHeader>
      <Task
          v-for="task in testTasks"
          :key="task.id"
          :task="task"
          v-if="testTasks.length"
      />
      <div class="empty-list__title" v-else><p>Здесь пусто.</p></div>
    </div>

  </Transition>
</template>

<script setup>
import { ref,onMounted,reactive  } from "vue";
import { useRoute } from "vue-router";
import ListHeader from "@/components/UI/ListHeader.vue";
import Task from "@/components/UI/Task.vue";
import LoaderBig from "@/components/UI/LoaderBig.vue";

const testTasks = reactive([]);
let header = ref('');
let loading = ref(true);
let request = ref('');
const route = useRoute();
const getTestTasks = async () => {
  try {
    loading.value = true;
    if ( route.params.id ) {
      request.value = `http://localhost/list?id=${route.params.id}`;
    } else {
      request.value = `http://localhost/list?name=${route.params.name}`;
    }
    const response = await fetch(request.value);
    const arr = await response.json();
    if ((typeof arr[1]) === "object") {
      arr[1].forEach(item => {
        testTasks.push(item);
      });
      header.value = arr[0];
      loading.value = false;
    }
  } catch (e) {
    console.log(e);
  }
}

onMounted(async () => {
  await getTestTasks();
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
</style>
