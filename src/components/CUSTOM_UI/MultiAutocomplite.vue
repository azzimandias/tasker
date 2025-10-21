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

const foundedUsers = [
  { label: "dexterMorgan",    value: 1 },
  { label: "arturClark",      value: 2 },
  { label: "nikClick",        value: 3 },
  { label: "popSocket",       value: 4 },
  { label: "donSimon",        value: 5 },
  { label: "test",            value: 6 },
  { label: "packMe",          value: 7 },
  { label: "packMen",         value: 8 },
  { label: "kungLao",         value: 9 },
] as const;
</script>

<template>
  <Combobox by="label">
    <ComboboxAnchor>
      <div class="relative max-w-sm items-center w-[300px]">
        <ComboboxInput :display-value="(val) => val?.label ?? ''"
                       placeholder="Логин пользователя..."
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
            :key="user.value"
            :value="user"
            @select="() => {console.log('select user_id', user.value)}"
        >
          {{ user.label }}

          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>