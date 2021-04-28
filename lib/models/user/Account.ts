import { getAccountByProviderAccountId } from '../../dataAccessLayer/entities/user/getAccount';

interface AcConstructorParams {
    userId: string;
    providerId: string;
    accountId: string;
    providerType: string;
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: string;
    createdAt?: string;
    updatedAt?: string;
}

export default class Account  {
    userId: string;
    providerId: string;
    accountId: string;
    providerType: string;
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: string;
    createdAt: string;
    updatedAt: string;


    constructor({userId, providerId, accountId, providerType, refreshToken, accessToken, accessTokenExpires, createdAt=null, updatedAt=null}: AcConstructorParams) {
        this.userId = userId;
        this.providerId = providerId;
        this.accountId = accountId;
        this.providerType = providerType;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.accessTokenExpires = accessTokenExpires;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static async getAccountByProviderAccountId(providerId: string, accountId: string): Promise<Account> {
        try {
            return await getAccountByProviderAccountId(providerId, accountId);
        } catch (e) {
            throw e;
        }
    }
}