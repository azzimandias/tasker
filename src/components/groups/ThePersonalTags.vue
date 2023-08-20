<template>
    <div class="personal-tags" v-if="bigMenuStore.personalTags.length > 1">
        <SectionHeader :is_load="bigMenuStore.is_load_personalTags">Теги</SectionHeader>
        <div class="personal-tags__container scroll">
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
        max-height: 105px;
    }
</style>
