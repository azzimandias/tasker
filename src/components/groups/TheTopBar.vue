<script setup>
import {onMounted, ref, watch} from 'vue';
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
  const isNeedToClearSearch = ref(false);
  const listInfo = useListViewStore();
  const imageDB = useImageDBStore();

  const props = defineProps({
    isOpenSearchTopBar: Boolean,
  })

  watch(route, () => {
    if (route.path.indexOf('search') >= 0) {
      showSearch();
    } else {
      hideSearch();
    }
  });

  watch(() => props.isOpenSearchTopBar, (newIsOpenSearch) => {
    isSearchMode.value = newIsOpenSearch;

  });

  const showSearch = () => {
    isSearchMode.value = true;
    router.push({ name: 'search' });
  };
  const hideSearch = () => {
    isSearchMode.value = false;
  };
  const clearSearch = () => {
    isNeedToClearSearch.value = true;
  };
</script>

<template>
    <div class="top-bar">

      <Transition mode="out-in" name="fade">

        <div class="top-bar__container" v-if="!isSearchMode">
            <router-link :to="'/workspace/user'"><TopButton :cl="cl[0]"/></router-link>
            <TopButton v-if="route.params.id_list && route.params.id_list !== 'new'"
                       :cl="cl[1]"
                       @mouseup="listInfo.addNewTask"
            />
        </div>
        <div class="top-bar__container vide" v-else>
            <SearchInputText
                :placeholder="'Введите название задачи...'"
                :isSearchMode="isSearchMode"
                :isNeedToClearSearch="isNeedToClearSearch"
                @needNoMore="isNeedToClearSearch = false"
            />
        </div>

      </Transition>

      <Transition mode="out-in" name="fade">

        <router-link class="ref" :to="'/workspace/search'" v-if="!isSearchMode">
          <TopButton
              :cl="cl[2]"
              @click="showSearch"
          />
        </router-link>
        <TopButton v-else
            :cl="cl[3]"
            @click="clearSearch"
        />

      </Transition>

    </div>
</template>

<style lang="scss">
  /*@import "../../assets/styles/global.scss";*/
  .top-bar {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 6px 17.5px 0 17.5px;
    /*@include theme('background-color', $tasker);*/
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .top-bar__container {
    height: 28px;
    &.vide { height: 100%; }
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    padding-right: 11px;
  }
  .ref {
    height: 28px;
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
