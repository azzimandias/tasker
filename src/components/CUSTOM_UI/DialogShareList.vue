<script setup lang="ts">
  import {Button} from '@/components/ui/button';
  import {ListsItem} from '@/types/bigMenu'
  import {
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  import {Badge} from "@/components/ui/badge";
  import MultiAutocomplite from "@/components/CUSTOM_UI/MultiAutocomplite.vue";
  const props = defineProps<({
    list: ListsItem
  })>();
  const emits = defineEmits(['onConfirm','closeDialog'])
</script>

<template>
  <DialogHeader>
    <DialogTitle>Вы хотите поделиться списком <Badge>{{ props.list.name }}</Badge></DialogTitle>
    <DialogDescription>Выберите пользователя, чтобы вместе улучшать свою продуктивность!</DialogDescription>
  </DialogHeader>
    <MultiAutocomplite :options="[]" :model-value="[]" />
  <DialogFooter>
    <Button @click="emits('onConfirm')">OK</button>
    <Button @click="emits('closeDialog')">Отмена</button>
  </DialogFooter>
</template>

<style scoped></style>
