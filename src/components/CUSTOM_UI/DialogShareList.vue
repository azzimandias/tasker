<script setup lang="ts">
  import {Button} from '@/components/ui/button';
  import {ListsItem} from '@/types/bigMenu';
  import {
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
  import {Badge} from "@/components/ui/badge";
  import MultiInput from "@/components/CUSTOM_UI/MultiInput.vue";
  import { useListViewStore } from "@/stores/ListViewStore";
  import {ref} from "vue";

  const props = defineProps<({
    list: ListsItem
  })>();
  const emit = defineEmits<({
    (e: 'closeDialog'): void;
  })>();

  const listInfo = useListViewStore();
  type FoundedUser = {
    value: number;
    label: string;
  };
  const selectedUsers = ref<FoundedUser[]>([]);
  const foundedUsers = ref<FoundedUser[]>([]);
  const isOpen = ref(false);
  const selectedUser = ref<FoundedUser | null>(null);
  let timeout: number | undefined;

  const updateFoundedUsers = (searchStr: string) => {
    clearTimeout(timeout);
    if (!searchStr) {
      foundedUsers.value = [];
      isOpen.value = false;
      return;
    }
    timeout = window.setTimeout(async () => {
      try {
        const res = await listInfo.findMatchUsers(searchStr);
        foundedUsers.value = Array.isArray(res) ? res : res.data ?? [];
        isOpen.value = foundedUsers.value.length > 0;
      } catch (e) {
        console.error("Ошибка при поиске пользователей", e);
        foundedUsers.value = [];
        isOpen.value = false;
      }
    }, 400);
  };
  const addUser = (user: FoundedUser) => {
    if (!selectedUsers.value.some((u) => u.value === user.value)) {
      selectedUsers.value.push(user);
    }
    foundedUsers.value = [];
    isOpen.value = false;
  };
  const removeUser = (user: FoundedUser) => {
    const index = selectedUsers.value.findIndex(u => u.value === user.value);
    if (index !== -1) {
      selectedUsers.value.splice(index, 1);
    }
  };
  const createMembershipLists = () => {
    listInfo.createMembershipLists(props.list, selectedUsers);
    emit('closeDialog');
  };
</script>

<template>
  <DialogHeader>
    <DialogTitle>Вы хотите поделиться списком <Badge class="rounded-sm">{{ props.list.name }}</Badge></DialogTitle>
    <DialogDescription>Выберите пользователя, чтобы вместе улучшать свою продуктивность!</DialogDescription>
  </DialogHeader>     <!-- selectedUser для combobox --> <!-- selectedUsers для TagsInput -->
        <MultiInput :isOpen="isOpen"
                    :selectedUser="selectedUser ?? { value: 0, label: '' }"
                    :selectedUsers="selectedUsers"
                    :foundedUsers="foundedUsers"
                    @updateFoundedUsers="updateFoundedUsers"
                    @addUser="addUser"
                    @removeUser="removeUser"
        />
  <DialogFooter>
    <Button class="ok-button"
            @click="createMembershipLists"
    >OK</button>
    <Button class="cancel-button"
            @click="emit('closeDialog')"
    >Отмена</button>
  </DialogFooter>
</template>

<style scoped>
.ok-button {
  background-color: var(--gold);
}
.cancel-button {
  background-color: var(--textColor);
}
</style>
