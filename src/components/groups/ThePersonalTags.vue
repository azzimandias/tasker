<template>
    <div class="personal-tags" v-if="personalTags.length">
        <SectionHeader :is_load="is_load">Теги</SectionHeader>
        <div class="personal-tags__container">
            <PersonalTag :currentKey="-1">{{ 'Все теги' }}</PersonalTag>
            <PersonalTag 
                v-for="(tag,key) in personalTags" 
                :key="tag.id"
                :currentKey="key">
                {{ tag.name }}
            </PersonalTag>
        </div>
    </div>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue';
import SectionHeader from '../UI/SectionHeader.vue';
import PersonalTag from '@/components/UI/PersonalTag.vue';

let is_load = ref(true);
const personalTags = reactive([]);
const getPersonalTags = async () => {
  try {
    const response = await fetch('http://localhost/tags');
    const arr = await response.json();
    if ((typeof arr) === "object") {
      personalTags.length = 0;
      arr.forEach(item => {
        personalTags.push(item);
      });
      is_load = false;
    }
  } catch (e) {
    console.log(e);
  }
}

onMounted(async () => {
  await getPersonalTags();
});
</script>

<style lang="scss">
    .personal-tags__container {
        display: flex;
        flex-wrap: wrap;
        padding: 6px 15px 6px 6px;
    }
</style>
