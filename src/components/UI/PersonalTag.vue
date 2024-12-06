<script setup>
import {onMounted, reactive, ref, watch} from 'vue';
  import { useRoute } from 'vue-router';
  import {useListViewStore} from "@/stores/ListViewStore";
  import router from "@/router";
import TagCreator from "@/components/UI/TagCreator.vue";

  const props = defineProps({
    id_task: Number,
    tag: Object,
    possibleTags: Array,
    isCanCreate: Boolean,
    isCanChange: Boolean,
    isRoute: Boolean,
    isHeader: Boolean,
  });

  const route = useRoute();
  const name = ref(props.tag.name);
  const tag = ref(null);
  const listView = useListViewStore();

  const needHash = () => {
    if(props.tag.id !== 0 && !props.isCanChange && !props.isHeader) {
      name.value = `#${props.tag.name}`;
    }
  };
  onMounted(() => {
    needHash();
  });

/* + can change */
  const width = ref(props.tag.name ? String(Number(props.tag.name.length) + 2) + 'ch' : 15 + 'ch');
  const resize = () => {
    if (props.isCanCreate && tag.value.value.length < 13) {
      width.value = 13 + 'ch';
    } else if (props.isCanCreate) {
      width.value = String(Number(tag.value.value.length) + 4) + 'ch';
    } else {
      width.value = String(Number(tag.value.value.length) + 2) + 'ch';
    }
  };
  const changeTag = async () => {
    if (tag.value) { // needed for dblclick
      if (tag.value.value.trim()) {
        const updatedTag = await listView.updateTag({tag_id: props.tag.id, name: tag.value.value.trim()});
      } else {
        await listView.deleteTagTask({tag_id: props.tag.id, task_id: props.id_task});
      }
    }
  };
/* - can change */

  const sortByTag = () => {
    router.push({ name: 'tag', params: { id_tag: props.tag.id } });
  };

/* + can create */
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
/* - can create */
</script>

<template>
<!--  <div v-if="props.isCanCreate" class="personal-tag__wrapper">
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
  </div>-->

  <div v-if="props.isCanChange"
       class="personal-tag__wrapper"
       @dblclick="sortByTag"
  >
    <div class="personal-tag hash" :class="{ active: +props.tag.id === +listView.currentTag.id }">
      <input type="text"
             v-model="name"
             @blur="changeTag"
             @keyup.enter="changeTag"
             @keyup="resize"
             :style="{width: width}"
             ref="tag"
      />
    </div>
  </div>

  <div v-else-if="props.isHeader"
       class="tag-header"
  >
    <div class="personal-tag hash" :class="{
                                      active: +props.tag.id === +listView.currentTag.id,
                                      blank: !props.tag.id,
                                   }"
    >
      <input v-if="props.tag.id"
             type="text"
             v-model="name"
             @blur="changeTag"
             @keyup.enter="changeTag"
             @keyup="resize"
             :style="{width: width}"
             ref="tag"
      />
      <div v-else>{{ name }}</div>
    </div>
  </div>

  <div v-else-if="props.isRoute" class="personal-tag__wrapper">
    <router-link :to="`/workspace/tag=${props.tag.id}`">
      <div class="personal-tag" :class="{ active: +props.tag.id === +route.params.id_tag }">{{ name }}</div>
    </router-link>
  </div>

  <div v-else class="personal-tag__wrapper">
    <div class="personal-tag-average">{{ name }}</div>
  </div>
</template>

<style lang="scss">
    .personal-tag__wrapper {
      position: relative;
    }

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

    .personal-tag-average {
      width: auto;
      height: auto;
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

    .hash::before { content: '#'; }

    .blank::before { content: ''; }

    .tag-header {
      width: auto;
      height: auto;
      color: #171515;
      font-size: 20px;
      padding: 5px 8px;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.3s;
      margin-bottom: 8.5px;
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

    .personal-tag-average {
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

    .tag-header {
      @include theme('background-color', $gold);
    }
</style>
