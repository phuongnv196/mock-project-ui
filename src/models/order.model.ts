export class OrderModel {
    orderId?: string;
    shopId?: string;
    customerName?: string;
    customerPhoneNumber?: string;
    totalPrice: number = 0;
    status?: string;
    orderTime?: Date;
    deliveryInformation?: string;
    isSuccess: boolean = false;
    errorMessage?: string;

    constructor(init?: Partial<OrderModel>) {
        Object.assign(this, init);
    }
}