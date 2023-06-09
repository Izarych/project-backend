export interface User {
    id: number;
    email: string;
    password: string;
    phoneNumber: string;
    isActivated: boolean;
    activationLink: string;
    roles: any;
};