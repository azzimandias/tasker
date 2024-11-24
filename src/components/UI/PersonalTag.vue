<script setup>
  import {onMounted, ref} from 'vue';
  import { useRoute } from 'vue-router';
  import {useListViewStore} from "@/stores/ListViewStore";

  const props = defineProps({
    id_task: Number,
    tag: Object,
    isCanCreate: Boolean,
    isCanChange: Boolean,
  });
  const emit = defineEmits(['addTag', 'changeTag']);
  const route = useRoute();
  const id = ref(0);
  const name = ref(props.tag.name);
  const newName = ref('');
  const tag = ref(null);
  const listView = useListViewStore();
  const isTag = () => {
    if(props.tag.id !== 0 && !props.isCanChange) {
      name.value = `#${props.tag.name}`;
    }
  };
  onMounted(() => {
    isTag();
  });
  const width = ref(props.tag.name ? String(Number(props.tag.name.length) + 2) + 'ch' : 15 + 'ch');
  const resize = () => {
    if (props.isCanCreate && tag.value.value.length < 13) {
      width.value = 14.5 + 'ch';
    } else if (props.isCanCreate) {
      width.value = String(Number(tag.value.value.length) + 4) + 'ch';
    } else {
      width.value = String(Number(tag.value.value.length) + 2) + 'ch';
    }
  };
  const blurTag = () => {
    if (tag.value) tag.value.blur();
  };
  const createTag = async () => {
    if (tag.value.value.trim()) {
      const newTag = await listView.createTag({name: tag.value.value.trim(), task_id: props.id_task});
    }
    tag.value.value = '';
    resize();
  };
  const changeTag = async () => {
    if (tag.value.value.trim()) {
      const updatedTag = await listView.updateTag({tag_id: props.tag.id, name: tag.value.value.trim()});
    } else {
      await listView.deleteTagTask({tag_id: props.tag.id, task_id: props.id_task});
    }
  };
</script>

<template>
  <div v-if="props.isCanCreate" class="personal-tag__wrapper">
    <input type="text"
           class="personal-tag"
           v-model="newName"
           :placeholder="'Добавить тэг?'"
           @blur="createTag"
           @keyup.enter="blurTag"
           @keyup="resize"
           :style="{width: width}"
           ref="tag"
    />
  </div>

  <div v-else-if="props.isCanChange" class="personal-tag__wrapper">
    <div class="personal-tag can-change" :class="{ active: +props.tag.id === +route.params.id_tag }">
      <input type="text"
             v-model="name"
             @blur="changeTag"
             @keyup.enter="blurTag"
             @keyup="resize"
             :style="{width: width}"
             ref="tag"
      />
    </div>
  </div>

  <div v-else class="personal-tag__wrapper">
    <router-link :to="`/workspace/tag=${props.tag.id}`">
      <div class="personal-tag" :class="{ active: +props.tag.id === +route.params.id_tag }">{{ name }}</div>
    </router-link>
  </div>
</template>

<style lang="scss">
    .personal-tag__wrapper .personal-tag {
        width: auto;
        height: 28px;
        font-size: 13px;
        padding: 5px 8px;
        border-radius: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        cursor: pointer;
        transition: .3s;
        &:active {
          opacity: 0.8;
        }
        &.can-change::before { content: '#'; }
        input { padding: 0; }
    }

    @import "../../assets/styles/global.scss";

    .personal-tag {
      @include theme('background-color', $personal);
      @include theme('color', $textColor);
      &.active {
        @include theme('background-color', $gold);
        @include theme('color', $textColorActive);
      }
    }
</style>
