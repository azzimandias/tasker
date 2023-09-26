<template>
  <div class="info-list" @mouseup="emit('deleteTask')">

  </div>
</template>

<script setup>
  const emit = defineEmits(['deleteTask']);
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .info-list {
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    background-position: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-image: url("@/assets/svgs/info.svg");
    cursor: pointer;
    transition: 0.3s;
  }
</style>
