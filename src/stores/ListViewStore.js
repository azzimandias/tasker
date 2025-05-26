import { defineStore } from 'pinia';
import {ref, reactive, onMounted, watchEffect, onUnmounted} from "vue";
import {useRoute} from "vue-router";
import api from "@/api";
import {useBigMenuStore} from "@/stores/BigMenuStore";
import socket from "@/plugins/socket";

export const useListViewStore = defineStore('listViewStore', () => {
    const currentPersonalListTasks = reactive([]);
    const currentPersonalListTasksDone = reactive([]);
    const currentSortListTasks = reactive([]);
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
    const currentTag = reactive({
        id: -1,
        name: '',
    });
    const tags = reactive([]);
    const searchResult = reactive([]);
    const loading = ref(true);
    const loadingSmall = ref(true);
    const is_somethingWrong = ref(false);
    const request = ref('');
    const route = useRoute();
    const currentPath = ref(route.path);
    const bigMenu = useBigMenuStore();

    onMounted(async () => {

        // Подключение к WebSocket
        socket.connect();

        // Подписка на комнату "chat"
        socket.emit('subscribe', 'chat');

        // Слушаем события
        socket.on('newMessage', (message) => {
            console.log('New message:', message);
        });

        // первоначальная загрузка, таймаут для анимации?
        setTimeout(() => {
            getTasksOrTags();
        },300);


        // интервал для смены списка или сортировки по спискам?
        /*const interval = setInterval(() => {
            if(String(currentPath.value) !== String(route.path)) {
                loading.value = true;
                getTasksOrTags();
            }
        }, 0)*/
        // интервал для обновления информации по спискам и сортировкам
        /*const refreshInterval = setInterval(() => {
            getTasksOrTags();
        }, 60000);
        setTimeout(() => {
            clearInterval(refreshInterval);
        }, 60 * 60000);*/
    });

    // Отключение при размонтировании
    onUnmounted(() => {
        socket.disconnect();
    });

    const getTasksOrTags = async () => {
        loadingSmall.value = true;
        currentPath.value = route.path;
        try {
            is_somethingWrong.value = false;
            await fetchToServer();
            loadingSmall.value = false;
        } catch (e) {
            console.log(e);
            is_somethingWrong.value = true;
            loading.value = false;
            loadingSmall.value = false;
        }
    }

    const  fetchToServer =  async () => {
        if (route.params.id_list) {
            request.value = `list?id=${route.params.id_list}`;
        } else if (route.params.name) {
            request.value = `list?name=${route.params.name}`;
        } else if (route.params.id_tag) {
            request.value = `tag?id=${route.params.id_tag}`;
        } else { request.value = ''; }
        if (request.value) {
            const response = await api.getInfoWithArgs(request.value, {
                params: {
                    user_id: bigMenu.user.id
                }
            });
            setTimeout(() => {
                updateData(response);
            }, 300);
        }
    }

    const updateData = (arr) => {
        if ((arr['sortList'] || arr['list'] || arr['tag']) && (arr['tasks'] || arr['tasksByList'])) {

            if (route.params.id_list) {
                currentPersonalListTasks.length = 0;
                currentPersonalListTasksDone.length = 0;
            } else if (route.params.name) {
                currentSortListTasks.length = 0;
            } else if (route.params.id_tag) {
                tags.length = 0;
            }

            if (route.params.id_list) {
                arr['tasks'].forEach(item => {
                    item.key = Math.random();
                    item.tags.forEach(tag => {
                        tag.key = Math.random();
                    });
                    item.possibleTags.forEach(tag => {
                        tag.key = Math.random();
                    });
                    currentPersonalListTasks.push(item);
                });
                arr['tasksDone'].forEach(item => {
                    item.key = Math.random();
                    item.tags.forEach(tag => {
                        tag.key = Math.random();
                    });
                    item.possibleTags.forEach(tag => {
                        tag.key = Math.random();
                    });
                    currentPersonalListTasksDone.push(item);
                });
            } else if (route.params.name) {
                arr['tasksByList'].forEach(item => {
                    console.log(item)
                    item.key = Math.random();
                    item.tasks.forEach(task => {
                        task.key = Math.random();
                        task.tags.forEach(tag => {
                            tag.key = Math.random();
                        })
                        task.possibleTags.forEach(tag => {
                            tag.key = Math.random();
                        });
                    });
                    currentSortListTasks.push(item);
                });
            } else if (route.params.id_tag) {
                arr['tasksByList'].forEach(item => {
                    item.key = Math.random();
                    item.tasks.forEach(task => {
                        task.key = Math.random();
                        task.tags.forEach(tag => {
                            tag.key = Math.random();
                            if (tag.id === arr['tag']['id']) tag.active = true;
                        })
                        task.possibleTags.forEach(tag => {
                            tag.key = Math.random();
                        });
                    });
                    tags.push(item);
                });
            }

            //sortTasksByDone();

            if (route.params.id_list) {
                currentListInfo.id = arr['list'].id;
                currentListInfo.name = arr['list'].name;
                currentListInfo.color = arr['list'].color;
            } else if (route.params.name) {
                currentSortListInfo.id = arr['sortList'].id;
                currentSortListInfo.name = arr['sortList'].name;
                bigMenu.sortLists.forEach(sortList => {
                    if (sortList.id === currentSortListInfo.id) { currentSortListInfo.color = sortList.color; }
                });
            } else if (route.params.id_tag) {
                currentTag.id = arr.tag.id;
                currentTag.name = arr.tag.name;
                currentTag.key = Math.random();
            }

            loading.value = false;
            loadingSmall.value = false;

        } else {
            is_somethingWrong.value = true;
            loading.value = false;
            loadingSmall.value = false;
        }
    }

    const clearTasks = (id) => {
        let i = 0;
        currentSortListTasks.forEach((list) => {
            list.tasks.forEach((task,idx) => {
                if (+id === +task.id) {
                    //console.log(list.tasks[idx])
                    list.tasks.splice(idx,1);
                }
            });
            if (list.tasks.length > 0) {
                i++;
            }
        });
        if (!i) {
            currentSortListTasks.length = 0;
        }
    }

    const updateSortListTasks = async () => {
        await getTasksOrTags();
    }

    const updateTask = async (task) => {
        const response = await api.postInfo(`updateTask`, task);
        await bigMenu.firstRequest();
    }

    const addNewTask = () => {
        currentPersonalListTasks.push({
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

    const updateTaskDone = (id, is_done) => {
        if (is_done) {
            currentPersonalListTasks.find(el => el.id === id).is_done = +is_done;
            currentPersonalListTasks.forEach((task,idx) => {
                if (task.id === id) {
                    let taskDone = currentPersonalListTasks.splice(idx,1);
                    taskDone.forEach(td => {
                        currentPersonalListTasksDone.push(td);
                    });
                }
            });
        } else {
            currentPersonalListTasksDone.find(el => el.id === id).is_done = +is_done;
            currentPersonalListTasksDone.forEach((task,idx) => {
                if (task.id === id) {
                    let task = currentPersonalListTasksDone.splice(idx,1);
                    task.forEach(t => {
                        currentPersonalListTasks.push(t);
                    })
                }
            });
        }
        sortTasksById();
        //sortTasksByDone();
    };

    const sortTasksById = () => {
        currentPersonalListTasks.sort((a, b) => {
            if (a.id > b.id) return 1;
            if (a.id === b.id) return 0;
            if (a.id < b.id) return -1;
        });
        currentPersonalListTasksDone.sort((a, b) => {
            if (a.id > b.id) return 1;
            if (a.id === b.id) return 0;
            if (a.id < b.id) return -1;
        });
    };

    const sortTasksByDone = () => {
        currentPersonalListTasks.sort((a, b) => {
            if (a.is_done > b.is_done) return 1;
            if (a.is_done === b.is_done) return 0;
            if (a.is_done < b.is_done) return -1;
        });
    };

    const removeNewTask = () => {
        currentPersonalListTasks.forEach((task, idx) => {
            if (!task.id) {
                currentPersonalListTasks.splice(idx,1);
            }
        });
    };

    const createTask = async (task) => {
        task.id_list = currentListInfo.id;
        const response = await api.postInfo(`createTask`, task);
        currentPersonalListTasks.forEach((task, idx) => {
            if (!task.id) {
                task.id = response.id;
            }
        });
        await bigMenu.firstRequest();
        return response;
    }

    const deleteTask = async (obj) => {
        currentPersonalListTasks.forEach((task, idx) => {
            if (task.id === obj.id) {
                currentPersonalListTasks.splice(idx,1);
            }
        });
        await api.postInfo(`deleteTask`, obj);
        await bigMenu.firstRequest();
        await getTasksOrTags();
    }

    const findTasks = async (searchObj) => {
        loading.value = true;
        //currentSearchTasks
        const response = await api.globalSearch(searchObj);
        //console.log(response)
        searchResult.length = 0;
        if (typeof response === 'object') {
            response.forEach(item => {
                searchResult.push(item);
            });
            loading.value = false;
        } else {
            loading.value = false;
            is_somethingWrong.value = true;
        }
    }

    const clearSearchTasks = () => {
        searchResult.length = 0;
    }

    const addTagToTask = async (tagToTask) => {
        const response = await api.postInfo(`addTagToTask`, tagToTask);
        await bigMenu.firstRequest();
        await getTasksOrTags();
        return response;
    }

    const createTag = async (tag) => {
        const response = await api.postInfo(`createTag`, tag);
        await bigMenu.firstRequest();
        await getTasksOrTags();
        return response;
    }

    const updateTag = async (tag) => {
        const response = await api.postInfo(`updateTag`, tag);
        await bigMenu.firstRequest();
        await getTasksOrTags();
        return response;
    }

    const deleteTagTask = async (tag) => {
        await api.postInfo(`deleteTagTask`, tag);
        await bigMenu.firstRequest();
        await getTasksOrTags();
    }

    const updateList = async (list) => {
        await api.postInfo(`updateList`, list);
        await bigMenu.firstRequest();
        await getTasksOrTags();
    }

    return {
        tasks: currentPersonalListTasks,
        tasksDone: currentPersonalListTasksDone,
        stasks: currentSortListTasks,
        listInfo: currentListInfo,
        sortListInfo: currentSortListInfo,
        searchResult,
        loading,
        loadingSmall,
        is_somethingWrong,
        request,
        tags,
        currentTag,
        currentPath,
        getTasksOrTags,
        updateTask,
        addNewTask,
        removeNewTask,
        createTask,
        deleteTask,
        updateTaskDone,
        clearTasks,
        updateSortListTasks,
        findTasks,
        clearSearchTasks,
        addTagToTask,
        createTag,
        updateTag,
        deleteTagTask,
        updateList,
    };
});
