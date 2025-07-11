<script setup>

import {computed, onMounted, reactive, ref, watch} from "vue";
  import {useListViewStore} from "@/stores/ListViewStore";
  import PersonalTag from "@/components/UI/PersonalTag.vue";

  const props = defineProps({
    id_task: Number,
    possibleTags: Array,
  });

  const listView = useListViewStore();
  const newTag = reactive({id: 0, name: ''});
  const openTagList = ref(false);
  const createTagKey = ref(0);
  const possibleTags = reactive(props.possibleTags.length ? [...props.possibleTags] : []);
  const sortPossibleTagsName = ref('');
  const possibleTagsList =ref(null);
  const possibleTagsListScrollHeight = ref(possibleTagsList.scrollHeight);
  const scrollHeightStyle = computed(() => ({
    bottom: possibleTagsListScrollHeight.value + 'px'
  }));

  watch(() => props.possibleTags, (newPossibleTags) => {
    possibleTags.splice(0, possibleTags.length, ...newPossibleTags);
    sortPossibleTags(sortPossibleTagsName.value);
  });

  const openPossibleTags = () => {
    openTagList.value = true;
  };

  const closePossibleTags = () => {
    setTimeout(() => {
      openTagList.value = false;
    },300);
  };

  const sortPossibleTags = (inputName) => {
    const baseTags = JSON.parse(JSON.stringify(props.possibleTags));
    if (!inputName) {
      baseTags.sort((a, b) => a.name.localeCompare(b.name));
      possibleTags.splice(0, possibleTags.length, ...baseTags);
      return;
    }
    const filteredAndSorted = baseTags
        .filter(tag => tag.name.toLowerCase().includes(inputName.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));
    possibleTags.splice(0, possibleTags.length, ...filteredAndSorted);
  };

  const createTag = async (newName) => {
    openTagList.value = false;
    const newTag = await listView.createTag({
      name: newName,
      task_id: props.id_task
    });
  };
  const addTagToTask = async (tagToAdd) => {
    console.log('tagToAdd')
    const addTag = await listView.addTagToTask({
      tag_id: tagToAdd.id,
      tag_name: tagToAdd.name,
      task_id: props.id_task
    });
  };
</script>

<template>
  <div class="tag-creator">
    <PersonalTag
        :key="createTagKey"
        :id_task="props.id_task"
        :tag="newTag"
        :isCanCreate="true"
        :width="'15ch'"
        :placeholder="'Добавить тег?'"
        @change="sortPossibleTags"
        @create="createTag"
        @onFocus="openPossibleTags"
        @onBlur="closePossibleTags"
    />
    <Transition mode="out-in" name="fade">
      <div v-if="openTagList"
           class="personal-tag__list scroll"
           :style="scrollHeightStyle"
           :class="{active: openTagList}"
           ref="possibleTagsList"
      >
        <PersonalTag
            v-for="tag in possibleTags"
            :key="tag.id"
            :tag="tag"
            @click="addTagToTask(tag)"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
  .tag-creator {
    position: relative;
  }
  .personal-tag__list {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 400px;
    max-height: 145px;
    padding: 5px;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    overflow-y: auto;
    overflow-x: hidden;
    display: none;
    grid-gap: 5px;
    flex-wrap: wrap;
    z-index: 10;
    &.active {
      display: flex;
    }
  }

  .hidden-span {
    visibility: hidden;
    position: absolute;
    white-space: pre;
    font-size: 13px;
    padding: 5px 8px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.25s ease-out;
  }

  .fade-enter-from {
    opacity: 0;
  }

  .fade-leave-to {
    opacity: 0;
  }

  @import "../../assets/styles/global.scss";

  .personal-tag__list {
    @include theme('background-color', $dropDownListBackground);
    @include theme('border-color', $dropDownListBorder);
  }
</style>
