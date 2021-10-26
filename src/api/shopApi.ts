import { ShopModel } from 'models/shop.model';
import {HttpClient} from './httpClient';

const client = new HttpClient();
const shopApi =  {
    getAll: async (): Promise<Array<ShopModel>> => {
        return await client.get<Array<ShopModel>>('Shop/all');
    },
    getById: async (id: string): Promise<ShopModel> => {
        return await client.get<ShopModel>(`Shop/${id}`);
    },
}

export default shopApi;