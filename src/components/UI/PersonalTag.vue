<template>
    <div class="personal-tag" v-if="props.currentKey >= 0">#<slot></slot></div>
    <div class="personal-tag" v-else><slot></slot></div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    currentKey: Number
});
</script>

<style lang="scss">
    .personal-tag {
        background-color: #45474A;
        color: #aaadae;
        font-size: 13px;
        padding: 5px 8px;
        border-radius: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        cursor: pointer;
        transition: .3;
        &:active { opacity: 0.8; }
    }
</style>