import { defineStore } from 'pinia';
import { ref, reactive, onMounted } from "vue";
import {useListViewStore} from "@/stores/ListViewStore";
import api from '@/api';
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
        await getUserInfo();
        await firstRequest();
        await startIntervalUpdate();
    });

    const getUserInfo = async () => {
        const userInfo = await api.getInfo('user');
        user.id      = userInfo.id;
        user.email   = userInfo.email;
        user.name    = userInfo.name;
        user.surname = userInfo.surname;
    }

    const firstRequest = async () => {
        //console.log('go')
        await getSortListsCount();
        await getPersonalLists();
        await getPersonalTags();
    }
    const startIntervalUpdate =  async () => {
        const startInterval = setInterval(() => {
            //console.log('request');
            //lv.getTasksOrTags();
            getSortListsCount();
            getPersonalLists();
            getPersonalTags();
        },30000);
        setTimeout(() => {
            //console.log('stop');
            clearInterval(startInterval);
        }, 60 * 60000);
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

    let r = [];
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
