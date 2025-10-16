<script setup></script>

<template>
  <div class="tag-header">
    <slot/>
  </div>
</template>

<style scoped>
  .tag-header {
    width: auto;
    height: auto;
    background-color: var(--gold);
    color: #171515;
    font-size: 20px;
    padding: 5px 8px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.3s;
    margin-bottom: 8.5px;
  }
</style>
