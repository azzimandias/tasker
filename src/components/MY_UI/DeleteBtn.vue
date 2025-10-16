<script setup>
  const emit = defineEmits(['delete']);
</script>

<template>
  <button class="delete-btn"
          type="button"
          title="Удалить"
          @mouseup="emit('delete')"
  ></button>
</template>

<style scoped>
  .delete-btn {
    width: 20px;
    height: 20px;
    cursor: pointer;
    background-position: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-image: url("../../assets/svgs/close.svg");
    padding: 0;
  }
</style>
