import StorageKeys from "../constants/storage-keys";
import { axiosGet, axiosPost } from "./axiosClient";
import { HttpClient } from "./httpClient";
import {UserRegisterModel} from "../models/user-register.model";
import { serialize } from "object-to-formdata";
import { CustomerModel } from "models/customer.model";

const httpClient = new HttpClient();

const userApi = {
    register: async (user: UserRegisterModel): Promise<any> => {
        const url = 'Customer/register';
        return httpClient.post<any>(url, serialize(user));
    },
    login(phoneNumber: string) {
        const url = 'Customer/login';
        return httpClient.post<CustomerModel>(url, {
            phoneNumber: phoneNumber
        });
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
