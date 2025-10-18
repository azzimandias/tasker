import { defineStore } from 'pinia';
import {ref, reactive, onMounted, watchEffect, onUnmounted, computed} from "vue";
import {useRoute} from "vue-router";
import api from "@/api";
import {useBigMenuStore} from "@/stores/BigMenuStore";
import socket from "@/plugins/socket";
import { v4 as uuidv4 } from 'uuid';
import {User} from '@/types/bigMenu';
import {
    List,
    Task,
    Tag,
    FoundedListWithTasks,
    Alert
} from '@/types/listView';

export const useListViewStore = defineStore('listViewStore', () => {
    const user = reactive({
        id:      0,
        email:   '',
        name:    '',
        surname: '',
    });
    const currentPersonalListTasks = reactive<Task[]>([]);
    const currentPersonalListTasksDone = reactive<Task[]>([]);
    const currentSortListTasks = reactive<{personal_list: List, tasks: Task[]}[]>([]);
    const currentListInfo = reactive({
        id: 0,
        name: '',
        color: '',
        count_of_active_tasks: 0,
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
    const tags = reactive<{personal_list: List, tasks: Task[]}[]>([]);
    const searchResult = reactive<FoundedListWithTasks[]>([]);
    const alerts = reactive<Alert[]>([]);
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
    const setUserInfo = (userInfo: User) => {
        user.id      = userInfo.id;
        user.email   = userInfo.email;
        user.name    = userInfo.name;
        user.surname = userInfo.surname;
        initialize().then();
    };
    const initialize = async () => {
        await getTasksOrTags(false);
    };
    const getTasksOrTags = async (isSocket: boolean) => {
        if (!isSocket) {
            await connectSocket();
            loading.value = true;
            loadingSmall.value = true;
        }
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
        if (route.params.id_list && route.params.id_list !== 'new') {
            request.value = `list/${route.params.id_list}`;
        } else if (route.params.name) {
            request.value = `listName?name=${route.params.name}`;
        } else if (route.params.id_tag && route.params.id_tag !== 'new') {
            if (+route.params.id_tag) {
                request.value = `tag/${route.params.id_tag}`;
            } else {
                request.value = `tag`;
            }
        } else { request.value = ''; }
        let response = null;
        if (request.value) {
            response = await api.getInfoWithArgs(request.value, {params: {}});
            try {
                clearCurrentData();
                clearCurrentInfo();
                if (response) {
                    if (route.params.id_list && route.params.id_list !== 'new') {
                        setCurrentPersonalListTasks(response);
                    } else if (route.params.name) {
                        setCurrentSortListTasks(response);
                    } else if (route.params.id_tag && route.params.id_tag !== 'new') {
                        setTags(response);
                    }
                }
            } catch (error) {
                console.error("Error in setCurrentPersonalListTasks:", error);
                is_somethingWrong.value = true;
            } finally {
                loading.value = false;
                loadingSmall.value = false;
            }
        }
    };
    const setCurrentPersonalListTasks = (response: {list: List, tasks: Task[], tasksDone: Task[]}) => {
        Object.assign(currentListInfo, {
            id: response.list.id,
            name: response.list.name,
            color: response.list.color,
            count_of_active_tasks: response.list.count_of_active_tasks,
        });
        response.tasks.forEach((item: Task) => {
            item.changer = Math.random();
            currentPersonalListTasks.push(item);
        });
        response.tasksDone.forEach((item: Task) => {
            item.changer = Math.random();
            currentPersonalListTasksDone.push(item);
        });
    };
    const setCurrentSortListTasks = (response: {
        sortList: {id:number,name:string},
        tasksByList: {personal_list: List, tasks: Task[]}[]
    }) => {
        Object.assign(currentSortListInfo, {
            id: response.sortList.id,
            name: response.sortList.name,
            color: bigMenu.sortLists.find(sl => sl.id === response.sortList.id)?.color
        });
        response.tasksByList.forEach(item => {
            currentSortListTasks.push(item);
        });
    };
    const setTags = (response: {
        tag: {id:number,name:string},
        tasksByList: {personal_list: List, tasks: Task[]}[]
    }) => {
        Object.assign(currentTag, {
            id: response.tag.id,
            name: response.tag.name,
        });
        response.tasksByList.forEach(item => {
            tags.push(item);
        });
    };

    /*const updateData = (arr) => {
        const processData = () => {
            const targetArray = route.params.id_list ?
                { active: currentPersonalListTasks, done: currentPersonalListTasksDone } :
                route.params.name ?
                    { target: currentSortListTasks } :
                    { target: tags };

            if (route.params.id_list) {
                arr.tasks.forEach(item => {
                    item.changer = Math.random();
                    targetArray.active.push(item);
                });
                arr.tasksDone.forEach(item => {
                    item.changer = Math.random();
                    targetArray.done.push(item);
                });
            } else {
                arr.tasksByList.forEach(item => {
                    targetArray.target.push(item);
                });
            }
        };
        const updateCurrentInfo = () => {
            if (route.params.id_list) {
                Object.assign(currentListInfo, {
                    id: arr.list.id,
                    name: arr.list.name,
                    color: arr.list.color,
                    count_of_active_tasks: arr.list.count_of_active_tasks,
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
                });
            }
        };
        try {
            clearCurrentData();
            clearCurrentInfo();
            if (arr) {
                processData();
                updateCurrentInfo();
            }
        } catch (error) {
            console.error("Error in updateData:", error);
            is_somethingWrong.value = true;
        } finally {
            loading.value = false;
            loadingSmall.value = false;
        }
    };*/
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
    const clearCurrentInfo = () => {
        Object.assign(currentListInfo, {
            id: '',
            name: '',
            color: '#ffffff',
            count_of_active_tasks: 0,
        });
        Object.assign(currentSortListInfo, {
            id: 0,
            name: '',
            color: '',
        });
        Object.assign(currentTag, {
            id: -1,
            name: '',
        });
    };

    const clearTasks = (id: number) => {
        let i = 0;
        currentSortListTasks.forEach((list: {personal_list: List, tasks: Task[]}) => {
            list.tasks.forEach((task: Task,idx: number) => {
                if (task.id && +id === +task.id) {
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
        await getTasksOrTags(false);
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
            tags: [],
            possibleTags: [],
        });
    };
    const removeNewTask = () => {
        currentPersonalListTasks.forEach((task, idx) => {
            if (!task.id) {
                currentPersonalListTasks.splice(idx,1);
            }
        });
    };
    const updateTaskDone = (id: number, is_done: number) => {
        try {
            const sourceArray = is_done ? currentPersonalListTasks : currentPersonalListTasksDone;
            const targetArray = is_done ? currentPersonalListTasksDone : currentPersonalListTasks;
            const taskIndex = sourceArray.findIndex(el => el.id === id);
            if (taskIndex === -1) {
                console.warn(`Task with id ${id} not found`);
                return;
            }
            const task = sourceArray[taskIndex];
            task.is_done = is_done ? 1 : 0;
            sourceArray.splice(taskIndex, 1);
            targetArray.push(task);
            sortTasksById();
            currentListInfo.count_of_active_tasks = currentPersonalListTasks.length;
        } catch (error) {
            console.error('Error in updateTaskDone:', error);
        }
    };
    const sortTasksById = (): void => {
        currentPersonalListTasks.sort((a, b) => {
            const idA = a.id ?? 0;
            const idB = b.id ?? 0;
            return idA - idB;
        });

        currentPersonalListTasksDone.sort((a, b) => {
            const idA = a.id ?? 0;
            const idB = b.id ?? 0;
            return idA - idB;
        });
    };

    /* + TASK */
    const updateTask = async (task: Task) => {
        const response = await api.postInfo(`updateTask/${task.id}`, {task, uuid: socketUUID});
        handleUpdateTask(response);
        //await getTasksOrTags();
        await bigMenu.firstRequest();
    };
    const createTask = async (task: Task) => {
        task.id_list = currentListInfo.id;
        const response = await api.postInfo(`createTask`, {task, uuid: socketUUID});
        currentPersonalListTasks.forEach((task, idx) => {
            if (!task.id) {
                task.id = response.id;
                task.name = response.name;
                task.tags = response.tags;
                task.possibleTags = response.possibleTags;
            }
        });
        await bigMenu.firstRequest();
        currentListInfo.count_of_active_tasks = currentPersonalListTasks.length;
        return response;
    };
    const deleteTask = async (obj: {id: number, uuid: string | null}) => {
        currentPersonalListTasks.forEach((task, idx) => {
            if (task.id === obj.id) {
                currentPersonalListTasks.splice(idx,1);
            }
        });
        obj.uuid = socketUUID;
        await api.postInfo(`deleteTask`, obj);
        currentListInfo.count_of_active_tasks = currentPersonalListTasks.length;
        await bigMenu.firstRequest();
    };
    const handleUpdateTask = (task: Task) => {
        if (!task.is_done) {
            const idx = currentPersonalListTasks.findIndex(el => el.id === task.id);
            currentPersonalListTasks[idx] = task;
        } else {
            const idx = currentPersonalListTasksDone.findIndex(el => el.id === task.id);
            currentPersonalListTasksDone[idx] = task;
        }
    }
    /* - TASK */
    /* + Search */
    const findTasks = async (searchObj: { searchString: string }) => {
        loading.value = true;
        const response = await api.globalSearch(searchObj);
        searchResult.length = 0;
        if (typeof response === 'object') {
            response.forEach((item: FoundedListWithTasks) => {
                item.changer = Math.random();
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
    const addTagToTask = async (tagToTask: Tag) => {
        tagToTask.uuid = socketUUID;
        const response = await api.postInfo(`addTagToTask`, tagToTask);
        /*handleAddTagToTask({
            key: Math.random(),
            id: tagToTask.tag_id,
            name: tagToTask.tag_name,
        }, tagToTask.task_id);*/
        await getTasksOrTags(false);
        await bigMenu.firstRequest();
        return response;
    };
    const createTag = async (tag: Tag) => {
        tag['uuid'] = socketUUID;
        const response = await api.postInfo(`createTag`, tag);
        /*handleAddTagToTask({
            key: Math.random(),
            id: response.id,
            name: response.name,
        }, tag.task_id);*/
        await getTasksOrTags(true);
        await bigMenu.firstRequest();
        return response;
    };
    const updateTag = async (tag: Tag) => {
        tag["uuid"] = socketUUID;
        const response = await api.postInfo(`updateTag/${tag.id}`, tag);
        /*handleUpdateTag(response);*/
        //await getTasksOrTags();
        await bigMenu.firstRequest();
        return response;
    };
    const deleteTagTask = async (tag: Tag) => {
        tag["uuid"] = socketUUID;
        await api.postInfo(`deleteTagTask`, tag);
        /*handleDeleteTagTask(tag);*/
        await getTasksOrTags(true);
        await bigMenu.firstRequest();
    };
    const deleteTag = async (tag: Tag) => {
        tag['uuid'] = socketUUID;
        await api.postInfo(`deleteTag/${tag.id}`, tag);
        await getTasksOrTags(false);
        await bigMenu.firstRequest();
    };
    /* - TAG */
    /* + TAG replacement */
    const handleAddTagToTask = (tagToAdd: Tag, task_id: number) => {
        [currentPersonalListTasks, currentPersonalListTasksDone].forEach(taskList => {
            taskList.forEach(task => {
                if (task.id !== task_id &&
                    !task.possibleTags.some((tag: Tag) => tag.id === tagToAdd.id)) {
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
    const handleDeleteTagTask = (tagDelInfo: Tag) => {
        const taskIndex = currentPersonalListTasks.findIndex(task => task.id === tagDelInfo.task_id);
        if (taskIndex !== -1) {
            currentPersonalListTasks[taskIndex].tags = currentPersonalListTasks[taskIndex].tags.filter(tag => tag.id !== tagDelInfo.id);
            currentPersonalListTasks[taskIndex].possibleTags.push({
                key: Math.random(),
                id: tagDelInfo.id,
                name: tagDelInfo.name
            });
        } else {
            const taskIndex = currentPersonalListTasksDone.findIndex(task => task.id === tagDelInfo.task_id);
            if (taskIndex !== -1) {
                currentPersonalListTasksDone[taskIndex].tags = currentPersonalListTasksDone[taskIndex].tags.filter(tag => tag.id !== tagDelInfo.id);
                currentPersonalListTasks[taskIndex].possibleTags.push({
                    key: Math.random(),
                    id: tagDelInfo.id,
                    name: tagDelInfo.name
                });
            }
        }
    };
    const handleUpdateTag = (updatedTag: Tag) => {
        updateTagsInReactiveArray(updatedTag, currentPersonalListTasks);
        updateTagsInReactiveArray(updatedTag, currentPersonalListTasksDone);
    };
    const updateTagsInReactiveArray = (updatedTag: Tag, reactiveTaskArray: Task[]) => {
        reactiveTaskArray.forEach((task: Task) => {
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
    const createList = async (list: List) => {
        const response = await api.postInfo(`saveList/`, {list, uuid: socketUUID});
        await bigMenu.firstRequest();
        return response;
    };
    const updateList = async (list: List) => {
        await api.postInfo(`updateList/${list.id}`, {list, uuid: socketUUID});
        if (list.name) {
            currentListInfo.name = list.name;
        } else if (list.color) {
            currentListInfo.color = list.color;
        }
        await bigMenu.firstRequest();
    };
    /* - PERSONAL LIST */
    const addAlert = (newAlert: Alert) => {
        if (alerts.length > 2) {
            alerts.splice(0, 1);
        }
        alerts.push(newAlert);
        sortAlertsTop();
    };
    const removeAlert = (alertId: number) => {
        const idx = alerts.findIndex(alert => alert.id === alertId);
        alerts.splice(idx, 1);
        sortAlertsTop();
    };
    const sortAlertsTop = () => {
        alerts.forEach((alert, idx) => {
            alert.top = ((10 + 75) * idx) + 10 + 'px';
            alerts[idx] = alert;
        });
    };
    /* + SOCKET */
    const connectSocket = async () => {
        try {
            if (!socket.connected) {
                socket.connect();
            }

            socket.emit('subscribe', 'ListViewStore');

            socket.on('taskUpdated', (updatedTask: { uuid: string, task: Task }) => {
                if (updatedTask.uuid !== socketUUID) {
                    handlePersonalListTaskSocketUpdate(updatedTask.task);
                }
            });
            socket.on('taskDeleted', (task: { uuid: string, taskId: number }) => {
                if (task.uuid !== socketUUID) {
                    handlePersonalListTaskSocketDelete(task.taskId);
                }
            });
            socket.on('taskCreated', (newTask: { uuid: string, task: Task }) => {
                if (newTask.uuid !== socketUUID) {
                    handlePersonalListTaskSocketCreate(newTask.task);
                }
            });
            socket.on('listUpdated', (updatedList: { uuid: string, list: List }) => {
                if (updatedList.uuid !== socketUUID) {
                    handlePersonalListSocketUpdate(updatedList.list);
                }
            });
            socket.on('createdTagTask', (createdTagTask: { uuid: string, tag: object }) => {
                if (createdTagTask.uuid !== socketUUID) {
                    handleTagTaskSocketCreate(createdTagTask);
                }
            });
            socket.on('addTagTask', (addTagToTask: { uuid: string, tag: object }) => {
                if (addTagToTask.uuid !== socketUUID) {
                    handleAddTagTaskSocket(addTagToTask);
                }
            });
            socket.on('deleteTagTask', (deleteTagTask: { uuid: string, tag: object }) => {
                if (deleteTagTask.uuid !== socketUUID) {
                    handleDeleteTagTaskSocket(deleteTagTask);
                }
            });
            socket.on('deleteTag', (deleteTag: { uuid: string, tag: Tag }) => {
                if (deleteTag.uuid !== socketUUID) {
                    handleDeleteTagSocket();
                }
            });
            socket.on('updateTag', (updateTag: { uuid: string, tag: Tag }) => {
                if (updateTag.uuid !== socketUUID) {
                    handleUpdateTagTaskSocket(updateTag.tag);
                }
            });
        } catch (e) {
            console.log(e);
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
    const handlePersonalListTaskSocketUpdate = (updatedTask: Task) => {
        console.log(`Updating task id=${updatedTask.id} on current list from socket:`, updatedTask);
        /*if (route.params.id_list) {
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
        } else if (route.params.name) {
            currentSortListTasks.forEach((list, idx) => {
                const index = list.tasks.findIndex(task => task.id === updatedTask.id);
                if (index !== -1) {
                    currentSortListTasks[idx].tasks.splice(index, 1, { ...currentSortListTasks[idx].tasks[index], ...updatedTask });
                    return 0;
                }
            });
        } else if (route.params.id_tag) {

        }*/
        getTasksOrTags(true).then();
        bigMenu.firstRequest().then();
    };
    const handlePersonalListTaskSocketDelete = (taskId: number) => {
        console.log('\\Delete task from websocket...')
        /*setTimeout(() => {
            console.log(taskId)
            if (taskId) {
                if (route.params.id_list) {
                    currentPersonalListTasks.forEach((task, idx) => {
                        if (task.id === taskId) {
                            currentPersonalListTasks.splice(idx, 1);
                        }
                    });
                } else if (route.params.name) {
                    currentSortListTasks.forEach((list, index) => {
                        list.tasks.forEach((task, idx) => {
                            if (task.id === taskId) {
                                currentSortListTasks[index].tasks.splice(idx, 1);
                                return 0;
                            }
                        });
                    });
                } else if (route.params.id_tag) {

                }
            }
        }, 500);*/
        getTasksOrTags(true).then();
        bigMenu.firstRequest().then();
    };
    const handlePersonalListTaskSocketCreate = (newTask: Task) => {
        console.log('Create task from websocket...')
        /*setTimeout(() => {
            if (newTask) {
                if (route.params.id_list) {
                    const index = currentPersonalListTasks.findIndex(task => task.id === newTask.id);
                    if (index === -1) {
                        currentPersonalListTasks.push(newTask);
                    }
                } else if (route.params.name) {
                    console.log(newTask)
                    const list = currentSortListTasks.find(list => list.personal_list.id === newTask.id_list);
                    if (list) {
                        const index = list.tasks.findIndex(task => task.id === newTask.id);
                        if (index === -1) {
                            list.tasks.push(newTask);
                        }
                    }
                } else if (route.params.id_tag) {

                }
            }
        },500);*/
        getTasksOrTags(true).then();
        bigMenu.firstRequest().then();
    };
    const handlePersonalListSocketUpdate = (updatedList: List) => {
        console.log('Updating list info from websocket...')
        /*if (route.params.id_list) {
            currentListInfo.key = updatedList.key;
            currentListInfo.id = updatedList.id;
            currentListInfo.name = updatedList.name;
            currentListInfo.color = updatedList.color;
        } else if (route.params.name) {
            const list = currentSortListTasks.find(list => list.personal_list.id === updatedList.id);
            console.log(list)
            if (list) {
                list.personal_list.key = updatedList.key;
                list.personal_list.id = updatedList.id;
                list.personal_list.name = updatedList.name;
                list.personal_list.color = updatedList.color;
                list.tasks.forEach((task, idx) => {
                    list.tasks[idx].color = updatedList.color;
                })
            }
        } else if (route.params.id_tag) {

        }*/
        getTasksOrTags(true).then();
        bigMenu.firstRequest().then();
    };
    const handleTagTaskSocketCreate = (createdTagTask: object) => {
        console.log('Add created tag to task...');
        /*handleAddTagToTask({
            key: Math.random(),
            id: createdTagTask.tag.id,
            name: createdTagTask.tag.name,
        }, createdTagTask.taskId);*/
        getTasksOrTags(true).then();
        bigMenu.firstRequest().then();
    };
    const handleAddTagTaskSocket = (addTagToTask: object) => {
        console.log('Add tag to task...');
        /*handleAddTagToTask({
            key: Math.random(),
            id: addTagToTask.tag.id,
            name: addTagToTask.tag.name,
        }, addTagToTask.taskId);*/
        getTasksOrTags(true).then();
        bigMenu.firstRequest().then();
    };
    const handleDeleteTagTaskSocket = (deleteTagTask: object) => {
        console.log('\\Delete tag task from websocket...');
        /*handleDeleteTagTask({
            task_id: deleteTagTask.taskId,
            tag_id: deleteTagTask.tag.id,
            tag_name: deleteTagTask.tag.name,
        });*/
        getTasksOrTags(true).then();
        bigMenu.firstRequest().then();
    };
    const handleDeleteTagSocket = () => {
        console.log('\\Delete tag from websocket...');
        getTasksOrTags(true).then();
        bigMenu.firstRequest().then();
    };
    const handleUpdateTagTaskSocket = (updateTag: Tag) => {
        console.log('Update tag...', updateTag);
        /*handleUpdateTag(updateTag.tag);*/
        getTasksOrTags(true).then();
        bigMenu.firstRequest().then();
    };
    /* - SOCKET */
    return {
        tasks: currentPersonalListTasks,
        tasksDone: currentPersonalListTasksDone,
        sortTasks: currentSortListTasks,
        listInfo: currentListInfo,
        sortListInfo: currentSortListInfo,
        user,
        searchResult,
        loading,
        loadingSmall,
        is_somethingWrong,
        request,
        tags,
        currentTag,
        currentPath,
        alerts,
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
        deleteTag,
        createList,
        updateList,
        addAlert,
        removeAlert,
    };
});
