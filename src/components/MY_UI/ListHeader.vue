<script setup lang="ts">
  import Loader from "@/components/MY_UI/Loader.vue";
  import {useListViewStore} from "@/stores/ListViewStore";
  import {useRoute, useRouter} from "vue-router";
  import {onMounted, PropType, ref, watch} from "vue";
  import {List} from '@/types/listView'
  import {SortList} from "@/types/bigMenu";
  const listView = useListViewStore();
  const props = defineProps({
    list: { type: Object as PropType<List | SortList>, required: true },
    top: { type: Number, default: 0 },
    zIndex: { type: Number, default: 1 },
    isRouter: { type: Boolean, default: false },
    isCanChange: { type: Boolean, default: false },
    fontSize: { type: String, default: '35px' }
  });
  const router = useRouter();
  const route = useRoute();
  const emit = defineEmits(['saveChangedName']);
  const listName = ref(props.list.name);
  const listHeaderInput = ref<HTMLElement | null>(null);

  onMounted(() => {
    if (props.isCanChange && route.params.id_list === 'new' && listHeaderInput.value) {
      listHeaderInput.value.focus();
    }
  });

  watch(() => props.list.name, (newValue) => {
        listName.value = newValue;
      }
  );

  const goToPersonalList = () => {
    if (props.isRouter) router.push({ name: 'list', params: { id_list: props.list.id } });
  };

  const saveChangedName = () => {
    if (listName.value && listName.value !== props.list.name) {
      emit('saveChangedName', listName.value);
    }
  };

  const blurListHeader = () => {
    if (listHeaderInput.value) listHeaderInput.value.blur();
  };
</script>

<template>
  <h2 v-if="!props.isCanChange"
      class="list-header"
      :style="{color: props.list.color, fontSize: props.fontSize, top: `${props.top}px`, zIndex: props.zIndex}"
      @dblclick="goToPersonalList"
  >
    {{ props.list.name }}
    <Loader v-if="listView.isLoadingSmall"/>
  </h2>
  <label v-else
         :for="`personal_list-${props.list.id}`"
         :style="{
                   position: 'sticky',
                   top: `${props.top}px`,
                   zIndex: props.zIndex,
                   width: '100%',
         }"
  >
    <input :id="`personal_list-${props.list.id}`"
           type="text"
           class="list-header"
           placeholder="Введите название списка"
           :style="{color: props.list.color,
                   fontSize: props.fontSize,
                   width: '100%',
            }"
           v-model="listName"
           @blur="saveChangedName"
           @keyup.enter="blurListHeader"
           ref="listHeaderInput"
    />
  </label>
</template>

<style scoped>
  .list-header, input.list-header {
    font-size: 35px;
    font-weight: 600;
    color: #c4c4c4;
    position: sticky;
    top: 0;
    background-color: var(--tasker);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 0 20px;
    cursor: pointer;
    z-index: 1;
  }
</style>
