<template>
    <div class="top-bar">
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
        <TopButton 
            :cl="cl[2]"
            @click="isSearchMode = !isSearchMode"
        />
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import TopButton from '@/components/UI/TopButton.vue';
import InputText from '@/components/UI/InputText.vue'

const cl = ref(['person','plus','loup']);
let isSearchMode = ref(false);

</script>

<style lang="scss">
    .top-bar {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding: 11px 17.5px;
        background-color: #3F4041;
    }
    .top-bar__container {
        &.vide { height: 100%; }
        flex-grow: 1;
        display: flex;
        justify-content: space-between;
        padding-right: 11px;
    }
</style>
