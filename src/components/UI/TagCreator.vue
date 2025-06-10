<script setup>

import {reactive, ref} from "vue";
  import {useListViewStore} from "@/stores/ListViewStore";
  import PersonalTag from "@/components/UI/PersonalTag.vue";

  const props = defineProps({
    id_task: Number,
    possibleTags: Array,
  });

  const emit = defineEmits([]);

  const listView = useListViewStore();
  const newTag = reactive({id: 0, name: ''});
  const openTagList = ref(false);
  const createTagKey = ref(0);

  const openPossibleTags = () => {
    openTagList.value = true;
  };

  const closePossibleTags = () => {
    setTimeout(() => {
      openTagList.value = false;
    },300);
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
  <div class="personal-tag__wrapper visible">
    <PersonalTag
        :key="createTagKey"
        :id_task="props.id_task"
        :tag="newTag"
        :isCanCreate="true"
        :width="'15ch'"
        :placeholder="'Добавить тег?'"
        @create="createTag"
        @focus="openPossibleTags"
        @blur="closePossibleTags"
    />
    <Transition mode="out-in" name="fade">
      <div v-if="openTagList"
           class="personal-tag__list scroll"
           :class="{active: openTagList}"
      >
        <PersonalTag
            v-for="tag in props.possibleTags"
            :key="tag.id"
            :tag="tag"
            @click="addTagToTask(tag)"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.personal-tag__wrapper .personal-tag {
  width: auto;
  height: 28px;
  font-size: 13px;
  padding: 5px 8px;
  border-radius: 5px;
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  opacity: 0;
  transition: .3s;
  &:active {
    opacity: 0.8;
  }
  &.visible {
    opacity: 1;
  }
  &.show {
    animation: show .3s forwards;
  }
  &.hide {
    animation: hide .3s forwards;
  }
  input { padding: 0; }
}

@keyframes show {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

  .personal-tag__list {
    position: absolute;
    left: 0;
    bottom: -151px;
    width: 400px;
    height: 145px;
    padding: 5px;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    overflow-y: auto;
    overflow-x: hidden;
    display: none;
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

  .personal-tag {
    @include theme('background-color', $personal);
    @include theme('color', $textColor);
    &.active {
      @include theme('background-color', $gold);
      @include theme('color', $textColorActive);
    }
  }
  .personal-tag__list {
    @include theme('background-color', $dropDownListBackground);
    @include theme('border-color', $dropDownListBorder);
  }
</style>
