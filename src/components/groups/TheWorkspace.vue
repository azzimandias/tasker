<template>
  <div class="workspace">
    <keep-alive>
      <code v-for="task in testTasks" :key="task.id">{{ task }}</code>
    </keep-alive>
  </div>
</template>

<script setup>
import { ref,onMounted,reactive  } from "vue";

const testTasks = reactive([]);
const getTestTasks = async () => {
  try {
    const response = await fetch('http://localhost/tasks');
    const arr = await response.json();
    if ((typeof arr) === "object") {
      arr.forEach(item => {
        testTasks.push(item);
      });
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
    color: #C5C7CA;
  }
</style>
