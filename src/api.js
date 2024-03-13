import axios from "axios";
export const HTTP = axios.create({
    baseURL: 'https://localhost',
    headers: {
        'Accept': 'application/json'
    }
});
export default {
    async getCookies() {
        HTTP.defaults.withCredentials = true;
        try {
            await HTTP.get('http://localhost/sanctum/csrf-cookie');
            console.log('csrf-cookie')
        } catch (e) {
            console.log(e);
        }
    },
    async isAuthorized() {
        try {
            const response = await HTTP.get('http://localhost/check');
            console.log('user authorized')
            return await response.data;
        } catch (e) {
            console.log(e);
            return e;
        }
    },
    async getInfo(path) {
        try {
            const response = await HTTP.get(path);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async getInfoWithArgs(path, args) {
        try {
            const response = await HTTP.get(path, args);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async postInfo(path, body) {
        try {
            const response = await HTTP.post(path, JSON.stringify(body));
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async saveList(obj) {
        try {
            const response = await HTTP.post('http://localhost/saveList', JSON.stringify(obj));
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async deleteList(listId) {
        try {
            const response = await HTTP.post('http://localhost/deleteList', +listId);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async globalSearch(searchString) {
        try {
            const response = await HTTP.post('http://localhost/globalSearch', searchString);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async signUp(obj) {
        try {
            const response = await HTTP.post('http://localhost/register', obj);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async signIn(obj) {
        try {
            const response = await HTTP.post('http://localhost/login', obj);
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async logout() {
        try {
            const response = await HTTP.post('http://localhost/logout');
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
}
