import axios from "axios";
import config from "./config";

export const HTTP = axios.create({
    baseURL: config.MOCK,
});

export default {
    async getTags() {
        try {
            const response = await HTTP.get('tags');
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}
