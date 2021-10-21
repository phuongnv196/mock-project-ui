export class UserModel {
    name: string | undefined;
    email?: string;
    password?: string;
    profilePicUrl?: string;
    verified?: boolean;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    roles: Role[] = [];

    constructor(init: Partial<UserModel>) {
        Object.assign(this, init);
    }
}

export enum Role {
    Admin = 100,
    GeneralUser = 101
}
