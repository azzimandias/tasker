<template>
    <div class="personal-lists">
        <SectionHeader :is_load="is_load">Мои списки</SectionHeader>
        <div class="personal-lists__container">
            <PersonalList 
                v-for="list in personalLists" 
                :key="list.id"
                :color="list.color">
                <template #name>{{ list.name }}</template>
                <template #count>{{ list.count_of_active_tasks }}</template>
            </PersonalList>
        </div>
    </div>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue';
import SectionHeader from '../UI/SectionHeader.vue';
import PersonalList from '@/components/UI/PersonalList.vue';

let is_load = ref(true);
const personalLists = reactive([
    {
        id: 1, 
        name: '',
        count_of_active_tasks: '—',
        color: 'grey'
    },
    {
        id: 2, 
        name: '',
        count_of_active_tasks: '—',
        color: 'grey'
    },
    {

        id: 3, 
        name: '',
        count_of_active_tasks: '—',
        color: 'grey'
    }
]);

const getPersonalLists = async () => {
  try {
    const response = await fetch('http://localhost/lists');
    const arr = await response.json();
    if ((typeof arr) === "object") {
      personalLists.length = 0;
      arr.forEach(item => {
        personalLists.push(item);
      });
      setTimeout(() => {

      },5000);
      is_load.value = false;
    }
  } catch (e) {
    console.log(e);
  }
}

onMounted(async () => {
  await getPersonalLists();
});
</script>

<style lang="scss">
    .personal-lists__label {
        font-size: 12px;
        font-weight: 500;
        color: #5F6164;
        margin: 20px 0 3px 12px;
    }
    .personal-lists__container {
        display: grid;
    }
</style>
