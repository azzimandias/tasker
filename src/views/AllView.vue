<script setup>
  import { ref,onMounted,reactive  } from "vue";
  import ListHeader from "@/components/UI/ListHeader.vue";
  import Task from "@/components/UI/Task.vue";
  import LoaderBig from "@/components/UI/LoaderBig.vue";

  const testTasks = reactive([]);
  let header = ref('');
  let loading = ref(true);
  const getTestTasks = async () => {
    try {
      loading.value = true;
      const response = await fetch('all');
      const arr = await response.json();
      if ((typeof arr) === "object") {
        arr.forEach(item => {
          testTasks.push(item);
        });
        header.value = 'Все';
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

<template>
  <Transition mode="out-in" name="slide-up">

    <LoaderBig v-if="loading"/>

    <div class="workspace" v-else>
      <ListHeader>{{ header }}</ListHeader>
      <Task
          v-for="task in testTasks"
          :key="task.id"
          :task="task"
      />
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
</style>
