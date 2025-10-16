<script setup>
  import {useRoute, useRouter} from 'vue-router';
  import InfoList from "@/components/UI/InfoList.vue";
  import {useBigMenuStore} from "@/stores/BigMenuStore";
  import {inject, ref} from "vue";

  const isOpenBigMenu = inject('isOpenBigMenu');
  const bigMenu = useBigMenuStore();
  const props = defineProps({
    list: Object,
  });
  const route = useRoute();
  const router = useRouter();

  const infoList = ref(null);

  const openList = (e) => {
    if (!infoList.value.contains(e.target)) {
      if (document.documentElement.clientWidth <= 700) {
        isOpenBigMenu.value = false;
      }
      router.push({ name: 'list', params: { id_list: props.list.id } });
    }
  };

  const shareList = () => {

  };

  const deleteList = () => {
    bigMenu.deleteList(props.list.id);
    if (+props.list.id === +route.params.id_list) {
      router.push({ name: 'intro' });
    }
  };
</script>

<template>
    <div class="personal-list"
         :class="{ active: props.list.id === +route.params.id_list, minimized: !isOpenBigMenu }"
         @mouseup="openList"
    >
        <div class="personal-list__circle" :key="Math.random()" :style="{ backgroundColor: props.list.color }"></div>
        <div class="personal-list__label"><slot name="name"></slot></div>
        <div class="info-list__wrapper" ref="infoList">
          <InfoList
              :idList="props.list.id"
              @share="shareList"
              @delete="deleteList"
          />
        </div>
        <div class="personal-list__count"><slot name="count"></slot></div>
    </div>
</template>

<style lang="scss">
    /*@import "../../assets/styles/global.scss";*/
    .personal-list {
        display: flex;
        align-items: center;
        padding: 6px 15px 6px 6px;
        border-radius: 5px;
        cursor: pointer;
        transition: .3s;
        &.active {
          /*@include theme('background-color', $gold);*/
          .personal-list__circle { box-shadow: 0 0 6px #26282B; }
          .personal-list__count, .personal-list__label { /*@include theme('color', $textColorActive);*/ }
        }
        &.minimized {
          width: 40px;
          height: 40px;
          padding: 5px;
          .personal-list__label { display: none; }
          .personal-list__count { display: none; }
          .info-list__wrapper { display: none; }
        }
    }
    .personal-list__circle {
        background-color: grey;
        border-radius: 90px;
        width: 28px;
        height: 28px;
        transition: .3s;
    }
    .personal-list__label {
        margin-left: 8px;
        font-size: 14px;
        /*@include theme('color', $textColor);*/
        flex-grow: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 176px;
    }
    .personal-list__count {
        width: 26px;
        max-width: 26px;
        font-size: 14px;
        font-weight: 600;
        text-align: right;
        /*@include theme('color', $textColor);*/
        transition: .3s;
    }
    .info-list__wrapper {
      //margin: 0 10px;
    }
</style>
