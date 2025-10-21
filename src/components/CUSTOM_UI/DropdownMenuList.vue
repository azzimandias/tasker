<script setup lang="ts">
  import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from "@/components/ui/dropdown-menu";
  import {CircleEllipsis, Share, Trash} from "lucide-vue-next";
  import {useRoute} from "vue-router";
  const route = useRoute();
  const props = defineProps<({
    listId: number
  })>();
  const emits = defineEmits(['shareList', 'deleteList'])
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button>
        <CircleEllipsis class="circle-ellipsis mr-2 h-5 w-5"
                        :class="{ active: (props.listId && +props.listId === +route.params.id_list) }"
        />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>Действия:</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem @click="emits('shareList')">
          Поделиться <Share />
        </DropdownMenuItem>
        <DropdownMenuItem @click="emits('deleteList')">
          Удалить <Trash />
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>
  .circle-ellipsis {
    color: var(--textColor);
    &.active {
      color: var(--textColorActive);
    }
  }
</style>
