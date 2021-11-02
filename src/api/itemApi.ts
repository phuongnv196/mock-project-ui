import { ItemCreateModel } from 'models/item-create.model';
import { Item } from 'models/item.model';
import {HttpClient} from './httpClient';
import { serialize } from "object-to-formdata";

const client = new HttpClient();
const itempApi =  {
    createItem: async (item: ItemCreateModel): Promise<Item> => {
        const url = 'Item/create';
        return client.post<Item>(url, serialize(item));
    },
}
export default itempApi;