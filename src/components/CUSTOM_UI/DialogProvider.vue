<script setup lang="ts">
  import { ref, shallowRef, markRaw, provide } from 'vue';
  import { Dialog, DialogContent } from '@/components/ui/dialog';
  import { DIALOG_KEY, DialogContext } from '@/types/dialog';

  const dialogContent = ref<any>(null);
  const dialogProps = ref<Record<string, any>>({});

  const isOpen = ref(false);

  const openDialog = <P = {}>(component: any, props?: P) => {
    if (!component) {
      dialogContent.value = null;
      dialogProps.value = {};
    } else {
      dialogContent.value = markRaw(component);
      dialogProps.value = props || {};
    }
    isOpen.value = true;
  };


  const closeDialog = () => {
    isOpen.value = false
    dialogContent.value = null
  };

  const dialogContext: DialogContext = {
    isOpen,
    openDialog,
    closeDialog,
  };

  provide(DIALOG_KEY, dialogContext);
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <component
          v-if="dialogContent && typeof dialogContent === 'object' && 'setup' in dialogContent"
          :is="dialogContent"
          v-bind="dialogProps"
          @closeDialog="closeDialog"
      />

      <template v-else>
        <slot name="content" :content="dialogContent" />
      </template>
    </DialogContent>
  </Dialog>

  <slot />
</template>

<style scoped></style>
