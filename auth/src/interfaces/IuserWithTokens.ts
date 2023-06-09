export interface UserWithTokens {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number,
        email: string,
        isActivated: boolean
    }
};