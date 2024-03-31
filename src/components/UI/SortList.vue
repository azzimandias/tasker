<script setup>
  import { useRoute } from 'vue-router'
  import {inject, ref, watch} from "vue";

  const sortList = ref(null);
  const isOpenBigMenu = inject('isOpenBigMenu');

  const closeOrOpen = () => {
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
    <div class="sort-list"
         ref="sortList"
         :class="{ hidden: !isOpenBigMenu, active: props.url === route.path }"
         @click="closeOrOpen"
    >
        <div class="sort-list__container">
            <div class="circle" :style="{ backgroundColor: currentColor }">
              <div class="sort-list__count-small" v-if="!isOpenBigMenu"><slot name="count"></slot></div>
            </div>
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
        @include theme('background-color', $personal);
        border-radius: 13px;
        padding: 8px 9px 5px 9px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        transition: .3s;
        &:active {
            @include theme('background-color', $gold);
            opacity: 0.8;
            .sort-list__count, .sort-list__label {
                @include theme('color', $textColorActive);
            }
        }
        &.active {
          @include theme('background-color', $gold);
          .sort-list__count, .sort-list__label {
            @include theme('color', $textColorActive);
          }
          .circle {
            box-shadow: 0 0 6px #26282B;
          }
        }
        &.hidden {
          width: 40px;
          height: 40px;
          padding: 10px;
          .circle {
            width: 20px;
            height: 20px;
          }
          .sort-list__label { display: none; }
          .sort-list__count { display: none; }
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
        text-align: center;
        transition: .3s;
    }
    .sort-list__count, .sort-list__label {
        font-size: 18px;
        @include theme('color', $textColor);
    }
    .sort-list__count-small {
        font-size: 14px;
        line-height: 21px;
        @include theme('color', $textColorActive);
    }
    .sort-list__count, .sort-list__count-small { font-weight: 600; }
    .sort-list__label { font-weight: 400; font-size: 15px; }
</style>
