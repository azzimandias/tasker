import axios from "axios";

const PRODMODE = !['localhost', '127.0.0.1', '0.0.0.0', ''].includes(window.location.hostname);

export const HTTP = axios.create({
    baseURL: PRODMODE ? process.env.VUE_APP_API_URL_PROD : process.env.VUE_APP_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export default {
    url: PRODMODE ? process.env.VUE_APP_API_URL_PROD : process.env.VUE_APP_API_URL,
    prefix: 'api/',

    async getCookies() {
        try {
            await HTTP.get(this.url + 'sanctum/csrf-cookie');
            //console.log('csrf-cookie')

        } catch (e) {
            console.log(e);
        }
    },
    async isAuthorized() {
        try {
            const response = await HTTP.get(this.url + 'check');
            //console.log('user authorized')
            return await response.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    async getInfo(path) {
        try {
            const response = await HTTP.get(this.url + this.prefix + path);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async getInfoWithArgs(path, args) {
        try {
            const response = await HTTP.get(this.url + this.prefix + path, args);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async postInfo(path, body) {
        try {
            const response = await HTTP.post(this.url + this.prefix + path, JSON.stringify(body));
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async saveList(obj) {
        try {
            const response = await HTTP.post(this.url + this.prefix + 'saveList', JSON.stringify(obj));
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async deleteList(listId) {
        try {
            const response = await HTTP.post(this.url + this.prefix + 'deleteList', +listId);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async globalSearch(searchObj) {
        try {
            const response = await HTTP.post(this.url + this.prefix + 'globalSearch', searchObj);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async signUp(obj) {
        try {
            const response = await HTTP.post(this.url + 'register', obj);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async signIn(obj) {
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
