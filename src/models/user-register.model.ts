export class UserRegisterModel {
    customerId?: string;
    name?: string;
    phoneNumber?: string;
    avatar?: File;

    constructor(init: Partial<UserRegisterModel>) {
        Object.assign(this, init);
    }
}