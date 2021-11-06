import StorageKeys from "../constants/storage-keys";
import { axiosGet, axiosPost } from "./axiosClient";
import { HttpClient } from "./httpClient";
import {UserRegisterModel} from "../models/user-register.model";
import { serialize } from "object-to-formdata";
import { CustomerModel } from "models/customer.model";

const httpClient = new HttpClient();

const userApi = {
    create: async (customerId: string, shopId: string): Promise<any> => {
        const url = 'Cart/create';
        return httpClient.post<any>(url, {
            customerId: customerId,
            shopId: shopId
          });
    },
    getCartById: async (cartId: string, isGetShop: boolean = false): Promise<any> => {
        const url = `Cart/${cartId}/getShop=${isGetShop}`;
        return httpClient.get<any>(url);
    },
    addItem: async (itemId: string, customerId: string, cartId: string): Promise<any> => {
        const url = 'Cart/add/item';
        return httpClient.post<any>(url, {
            itemId: itemId,
            customerId: customerId,
            cartId: cartId
        });
    },
    remove: async (itemId: string, customerId: string, cartId: string): Promise<any> => {
        const url = 'Cart/remove/item';
        return httpClient.post<any>(url, {
            itemId: itemId,
            customerId: customerId,
            cartId: cartId
        });
    },
    existShopCustomer: async (shopId: string, customerId: string): Promise<any> => {
        const url = 'Cart/exist/shop/customer';
        return httpClient.post<any>(url, {
            customerId: shopId,
            shopId: customerId
          });
    },
    removeCustomer: async (cartId: string, customerId: string, customerIdToRemove: string): Promise<any> => {
        const url = 'Cart/exist/shop/customer';
        return httpClient.post<any>(url, {
            customerId: customerId,
            cartId: cartId,
            customerIdToRemoved: customerIdToRemove
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
