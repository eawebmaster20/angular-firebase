export interface IUser{
    id?: string;
    username:string;
    email: string;
    password?:string;
}

export interface IResponseUser{
    uid: string,
    email:string,
    emailVerified: boolean,
    displayName: string,
    isAnonymous: boolean,
    photoURL: string,
    providerData: IProviderData[],
    stsTokenManager: IStsTokenManager,
    createdAt: string,
    lastLoginAt: string,
    apiKey: string,
    appName: string
}

interface IProviderData {
    providerId: string,
    uid: string,
    displayName: string,
    email: string,
    phoneNumber: null | string,
    photoURL: string
}

interface IStsTokenManager {
    refreshToken: string,
    accessToken: string,
    expirationTime: number,
}