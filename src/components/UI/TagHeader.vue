<template>
  <div class="tag-header">
    {{ hash }}<slot/>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { useRoute } from 'vue-router'
const route = useRoute();
const hash = ref('');
onMounted(() => {
  if (route.params.id_tag > 0)
    hash.value = '#';
});
</script>

<style lang="scss" scoped>
  .tag-header {
    width: auto;
    height: auto;
    background-color: #d7bc76;
    color: #171515;
    font-size: 20px;
    padding: 5px 8px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 8.5px;
  }
</style>
