<script setup>
  import VueDatePicker from "@vuepic/vue-datepicker";
  import '@vuepic/vue-datepicker/dist/main.css';
  import {ref, watch} from "vue";
  import {useListViewStore} from "@/stores/ListViewStore";

  const listView = useListViewStore();
  const emit = defineEmits(['saveChangesDate'])
  const props = defineProps({
    id: Number,
    deadline: String,
  })
  const datePicker = ref(null);
  const deadline = ref();
  const deadlineModel = ref(props.deadline);

  watch(() => props.deadline, (newValue) => {
        deadlineModel.value = newValue;
      }
  );

  watch(deadlineModel, (newDeadlineModel) => {
    transitDate(newDeadlineModel);
  })

  const openDatePicker = () => {
    const node = datePicker.value.firstElementChild;
    node.querySelector('.dp__input').click();
  };
  const transitDate = (date) => {
    const timestamp = Date.parse(date);
    deadline.value = ("" + (new Date(timestamp)).toISOString()).replace(/^([^T]+)T(.+)$/,'$1');
    if (props.deadline !== deadline.value) saveChangesDate();
    return ("" + (new Date(timestamp)).toISOString()).replace(/^([^T]+)T(.+)$/,'$1').replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1');
  };
  const saveChangesDate = () => {
    emit('saveChangesDate', deadline.value);
  };
</script>

<template>
  <div class="lb" @mousedown="openDatePicker" ref="datePicker">
    <VueDatePicker
        v-model="deadlineModel"
        :dark="true"
        :position="'center'"
        :teleport="true"
        :locale="'ru'"
        :format="'yyyy-MM-dd'"
        :close-on-scroll="true"
        :placeholder="'Дата'"
        :text-input="true"
    />
    <div class="date__wrapper">
      <img class="date-pic" src="../../assets/svgs/calendar.svg" alt="calendar">
      <p class="date" v-if="deadlineModel">{{ transitDate(deadlineModel) }}</p>
      <p class="date" v-else>Дата</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .lb {
    width: 100px;
    height: 28px;
    background-color: rgba(73, 75, 78, 0.3);
    border-radius: 5px;
    overflow: hidden;
    padding: 0 1px 1px 1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .dp__main {
      opacity: 0;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: circle(1%);
    }
  }
  .date__wrapper {
    width: 100%;
    height: 100%;
    padding: 0 5px 0 2px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .date {
    width: 100%;
    @include theme('color', $smallTextColor);
    text-align: right;
    font-size: 12px;
  }
  .date-pic {
    width: 18px;
    height: 18px;
  }
</style>