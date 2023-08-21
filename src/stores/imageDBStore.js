import { defineStore } from 'pinia';
import {onMounted, reactive, ref} from "vue";
import {useBigMenuStore} from "@/stores/BigMenuStore";
import {useListViewStore} from "@/stores/ListViewStore";
import api from '@/api';

export const useImageDBStore = defineStore('ImageDBStore', () => {
    const sortLists = reactive([
        {
            id: 1,
            name: 'Сегодня',
            count: '',
            color: '#4ceba7',
            url: '/workspace/sortList=today'
        },
        {

            id: 2,
            name: 'С флажком',
            count: '',
            color: '#e76262',
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
            color: '#c4c4c4',
            url: '/workspace/sortList=all'
        },
    ]);
    const personalLists = reactive([]);
    const personalTags = reactive([
        {
            id:0,
            name:'Все теги'
        }
    ]);
    const tasksByList = reactive([]);
    const bm = useBigMenuStore();
    const lv = useListViewStore();

    onMounted(async () => {
        await getPersonalLists();
        getTasksForLists();
    })

    const getPersonalLists = async () => {
        const response = await api.getInfo('http://localhost/lists');
        if ((typeof response) === "object" && response.length > 0) {
            personalLists.length = 0;
            response.forEach(item => {
                personalLists.push(item);
            });
        }
    };

    const getTasksForLists = () => {
        tasksByList.length = 0;
        personalLists.forEach(async list => {
            const response = await api.getInfo(`http://localhost/list?id=${list.id}`);
            if ((typeof response) === "object" && response.length > 0) {
                tasksByList.push({
                    list: response[0],
                    tasks: response[1],
                });
            }
        });
    };

    /*const addNewTask = () => {
        tasksByList.forEach((tbl) => {
            if (lv.listInfo.id  === tbl.list.id) {
                tbl.tasks.push({
                    id_list: tbl.list.id,
                    name: null,
                    description: null,
                    deadline: null,
                    is_done: 0,
                    is_flagged: 0,
                    url: null,
                    priority: null,
                });
            }
        });
    };*/

    return {
        personalLists,
        tasksByList,
       // addNewTask
    };
});
