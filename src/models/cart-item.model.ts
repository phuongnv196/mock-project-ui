export class CartItemModel {
    id: number = 0;
    amount: number = 0;
    price: number = 0;
    customerId?:	string;
    cartId?:	string;
    itemId?:	string;
    isDeleted:	boolean = false;
    readyToOrder: boolean =  false;

    constructor(init?: Partial<CartItemModel>) {
        Object.assign(this, init);
    }
}