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

<template>
  <router-link :to="`/workspace/tag=${props.tag.id}`">
    <div class="personal-tag" :class="{ active: +props.tag.id === +route.params.id_tag }">{{ name }}</div>
  </router-link>
</template>

<style lang="scss">
  @import "../../assets/styles/global.scss";
    .personal-tag {
        @include theme('background-color', $personal);
        @include theme('color', $textColor);
        font-size: 13px;
        padding: 5px 8px;
        border-radius: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        cursor: pointer;
        transition: .3s;
        &:active { opacity: 0.8; }
        &.active {
          @include theme('background-color', $gold);
          @include theme('color', $textColorActive);
        }
    }
</style>