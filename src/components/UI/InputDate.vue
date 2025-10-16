<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css';
import { computed, ref, watch } from "vue";

const emit = defineEmits(['saveChangesDate'])
const props = defineProps({
  id: Number,
  deadline: [String, Date, null],
})

const datePicker = ref(null);
const deadlineModel = ref(props.deadline);

const formatDateSafe = (date) => {
  if (!date) return { iso: null, display: 'Дата' };

  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return { iso: null, display: 'Дата' };

    const iso = d.toISOString().split('T')[0];
    const display = iso.split('-').reverse().join('.');
    return { iso, display };
  } catch {
    return { iso: null, display: 'Дата' };
  }
};

const displayDate = computed(() => {
  return formatDateSafe(deadlineModel.value).display;
});

const handleDateChange = (date) => {
  const { iso } = formatDateSafe(date);
  if (iso) {
    emit('saveChangesDate', iso);
  }
};

watch(() => props.deadline, (newValue) => {
  deadlineModel.value = newValue;
});

const openDatePicker = () => {
  datePicker.value?.firstElementChild?.querySelector('.dp__input')?.click();
};
</script>

<template>
  <div class="lb" @mousedown="openDatePicker" ref="datePicker">
    <VueDatePicker
        v-model="deadlineModel"
        @update:model-value="handleDateChange"
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
      <p class="date">{{ displayDate }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  /*@import "../../assets/styles/global.scss";*/
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
    /*@include theme('color', $smallTextColor);*/
    text-align: right;
    font-size: 12px;
  }
  .date-pic {
    width: 18px;
    height: 18px;
  }
</style>
