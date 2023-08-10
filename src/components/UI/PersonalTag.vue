<template>
  <router-link :to="`tag=${isTag()}`">
    <div class="personal-tag" :class="{ active: +id.value === +route.params.id_tag }" v-if="props.currentKey >= 0">#<slot></slot></div>
    <div class="personal-tag" :class="{ active: +id.value === +route.params.id_tag }" v-else><slot></slot></div>
  </router-link>
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
    currentKey: Number,
    tag: Object,
});
const route = useRoute();
let id = ref(0);
const isTag = () => {
  let idx = 0;
  if(props.tag) {
    idx = props.tag.id;
  }
  id.value = idx;
  return idx;
};
onMounted(() => {
  isTag();
  console.log(+id.value === +route.params.id_tag)
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
        &.active { filter: brightness(1.5) }
    }
</style>