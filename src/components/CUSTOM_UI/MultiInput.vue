<script setup lang="ts">
  import {
    TagsInput,
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText
  } from "@/components/ui/tags-input";
  import {
    Combobox,
    ComboboxList,
    ComboboxAnchor,
    ComboboxInput,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxItem
  } from "@/components/ui/combobox";
  import {ref, watch} from "vue";

  type FoundedUser = {
    value: number;
    label: string;
  };
  const props = defineProps({
    isOpen:        { type: Boolean, required: true },
    selectedUser:  { type: Object as () => FoundedUser, required: true, default: () => ({ value: 0, label: '' }) },
    selectedUsers: { type: Array as () => FoundedUser[], required: true },
    foundedUsers:  { type: Array as () => FoundedUser[], required: true },
  });
  const emits = defineEmits<{
    (e: 'updateFoundedUsers',    payload: string): void;
    (e: 'addUser',               payload: FoundedUser): void;
    (e: 'removeUser',            payload: FoundedUser): void;
  }>();
  const selectedUser =  ref<FoundedUser | null>(null);
  const searchSrt = ref("");
  watch(searchSrt, (newVal) => {
    emits('updateFoundedUsers', newVal);
  });
</script>

<template>
  <Combobox v-model="selectedUser"
            v-model:open="props.isOpen"
            :ignore-filter="true"
  >
    <ComboboxAnchor as-child>
      <TagsInput v-model="props.selectedUsers" class="px-2 gap-2 w-[100%]">
        <div class="flex gap-2 flex-wrap items-center">
          <TagsInputItem v-for="user in props.selectedUsers"
                         :key="`user-${user.label}`"
                         :value="user.label"
                         class="p-2 rounded-sm"
          >
            <TagsInputItemText>{{ user.label }}</TagsInputItemText>
            <TagsInputItemDelete @click="emits('removeUser', user)"/>
          </TagsInputItem>
        </div>

        <ComboboxInput v-model="searchSrt" as-child>
          <TagsInputInput placeholder="Введите логин пользователя..."
                          class="min-w-[200px] w-full p-0 border-none focus-visible:ring-0 h-auto"
                          @keydown.enter.prevent
          />
        </ComboboxInput>
      </TagsInput>
    </ComboboxAnchor>

    <ComboboxList v-if="props.isOpen"
                  class="z-[9999] border rounded shadow-md mt-1 max-h-60 overflow-auto"
    >
      <ComboboxEmpty v-if="!props.foundedUsers.length">
        Пользователь не найден
      </ComboboxEmpty>

      <ComboboxGroup v-else>
        <ComboboxItem v-for="foundedUser in props.foundedUsers"
                      :key="foundedUser.value"
                      :value="foundedUser"
                      @click.prevent="emits('addUser', foundedUser)"
                      class="cursor-pointer px-3 py-2 hover:bg-gray-100"
        >
          {{ foundedUser.label }}
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<style scoped></style>
