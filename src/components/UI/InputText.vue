<template>
    <input type="text" class="searcher" :placeholder="placeholder" ref="inputFocus">
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
const props = defineProps({
    placeholder: String
});
const inputFocus = ref(null);
onMounted(() => {
    inputFocus.value.focus()
});
</script>

<style lang="scss">
    .searcher {
        width: 100%;
        color: #aaadae;
    }
</style>
