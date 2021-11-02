import { ShopRegisterModel } from 'models/shop-register.model';
import { ShopModel } from 'models/shop.model';
import {HttpClient} from './httpClient';
import { serialize } from "object-to-formdata";

const client = new HttpClient();
const shopApi =  {
    getAll: async (): Promise<Array<ShopModel>> => {
        return await client.get<Array<ShopModel>>('Shop/all');
    },
    getById: async (id: string): Promise<ShopModel> => {
        return await client.get<ShopModel>(`Shop/${id}`);
    },
    createShop: async (shop: ShopRegisterModel): Promise<any> => {
        const url = 'Shop/register';
        return client.post<any>(url, serialize(shop));
    },
    login: async (phoneNumber: string): Promise<any> => {
        const url = 'Shop/login';
        return client.post<any>(url, { phoneNumber: phoneNumber});
    }
}

export default shopApi;