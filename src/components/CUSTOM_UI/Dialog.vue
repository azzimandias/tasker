<script setup lang="ts">
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
  } from "@/components/ui/dialog";
  import { ref, provide } from 'vue'
  import {DIALOG_KEY, DialogContext} from '@/types/dialog'

  const isOpen = ref(false)
  const dialogContent = ref()

  const openDialog = (content?: any) => {
    if (content) {
      dialogContent.value = content
    }
    isOpen.value = true
  }

  const closeDialog = () => {
    isOpen.value = false
    dialogContent.value = null
  }

  const dialogContext: DialogContext = {
    isOpen,
    openDialog,
    closeDialog
  }

  provide(DIALOG_KEY, dialogContext)
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <slot name="content" :content="dialogContent" />
    </DialogContent>
  </Dialog>

  <slot />
</template>

<style scoped></style>
