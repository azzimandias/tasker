<template>
  <div
      class="dot-btn"
      @click="emits('dot')"
  >
    <label
        :for="`dot_${props.id}`"
        class="dot"
        :style="{border: `2px solid ${color}`}"
    >
      <input type="checkbox" :id="`dot_${props.id}`" class="checkbox"/>
    </label>
    <Transition mode="out-in" name="fade">
      <div class="inner-dot" v-if="props.is_done" :style="{backgroundColor: color}"></div>
      <div class="inner-dot" v-else></div>
    </Transition>
  </div>
</template>

<script setup>
const props = defineProps({
  is_done: Number,
  id: Number,
  color: String,
});
const emits = defineEmits(['dot']);
</script>

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
  border: 2px  solid #c4c4c4;
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
