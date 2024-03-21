import axios from "axios";
export const HTTP = axios.create({
    baseURL: 'https://taskerlaravelapi.ru/',
    headers: {
        'Accept': 'application/json'
    }
});
export default {
    url: 'https://taskerlaravelapi.ru/',
    async getCookies() {
        HTTP.defaults.withCredentials = true;
        try {
            await HTTP.get(this.url + 'sanctum/csrf-cookie');
            console.log('csrf-cookie')
        } catch (e) {
            console.log(e);
        }
    },
    async isAuthorized() {
        try {
            const response = await HTTP.get(this.url + 'check');
            console.log('user authorized')
            return await response.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    async getInfo(path) {
        try {
            const response = await HTTP.get(this.url + path);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async getInfoWithArgs(path, args) {
        try {
            const response = await HTTP.get(this.url + path, args);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async postInfo(path, body) {
        try {
            const response = await HTTP.post(this.url + path, JSON.stringify(body));
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async saveList(obj) {
        try {
            const response = await HTTP.post(this.url + 'saveList', JSON.stringify(obj));
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async deleteList(listId) {
        try {
            const response = await HTTP.post(this.url + 'deleteList', +listId);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async globalSearch(searchString) {
        try {
            const response = await HTTP.post(this.url + 'globalSearch', searchString);
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
