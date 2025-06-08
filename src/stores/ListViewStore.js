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
        const hasRequiredData = (arr['sortList'] || arr['list'] || arr['tag']) &&
            (arr['tasks'] || arr['tasksByList']);
        if (!hasRequiredData) {
            is_somethingWrong.value = true;
            loading.value = false;
            loadingSmall.value = false;
            return;
        }

        const clearCurrentData = () => {
            if (route.params.id_list) {
                currentPersonalListTasks.length = 0;
                currentPersonalListTasksDone.length = 0;
            } else if (route.params.name) {
                currentSortListTasks.length = 0;
            } else if (route.params.id_tag) {
                tags.length = 0;
            }
        };

        const generateKeys = (item) => {
            item.key = Math.random();
            if (item.tasks) {
                item.tasks.forEach(task => processTask(task));
            } else {
                processTask(item);
            }
        };

        const processTask = (task) => {
            task.key = Math.random();
            task.tagCreatorKey = Math.random();

            [task.tags, task.possibleTags].forEach(tagArray => {
                if (tagArray) {
                    tagArray.forEach(tag => {
                        tag.key = Math.random();
                        if (route.params.id_tag && tag.id === arr.tag.id) {
                            tag.active = true;
                        }
                    });
                }
            });
        };

        const updateCurrentInfo = () => {
            if (route.params.id_list) {
                Object.assign(currentListInfo, {
                    id: arr.list.id,
                    name: arr.list.name,
                    color: arr.list.color
                });
            } else if (route.params.name) {
                Object.assign(currentSortListInfo, {
                    id: arr.sortList.id,
                    name: arr.sortList.name,
                    color: bigMenu.sortLists.find(sl => sl.id === arr.sortList.id)?.color
                });
            } else if (route.params.id_tag) {
                Object.assign(currentTag, {
                    id: arr.tag.id,
                    name: arr.tag.name,
                    key: Math.random()
                });
            }
        };

        const processData = () => {
            const targetArray = route.params.id_list ?
                { active: currentPersonalListTasks, done: currentPersonalListTasksDone } :
                route.params.name ?
                    { target: currentSortListTasks } :
                    { target: tags };

            if (route.params.id_list) {
                arr.tasks.forEach(item => {
                    generateKeys(item);
                    targetArray.active.push(item);
                });
                arr.tasksDone.forEach(item => {
                    generateKeys(item);
                    targetArray.done.push(item);
                });
            } else {
                arr.tasksByList.forEach(item => {
                    generateKeys(item);
                    targetArray.target.push(item);
                });
            }
        };

        try {
            clearCurrentData();
            processData();
            updateCurrentInfo();
        } catch (error) {
            console.error("Error in updateData:", error);
            is_somethingWrong.value = true;
        } finally {
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
    const removeNewTask = () => {
        currentPersonalListTasks.forEach((task, idx) => {
            if (!task.id) {
                currentPersonalListTasks.splice(idx,1);
            }
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
    /* + TASK */
    const updateTask = async (task) => {
        const response = await api.postInfo(`updateTask/${task.id}`, {task, uuid: socketUUID});
        await bigMenu.firstRequest();
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
    };
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
    /* - TASK */
    /* + Search */
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
    /* - Search */
    /* + TAG */
    const addTagToTask = async (tagToTask) => {
        tagToTask.uuid = socketUUID;
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
        tag.uuid = socketUUID;
        const response = await api.postInfo(`createTag`, tag);
        handleAddTagToTask({
            key: Math.random(),
            id: response.id,
            name: response.name,
        }, tag.task_id);
        await bigMenu.firstRequest();
        return response;
    };
    const updateTag = async (tag) => {
        tag.uuid = socketUUID;
        const response = await api.postInfo(`updateTag`, tag);
        handleUpdateTag(response);
        await bigMenu.firstRequest();
        return response;
    };
    const deleteTagTask = async (tag) => {
        tag.uuid = socketUUID;
        await api.postInfo(`deleteTagTask`, tag);
        handleDeleteTagTask(tag);
        await bigMenu.firstRequest();
    };
    /* - TAG */
    /* + TAG replacement */
    const handleAddTagToTask = (tagToAdd, task_id) => {
        [currentPersonalListTasks, currentPersonalListTasksDone].forEach(taskList => {
            taskList.forEach(task => {
                if (task.id !== task_id &&
                    !task.possibleTags.some(tag => tag.id === tagToAdd.id)) {
                    // Для реактивности создаем новый массив
                    task.possibleTags = [...task.possibleTags, tagToAdd];
                }
            });
        });

        const targetTask = [...currentPersonalListTasks, ...currentPersonalListTasksDone]
            .find(task => task.id === task_id);

        if (!targetTask) {
            console.error(`Task with id ${task_id} not found`);
            return;
        }

        if (targetTask.tags.some(tag => tag.id === tagToAdd.id)) {
            console.warn('Tag already exists in task tags');
            return;
        }

        targetTask.tags = [...targetTask.tags, tagToAdd];
        targetTask.possibleTags = targetTask.possibleTags.filter(tag => tag.id !== tagToAdd.id);
        targetTask.tagCreatorKey = Math.random();
        console.log('Updated task:', targetTask);
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
    const handleUpdateTag = (updatedTag) => {
        updateTagsInReactiveArray(updatedTag, currentPersonalListTasks);
        updateTagsInReactiveArray(updatedTag, currentPersonalListTasksDone);
    };
    const updateTagsInReactiveArray = (updatedTag, reactiveTaskArray) => {
        reactiveTaskArray.forEach((task) => {
            if (task.tags) {
                const tagIndex = task.tags.findIndex(tag => tag.id === updatedTag.id);
                if (tagIndex !== -1) {
                    task.tags[tagIndex].key = Math.random();
                    task.tags[tagIndex].name = updatedTag.name;
                }
            }
            if (task.possibleTags) {
                const possibleTagIndex = task.possibleTags.findIndex(tag => tag.id === updatedTag.id);
                if (possibleTagIndex !== -1) {
                    task.possibleTags[possibleTagIndex].key = Math.random();
                    task.possibleTags[possibleTagIndex].name = updatedTag.name;
                }
            }
        });
    };
    /* - TAG replacement */
    /* + PERSONAL LIST */
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
    /* - PERSONAL LIST */
    /* + SOCKET */
    const connectSocket = async () => {
        try {
            if (!socket.connected) {
                socket.connect();
            }
            if (route.params.id_list) {
                socket.emit('subscribe', 'ListViewStore');
            }
            socket.on('taskUpdated', (updatedTask) => {
                if (updatedTask.uuid !== socketUUID) {
                    handlePersonalListTaskSocketUpdate(updatedTask.task);
                }
            });
            socket.on('taskDeleted', (task) => {
                if (task.uuid !== socketUUID) {
                    handlePersonalListTaskSocketDelete(task.taskId);
                }
            });
            socket.on('taskCreated', (newTask) => {
                if (newTask.uuid !== socketUUID) {
                    handlePersonalListTaskSocketCreate(newTask.task);
                }
            });
            socket.on('listUpdated', (updatedList) => {
                if (updatedList.uuid !== socketUUID) {
                    handlePersonalListSocketUpdate(updatedList.list);
                }
            });
            socket.on('createdTagTask', (createdTagTask) => {
                if (createdTagTask.uuid !== socketUUID) {
                    handleTagTaskSocketCreate(createdTagTask);
                }
            });
            socket.on('addTagTask', (addTagToTask) => {
                if (addTagToTask.uuid !== socketUUID) {
                    handleAddTagTaskSocket(addTagToTask);
                }
            });
            socket.on('deleteTagTask', (deleteTagTask) => {
                if (deleteTagTask.uuid !== socketUUID) {
                    handleDeleteTagTaskSocket(deleteTagTask);
                }
            });
            socket.on('updateTag', (updateTag) => {
                if (updateTag.uuid !== socketUUID) {
                    handleUpdateTagTaskSocket(updateTag);
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
    const handlePersonalListTaskSocketUpdate = (updatedTask) => {
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
    const handlePersonalListTaskSocketDelete = (taskId) => {
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
    const handlePersonalListTaskSocketCreate = (newTask) => {
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
    const handlePersonalListSocketUpdate = (updatedList) => {
        console.log('Updating list info from websocket...')
        currentListInfo.key = updatedList.key;
        currentListInfo.id = updatedList.id;
        currentListInfo.name = updatedList.name;
        currentListInfo.color = updatedList.color;
        bigMenu.firstRequest().then();
    };
    const handleTagTaskSocketCreate = (createdTagTask) => {
        console.log('Add created tag to task...');
        handleAddTagToTask({
            key: Math.random(),
            id: createdTagTask.tag.id,
            name: createdTagTask.tag.name,
        }, createdTagTask.taskId);
    };
    const handleAddTagTaskSocket = (addTagToTask) => {
        console.log('Add tag to task...');
        handleAddTagToTask({
            key: Math.random(),
            id: addTagToTask.tag.id,
            name: addTagToTask.tag.name,
        }, addTagToTask.taskId);
    };
    const handleDeleteTagTaskSocket = (deleteTagTask) => {
        console.log('\\Delete tag from websocket...');
        handleDeleteTagTask({
            task_id: deleteTagTask.taskId,
            tag_id: deleteTagTask.tag.id,
            tag_name: deleteTagTask.tag.name,
        });
    };
    const handleUpdateTagTaskSocket = (updateTag) => {
        console.log('Update tag...', updateTag.tag);
        handleUpdateTag(updateTag.tag);
    };
    /* - SOCKET */

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
