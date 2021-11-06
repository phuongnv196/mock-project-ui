export class Item {
    itemId?: string;
    name?: string;
    price?: string;
    image?: File;
    isActive?: boolean;
    shopId?: string;

    constructor(init?: Partial<Item>) {
        Object.assign(this, init);
    }
}