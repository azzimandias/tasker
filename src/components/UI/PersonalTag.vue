<template>
    <div class="personal-tag" v-if="currentKey !== 0">{{currentKey}}#<slot></slot></div>
    <div class="personal-tag" v-else><slot></slot></div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    key: Number
});
console.log(props.key)
let currentKey = props.key;
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
        &:active { opacity: 0.8; }
    }
</style>