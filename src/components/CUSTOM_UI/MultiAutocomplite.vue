<script setup lang="ts">
  import { Check, ChevronsUpDown } from "lucide-vue-next"
  import { cn } from "@/lib/utils"
  import { Combobox,
    ComboboxAnchor,
    ComboboxEmpty,
    ComboboxGroup,
    ComboboxInput,
    ComboboxItem,
    ComboboxItemIndicator,
    ComboboxList,
    ComboboxTrigger
  } from "@/components/ui/combobox";
  import {useListViewStore} from "@/stores/ListViewStore";
  import {ref, watch} from "vue";

  const listInfo = useListViewStore();

  const foundedUsers = ref<any[]>([]);

  const searchSrt = ref('');

  let timeout: number | undefined;

  watch(searchSrt, (newVal) => {
    clearTimeout(timeout);

    if (!newVal) {
      foundedUsers.value = [];
      return;
    }

    timeout = window.setTimeout(async () => {
      try {
        const res = await listInfo.findMatchUsers(newVal);
        foundedUsers.value = Array.isArray(res) ? res : res.data ?? [];
      } catch (e) {
        console.error('Ошибка при поиске пользователей', e);
        foundedUsers.value = [];
      }
    }, 400)
  });
</script>

<template>
  <Combobox by="label" class="w-[100%]">
    <ComboboxAnchor class="w-[100%]">
      <div class="relative max-w-sm items-center w-[100%]">
        <ComboboxInput :display-value="(val) => val?.label ?? ''"
                       class="w-[100%]"
                       placeholder="Логин пользователя..."
                       v-model="searchSrt"
        />
        <ComboboxTrigger class="absolute end-0 inset-y-0 flex items-center justify-center px-3">
          <ChevronsUpDown class="size-4 text-muted-foreground" />
        </ComboboxTrigger>
      </div>
    </ComboboxAnchor>

    <ComboboxList>
      <ComboboxEmpty>
        Пользователь не найден.
      </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem
            v-for="user in foundedUsers"
            :key="user?.value"
            :value="user"
            @select="() => {console.log('select user_id', user?.value)}"
        >
          {{ user?.label }}

          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>

<style scoped></style>
