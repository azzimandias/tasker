<script setup>
  import {ref} from 'vue';

  const props = defineProps({
    is_done: Number,
    id: Number,
    color: String,
  });
  const emits = defineEmits(['dot']);
  const is_doneModel = ref(Boolean(props.is_done));

  const changeState = () => {
    is_doneModel.value = !is_doneModel.value;
    emits('dot', is_doneModel.value);
  };
</script>

<template>
  <div
      class="dot-btn"
      @click="changeState"
  >
    <label
        :for="`dot_${props.id}`"
        class="dot"
        :style="{border: `${is_done ? 2 : 1}px solid ${is_done ? color : '#c4c4c4'}`}"
    >
      <input type="checkbox" :id="`dot_${props.id}`" class="checkbox"/>
    </label>
    <Transition mode="out-in" name="fade">
      <div class="inner-dot" v-if="is_doneModel" :style="{backgroundColor: color}"></div>
      <div class="inner-dot" v-else></div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.dot-btn {
  width: 20px;
  height: 20px;
  position: relative;
}
.dot {
  flex: 0 0 20px;
  display: block;
  width: 100%;
  height: 100%;
  transition: .3s;
  border: 1px  solid #c4c4c4;
  border-radius: 50%;
  cursor: pointer;
}
.checkbox {
  opacity: 0;
  cursor: pointer;
}
.inner-dot {
  position: absolute;
  top: 15%;
  left: 14%;
  width: 71%;
  height: 71%;
  border-radius: 50%;
  transition: .3s;
  cursor: pointer;
  background-color: transparent;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>
