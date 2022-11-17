import axios from 'axios';
import { baseURL } from "./const";

const axiosClient = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json'
    }
});

export default axiosClient;
