export interface IUserWithTokens {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number,
        email: string,
        isActivated: boolean,
        roles: any
    }
};