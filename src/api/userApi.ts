import StorageKeys from "../constants/storage-keys";
import { axiosGet, axiosPost } from "./axiosClient";
import { HttpClient } from "./httpClient";
import {UserRegisterModel} from "../models/user-register.model";
import { serialize } from "object-to-formdata";

const httpClient = new HttpClient();

const userApi = {
    register: async (user: UserRegisterModel): Promise<UserRegisterModel> => {
        const url = 'Customer/register';
        return httpClient.post<UserRegisterModel>(url, serialize(user));
    },
    login(data: any) {
        const url = '/login';
        alert(1);
        return axiosPost(url, data);
    },
    async getUser(params: any) {
        const newParams = { ...params }
        const accessToken = localStorage.getItem(StorageKeys.access)
        const url = `users/`;
        const response = await axiosGet(url);
        return response
    },
}

export default userApi
