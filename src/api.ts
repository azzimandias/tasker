import axios from "axios";
import type { AxiosError } from 'axios';
import router from "@/router";

function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const part = parts.pop(); // string | undefined
        if (!part) return undefined;
        const cookieValue = part.split(';').shift();
        if (!cookieValue) return undefined;
        return decodeURIComponent(cookieValue);
    }
    return undefined;
}

const PRODMODE: boolean = !(['localhost', '127.0.0.1', '0.0.0.0', ''].includes(window.location.hostname));

export const HTTP = axios.create({
    baseURL: PRODMODE ? import.meta.env.VITE_APP_API_URL_PROD : import.meta.env.VITE_APP_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

HTTP.interceptors.request.use(config => {
    const token = getCookie('XSRF-TOKEN');
    if (token) {
        config.headers['X-XSRF-TOKEN'] = token;
    }
    return config;
});

export default {
    url: PRODMODE ? import.meta.env.VITE_APP_API_URL_PROD : import.meta.env.VITE_APP_API_URL,
    prefix: 'api/',

    async getCookies() {
        try {
            await HTTP.get(this.url + 'sanctum/csrf-cookie');
        } catch (e) {
            console.log(e);
        }
    },
    async isAuthorized() {
        try {
            const response = await HTTP.get(this.url + 'check');
            return await response.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    async getInfo(path: string) {
        try {
            const response = await HTTP.get(this.url + this.prefix + path);
            return await response.data;
        } catch (err: unknown) {
            const e = err as AxiosError;
            console.log(e);
            if (e.response?.status === 401 && router.currentRoute.value.path.includes('workspace')) {
                await router.push({ name: '/' });
            }
        }
    },
    async getInfoWithArgs(path: string, args: object) {
        try {
            const response = await HTTP.get(this.url + this.prefix + path, args);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async postInfo(path: string, body: object) {
        try {
            const response = await HTTP.post(this.url + this.prefix + path, JSON.stringify(body));
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async saveList(obj: object) {
        try {
            const response = await HTTP.post(this.url + this.prefix + 'saveList', JSON.stringify(obj));
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async deleteList(listId: number) {
        try {
            const response = await HTTP.post(this.url + this.prefix + 'deleteList', +listId);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async globalSearch(searchObj: object) {
        try {
            const response = await HTTP.post(this.url + this.prefix + 'globalSearch', searchObj);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async signUp(obj: object) {
        try {
            const response = await HTTP.post(this.url + 'register', obj);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async signIn(obj: object) {
        try {
            const response = await HTTP.post(this.url + 'login', obj);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async logout() {
        try {
            const response = await HTTP.post(this.url + 'logout');
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
}
