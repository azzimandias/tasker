<template>
  <Transition mode="out-in" name="fade">
    <div v-if="props.is_popup">
      <div class="blur" @click="emits('close')"></div>
      <div class="popup">
        <div class="popup__header">
          <h4 class="popup__label">Создать новый список</h4>
          <TopButton :cl="'close'" @click.prevent="emits('close')"/>
        </div>
        <div class="popup__body">
          <div class="body__wrapper">
            <InputText
                :name="name"
                @underDeroch="saveName"
                :width="width"
                :border="border"
                :placeholder="'Имя списка'"
            />
            <div class="line">
              Цвет:
              <Coloris
                  :color="color"
                  @onDroch="saveColor"
              />
            </div>
          </div>
          <p :style="{color: color}">A</p>
        </div>
        <div class="popup__btns">
          <button class="popup__btn cancel" @click="emits('close')">Отмена</button>
          <button class="popup__btn add" @click="saveList">Создать</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {ref} from 'vue';
import TopButton from "@/components/UI/TopButton.vue";
import InputText from "@/components/UI/InputText.vue";
import Coloris from "@/components/UI/Coloris.vue";
import api from "@/api";
import {useBigMenuStore} from "@/stores/BigMenuStore";

const props = defineProps({is_popup: Boolean});
const emits = defineEmits(['close'])
const border = '2px solid #706767';
const width = 'auto';
const name = ref('');
const color = ref('#e0e0e0');
const bigMenu = useBigMenuStore();

const saveName = (val) => {
  name.value = val;
}
const saveColor = (val) => {
  color.value = val;
}
const saveList = async () => {
  emits('close');
  await api.saveList({name: name.value.trim(), color: color.value});
  await bigMenu.firstRequest();
  name.value = '';
  color.value = '#e0e0e0';
};
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
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
    border: 2px solid grey;
    background-color: $bigMenu;
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
    color: $textColor;
  }
  .popup__body {
    height: 100px;
    display: flex;
    justify-content: space-between;
    color:$textColorActive;
    font-size: 20px;
    p {
      flex: 1 0 100px;
      text-align: center;
      font-size: 100px;
      font-weight: 600;
      text-shadow: 0 0 6px #26282B;
    }
  }
  .body__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .line {
    display: flex;
    grid-gap: 5px;
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
    border-radius: 5px;
    color: $textColorActive;
    background-color: $personal;
    &:active { opacity: 0.8 }
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
