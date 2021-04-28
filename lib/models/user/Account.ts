import { getAccountByProviderAccountId } from '../../dataAccessLayer/entities/user/getAccount';
import createAccount from '../../dataAccessLayer/entities/user/createAccount';
import { deleteAccount } from '../../dataAccessLayer/entities/user/deleteAccount';

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

interface CreateAccountParams {
    providerId: string;
    accountId: string;
    providerType: string;
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: string;
    userId: string;
}

export default class Account {
    userId: string;
    providerId: string;
    accountId: string;
    providerType: string;
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: string;
    createdAt: string;
    updatedAt: string;

    constructor({
                    userId,
                    providerId,
                    accountId,
                    providerType,
                    refreshToken,
                    accessToken,
                    accessTokenExpires,
                    createdAt = null,
                    updatedAt = null
                }: AcConstructorParams) {
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

    static async createAccount({
                                   providerId,
                                   accountId,
                                   providerType,
                                   refreshToken,
                                   accessToken,
                                   accessTokenExpires,
                                   userId
                               }: CreateAccountParams) {
        try {
            return await createAccount(new Account({
                userId,
                providerId,
                accountId,
                providerType,
                refreshToken,
                accessToken,
                accessTokenExpires
            }))

        } catch (e) {
            throw e;
        }
    }

    static async deleteAccount(providerId: string, accountId: string) {
        try {
            return await deleteAccount(providerId, accountId);
        } catch (e) {
            throw e;
        }
    }
}