export class ItemCreateModel {
    itemId?: string;
    shopId?: string;
    name?: string;
    price?: string;
    image?: File;

    constructor(init: Partial<ItemCreateModel>) {
        Object.assign(this, init);
    }
}