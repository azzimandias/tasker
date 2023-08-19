<template>
  <router-link :to="`/workspace/tag=${props.tag.id}`">
    <div class="personal-tag" :class="{ active: +props.tag.id === +route.params.id_tag }">{{ name }}</div>
  </router-link>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    tag: Object,
});
const route = useRoute();
const id = ref(0);
const name = ref(props.tag.name);
const isTag = () => {
  if(props.tag.id !== 0) {
    name.value = `#${props.tag.name}`;
  }
};
onMounted(() => {
  isTag();
});
</script>

<style lang="scss">
    .personal-tag {
        background-color: #45474A;
        color: #aaadae;
        font-size: 13px;
        padding: 5px 8px;
        border-radius: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        cursor: pointer;
        transition: .3s;
        &:active { opacity: 0.8; }
        &.active {
          background-color: #d7bc76;
          color: #171515;
        }
    }
</style>