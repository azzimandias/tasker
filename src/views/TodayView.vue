<template>
  <div class="workspace">
    <ListHeader>{{ header }}</ListHeader>
    <Task
        v-for="task in testTasks"
        :key="task.id"
        :task="task"
    />
  </div>
</template>

<script setup>
import { ref,onMounted,reactive  } from "vue";
import ListHeader from "@/components/UI/ListHeader.vue";
import Task from "@/components/UI/Task.vue";

const testTasks = reactive([]);
let header = ref('');
const getTestTasks = async () => {
  try {
    const response = await fetch('http://localhost/today');
    const arr = await response.json();
    if ((typeof arr) === "object") {
      arr.forEach(item => {
        testTasks.push(item);
      });
      header.value = 'Сегодня';
      console.log(testTasks)
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  grid-gap: 20px;
  padding: 15px 20px;
  overflow-y: auto;
}
</style>