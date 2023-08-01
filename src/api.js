import axios from "axios";
import config from "./config";

export const HTTP = axios.create({
    baseURL: config.MOCK,
});

export default {
    async getTags() {
        try {
            const response = await HTTP.get('https://0a7f480b-e28b-43e2-bf10-0f77a152cddf.mock.pstmn.io');
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
}
