export class ShopRegisterModel {
    phoneNumber?: string;
    name?: string;
    logo?: File;

    constructor(init: Partial<ShopRegisterModel>) {
        Object.assign(this, init);
    }
}