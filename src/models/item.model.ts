export class Item {
    itemId?: string;
    name?: string;
    price?: number;
    image?: string;
    isActive?: boolean;
    shopId?: string;

    constructor(init: Partial<Item>) {
        Object.assign(this, init);
    }
}