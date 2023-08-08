<template>
    <div class="tasker">
        <TheTopBar/>
        <TheWorkspace/>
    </div>
</template>

<script setup>
import TheTopBar from '@/components/groups/TheTopBar.vue';
import TheWorkspace from "@/components/groups/TheWorkspace.vue";
</script>

<style>
    .tasker {
        background-color: #1D1F22;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 40px 1fr;
    }
</style>
