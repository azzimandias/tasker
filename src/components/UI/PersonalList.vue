<template>
  <router-link :to="`/workspace/list=${props.list.id}`">
    <div class="personal-list" :class="{ active: props.list.id === +route.params.id_list }">
        <div class="personal-list__circle" :style="{ backgroundColor: props.list.color }"></div>
        <div class="personal-list__label"><slot name="name"></slot></div>
        <div class="info-list__wrapper">
          <InfoList
              :idList="props.list.id"
              @delete="deleteList"
          />
        </div>
        <div class="personal-list__count"><slot name="count"></slot></div>
    </div>
  </router-link>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router';
import InfoList from "@/components/UI/InfoList.vue";
import {useBigMenuStore} from "@/stores/BigMenuStore";

const bigMenu = useBigMenuStore();
const props = defineProps({
    list: Object,
});
const route = useRoute();
const router = useRouter();

const deleteList = () => {
  bigMenu.deleteList(props.list.id);
  if (+props.list.id === +route.params.id_list) {
    router.push({ name: 'intro' });
  }
};
</script>

<style lang="scss">
    @import "../../assets/styles/global.scss";
    .personal-list {
        display: flex;
        align-items: center;
        //border: 1px solid white;
        padding: 6px 15px 6px 6px;
        border-radius: 5px;
        cursor: pointer;
        transition: .3s;
        &.active {
          background-color: $gold;
          .personal-list__circle { box-shadow: 0 0 6px #26282B; }
          .personal-list__count, .personal-list__label { color: $textColorActive; }
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
        color: $textColor;
        flex-grow: 1;
    }
    .personal-list__count {
        font-size: 14px;
        font-weight: 600;
        color: $textColor;
        transition: .3s;
    }
    .info-list__wrapper {
      margin: 0 10px;
    }
</style>
