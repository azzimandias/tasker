<script setup>
import {onMounted, ref, watch} from "vue";
  const emit = defineEmits(['closeAlert']);
  const props = defineProps({
    alert: Object
  })
  const alert = ref(null);
  const scrollWidth = ref('');
  const top = ref(props.alert.top);
  watch(() => props.alert.top, (newTop) => {
    top.value = newTop;
  });
  onMounted(() => {
    scrollWidth.value = -1 * alert.value.scrollWidth + 20 + 'px';
  })
  const hideAndRemoveAlert = () => {
    alert.value.classList.add('hide');
    setTimeout(() => {
      emit('closeAlert', props.alert.id);
    }, 300);
  };
</script>

<template>
  <div class="alert slide" ref="alert">
    <div class="info_error"></div>
    <div class="alert_name_container">
      <p class="alert_name">{{ props.alert.name }}</p>
    </div>
    <div class="close_alert"
         @click="hideAndRemoveAlert"
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
    top: v-bind(top);
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

  .slide {
    animation: slide .3s forwards;
  }

  .hide {
    animation: hide .3s forwards;
  }

  @keyframes slide {
    0% {
      right: v-bind(scrollWidth);
    }
    100% {
      right: 20px;
    }
  }

  @keyframes hide {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
</style>
