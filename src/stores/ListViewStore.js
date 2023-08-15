import { defineStore } from 'pinia';
import {ref, reactive, onMounted, watchEffect} from "vue";
import {useRoute} from "vue-router";
import api from "@/api";
import {useBigMenuStore} from "@/stores/BigMenuStore";

export const useListViewStore = defineStore('listViewStore', () => {
    const tasks = reactive([]);
    const header = ref('');
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
                tasks.length = 0;
            } else if (route.params.id_tag) {
                tags.length = 0;
            }
            arr[1].forEach(item => {
                item.key = Math.random();
                if (route.params.id_list || route.params.name) {
                    tasks.push(item);
                } else if (route.params.id_tag) {
                    tags.push(item);
                }
            });
            if (route.params.id_list || route.params.name) {
                header.value = arr[0];
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
        try {
            const response = await api.postInfo(`http://localhost/updateTask`, task);
        } catch (e) {
            console.log(e);
        }
        await bigMenu.firstRequest();
    }

    return {
        tasks,
        header,
        loading,
        loadingSmall,
        is_somethingWrong,
        request,
        tags,
        tag_name,
        currentPath,
        getTasksOrTags,
        updateTask
    };
});
