<template>
    <div class="top-bar">

      <Transition mode="out-in" name="fade">

        <div class="top-bar__container" v-if="!isSearchMode">
            <TopButton :cl="cl[0]"/>
            <TopButton :cl="cl[1]"/>
        </div>
        <div class="top-bar__container vide" v-else>
            <InputText 
                :placeholder="'Поиск по задачам'"
                :isSearchMode="isSearchMode"
            />
        </div>

      </Transition>

      <Transition mode="out-in" name="fade">

        <TopButton v-if="!isSearchMode"
            :cl="cl[2]"
            @click="isSearchMode = true"
        />
        <TopButton v-else
            :cl="cl[3]"
            @click="isSearchMode = false"
        />

      </Transition>

    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import TopButton from '@/components/UI/TopButton.vue';
import InputText from '@/components/UI/InputText.vue'

const cl = ref(['person','plus','loup','close']);
const isSearchMode = ref(false);

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
