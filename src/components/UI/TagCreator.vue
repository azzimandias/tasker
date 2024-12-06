<script setup>

  import {ref, watch} from "vue";
  import {useListViewStore} from "@/stores/ListViewStore";
  import PersonalTag from "@/components/UI/PersonalTag.vue";

  const props = defineProps({
    id_task: Number,
    possibleTags: Array,
  });

  const tag = ref(null);
  const listView = useListViewStore();

  const width = ref('13ch');
  const resize = () => {
    /*if (props.isCanCreate && tag.value.value.length < 13) {
      width.value = 13 + 'ch';
    } else if (props.isCanCreate) {
      width.value = String(Number(tag.value.value.length) + 4) + 'ch';
    }*/
  };

  const openTagList = ref(false);
  const newName = ref('');
  const possibleTags = ref(props.possibleTags);

  const canBlur = () => {
    setTimeout(() => {
      openTagList.value = false;
    }, 500)
  };

  const maybeCanAddTag = () => {
    const foundTag = props.possibleTags.filter(tag => tag.name === newName.value)
    if (foundTag.length) {
      addTagToTask(foundTag[0]);
    } else {
      createTag();
    }
  };
  const createTag = async () => {
    openTagList.value = false;
    if (tag.value && tag.value.value.trim()) {
      const newTag = await listView.createTag({name: tag.value.value.trim(), task_id: props.id_task});
      tag.value.value = '';
      resize();
    }
  };
  const addTagToTask = async (tagToAdd) => {
    const addTag = await listView.addTagToTask({tag_id: tagToAdd.id, task_id: props.id_task});
    tag.value.value = '';
    resize();
  };
  watch(newName, (newValue) => {
    filterTags(newValue);
  });
  const filterTags = (newName) => {
    possibleTags.value = props.possibleTags.filter(tag => tag.name.toLowerCase().includes(newName.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name));
  };
</script>

<template>
  <div class="personal-tag__wrapper">
    <input type="text"
           class="personal-tag"
           v-model="newName"
           :placeholder="'Добавить тег?'"
           @focus="openTagList = true;"
           @blur="canBlur"
           @keyup.enter="maybeCanAddTag"
           @keyup="resize"
           :style="{width: width}"
           ref="tag"
    />
    <div class="personal-tag__list"
         :class="{ active: openTagList }"
    >
      <div v-for="tag in possibleTags">
        <PersonalTag
            v-if="tag.key"
            :key="tag.key"
            :tag="tag"
            @click="addTagToTask(tag)"
        />
      </div>
    </div>
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
    transition: .3s;
    &:active {
      opacity: 0.8;
    }
    input { padding: 0; }
  }

  .personal-tag__list {
    position: absolute;
    left: 0;
    bottom: -151px;
    width: 150px;
    max-height: 145px;
    padding: 5px;
    border-width: 1px;
    border-style: solid;
    border-radius: 5px;
    overflow: auto;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    z-index: 10;
    &.active {
      display: flex;
    }
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
