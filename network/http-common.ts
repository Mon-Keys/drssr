import axios from "axios";

const baseURL = "http://leonidperl.in:3001/api/v1"

const axiosClient = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});

axiosClient.defaults.withCredentials = true

export default axiosClient
