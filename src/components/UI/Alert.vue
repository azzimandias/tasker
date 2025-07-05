<script setup>
  const emit = defineEmits(['closeAlert']);
  const props = defineProps({
    alert: Object
  })
</script>

<template>
  <div class="alert">
    <div class="info_error"></div>
    <div class="alert_name_container">
      <p class="alert_name">{{ props.alert.name }}</p>
    </div>
    <div class="close_alert"
         @click="emit('closeAlert', props.alert.id)"
    ></div>
    <div></div>
    <div class="alert_description_container">
      <p class="alert_description">{{ props.alert.description }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .alert {
    position: absolute;
    top: 10px;
    right: 20px;
    color: #ff6467;
    background-color: #171717;
    border: 1px solid #ffffff1a;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 25px 1fr 25px;
    grid-template-rows: 25px 1fr;
    grid-gap: 10px;
    padding: 10px;
    min-width: 400px;
    min-height: 50px;
    z-index: 1000;
  }

  .info_error {
    width: 25px;
    height: 25px;
    background-image: url("@/assets/svgs/info_error.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .close_alert {
    width: 25px;
    height: 25px;
    background-image: url("@/assets/svgs/close.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    cursor: pointer;
  }

  .alert_name_container, .alert_description_container {
    display: flex;
    align-items: center;
  }

  .alert_name {
    font-size: 18px;
  }

  .alert_description {
    font-size: 13px;
  }
</style>
