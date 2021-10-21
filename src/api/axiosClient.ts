import axios, { AxiosInstance } from 'axios';

export class AxiosResponse<T> {
    statusCode: number = 0;
    response: T | any;
    isError: boolean = false;

    constructor(init?: Partial<AxiosResponse<T>>) {
        Object.assign(this, init);
    }
}

const axiosClient = ():AxiosInstance => {
    const token = localStorage.getItem('access_token');

    let header = {
        'content-type': 'application/json',
        'x-api-key': process.env.API_KEY
    }
    if (!token) {
        return axios.create({
            baseURL: process.env.BASE_URL,
            headers: {
                ...header,
                Authorization: `Bearer ${token}`
            }
        });
    }
    return axios.create({
        baseURL: process.env.BASE_URL,
        headers: header
    });
}

export const axiosGet = async <T>(url: string): Promise<AxiosResponse<T>> => {
    const { axiosResponse } = { axiosResponse: { data: new AxiosResponse()}};
    axiosClient().get(url).then(data =>
        axiosResponse.data = new AxiosResponse({
            statusCode: data.status,
            response: data.data,
        })).catch(error =>
        axiosResponse.data = new AxiosResponse({
            statusCode: error.code,
            response: error.response,
            isError: true,
        })
    );
    return axiosResponse.data;
}

export const axiosPost = async <T>(url: string, data: any): Promise<AxiosResponse<T>> => {
    const { axiosResponse } = { axiosResponse: { data: new AxiosResponse()}};
    axiosClient().post(url, data).then(data =>
        axiosResponse.data = new AxiosResponse({
            statusCode: data.status,
            response: data.data,
        })).catch(error =>
        axiosResponse.data = new AxiosResponse({
            statusCode: error.code,
            response: error.response,
            isError: true,
        })
    );
    return axiosResponse.data;
}

export default axiosClient()
