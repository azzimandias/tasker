<template>
    <div class="personal-tags" v-if="defaultStore.personalTags.length > 1">
        <SectionHeader :is_load="defaultStore.is_load_personalTags">Теги</SectionHeader>
        <div class="personal-tags__container">
            <PersonalTag 
                v-for="(tag,key) in defaultStore.personalTags"
                :key="tag.id"
                :tag="tag"
            />
        </div>
    </div>
</template>

<script setup>
/*import { ref,reactive,onMounted } from 'vue';*/
import {useDefaultStore} from "@/stores/DefaultStore";
import SectionHeader from '../UI/SectionHeader.vue';
import PersonalTag from '@/components/UI/PersonalTag.vue';

const defaultStore = useDefaultStore();

</script>

<style lang="scss">
    .personal-tags__container {
        display: flex;
        flex-wrap: wrap;
        padding: 6px 15px 6px 6px;
    }
</style>
