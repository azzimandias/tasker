<script setup>

</script>

<template>
  <div class="wrapper">
    <div class="label"><slot/>:</div>
    <div class="bordered">
      <input type="text" value=""/>
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import "../../assets/styles/global.scss";
  .wrapper {
    width: 100%;
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    align-items: center;
    color: $textColor;
  }
  .label {
    font-size: 20px;
  }
  .bordered {
    padding: 5px 10px;
    width: 100%;
    height: 100%;
    border: 1px solid $SvgColor;
    border-radius: 5px;
    input {
      width: 100%;
      height: 100%;
      font-size: 20px;
    }
  }
</style>
