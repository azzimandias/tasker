<template>
    <div class="personal-tags" v-if="bigMenuStore.personalTags.length > 1">
        <SectionHeader :is_load="bigMenuStore.is_load_personalTags">Теги</SectionHeader>
        <div class="personal-tags__container">
            <PersonalTag 
                v-for="(tag,key) in bigMenuStore.personalTags"
                :key="tag.id"
                :tag="tag"
            />
        </div>
    </div>
</template>

<script setup>
/*import { ref,reactive,onMounted } from 'vue';*/
import { useBigMenuStore } from "@/stores/BigMenuStore";
import SectionHeader from '../UI/SectionHeader.vue';
import PersonalTag from '@/components/UI/PersonalTag.vue';

const bigMenuStore = useBigMenuStore();

</script>

<style lang="scss">
    .personal-tags__container {
        display: flex;
        flex-wrap: wrap;
        padding: 6px 15px 6px 6px;
        overflow-y: auto;
        max-height: 105px;
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
</style>
