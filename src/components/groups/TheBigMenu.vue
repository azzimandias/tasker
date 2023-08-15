<template>
    <div class="big-menu">
        <div class="big-menu__wrapper">
            <ApplicationName/>
            <TheSortLists/>
            <ThePersonalLists/>
            <ThePersonalTags/>
        </div>
        <button class="new-personal-list-btn" @click="is_popup=true">Новый список</button>
      <Teleport to="body">
        <CreateNewListPopup v-if="is_popup" @close="is_popup=false"/>
      </Teleport>
    </div>
</template>

<script setup>
import ApplicationName from '@/components/UI/ApplicationName.vue';
import TheSortLists from '@/components/groups/TheSortLists.vue';
import ThePersonalLists from '@/components/groups/ThePersonalLists.vue';
import ThePersonalTags from '@/components/groups/ThePersonalTags.vue';
import CreateNewListPopup from "@/components/groups/CreateNewListPopup.vue";
import {ref} from "vue";
const is_popup = ref(false);
</script>

<style scoped lang="scss">
    .big-menu {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-bottom: 10px;
        background-color: #26282B;
        user-select: none;
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
        background-color: #4b4b4b;
      }
    }
    .big-menu__wrapper {
        > div {
            padding: 0 11px;
        }
    }
    .new-personal-list-btn {
        width: 155px;
        color: white;
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
            background-image: url('../../assets/svgs/plus-circle.svg');
            background-position: center;
            background-size: 15px 15px;
            background-repeat: no-repeat;
        }
    }
</style>
