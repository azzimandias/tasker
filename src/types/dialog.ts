import {InjectionKey, Ref} from "vue";

export interface DialogContext {
    isOpen: Ref<boolean>
    openDialog: (content?: any) => void
    closeDialog: () => void
}

export const DIALOG_KEY = Symbol('dialog') as InjectionKey<DialogContext>