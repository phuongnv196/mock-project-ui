export class CustomerModel {
    customerId?: string;
    name?: string;
    phoneNumber?: string;
    avatar?: string;

    constructor(init?: Partial<CustomerModel>) {
        init && Object.assign(this, init);
    }
}