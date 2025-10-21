<script setup lang="ts">
  import type { DateValue } from "@internationalized/date";
  import {
    DateFormatter,
    getLocalTimeZone,
    today,
    parseDate,
  } from "@internationalized/date";
  import { CalendarIcon } from "lucide-vue-next";
  import {ref, watch} from "vue";
  import { Button } from "@/components/ui/button";
  import { Calendar } from "@/components/ui/calendar";
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

  const locale = "ru-RU";
  const props = defineProps({
    deadline: String
  });
  const emit = defineEmits<{
    (e: 'setDeadline', payload: string): void;
  }>();

  const df = new DateFormatter(locale, {
    dateStyle: 'short',
  });

  const items = [
    { value: 0, label: "Сегодня" },
    { value: 1, label: "Завтра" },
    { value: 3, label: "Через 3 дня" },
    { value: 7, label: "Через неделю" },
  ];

  const value = ref<DateValue>();

  watch(() => props.deadline, (newDeadline) => {
    if (newDeadline) {
      try {
        value.value = parseDate(newDeadline);
      } catch (e) {
        console.warn('Invalid date format:', newDeadline);
        value.value = undefined;
      }
    } else {
      value.value = undefined;
    }
  }, { immediate: true });

  watch(value, (newValue) => {
    if (newValue) {
      const year = newValue.year;
      const month = String(newValue.month).padStart(2, '0');
      const day = String(newValue.day).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      emit('setDeadline', dateString);
    } else {
      emit('setDeadline', '');
    }
  });

  const handleQuickSelect = (days: number) => {
    value.value = today(getLocalTimeZone()).add({ days });
  };
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline"
              class='h-[28px] rounded-[5px] justify-start text-left font-normal'
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Выберите дату" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
      <Select @update:model-value="(v) => {
          if (!v) return;
          handleQuickSelect(Number(v));
        }"
      >
        <SelectTrigger>
          <SelectValue placeholder="Когда?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem v-for="item in items" :key="item.value" :value="item.value.toString()">
            {{ item.label }}
          </SelectItem>
        </SelectContent>
      </Select>
      <Calendar v-model="value" :locale="locale" />
    </PopoverContent>
  </Popover>
</template>

<style scoped></style>
