<template>
    <input type="text"
           class="searcher"
           v-model="name"
           :placeholder="placeholder"
           :style="{width: width, border: border}"
           @change="emit('underDeroch', name)"
           ref="inputFocus"
    />
</template>

<script setup>
import { ref, onMounted } from 'vue';
const props = defineProps({
    name: String,
    placeholder: String,
    width: String,
    border: String,
});
const emit = defineEmits(['underDeroch']);
const name = ref(props.name);
const inputFocus = ref(null);
onMounted(() => {
    inputFocus.value.focus()
});
</script>

<style lang="scss">
    .searcher {
        width: 100%;
        color: #aaadae;
      border-radius: 5px;
    }
</style>
