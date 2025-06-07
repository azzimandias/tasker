<script setup>
  import {ref, onMounted, onBeforeUnmount} from "vue";
  import {useListViewStore} from "@/stores/ListViewStore";
  import {useRoute} from "vue-router";

  const router = useRoute();
  const ListView = useListViewStore();
  const props = defineProps({
    idList: Number,
  });
  const emit = defineEmits(['delete']);
  const infoList = ref(null);
  const dropDownList = ref(null);
  const isOpen = ref(false);
  const openCloseDropDownList = () => {
    isOpen.value = !isOpen.value;
  };

  const deleteAction = () => {
    openCloseDropDownList();
    emit('delete');
  }

  const closeDropDown = (e) => {
    if (!infoList.value.contains(e.target)) {
      isOpen.value = false;
    }
  }

  onMounted(() => {
    window.addEventListener('click', closeDropDown);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('click', closeDropDown);
  });
</script>

<template>
  <div class="info-list__wrapper">
    <div
        class="info-list"
        ref="infoList"
        @mouseup="openCloseDropDownList"
        :class="{ active: +props.idList === +router.params.id_list }"
    >
    </div>
    <Transition mode="out-in" name="fade">
      <div v-if="isOpen"
           class="drop-down-list active"
           ref="dropDownList"
      >
        <button class="drop-down-list__btn">Edit</button>
        <button class="drop-down-list__btn" @mouseup="deleteAction">Delete</button>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .info-list__wrapper {
    position: relative;
  }
  .info-list {
    flex: 0 0 20px;
    width: 20px;
    height: 20px;
    background-position: center;
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-image: url("@/assets/svgs/info.svg");
    &.active { background-image: url("@/assets/svgs/info_invert.svg"); }
    cursor: pointer;
    transition: 0.3s;
  }
  .drop-down-list {
    position: absolute;
    left: calc(50% - 145px);
    bottom: calc(0px - 55px);
    width: 150px;
    padding: 5px;
    @include theme('background-color', $dropDownListBackground);
    border-width: 1px;
    border-style: solid;
    @include theme('border-color', $dropDownListBorder);
    border-radius: 5px;
    overflow: hidden;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    z-index: 10;
    &.active {
      display: flex;
    }
    button.drop-down-list__btn {
      width: 100%;
      height: 20px;
      color: #5F6164;
      cursor: pointer;
      transition: .3s;
      &:hover {
        @include theme('color', $gold);
      }
    }
  }
</style>
