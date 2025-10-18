<script setup lang="ts">
  import {useRoute, useRouter} from 'vue-router';
  /*import InfoList from "@/components/MY_UI/InfoList.vue";*/
  import {useBigMenuStore} from "@/stores/BigMenuStore";
  import {inject, Ref, ref} from "vue";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuShortcut,
    DropdownMenuGroup,
  } from '@/components/ui/dropdown-menu';
  import DialogProvider from '@/components/CUSTOM_UI/DialogProvider.vue'
  import { DIALOG_KEY, type DialogContext } from '@/types/dialog';
  import {ListsItem} from "@/types/bigMenu";

  const dialog = inject<DialogContext>(DIALOG_KEY);
  if (!dialog) throw new Error("DialogProvider is missing");

  const isOpenBigMenu = inject<Ref<boolean>>('isOpenBigMenu');
  const bigMenu = useBigMenuStore();
  /*const props = defineProps({
    list: Object,
  });*/
  const props = defineProps<{
    list: ListsItem
  }>();
  const route = useRoute();
  const router = useRouter();

  const infoList = ref<HTMLElement | null>(null);

  const openList = (e: MouseEvent) => {
    if (infoList.value && !infoList.value.contains(e.target as Node)) {
      if (isOpenBigMenu && document.documentElement.clientWidth <= 700) {
        isOpenBigMenu.value = false;
      }
      router.push({ name: 'list', params: { id_list: props.list.id } });
    }
  };

  const shareList = () => {
    console.log('share list');
    dialog?.openDialog({});
  };

  const deleteList = () => {
    if (props.list.id) {
      bigMenu.deleteList(props.list.id);
      if (+props.list.id === +route.params.id_list) {
        router.push({ name: 'intro' });
      }
    }
  };
</script>

<template>
      <div class="personal-list"
           :class="{ active: (props.list.id && +props.list.id === +route.params.id_list), minimized: !isOpenBigMenu }"
           @mouseup="openList"
      >
          <div class="personal-list__circle" :key="Math.random()" :style="{ backgroundColor: props.list.color ?? '#fff' }"></div>
          <div class="personal-list__label"><slot name="name"></slot></div>
          <div class="info-list__wrapper" ref="infoList">
  <!--          <InfoList
                :idList="props.list.id"
                @share="shareList"
                @delete="deleteList"
            />-->
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <div class="info-list"
                     :class="{ active: (props.list.id && +props.list.id === +route.params.id_list) }"
                ></div>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-56">
                <DropdownMenuLabel>Действия:</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem @click="shareList">
                    <span>Поделиться</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="deleteList">
                    <span>Удалить</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div class="personal-list__count"><slot name="count"></slot></div>
      </div>
</template>

<style scoped>
    .personal-list {
        display: flex;
        align-items: center;
        padding: 6px 15px 6px 6px;
        border-radius: 5px;
        cursor: pointer;
        transition: .3s;
        &.active {
          background-color: var(--gold);
          .personal-list__circle { box-shadow: 0 0 6px #26282B; }
          .personal-list__count, .personal-list__label { color: var(--textColorActive); }
        }
        &.minimized {
          width: 40px;
          height: 40px;
          padding: 5px;
          .personal-list__label { display: none; }
          .personal-list__count { display: none; }
          .info-list__wrapper { display: none; }
        }
    }
    .personal-list__circle {
        background-color: grey;
        border-radius: 90px;
        width: 28px;
        height: 28px;
        transition: .3s;
    }
    .personal-list__label {
        margin-left: 8px;
        font-size: 14px;
      color: var(--textColor);
        flex-grow: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 176px;
    }
    .personal-list__count {
        width: 26px;
        max-width: 26px;
        font-size: 14px;
        font-weight: 600;
        text-align: right;
      color: var(--textColor);
        transition: .3s;
    }
    .info-list {
      flex: 0 0 20px;
      width: 20px;
      height: 20px;
      background-position: center;
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-image: url("@/assets/svgs/info.svg");
      &.active { background-image: url("@/assets/svgs/info_invert.svg"); }
      cursor: pointer;
      transition: 0.3s;
    }
</style>
