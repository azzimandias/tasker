import { defineStore } from 'pinia';
import {ref, reactive, onMounted, onUnmounted} from "vue";
import {useListViewStore} from "@/stores/ListViewStore";
import api from '@/api';
import socket from "@/plugins/socket";

export const useBigMenuStore = defineStore('bigMenuStore', () => {
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
    const personalLists = reactive([]);
    const personalTags = reactive([
        {
            id:   0,
            name: 'Все теги'
        }
    ]);
    const lv = useListViewStore();
    const is_load_sortLists     = ref(false);
    const is_load_personalLists = ref(false);
    const is_load_personalTags  = ref(false);

    onMounted(async () => {
        await connectSocket();
        await getUserInfo();
        await firstRequest();
    });

    onUnmounted(() => {
        socket.disconnect();
    });

    const connectSocket = async () => {
        socket.connect();
        socket.emit('subscribe', 'bigMenuStore');
        socket.on('new_sort_lists_count', (new_sort_lists_count) => {
            console.log('New sort_lists_count:', new_sort_lists_count);
            updSortListsCount(new_sort_lists_count);
        });
        socket.on('new_personal_lists_count', (new_personal_lists) => {
            console.log('New personal_lists:', new_personal_lists);
            updSocketPersonalLists(new_personal_lists);
        });
        socket.on('new_personal_tags', (new_personal_tags) => {
            console.log('New personal_tags:', new_personal_tags);
            updSocketPersonalTags(new_personal_tags);
        });
    }

    const getUserInfo = async () => {
        const userInfo = await api.getInfo('user');
        user.id      = userInfo.id;
        user.email   = userInfo.email;
        user.name    = userInfo.name;
        user.surname = userInfo.surname;
    }

    const firstRequest = async () => {
        await getSortListsCount();
        await getPersonalLists();
        await getPersonalTags();
    }

    const getSortListsCount = async () => {
        is_load_sortLists.value = true;
        const response = await api.getInfoWithArgs('sortLists', {
            params: {
                user_id: user.id
            }
        });
        if ((typeof response) === "object") {
            response.forEach(item => {
                if (item.count >= 100) {
                    sortLists[item.id-1].count = '+99';
                } else {
                    sortLists[item.id-1].count = item.count;
                }
            });
            is_load_sortLists.value = false;
        }
    }

    const updSortListsCount = (newSortListsCount) => {
        if ((typeof newSortListsCount) === "object") {
            is_load_sortLists.value = true;
            newSortListsCount.forEach(item => {
                if (item.count >= 100) {
                    sortLists[item.id-1].count = '+99';
                } else {
                    sortLists[item.id-1].count = item.count;
                }
            });
            is_load_sortLists.value = false;
        }
    }

    const getPersonalLists = async () => {
        try {
            is_load_personalLists.value = true;
            const response = await api.getInfoWithArgs('lists', {
                params: {
                    user_id: user.id
                }
            });
            if ((typeof response) === "object" && response.length > 0) {
                personalLists.length = 0;
                response.forEach(item => {
                    item.key = Math.random();
                    personalLists.push(item);
                });
                is_load_personalLists.value = false;
            }
        } catch (e) {
            console.log(e);
        }
    }

    const updSocketPersonalLists = (newPersonalLists) => {
        if ((typeof newPersonalLists) === "object" && newPersonalLists.length > 0) {
            console.log('start');
            is_load_personalLists.value = true;
            personalLists.length = 0;
            newPersonalLists.forEach(item => {
                item.key = Math.random();
                personalLists.push(item);
            });
            is_load_personalLists.value = false;
        }
    }

    const getPersonalTags = async () => {
        try {
            is_load_personalTags.value = true;
            const response = await api.getInfoWithArgs('tags', {
                params: {
                    user_id: user.id
                }
            });
            if ((typeof response) === "object" && response.length > 0) {
                personalTags.length = 0;
                personalTags.push({ id:0, name:'Все теги' });
                response.forEach(item => {
                    item.key = Math.random();
                    personalTags.push(item);
                });
                is_load_personalTags.value = false;
                //console.log(personalTags)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const updSocketPersonalTags = (newPersonalTags) => {
        if ((typeof newPersonalTags) === "object" && newPersonalTags.length > 0) {
            personalTags.length = 0;
            personalTags.push({ id:0, name:'Все теги' });
            newPersonalTags.forEach(item => {
                item.key = Math.random();
                personalTags.push(item);
            });
            is_load_personalTags.value = false;
        }
    }

    const addNewList = (list) => {
        personalLists.push(list);
    };

    const saveList = async (list) => {
        await api.saveList(list);
        await firstRequest();
    };

    const deleteList = async (listId) => {
        await api.deleteList(listId);
        await firstRequest();
    };

    return {
        sortLists, is_load_sortLists,
        personalLists, is_load_personalLists,
        personalTags, is_load_personalTags, user,
        firstRequest, addNewList, saveList, deleteList, getUserInfo
    };
});
