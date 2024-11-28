<script setup>
  import Loader from "@/components/UI/Loader.vue";
  import {useListViewStore} from "@/stores/ListViewStore";
  import {useRouter} from "vue-router";
  const listView = useListViewStore();
  const props = defineProps({
    list: Object,
    isRouter: Boolean,
    fontSize: String,
    top: Number,
  })
  const router = useRouter();

  const goToPersonalList = () => {
    if (props.isRouter) router.push({ name: 'list', params: { id_list: props.list.id } });
  };


</script>

<template>
  <h2 class="list-header"
      :style="{color: props.list.color, fontSize: props.fontSize, top: `${props.top}px`}"
      @dblclick="goToPersonalList"
  >
    {{ props.list.name }}
    <Loader v-if="listView.loadingSmall"/>
  </h2>
</template>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .list-header {
    font-size: 35px;
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
