import { defineStore } from 'pinia';
import { ref, reactive, onMounted } from "vue";
import {useListViewStore} from "@/stores/ListViewStore";
export const useBigMenuStore = defineStore('bigMenuStore', () => {
    const sortLists = reactive([
        {
            id: 1,
            name: 'Сегодня',
            count: '',
            color: 'gray',
            url: '/workspace/sortList=today'
        },
        {

            id: 2,
            name: 'С флажком',
            count: '',
            color: '#be5252',
            url: '/workspace/sortList=with_flag'
        },
        {

            id: 3,
            name: 'Завершено',
            count: '',
            color: '#daadad',
            url: '/workspace/sortList=done'
        },
        {

            id: 4,
            name: 'Все',
            count: '',
            color: '#a66f0a',
            url: '/workspace/sortList=all'
        },
    ]);
    const personalLists = reactive([
        {
            id: 1,
            name: '',
            count_of_active_tasks: '—',
            color: 'grey'
        },
        {
            id: 2,
            name: '',
            count_of_active_tasks: '—',
            color: 'grey'
        },
        {

            id: 3,
            name: '',
            count_of_active_tasks: '—',
            color: 'grey'
        }
    ]);
    const personalTags = reactive([
        {
            id:0,
            name:'Все теги'
        }
    ]);
    const lv = useListViewStore();
    const is_load_sortLists = ref(false);
    const is_load_personalLists = ref(false);
    const is_load_personalTags = ref(false);
    onMounted(async () => {
        await firstRequest();
        await startIntervalUpdate();
    });
    const firstRequest = async () => {
        await getSortListsCount();
        await getPersonalLists();
        await getPersonalTags();
    }
    const startIntervalUpdate =  async () => {
        const startInterval = setInterval(() => {
            console.log('request');
            lv.getTasksOrTags();
            getSortListsCount();
            getPersonalLists();
            getPersonalTags();
        },60000);
        setTimeout(() => {
            console.log('stop');
            clearInterval(startInterval);
        }, 60 * 60000);
    }
    const getSortListsCount = async () => {
        try {
            is_load_sortLists.value = true;
            const response = await fetch('http://localhost/sortLists');
            const arr = await response.json();
            if ((typeof arr) === "object") {
                arr.forEach(item => {
                    sortLists[item.id-1].count = item.count;
                });
                is_load_sortLists.value = false;
            }
        } catch (e) {
            console.log(e);
        }
    }

    const getPersonalLists = async () => {
        try {
            is_load_personalLists.value = true;
            const response = await fetch('http://localhost/lists');
            const arr = await response.json();
            if ((typeof arr) === "object" && arr.length > 0) {
                personalLists.length = 0;
                arr.forEach(item => {
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
            const response = await fetch('http://localhost/tags');
            const arr = await response.json();
            if ((typeof arr) === "object" && arr.length > 0) {
                personalTags.length = 0;
                personalTags.push({ id:0, name:'Все теги' });
                arr.forEach(item => {
                    personalTags.push(item);
                });
                is_load_personalTags.value = false;
            }
        } catch (e) {
            console.log(e);
        }
    }

    return {
        sortLists, is_load_sortLists,
        personalLists, is_load_personalLists,
        personalTags, is_load_personalTags,
    };
});
