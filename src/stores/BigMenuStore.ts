import { defineStore } from 'pinia';
import {ref, reactive, onUnmounted} from "vue";
import api from '@/api';
import socket from "@/plugins/socket";
import {v4 as uuidv4} from "uuid";

export const useBigMenuStore = defineStore('bigMenuStore', () => {
    type User = {
        id:      number,
        email:   string,
        name:    string,
        surname: string,
    };

    type SocketSortListsCountRequest = {
        uuid: string,
        message: MessageItem[]
    };
    type MessageItem = {
        id: number;
        count: number;
    };

    type SocketListsRequest = {
        uuid: string,
        message: ListsItem[]
    };
    type ListsItem = {
        key: number | null,
        id: number | null,
        name: string,
        count_of_active_tasks: number,
        color: string | null,
        created_at: string | null,
        updated_at: string | null,
        deleted_at: string | null,
        owner_id: number | null
    };

    type SocketTagsRequest = {
        uuid: string,
        message: TagItem[]
    };
    type TagItem = {
        key: null | number,
        id: number,
        name: string,
        created_at: string,
        updated_at: string | null,
        deleted_at: string | null,
        pivot: {
            user_id: string,
            tag_id: string
        }
    };


    const user = reactive({
        id:      0,
        email:   '',
        name:    '',
        surname: '',
    });
    const sortLists = reactive([
        {
            id:    1,
            name:  'Сегодня',
            count: '',
            color: '#4ceba7',
            url:   '/workspace/sortList=today'
        },
        {
            id:    2,
            name:  'С флажком',
            count: '',
            color: '#e76262',
            url:   '/workspace/sortList=with_flag'
        },
        {
            id:    3,
            name:  'Завершено',
            count: '',
            color: '#daadad',
            url:   '/workspace/sortList=done'
        },
        {
            id:    4,
            name:  'Все',
            count: '',
            color: '#c4c4c4',
            url:   '/workspace/sortList=all'
        },
    ]);
    const personalLists = reactive<ListsItem[]>([]);
    const personalTags = reactive([
        {
            id:   0,
            name: 'Все теги'
        }
    ]);
    const is_load_sortLists     = ref(false);
    const is_load_personalLists = ref(false);
    const is_load_personalTags  = ref(false);
    let socketUUID: string = uuidv4();

    onUnmounted(() => {
        socket.disconnect();
    });

    const clearAll = () => {
        user.id = 0;
        user.email = '';
        user.name = '';
        user.surname = '';
        sortLists.forEach((list, idx) => {
            list.count = '';
            sortLists[idx] = list;
        });
        personalLists.length = 0;
        personalTags.length = 0;
        personalTags.push({
            id:   0,
            name: 'Все теги'
        });
        is_load_sortLists.value = false;
        is_load_personalLists.value = false;
        is_load_personalTags.value = false;
        socketUUID = uuidv4();
    };
    const setUserInfo = (userInfo: User) => {
        user.id      = userInfo.id;
        user.email   = userInfo.email;
        user.name    = userInfo.name;
        user.surname = userInfo.surname;
        initialize().then();
    };
    const initialize = async () => {
        await connectSocket();
        await firstRequest();
    };
    const connectSocket = async () => {
        try {
            socket.connect();
            socket.emit('subscribe', 'bigMenuStore');
            socket.on('send_new_sort_lists_count', (new_sort_lists_count: SocketSortListsCountRequest) => {
                if (new_sort_lists_count.uuid !== socketUUID) {
                    updSortListsCount(new_sort_lists_count.message);
                }
            });
            socket.on('send_new_personal_lists_count', (new_personal_lists: SocketListsRequest) => {
                if (new_personal_lists.uuid !== socketUUID) {
                    updSocketPersonalLists(new_personal_lists.message);
                }
            });
            socket.on('send_new_personal_tags', (new_personal_tags: SocketTagsRequest) => {
                if (new_personal_tags.uuid !== socketUUID) {
                    updSocketPersonalTags(new_personal_tags.message);
                }
            });
        } catch (e) {
            console.log(e);
            setTimeout(() => {
                connectSocket();
            }, 1000);
        }
    };
    const firstRequest = async () => {
        await getSortListsCount();
        await getPersonalLists();
        await getPersonalTags();
    };
    const getSortListsCount = async () => {
        is_load_sortLists.value = true;
        const response = await api.getInfoWithArgs('sortLists', {
            params: {
                user_id: user.id,
                uuid: socketUUID
            }
        });
        if ((typeof response) === "object") {
            response.forEach((item: { id: number, count: number }) => {
                sortLists[item.id - 1].count = item.count >= 100 ? '+99' : item.count.toString();
            });
            is_load_sortLists.value = false;
        }
    };
    const updSortListsCount = (newSortListsCount: MessageItem[]) => {
        if ((typeof newSortListsCount) === "object") {
            is_load_sortLists.value = true;
            newSortListsCount.forEach(item => {
                sortLists[item.id-1].count = item.count >= 100 ? '+99' : item.count.toString();
            });
            is_load_sortLists.value = false;
        }
    };
    const getPersonalLists = async () => {
        try {
            is_load_personalLists.value = true;
            const response = await api.getInfoWithArgs('lists', {
                params: {
                    user_id: user.id,
                    uuid: socketUUID
                }
            });
            if ((typeof response) === "object" && response.length > 0) {
                personalLists.length = 0;
                response.forEach((item: ListsItem) => {
                    item.key = Math.random();
                    personalLists.push(item);
                });
            }
            is_load_personalLists.value = false;
        } catch (e) {
            console.log(e);
        }
    };
    const updSocketPersonalLists = (newPersonalLists: ListsItem[]) => {
        if ((typeof newPersonalLists) === "object" && newPersonalLists.length > 0) {
            is_load_personalLists.value = true;
            personalLists.length = 0;
            newPersonalLists.forEach(item => {
                item.key = Math.random();
                personalLists.push(item);
            });
            is_load_personalLists.value = false;
        }
    };
    const getPersonalTags = async () => {
        try {
            is_load_personalTags.value = true;
            const response = await api.getInfoWithArgs(`tags/${user.id}`, {
                params: {
                    user_id: user.id,
                    uuid: socketUUID
                }
            });
            if ((typeof response) === "object" && response.length > 0) {
                personalTags.length = 0;
                personalTags.push({ id:0, name:'Все теги' });
                response.forEach((item: TagItem) => {
                    item.key = Math.random();
                    personalTags.push(item);
                });
            }
            is_load_personalTags.value = false;
        } catch (e) {
            console.log(e);
        }
    };
    const updSocketPersonalTags = (newPersonalTags: TagItem[]) => {
        if ((typeof newPersonalTags) === "object" && newPersonalTags.length > 0) {
            personalTags.length = 0;
            personalTags.push({ id:0, name:'Все теги' });
            newPersonalTags.forEach(item => {
                item.key = Math.random();
                personalTags.push(item);
            });
            is_load_personalTags.value = false;
        }
    };
    const addNewList = (list: ListsItem) => {
        personalLists.push(list);
    };
    const saveList = async (list: ListsItem) => {
        await api.saveList(list);
        await firstRequest();
    };
    const deleteList = async (listId: number) => {
        await api.deleteList(listId);
        await firstRequest();
    };
    return {
        sortLists, is_load_sortLists,
        personalLists, is_load_personalLists,
        personalTags, is_load_personalTags, user,
        clearAll, setUserInfo, firstRequest, addNewList, saveList, deleteList,
    };
});
