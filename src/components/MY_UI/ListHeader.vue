<script setup>
  import Loader from "@/components/MY_UI/Loader.vue";
  import {useListViewStore} from "@/stores/ListViewStore";
  import {useRoute, useRouter} from "vue-router";
  import {onMounted, ref, watch} from "vue";
  const listView = useListViewStore();
  const props = defineProps({
    list: Object,
    isRouter: Boolean,
    isCanChange: Boolean,
    fontSize: String,
    top: Number,
    zIndex: Number,
  })
  const router = useRouter();
  const route = useRoute();
  const emit = defineEmits(['saveChangedName']);
  const listName = ref(props.list.name);
  const listHeaderInput = ref(null);

  onMounted(() => {
    if (props.isCanChange && route.params.id_list === 'new') {
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
    <Loader v-if="listView.loadingSmall"/>
  </h2>
  <label v-else :for="`personal_list-${props.id}`">
    <input :id="`personal_list-${props.id}`"
           type="text"
           class="list-header"
           placeholder="Введите название списка"
           :style="{color: props.list.color,
                   fontSize: props.fontSize,
                   top: `${props.top}px`,
                   zIndex: props.zIndex,
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
