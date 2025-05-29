<script setup>
  import {inject, ref, watch} from 'vue';
  import {useRoute} from 'vue-router'

  const route = useRoute();
  //console.log(route)
  const applicationNameLabel = ref(null);
  const closeOpen = ref(null);
  const isOpenBigMenu = inject('isOpenBigMenu');
  const closeOrOpen = () => {
    isOpenBigMenu.value = !isOpenBigMenu.value;
  }
  watch(isOpenBigMenu, (newVal) => {
    if (!newVal) {
      applicationNameLabel.value.classList.add('hidden');
      closeOpen.value.classList.add('hidden');
    } else {
      applicationNameLabel.value.classList.remove('hidden');
      closeOpen.value.classList.remove('hidden');
    }
  });
</script>

<template>
    <div class="application-name__container">
        <h1 class="application-name__label" ref="applicationNameLabel">Tasker</h1>
        <button v-if="route.path.includes('workspace')"
                type="button"
                class="closeOpen"
                ref="closeOpen"
                @click="closeOrOpen"
        ></button>
    </div>
</template>

<style lang="scss">
    .application-name__container {
        width: 100%;
        height: 47px;
        position: sticky;
        top: 0;
        background-color: transparent;
    }
    .application-name__label {
        width: 70%;
        margin: 0 auto;
        line-height: 47px;
        font-size: 25px;
        font-weight: 600;
        text-transform: uppercase;
        text-align: center;
        color: #5C5D5F;
        transition: .3s;
        &.hidden {
          opacity: 0;
        }
    }
    .closeOpen {
      width: 30px;
      height: 47px;
      position: absolute;
      top: 0;
      right: 11px;
      background-image: url("../../assets/svgs/sidebar-expand.svg");
      background-repeat: no-repeat;
      background-size: 30px 30px;
      background-position: center;
      cursor: pointer;
      transition: .3s;
      &.hidden {
        transform: scaleX(-1);
      }
    }
</style>
