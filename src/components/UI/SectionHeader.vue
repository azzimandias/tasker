<template>
    <div class="section-header__container">
        <div class="section-header__label"><slot></slot></div>
        <Loader v-if="props.is_load"/>
    </div>
</template>

<script setup>
import Loader from './Loader.vue';
const props = defineProps({
  'is_load': Boolean,
});
</script>

<style lang="scss">
    .section-header__container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 6px 10px 12px;
        height: 46px;
    }
    .section-header__label {
        font-size: 12px;
        font-weight: 500;
        color: #5F6164;
        
    }
</style>