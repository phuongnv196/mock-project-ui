import { ItemCreateModel } from 'models/item-create.model';
import {HttpClient} from './httpClient';
import { serialize } from "object-to-formdata";

const client = new HttpClient();
const itempApi =  {
    createItem: async (item: ItemCreateModel): Promise<ItemCreateModel> => {
        const url = 'Item/create';
        return client.post<ItemCreateModel>(url, serialize(item));
    },
}
export default itempApi;