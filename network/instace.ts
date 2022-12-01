import axios from 'axios';
import * as AxiosLogger from 'axios-logger';
import { baseURL } from './const';
import { setGlobalConfig } from 'axios-logger';

const axiosClient = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-type': 'application/json'
    }
});

setGlobalConfig({
    prefixText: false,
    status: true,
    url: false,
    method: false
});
axiosClient.interceptors.request.use((request) => {
    return AxiosLogger.requestLogger(request, {
        url: true,
        method: true,
        data: false
    });
}, AxiosLogger.errorLogger);

axiosClient.interceptors.response.use((response) => {
    return AxiosLogger.responseLogger(response, {
        dateFormat: 'HH:MM:ss',
        data: false
    });
}, AxiosLogger.errorLogger);

export default axiosClient;
