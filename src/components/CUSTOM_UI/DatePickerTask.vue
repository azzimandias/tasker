<script setup lang="ts">
  import type { DateValue } from "@internationalized/date";
  import {
    getLocalTimeZone,
    today,
    parseDate,
  } from "@internationalized/date";
  import { CalendarIcon } from "lucide-vue-next";
  import {computed, ref, watch} from "vue";
  import { Button } from "@/components/ui/button";
  import { Calendar } from "@/components/ui/calendar";
  import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
  import dayjs from 'dayjs';
  import utc from "dayjs/plugin/utc";
  import timezone from "dayjs/plugin/timezone";

  dayjs.extend(utc);
  dayjs.extend(timezone);
  const tz = dayjs.tz.guess();
  const locale = "ru-RU";
  const props = defineProps<({
    deadline: number | null
  })>();
  const emit = defineEmits<{
    (e: 'setDeadline', payload: number | null): void;
  }>();

  const items = [
    { value: 0, label: "Сегодня" },
    { value: 1, label: "Завтра" },
    { value: 3, label: "Через 3 дня" },
    { value: 7, label: "Через неделю" },
  ];

  const deadline = ref<DateValue | undefined>();

  watch(() => props.deadline, (newVal) => {
        if (newVal != null) {
          const isSeconds = newVal < 1e12;
          const d = isSeconds
              ? dayjs.unix(newVal).utc().tz(tz)
              : dayjs(newVal).utc().tz(tz);
          console.log(dayjs.unix(newVal).utc().tz(tz));
          console.log(dayjs(newVal).utc().tz(tz))
          deadline.value = parseDate(d.format("YYYY-MM-DD"));
        } else {
          deadline.value = undefined;
        }
  }, { immediate: true });


  watch(deadline, (newVal) => {
    if (newVal) {
      const jsDate = new Date(newVal.toDate(getLocalTimeZone()));
      emit("setDeadline", dayjs(jsDate).utc().unix());
    } else {
      emit("setDeadline", null);
    }
  });

  const handleQuickSelect = (days: number) => {
    deadline.value = today(getLocalTimeZone()).add({ days });
  };

  const displayLabel = computed(() => {
    if (!deadline.value) return "Выберите дату";
    const jsDate = new Date(deadline.value.toDate(getLocalTimeZone()));
    return dayjs(jsDate).format("DD.MM.YYYY");
  });
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline"
              class='h-[28px] rounded-[5px] justify-start text-left font-normal'
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ displayLabel }}
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
      <Calendar v-model="deadline" :locale="locale" />
    </PopoverContent>
  </Popover>
</template>

<style scoped></style>
