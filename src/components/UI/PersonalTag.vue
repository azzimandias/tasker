<script setup>
import {onMounted, reactive, ref, watch} from 'vue';
  import { useRoute } from 'vue-router';
  import {useListViewStore} from "@/stores/ListViewStore";
  import router from "@/router";

  const props = defineProps({
    id_task: Number,
    tag: Object,
    isCanChange: Boolean,
    isCanCreate: Boolean,
    isRoute: Boolean,
    isHeader: Boolean,
    width: String,
    placeholder: String,
  });

  const emit = defineEmits(['create', 'focus', 'blur', 'click']);

  const route = useRoute();
  const name = ref(props.tag.name);
  const tagWrapper = ref(null);
  const tag = ref(null);
  const height = ref('');
  const listView = useListViewStore();
  const width = ref(props.width? props.width : '1px');

  onMounted(() => {
    resize();
    needHash();
  });
  const needHash = () => {
    if(props.tag.id !== 0 && !props.isCanChange && !props.isHeader) {
      name.value = `#${props.tag.name}`;
    }
  };

/* + can change */
  const resize = () => {
    if (!tag.value || !tag.value.value) return;
    requestAnimationFrame(() => {
      let hiddenSpan = document.getElementById('hidden-span-helper');
      if (!hiddenSpan) {
        hiddenSpan = document.createElement('span');
        hiddenSpan.id = 'hidden-span-helper';
        hiddenSpan.style.cssText = `
          visibility: hidden;
          position: absolute;
          white-space: pre;
          font-size: 13px;
          font-family: Avenir, Helvetica, Arial, sans-serif;
          top: -9999px;
          left: -9999px;
        `;
        document.body.appendChild(hiddenSpan);
      }
      hiddenSpan.textContent = tag.value.value || ' ';
      const calculatedWidth = hiddenSpan.scrollWidth;
      width.value = `${calculatedWidth}px`;
    });
  };
  const changeTag = async () => {
    if (tag.value && tag.value.value.trim()) { // needed for dblclick
      if (tag.value.value.trim() !== name.value) {
        const updatedTag = await listView.updateTag({tag_id: props.tag.id, name: tag.value.value.trim()});
      }
    } else {
      console.log(height.value)
      console.log(tagWrapper.value)
      height.value = `${tagWrapper.value.scrollHeight}px`;
      tagWrapper.value.classList.remove('show');
      tagWrapper.value.classList.add('hide');
      setTimeout(() => {
        listView.deleteTagTask({tag_id: props.tag.id, tag_name: props.tag.name, task_id: props.id_task});
      }, 300);
    }
  };
  const crateTag = () => {
    if (tag.value && tag.value.value.trim()) {
      emit('create', tag.value.value.trim());
      tag.value.value = '';
    }
  }
/* - can change */

  const sortByTag = () => {
    router.push({ name: 'tag', params: { id_tag: props.tag.id } });
  };
</script>

<template>
  <div v-if="props.isCanChange"
       class="personal-tag__wrapper show"
       @dblclick="sortByTag"
  >
    <div class="personal-tag show hash"
         :class="{ active: +props.tag.id === +listView.currentTag.id }"
         ref="tagWrapper"
    >
      <input type="text"
             v-model="name"
             @blur="changeTag"
             @keyup.enter="changeTag"
             @keydown="resize"
             :style="{width: width}"
             ref="tag"
      />
    </div>
  </div>

  <div v-else-if="props.isCanCreate"
       class="personal-tag__wrapper show"
       @dblclick="sortByTag"
  >
    <div class="personal-tag show blank"
         :class="{ active: +props.tag.id === +listView.currentTag.id }"
         ref="tagWrapper"
    >
      <input type="text"
             v-model="name"
             @keyup.enter="crateTag"
             @keydown="resize"
             @focus="emit('focus')"
             @blur="emit('blur')"
             :style="{width: width}"
             :placeholder="props.placeholder"
             ref="tag"
      />
    </div>
  </div>

  <div v-else-if="props.isHeader"
       class="tag-header"
  >
    <div class="personal-tag visible hash" :class="{
                                      active: +props.tag.id === +listView.currentTag.id,
                                      blank: !props.tag.id,
                                   }"
    >
      <input v-if="props.tag.id"
             type="text"
             v-model="name"
             @blur="changeTag"
             @keyup.enter="changeTag"
             @keydown="resize"
             :style="{width: width}"
             ref="tag"
      />
      <div v-else>{{ name }}</div>
    </div>
  </div>

  <div v-else-if="props.isRoute" class="personal-tag__wrapper visible">
    <router-link :to="`/workspace/tag=${props.tag.id}`">
      <div class="personal-tag visible" :class="{ active: +props.tag.id === +route.params.id_tag }">{{ name }}</div>
    </router-link>
  </div>

  <div v-else class="personal-tag__wrapper visible">
    <div class="personal-tag-average" @click="emit('click')">{{ name }}</div>
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
        input {
          font-size: 13px;
          padding: 0;
        }
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
        height: v-bind(height);
      }
      50% {
        opacity: 0;
        height: v-bind(height);
      }
      100% {
        opacity: 0;
        height: 0;
      }
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

    .tag-header {
      @include theme('background-color', $gold);
    }
</style>
