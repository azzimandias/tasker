<script setup>
  import Loader from "@/components/UI/Loader.vue";
  import {useListViewStore} from "@/stores/ListViewStore";
  import {useRouter} from "vue-router";
  import {ref} from "vue";
  const listView = useListViewStore();
  const props = defineProps({
    list: Object,
    isRouter: Boolean,
    isCanChange: Boolean,
    fontSize: String,
    top: Number,
  })
  const router = useRouter();
  const listName = ref(props.list.name);
  const listHeaderInput = ref(null);

  const goToPersonalList = () => {
    if (props.isRouter) router.push({ name: 'list', params: { id_list: props.list.id } });
  };

  const saveChangedName = () => {
    if (listName.value) {
      listView.updateListName({id: props.list.id, name: listName.value});
    }
  };

  const blurListHeader = () => {
    if (listHeaderInput.value) listHeaderInput.value.blur();
  };
</script>

<template>
  <h2 v-if="!props.isCanChange"
      class="list-header"
      :style="{color: props.list.color, fontSize: props.fontSize, top: `${props.top}px`}"
      @dblclick="goToPersonalList"
  >
    {{ props.list.name }}
    <Loader v-if="listView.loadingSmall"/>
  </h2>
  <input v-else
         type="text"
         class="list-header"
         :style="{color: props.list.color, fontSize: props.fontSize, top: `${props.top}px`}"
         v-model="listName"
         @blur="saveChangedName"
         @keyup.enter="blurListHeader"
         ref="listHeaderInput"
  />
</template>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .list-header, input.list-header {
    font-size: 35px;
    font-weight: 600;
    color: #c4c4c4;
    position: sticky;
    top: 0;
    @include theme('background-color', $tasker);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px 0 20px;
    cursor: pointer;
    z-index: 1;
  }
</style>
