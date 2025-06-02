import { defineStore } from 'pinia';
import {ref, reactive, onMounted, watchEffect, onUnmounted} from "vue";
import {useRoute} from "vue-router";
import api from "@/api";
import {useBigMenuStore} from "@/stores/BigMenuStore";
import socket from "@/plugins/socket";
import { v4 as uuidv4 } from 'uuid';

export const useListViewStore = defineStore('listViewStore', () => {
    const user = reactive({
        id:      0,
        email:   '',
        name:    '',
        surname: '',
    });
    const currentPersonalListTasks = reactive([]);
    const currentPersonalListTasksDone = reactive([]);
    const currentSortListTasks = reactive([]);
    const currentListInfo = reactive({
        key: Math.random(),
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
    const socketUUID = uuidv4();
    const bigMenu = useBigMenuStore();

    onUnmounted(() => {
        disconnectSocket();
    });

    const setUserInfo = (userInfo) => {
        user.id      = userInfo.id;
        user.email   = userInfo.email;
        user.name    = userInfo.name;
        user.surname = userInfo.surname;
        initialize().then();
    };

    const initialize = async () => {
        await getTasksOrTags();
    };

    const connectSocket = async () => {
        try {
            if (!socket.connected) {
                socket.connect();
            }
            if (route.params.id_list) {
                socket.emit('subscribeToList', route.params.id_list);
            }
            socket.on('taskUpdated', (updatedTask) => {
                if (updatedTask.uuid !== socketUUID) {
                    handlePersonalListTaskUpdate(updatedTask.task);
                }
            });
            socket.on('taskDeleted', (task) => {
                if (task.uuid !== socketUUID) {
                    handlePersonalListTaskDelete(task.taskId);
                }
            });
            socket.on('taskCreated', (newTask) => {
                if (newTask.uuid !== socketUUID) {
                    handlePersonalListTaskCreate(newTask.task);
                }
            });
            socket.on('listUpdated', (updatedList) => {
                if (updatedList.uuid !== socketUUID) {
                    handlePersonalListUpdate(updatedList.list);
                }
            });
        } catch (e) {
            console.log(е);
            setTimeout(() => {
                connectSocket();
            }, 1000);
        }
    };

    const disconnectSocket = () => {
        socket.off('taskUpdated');
        socket.off('taskDeleted');
        socket.off('taskCreated');
        socket.disconnect();
    };

    const handlePersonalListTaskUpdate = (updatedTask) => {
        console.log(`Updating task id=${updatedTask.id} on current list from socket:`, updatedTask);
        if (!updatedTask.is_done) {
            const index = currentPersonalListTasks.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                currentPersonalListTasks.splice(index, 1, { ...currentPersonalListTasks[index], ...updatedTask });
            } else {
                const doneIndex = currentPersonalListTasksDone.findIndex(task => task.id === updatedTask.id);
                if (doneIndex !== -1) {
                    currentPersonalListTasksDone.splice(doneIndex, 1);
                    currentPersonalListTasks.push(updatedTask);
                }
            }
        } else {
            const index = currentPersonalListTasksDone.findIndex(task => task.id === updatedTask.id);
            if (index !== -1) {
                currentPersonalListTasksDone.splice(index, 1, { ...currentPersonalListTasksDone[index], ...updatedTask });
            } else {
                const todoIndex = currentPersonalListTasks.findIndex(task => task.id === updatedTask.id);
                if (todoIndex !== -1) {
                    currentPersonalListTasks.splice(todoIndex, 1);
                    currentPersonalListTasksDone.push(updatedTask);
                }
            }
        }
    };

    const handlePersonalListTaskDelete = (taskId) => {
        console.log('\\Delete task from websocket...')
        setTimeout(() => {
            console.log(taskId)
            if (taskId) {
                currentPersonalListTasks.forEach((task, idx) => {
                    if (task.id === taskId) {
                        currentPersonalListTasks.splice(idx,1);
                    }
                });
            }
        }, 500);
    };

    const handlePersonalListTaskCreate = (newTask) => {
        console.log('Create task from websocket...')
        setTimeout(() => {
            if (newTask) {
                const index = currentPersonalListTasks.findIndex(task => task.id === newTask.id);
                console.log(index)
                if (index === -1) {
                    currentPersonalListTasks.push(newTask);
                }
            }
        },500)
    };

    const handlePersonalListUpdate = (updatedList) => {
        console.log('Updating list info from websocket...')
        currentListInfo.key = updatedList.key;
        currentListInfo.id = updatedList.id;
        currentListInfo.name = updatedList.name;
        currentListInfo.color = updatedList.color;
        bigMenu.firstRequest().then();
    };

    const getTasksOrTags = async () => {
        await connectSocket();
        loading.value = true;
        loadingSmall.value = true;
        currentPath.value = route.path;
        try {
            await fetchToServer();
            loadingSmall.value = false;
            is_somethingWrong.value = false;
        } catch (e) {
            console.log(e);
            is_somethingWrong.value = true;
            loading.value = false;
            loadingSmall.value = false;
        }
    };

    const fetchToServer =  async () => {
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
                    user_id: user.id
                }
            });
            setTimeout(() => {
                updateData(response);
            }, 300);
        }
    };

    const updateData = (arr) => {
        //console.log(arr);
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
    };

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
    };

    const updateSortListTasks = async () => {
        await getTasksOrTags();
    };

    const updateTask = async (task) => {
        const response = await api.postInfo(`updateTask/${task.id}`, {task, uuid: socketUUID});
        await bigMenu.firstRequest();
    };

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

    const removeNewTask = () => {
        currentPersonalListTasks.forEach((task, idx) => {
            if (!task.id) {
                currentPersonalListTasks.splice(idx,1);
            }
        });
    };

    const createTask = async (task) => {
        task.id_list = currentListInfo.id;
        const response = await api.postInfo(`createTask`, {task, uuid: socketUUID});
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
        obj['uuid'] = socketUUID;
        await api.postInfo(`deleteTask`, obj);
        await bigMenu.firstRequest();
    };

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
    };

    const clearSearchTasks = () => {
        searchResult.length = 0;
    };

    const addTagToTask = async (tagToTask) => {
        const response = await api.postInfo(`addTagToTask`, tagToTask);
        handleAddTagToTask({
            key: Math.random(),
            id: tagToTask.tag_id,
            name: tagToTask.tag_name,
        }, tagToTask.task_id);
        await bigMenu.firstRequest();
        return response;
    };

    const createTag = async (tag) => {
        const response = await api.postInfo(`createTag`, tag);
        handleAddTagToTask({
            key: Math.random(),
            id: response.id,
            name: response.name,
        }, tag.task_id);
        await bigMenu.firstRequest();
        return response;
    };

    const handleAddTagToTask = (tagToAdd, task_id) => {
        const taskLists = [currentPersonalListTasks, currentPersonalListTasksDone];

        for (const taskList of taskLists) {
            const taskIdx = taskList.findIndex(task => task.id === task_id);
            if (taskIdx === -1) continue;
            const task = taskList[taskIdx];
            if (!task.tags.some(tag => tag.id === tagToAdd.id)) {
                task.tags = [...task.tags, tagToAdd];
                task.possibleTags = task.possibleTags.filter(tag => tag.id !== tagToAdd.id);
                /*task.possibleTags = task.possibleTags.map(tag => ({
                    ...tag,
                    key: Math.random()
                }));*/
                console.log('Updated possibleTags with new keys:', task.possibleTags);
            } else {
                console.warn('Tag already exists in task tags');
            }
            return;
        }
        console.error(`Task with id ${task_id} not found`);
    };

    const updateTag = async (tag) => {
        const response = await api.postInfo(`updateTag`, tag);
        await bigMenu.firstRequest();
        return response;
    };

    const deleteTagTask = async (tag) => {
        await api.postInfo(`deleteTagTask`, tag);
        handleDeleteTagTask(tag);
        await bigMenu.firstRequest();
    };

    const handleDeleteTagTask = (tagDelInfo) => {
        const taskIndex = currentPersonalListTasks.findIndex(task => task.id === tagDelInfo.task_id);
        if (taskIndex !== -1) {
            currentPersonalListTasks[taskIndex].tags = currentPersonalListTasks[taskIndex].tags.filter(tag => tag.id !== tagDelInfo.tag_id);
            currentPersonalListTasks[taskIndex].possibleTags.push({
                key: Math.random(),
                id: tagDelInfo.tag_id,
                name: tagDelInfo.tag_name
            });
        } else {
            const taskIndex = currentPersonalListTasksDone.findIndex(task => task.id === tagDelInfo.task_id);
            if (taskIndex !== -1) {
                currentPersonalListTasksDone[taskIndex].tags = currentPersonalListTasksDone[taskIndex].tags.filter(tag => tag.id !== tagDelInfo.tag_id);
                currentPersonalListTasks[taskIndex].possibleTags.push({
                    key: Math.random(),
                    id: tagDelInfo.tag_id,
                    name: tagDelInfo.tag_name
                });
            }
        }
    };

    const updateList = async (list) => {
        await api.postInfo(`updateList/${list.id}`, {list, uuid: socketUUID});
        if (list.name) {
            currentListInfo.name = list.name;
        } else {
            currentListInfo.color = list.color;
        }
        currentListInfo.key = Math.random();
        await bigMenu.firstRequest();
    };

    return {
        tasks: currentPersonalListTasks,
        tasksDone: currentPersonalListTasksDone,
        sortTasks: currentSortListTasks,
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
        setUserInfo,
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
