<script setup>

</script>

<template>
  <div class="alert">
    <div class="info_error"></div>
    <div>Alert</div>
    <div></div>
  </div>
</template>

<style scoped lang="scss">
  .alert {
    position: absolute;
    top: 0;
    right: 0;
    color: #ff6467;
    background-color: #171717;
    border: 1px solid #ffffff1a;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 30px 1fr 30px;
    grid-template-rows: 30px 1fr;
    grid-gap: 10px;
    min-width: 400px;
    min-height: 50px;
    z-index: 1000;
  }

  .info_error {
    width: 30px;
    height: 30px;
    background-image: url("@/assets/svgs/info_error.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
