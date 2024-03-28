<script setup>
  import {ref, onMounted, onBeforeUnmount} from "vue";
  import {useListViewStore} from "@/stores/ListViewStore";
  import {useRoute} from "vue-router";

  const router = useRoute();
  const ListView = useListViewStore();
  const props = defineProps(['idList']);
  const emit = defineEmits(['delete']);
  const infoList = ref(null);
  const dropDownList = ref(null);
  const openCloseDropDownList = () => {
    if (dropDownList.value.classList.contains('active')) {
      dropDownList.value.classList.remove('active');
    } else {
      dropDownList.value.classList.add('active');
    }
  };

  const closeDropDown = (e) => {
    if (dropDownList.value.classList.contains('active') && !infoList.value.contains(e.target)) {
      dropDownList.value.classList.remove('active');
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
  <div class="info-list" ref="infoList" @mouseup="openCloseDropDownList" :class="{ active: +props.idList === +router.params.id_list }">
    <div class="drop-down-list" ref="dropDownList">
      <button class="drop-down-list__btn">Edit</button>
      <button class="drop-down-list__btn" @mouseup="emit('delete')">Delete</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
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
    position: relative;
  }
  .drop-down-list {
    position: absolute;
    left: calc(50% - 145px);
    bottom: calc(0px - 55px);
    width: 150px;
    padding: 5px;
    background-color: #0a0a0a;
    border: 1px solid #5F6164;
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
    button {
      width: 100%;
      height: 20px;
      color: #5F6164;
      cursor: pointer;
      transition: .3s;
      &:hover {
        color: $gold;
      }
    }
  }
</style>
