<template>
  <div class="blur" @click="emits('close')"></div>
  <div class="popup">
    <div class="popup__header">
      <h4 class="popup__label">Создать новый список</h4>
      <TopButton :cl="'close'" @click.prevent="emits('close')"/>
    </div>
    <div class="popup__body">
      <div class="line">Придумайте имя: <InputText :name="name" @underDeroch="saveName" :width="width" :border="border"/></div>
      <div class="line">Выберите цвет: <Coloris :color="color" @onDroch="saveColor"/></div>
    </div>
    <div class="popup__btns">
      <button class="popup__btn cancel" @click="emits('close')">Отмена</button>
      <button class="popup__btn add" @click="saveList">Создать</button>
    </div>
  </div>
</template>

<script setup>
import {defineEmits, ref} from 'vue';
import TopButton from "@/components/UI/TopButton.vue";
import InputText from "@/components/UI/InputText.vue";
import Coloris from "@/components/UI/Coloris.vue";
import api from "@/api";
import {useBigMenuStore} from "@/stores/BigMenuStore";

const emits = defineEmits(['close'])
const border = '2px solid #706767';
const width = 'auto';
const name = ref('');
const color = ref('#ffffff');
const bigMenu = useBigMenuStore();

const saveName = (val) => {
  name.value = val;
}
const saveColor = (val) => {
  color.value = val;
}
const saveList = async () => {
  await api.saveList({name: name.value, color: color.value});
  await bigMenu.firstRequest();
  emits('close');
};
</script>

<style lang="scss" scoped>
  .blur {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(29, 31, 34, 0.7);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup {
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: calc(50vh - 200px);
    left: calc(50vw - 250px);
    border-radius: 10px;
    border: 2px solid black;
    background-color: #26282B;
    padding: 10px 20px;
    z-index: 100;
  }
  .popup__header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup__label {
    width: auto;
    font-size: 30px;
    color: #c4c4c4;
  }
  .popup__body {
    height: 70px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    color: #c4c4c4;
    font-size: 20px;
  }
  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup__btns {
    height: 30px;
    width: 210px;
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .popup__btn {
    width: 100px;
    border: 2px solid #33333a;
    border-radius: 5px;
    color: #c4c4c4;
    background-color: #1D1F22;
  }
</style>
