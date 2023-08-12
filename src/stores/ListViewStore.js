import { defineStore } from 'pinia';
import { ref, reactive, onMounted } from "vue";
import {useRoute} from "vue-router";

export const useListViewStore = defineStore('listViewStore', () => {
    const tasks = reactive([]);
    const header = ref('');
    const tags = reactive([]);
    const tag_name = ref('');
    const loading = ref(true);
    const is_somethingWrong = ref(false);
    const request = ref('');
    const route = useRoute();
    const currentPath = ref(route.path);

    const getTasksOrTags = async () => {
        currentPath.value = route.path;
        try {
            loading.value = true;
            is_somethingWrong.value = false;
            await fetchToServer();
            /*setTimeout(() => {
                fetchToServer();
            }, 0);*/
        } catch (e) {
            console.log(e);
            is_somethingWrong.value = true;
            loading.value = false;
        }
    }

    const  fetchToServer =  async () => {
        if (route.params.id_list) {
            request.value = `http://localhost/list?id=${route.params.id_list}`;
        } else if (route.params.name) {
            request.value = `http://localhost/list?name=${route.params.name}`;
        } else if (route.params.id_tag) {
            request.value = `http://localhost/tag?id=${route.params.id_tag}`;
        }
        const response =  await fetch(request.value);
        const arr =  await response.json();
        console.log(arr)
        setTimeout(() => {
            if ((typeof arr[1]) === "object" && arr.length) {
                if (route.params.id_list || route.params.name) {
                    tasks.length = 0;
                } else if (route.params.id_tag) {
                    tags.length = 0;
                }
                arr[1].forEach(item => {
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
            } else {
                is_somethingWrong.value = true;
                loading.value = false;
            }
        }, 300);
    }

    onMounted(async () => {
        await getTasksOrTags();
        const interval = setInterval(() => {
            if(String(currentPath.value) !== String(route.path)) {
                getTasksOrTags();
            }
        }, 0)
    });

    return {
        tasks,
        header,
        loading,
        is_somethingWrong,
        request,
        tags,
        tag_name,
        currentPath,
    };
});
