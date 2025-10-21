import { InjectionKey, Ref } from "vue";

export interface DialogContext {
    isOpen: Ref<boolean>;

    /**
     * Открыть диалог
     * @param component - компонент Vue, который будет рендериться в диалоге
     * @param props - пропсы, которые передаются этому компоненту
     */
    openDialog: <P = {}>(
        component: any,
        props?: P
    ) => void;

    closeDialog: () => void;
}

export const DIALOG_KEY = Symbol('dialog') as InjectionKey<DialogContext>;
