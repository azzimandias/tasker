<template>
    <div class="top-bar">

      <Transition mode="out-in" name="fade">

        <div class="top-bar__container" v-if="!isSearchMode">
            <router-link :to="'/workspace/user'"><TopButton :cl="cl[0]"/></router-link>
            <TopButton :cl="cl[1]" @mouseup="listInfo.addNewTask" v-if="route.params.id_list"/>
        </div>
        <div class="top-bar__container vide" v-else>
            <SearchInputText
                :placeholder="'Поиск по задачам'"
                :isSearchMode="isSearchMode"
            />
        </div>

      </Transition>

      <Transition mode="out-in" name="fade">

        <TopButton v-if="!isSearchMode"
            :cl="cl[2]"
            @click="showSearch"
        />
        <TopButton v-else
            :cl="cl[3]"
            @click="hideSearch"
        />

      </Transition>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import TopButton from '@/components/UI/TopButton.vue';
import SearchInputText from '@/components/UI/SearchInputText.vue'
import {useImageDBStore} from "@/stores/imageDBStore";
import {useListViewStore} from "@/stores/ListViewStore";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const emit = defineEmits(['newTask']);
const cl = ref(['person','plus','loup','close']);
const isSearchMode = ref(false);
const listInfo = useListViewStore();
const imageDB = useImageDBStore();

const showSearch = () => {
  isSearchMode.value = true;
  router.push({ name: 'search' });
};
const hideSearch = () => {
  isSearchMode.value = false;
  router.push({ name: 'intro' });
};
</script>

<style lang="scss">
    .top-bar {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 11px 17.5px;
        background-color: transparent;
    }
    .top-bar__container {
        &.vide { height: 100%; }
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        padding-right: 11px;
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: all 0.25s ease-out;
    }

    .fade-enter-from {
      opacity: 0;
    }

    .fade-leave-to {
      opacity: 0;
    }
</style>
