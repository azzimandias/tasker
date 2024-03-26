<script setup>
  import ApplicationName from '@/components/UI/ApplicationName.vue';
  import TheSortLists from '@/components/groups/TheSortLists.vue';
  import ThePersonalLists from '@/components/groups/ThePersonalLists.vue';
  import ThePersonalTags from '@/components/groups/ThePersonalTags.vue';
  import CreateNewListPopup from "@/components/groups/CreateNewListPopup.vue";
  import {inject, ref, watch} from "vue";

  const newPersonalListBtn = ref(null);
  const is_popup = ref(false);
  const isOpenBigMenu = inject('isOpenBigMenu');

  watch(isOpenBigMenu, (newVal) => {
    if (!newVal) {
      newPersonalListBtn.value.classList.add('hidden');
    } else {
      newPersonalListBtn.value.classList.remove('hidden');
    }
  });
</script>

<template>
    <div class="big-menu">
        <div class="big-menu__wrapper">
            <ApplicationName/>
            <TheSortLists/>
            <ThePersonalLists/>
            <ThePersonalTags/>
        </div>
        <button class="new-personal-list-btn" ref="newPersonalListBtn" @click="is_popup=true">Новый список</button>
      <Teleport to="body">
        <CreateNewListPopup :is_popup="is_popup" @close="is_popup=false"/>
      </Teleport>
    </div>
</template>

<style scoped lang="scss">
    @import "../../assets/styles/global.scss";
    .big-menu {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 10px;
        background-color: $bigMenu;
        user-select: none;
        overflow-x: clip;
        overflow-y: auto;
      &::-webkit-scrollbar {
        width: 5px;
        background-color: #0a0a0a;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #c4c4c4;
      }

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
        background-color: #26282B;
      }
    }
    .big-menu__wrapper {
      flex: 1 0 100px;
      display: flex;
      flex-direction: column;
        > div {
            padding: 0 11px;
        }
    }
    .new-personal-list-btn {
        width: 155px;
        color: $textColor;
        transition: .3s;
        cursor: pointer;
        position: relative;
        &:active { opacity: 0.8; }
        &::before {
            content: '';
            display: block;
            width: 15px;
            height: 15px;
            position: absolute;
            top: 2px;
            left: 12px;
            //background-image: url('../../assets/svgs/plus-circle.svg');
            background-image: url('../../assets/svgs/plus-circle_invert.svg');
            background-position: center;
            background-size: 15px 15px;
            background-repeat: no-repeat;
        }
        &.hidden {
          opacity: 0;
        }
    }
</style>
