<script setup>

import {computed, nextTick, onMounted, reactive, ref, watch} from "vue";
  import {useListViewStore} from "@/stores/ListViewStore";
  import PersonalTag from "@/components/UI/PersonalTag.vue";

  const props = defineProps({
    id_task: Number,
    possibleTags: Array,
  });

  const listView = useListViewStore();
  const newTag = reactive({id: 0, name: ''});
  const isOpenTagList = ref(false);
  const createTagKey = ref(0);
  const possibleTags = reactive(props.possibleTags.length ? [...props.possibleTags] : []);
  const sortPossibleTagsName = ref('');
  const windowHeight = ref(window.innerHeight)
  const possibleTagsList = ref(null);
  const possibleTagsListScrollHeight = ref(possibleTagsList.offsetHeight);

  /*const scrollHeightStyle = computed(() => ({
    bottom: '-' + (possibleTagsListScrollHeight.value + 5) + 'px'
  }));*/

  const scrollHeightStyle = computed(() => {
    if (!possibleTagsList.value) return {}

    const rect = possibleTagsList.value.getBoundingClientRect()
    const spaceBelow = windowHeight.value - rect.bottom
    const spaceAbove = rect.top

    if (spaceBelow < possibleTagsListScrollHeight.value && spaceAbove > possibleTagsListScrollHeight.value) {
      return {
        bottom: '100%',
        top: 'auto',
        marginBottom: '5px'
      }
    }

    return {
      top: '100%',
      bottom: 'auto',
      marginTop: '5px'
    }
  });

  watch(() => props.possibleTags, (newPossibleTags) => {
    possibleTags.splice(0, possibleTags.length, ...newPossibleTags);
    sortPossibleTags(sortPossibleTagsName.value);
  });

  watch(possibleTags, async () => {
    await nextTick();
    updateScrollHeight();
  });

  const updateScrollHeight = () => {
    if (possibleTagsList.value) {
      possibleTagsListScrollHeight.value = possibleTagsList.value.offsetHeight;
      console.log(scrollHeightStyle.value)
    }
  };

  const openPossibleTags = () => {
    isOpenTagList.value = true;
  };

  const closePossibleTags = () => {
    setTimeout(() => {
      isOpenTagList.value = false;
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
    isOpenTagList.value = false;
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
      <div v-if="isOpenTagList"
           class="personal-tag__list scroll"
           :style="scrollHeightStyle"
           :class="{active: isOpenTagList}"
           ref="possibleTagsList"
           @vue:mounted="updateScrollHeight"
      >
        <PersonalTag
            v-if="possibleTags.length > 0"
            v-for="tag in possibleTags"
            :key="tag.id"
            :tag="tag"
            @click="addTagToTask(tag)"
        />
        <div class="empty-list__title" v-else>Здесь пусто.</div>
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
    right: 0;
    top: 100%;
    bottom: auto;
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

  .empty-list__title {
    flex: 1 0 100px;
    font-size: 14px;
    color: #c4c4c4;
    display: flex;
    align-items: center;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .1s ease-out;
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
