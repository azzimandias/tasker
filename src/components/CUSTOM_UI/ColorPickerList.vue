<script setup lang="ts">
  import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
  import { PipetteIcon } from "lucide-vue-next";
  import {onMounted, ref, watch} from "vue";
  import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
  import {Button} from "@/components/ui/button";
  import router from "@/router";
  const props = defineProps({
    color: String
  });
  const emit = defineEmits<{
    (e: 'setColor', payload: string): void;
  }>();
  const color = ref(props.color || '');
  const theme = ref<'dark' | 'light'>('light');

  onMounted(() => {
    const isDark = document.documentElement.classList.contains('dark');
    theme.value = isDark ? 'dark' : 'light';

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      theme.value = e.matches ? 'dark' : 'light';
    };
    media.addEventListener('change', handler);
  });

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
      >
        <PipetteIcon class="pipette mr-2 h-4 w-4 font-normal"/>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="flex w-auto flex-col gap-y-2 p-2">
      <Vue3ColorPicker v-model="color"
                       mode="solid"
                       :showColorList="true"
                       :showEyeDrop="true"
                       type="RGBA"
                       :theme="theme"
      />
    </PopoverContent>
  </Popover>
</template>

<style scoped>
  .pipette {
    color: var(--textColor);
  }
</style>
