<script setup>
  import { useRoute } from 'vue-router'
  import {inject} from "vue";

  const isOpenBigMenu = inject('isOpenBigMenu');
  const closeOrNot = () => {
    if (document.documentElement.clientWidth <= 700) {
      isOpenBigMenu.value = false;
    }
  }

  const props = defineProps({
    color: String,
    url: String
  });

  const route = useRoute();

  let currentColor = props.color;
</script>

<template>
  <router-link :to="props.url">
    <div class="sort-list" :class="{ active: props.url === route.path }" @click="closeOrNot">
        <div class="sort-list__container">
            <div class="circle" :style="{ backgroundColor: currentColor }"></div>
            <div class="sort-list__count"><slot name="count"></slot></div>
        </div>
        <div class="sort-list__label"><slot name="name"></slot></div>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
    @import "../../assets/styles/global.scss";
    .sort-list {
        width: 100%;
        height: 70px;
        background-color: $personal;
        border-radius: 13px;
        padding: 8px 9px 5px 9px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        transition: .3s;
        &:active {
            background-color: $gold;
            opacity: 0.8;
            .sort-list__count, .sort-list__label {
                color: $textColorActive;
            }
        }
        &.active {
          background-color: $gold;
          .sort-list__count, .sort-list__label {
            color: $textColorActive;
          }
          .circle {
            box-shadow: 0 0 6px #26282B;
          }
        }
    }
    .sort-list__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .circle {
        background-color: grey;
        border-radius: 90px;
        width: 30px;
        height: 30px;
        transition: .3s;
    }
    .sort-list__count, .sort-list__label {
        font-size: 18px;
        color: $textColor;
    }
    .sort-list__count { font-weight: 600; }
    .sort-list__label { font-weight: 400; font-size: 15px; }
</style>