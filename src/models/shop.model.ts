import { Item } from "./item.model";

export class ShopModel {
    shopId?: string;
    name?: string;
    phoneNumber?: string;
    image?: string;
    isActived?: boolean;
    items: Item[] = [];

    constructor(init: Partial<ShopModel>) {
        Object.assign(this, init);
    }
}
