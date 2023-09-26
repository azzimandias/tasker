import { defineStore } from 'pinia';
import {ref, reactive, onMounted, watchEffect} from "vue";
import {useRoute} from "vue-router";
import api from "@/api";
import {useBigMenuStore} from "@/stores/BigMenuStore";

export const useListViewStore = defineStore('listViewStore', () => {
    const currentTasks = reactive([]);
    const currentListInfo = reactive({
        id: '',
        name: '',
        color: '',
    });
    const currentSortListInfo = reactive({
        id: 0,
        name: '',
        color: '',
    });
    const tags = reactive([]);
    const tag_name = ref('');
    const loading = ref(true);
    const loadingSmall = ref(true);
    const is_somethingWrong = ref(false);
    const request = ref('');
    const route = useRoute();
    const currentPath = ref(route.path);
    const bigMenu = useBigMenuStore();

    onMounted(async () => {
        await getTasksOrTags();
        const interval = setInterval(() => {
            if(String(currentPath.value) !== String(route.path)) {
                loading.value = true;
                getTasksOrTags();
            }
        }, 0)
    });

    const getTasksOrTags = async () => {
        loadingSmall.value = true;
        currentPath.value = route.path;
        try {
            is_somethingWrong.value = false;
            await fetchToServer();
        } catch (e) {
            console.log(e);
            is_somethingWrong.value = true;
            loading.value = false;
            loadingSmall.value = false;
        }
    }

    const  fetchToServer =  async () => {
        if (route.params.id_list) {
            request.value = `http://localhost/list?id=${route.params.id_list}`;
        } else if (route.params.name) {
            request.value = `http://localhost/list?name=${route.params.name}`;
        } else if (route.params.id_tag) {
            request.value = `http://localhost/tag?id=${route.params.id_tag}`;
        } else { request.value = ''; }
        if (request.value) {
            const response = await api.getInfo(request.value);
            setTimeout(() => {
                updateData(response);
            }, 300);
        }
    }

    const updateData = (arr) => {
        if ((typeof arr[1]) === "object" && arr.length) {
            if (route.params.id_list || route.params.name) {
                currentTasks.length = 0;
            } else if (route.params.id_tag) {
                tags.length = 0;
            }
            arr[1].forEach(item => {
                item.key = Math.random();
                if (route.params.id_list || route.params.name) {
                    currentTasks.push(item);
                } else if (route.params.id_tag) {
                    tags.push(item);
                }
            });
            if (route.params.id_list) {
                currentListInfo.id = arr[0].id;
                currentListInfo.name = arr[0].name;
                currentListInfo.color = arr[0].color;
            } else if (route.params.name) {
                currentSortListInfo.id = arr[0].id;
                currentSortListInfo.name = arr[0].name;
                bigMenu.sortLists.forEach(sortList => {
                    if (sortList.id === currentSortListInfo.id) { currentSortListInfo.color = sortList.color; }
                });
            } else if (route.params.id_tag) {
                tag_name.value = arr[0];
            }
            loading.value = false;
            loadingSmall.value = false;
        } else {
            is_somethingWrong.value = true;
            loading.value = false;
            loadingSmall.value = false;
        }
    }

    const updateTask = async (task) => {
        const response = await api.postInfo(`http://localhost/updateTask`, task);
        await bigMenu.firstRequest();
    }

    const addNewTask = () => {
        currentTasks.push({
            id: null,
            id_list: currentListInfo.id,
            name: null,
            description: null,
            deadline: null,
            is_done: 0,
            is_flagged: 0,
            url: null,
            priority: null,
        });
    };

    const removeNewTask = () => {
        currentTasks.forEach((task, idx) => {
            if (!task.id) {
                currentTasks.splice(idx,1);
            }
        });
    };

    const createTask = async (task) => {
        task.id_list = currentListInfo.id;
        const response = await api.postInfo(`http://localhost/createTask`, task);
        currentTasks.forEach((task, idx) => {
            if (!task.id) {
                task.id = response.id;
            }
        });
        await bigMenu.firstRequest();
        return response;
    }

    const deleteTask = async (obj) => {
        currentTasks.forEach((task, idx) => {
            if (task.id === obj.id) {
                currentTasks.splice(idx,1);
            }
        });
        await api.postInfo(`http://localhost/deleteTask`, obj);
        await bigMenu.firstRequest();
    }

    return {
        tasks: currentTasks,
        listInfo: currentListInfo,
        sortListInfo: currentSortListInfo,
        loading,
        loadingSmall,
        is_somethingWrong,
        request,
        tags,
        tag_name,
        currentPath,
        getTasksOrTags,
        updateTask,
        addNewTask,
        removeNewTask,
        createTask,
        deleteTask,
    };
});
