<script setup lang="ts">
  import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
  import {ref, watch} from "vue";
  import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
  import {Button} from "@/components/ui/button";

  const props = defineProps({
    color: String
  });

  const emit = defineEmits<{
    (e: 'setColor', payload: string): void;
  }>();

  const color = ref(props.color || '');

  watch(() => props.color, (newVal) => {
    color.value = newVal || '';
  });

  watch(color, (newVal) => {
    emit('setColor', newVal);
  });
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline"
              :style="{backgroundColor: color}"
      ></Button>
    </PopoverTrigger>
    <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
      <Vue3ColorPicker v-model="color"
                       mode="solid"
                       :showColorList="true"
                       :showEyeDrop="true"
                       type="RGBA"
                       theme="dark"
      />
    </PopoverContent>
  </Popover>
</template>

<style scoped></style>
