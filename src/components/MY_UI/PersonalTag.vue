<script setup lang="ts">
  import {onMounted, reactive, ref, watch} from 'vue';
  import { useRoute } from 'vue-router';
  import {useListViewStore} from "@/stores/ListViewStore";
  import router from "@/router";
  import {Tag, Task} from "@/types/listView";

  const props = defineProps<({
    id_task:     number,
    tag:         Tag,
    isCanChange: boolean,
    isCanCreate: boolean,
    isRoute:     boolean,
    isHeader:    boolean,
    width:       string,
    placeholder: string,
  })>();

  const emits = defineEmits<{
    (e: 'change',  payload: string):   void;
    (e: 'create',  payload: string):   void;
    (e: 'onFocus', payload: void  ):   void;
    (e: 'onBlur',  payload: void  ):   void;
    (e: 'click',   payload: void  ):   void;
  }>();

  const route =         useRoute();
  const name =          ref(props.tag.name);
  const tagWrapper =    ref<HTMLElement | null>(null);
  const height =        ref('');
  const listView =      useListViewStore();
  const width =         ref(props.width? props.width : '1px');
  const span =          ref<HTMLElement | null>(null);
  const spanHeader =    ref<HTMLElement | null>(null);
  const headerTag =     ref<HTMLElement | null>(null);
  const isMounted =     ref(false);

  watch(() => props.tag.name, (newName) => {
    if (isMounted.value) {
      name.value = newName;
      resize();
    }
  });
  watch(name, (newName: string) => {
    emits('change', newName)
  })
  onMounted(() => {
    resize();
    needHash();
    if (route.params.id_tag === 'new' && headerTag.value) {
      headerTag.value.focus();
    }
    isMounted.value = true;
  });
  const needHash = () => {
    if(props.tag.id !== 0 && !props.isCanChange && !props.isHeader) {
      name.value = `#${props.tag.name}`;
    }
  };

/* + can change */
const resize = () => {
  requestAnimationFrame(() => {
    if (!props.isHeader) {
      if (!span.value) return;
      span.value.textContent = name.value || ' ';
      const calculatedWidth = span.value.scrollWidth;
      width.value = props.isCanCreate && calculatedWidth < 108
          ? '108px'
          : `${calculatedWidth}px`;
    } else {
      if (!spanHeader.value) return;
      spanHeader.value.textContent = name.value || ' ';
      width.value = name.value ? `${spanHeader.value.scrollWidth + 10}px` : '250px';
    }
  });
};
  const changeTag = async () => {
    if (name.value.trim()) {
      if (route.params.id_tag === 'new') {
        createTag();
      } else {
        if (props.tag.name !== name.value) {
          const updatedTag = await listView.updateTag({id: props.tag.id, name: name.value});
        }
      }
    } else if (tagWrapper.value) {
      console.log(height.value)
      console.log(tagWrapper.value)
      height.value = `${tagWrapper.value.scrollHeight}px`;
      tagWrapper.value.classList.remove('show');
      tagWrapper.value.classList.add('hide');
      setTimeout(() => {
        listView.deleteTagTask({id: props.tag.id, name: props.tag.name, task_id: props.id_task});
      }, 300);
    }
  };
  const createTag = () => {
    if (name.value.trim()) {
      emits('create', name.value.trim());
      name.value = '';
    }
  }
/* - can change */
  const goToTagViewPage = () => {
    router.push({ name: 'tag', params: { id_tag: props.tag.id } });
  };
</script>

<template>
  <label v-if="props.isCanChange"
         :for="`task-tag-${props.id_task}-${props.tag.id}`"
         class="personal-tag show hash"
         :class="{ active: (props.tag.id && +props.tag.id === +listView.currentTag.id) }"
         ref="tagWrapper"
         @dblclick="goToTagViewPage"
  >
    <input :id="`task-tag-${props.id_task}-${props.tag.id}`"
           type="text"
           class="tag-input"
           v-model="name"
           @blur="changeTag"
           @keyup.enter="(e) => (e.target as HTMLElement).blur()"
           @keydown="resize"
           :style="{width: width}"
    />
    <span v-show="true"
          class="hidden-span-helper"
          ref="span"
    ></span>
  </label>

  <label v-else-if="props.isCanCreate"
         :for="`create-tag-${props.id_task}`"
         class="personal-tag show blank"
         ref="tagWrapper"
  >
    <input :id="`create-tag-${props.id_task}`"
           type="text"
           class="tag-input"
           v-model="name"
           @keyup.enter="createTag"
           @keydown="resize"
           @focus="emits('onFocus')"
           @blur="() => {resize(); emits('onBlur')}"
           :style="{width: width}"
           :placeholder="props.placeholder"
    />
    <span v-show="true"
          class="hidden-span-helper"
          ref="span"
    ></span>
  </label>

  <div v-else-if="props.isHeader"
       class="tag-header-wrapper"
  >
    <label v-if="props.tag.id"
           :for="`header-tag-${props.tag.id}`"
           class="tag-header personal-tag visible hash-header"
           :class="{
              active: +props.tag.id === +listView.currentTag.id,
              blank: !props.tag.id,
           }"
    >
      <input :id="`header-tag-${props.tag.id}`"
             type="text"
             class="tag-input"
             placeholder="Введите название тега"
             v-model="name"
             @blur="changeTag"
             @keyup.enter="changeTag"
             @keydown="resize"
             :style="{width: width, fontSize: '20px'}"
             ref="headerTag"
      />
      <span v-show="true"
            class="hidden-span-helper-header"
            ref="spanHeader"
      ></span>
    </label>
    <div v-else class="tag-header">{{ name }}</div>
  </div>

  <div v-else-if="props.isRoute" class="personal-tag__wrapper visible">
    <router-link :to="`/workspace/tag=${props.tag.id}`">
      <div class="personal-tag visible" :class="{ active: (props.tag.id && +props.tag.id === +route.params.id_tag) }">{{ name }}</div>
    </router-link>
  </div>

  <div v-else class="personal-tag__wrapper visible">
    <div class="personal-tag-average" @click="emit('click')">{{ name }}</div>
  </div>
</template>

<style>
    .personal-tag__wrapper {
      position: relative;
      height: 28px;
    }

    .personal-tag {
        width: auto;
        height: 28px;
        font-size: 13px;
        padding: 5px 8px;
        border-radius: 5px;
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

    .tag-input {
      width: 100%;
      height: 100%;
    }

    .personal-tag-average {
      width: auto;
      height: auto;
      font-size: 13px;
      padding: 5px 8px;
      border-radius: 5px;
      cursor: pointer;
      transition: .3s;
      &:active {
        opacity: 0.8;
      }
      input { padding: 0; }
    }

    .hash::before { content: '#'; }
    .hash-header::before {
      content: '#';
      font-size: 20px;
    }

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
    }

    .tag-header-wrapper {
      display: flex;
      align-items: center;
      height: 100%;
    }

    .hidden-span-helper {
      visibility: hidden;
      position: absolute;
      white-space: pre;
      font-size: 13px;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      top: -9999px;
      left: -9999px;
    }

    .hidden-span-helper-header {
      visibility: hidden;
      position: absolute;
      white-space: pre;
      font-size: 20px;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      top: -9999px;
      left: -9999px;
    }

    .personal-tag {
      background-color: var(--personal);
      color: var(--textColor);
      &.active {
        background-color: var(--gold);
        color: var(--textColorActive)
      }
    }

    .personal-tag-average {
      background-color: var(--personal);
      color: var(--textColor);
      &.active {
        background-color: var(--gold);
        color: var(--textColorActive)
      }
    }

    .tag-header {
      background-color: var(--gold);
    }
</style>
