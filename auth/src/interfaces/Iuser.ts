export interface IUser {
    id: number;
    email: string;
    password: string;
    phoneNumber: string;
    isActivated: boolean;
    activationLink: string;
    roles: any;
}