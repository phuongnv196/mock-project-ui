import StorageKeys from "../constants/storage-keys";
import { axiosGet, axiosPost } from "./axiosClient";
import {UserModel} from "../models/user.model";

const userApi = {
    register(user: UserModel) {
        const url = 'register/';
        return axiosPost(url, user);
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
