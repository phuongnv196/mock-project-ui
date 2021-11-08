import { CartItemModel } from "./cart-item.model";
import { ShopModel } from "./shop.model";

export class CartModel {
    cartId?:	string
    status?:	string
    orderTime?: Date;
    deliveryTime?: Date;
    deliveryInformation?:	string
    shopId?:	string;
    shop?: ShopModel;
    customerId?: string;
    itemsInCart: Array<CartItemModel> = [];

    constructor(init?: Partial<CartModel>) {
        Object.assign(this, init);
    }
}