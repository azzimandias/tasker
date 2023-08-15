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
        } catch (e) {
            console.log(e);
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
    async postInfo(path, body) {
        try {
            const response = await HTTP.post(path, JSON.stringify(body));
            return await response.data;
        } catch (e) {
            console.log(e);
        }
    },
}
