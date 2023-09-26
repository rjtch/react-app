import Axios, { AxiosRequestConfig } from "axios";

// our global Axios instance including the base URL
const axios = Axios.create({
    baseURL: '',
});

// this function was taken from the Orval docs
export default async function customInstance<T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig
): Promise<T> {
    const { data } = await axios({ ...config, ...options });
    return data;
};
