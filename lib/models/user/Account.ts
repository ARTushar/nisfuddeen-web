import { getAccountByProviderAccountId } from '../../dataAccessLayer/entities/user/getAccount';
import createAccount from '../../dataAccessLayer/entities/user/createAccount';
import { deleteAccount } from '../../dataAccessLayer/entities/user/deleteAccount';
import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { accountAliases } from '../../dataAccessLayer/utils/aliases';

interface AcConstructorParams {
    userId: string;
    providerId: string;
    providerAccountId: string;
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
    providerAccountId: string;
    providerType: string;
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: string;
    createdAt: string;
    updatedAt: string;

    constructor({
                    userId,
                    providerId,
                    providerAccountId,
                    providerType,
                    refreshToken,
                    accessToken,
                    accessTokenExpires,
                    createdAt = null,
                    updatedAt = null
                }: AcConstructorParams) {
        this.userId = userId;
        this.providerId = providerId;
        this.providerAccountId = providerAccountId;
        this.providerType = providerType;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.accessTokenExpires = accessTokenExpires;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    mapToAlias() {
        return mapItemToAlias(accountAliases, this);
    }

    static mapFromAlias(item): Account {
        return new Account({
            accessToken: '', accessTokenExpires: '', providerAccountId: '', providerId: '', providerType: '', refreshToken: '', userId: '',
            ...mapItemFromAlias(accountAliases, item)
        })
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
                providerAccountId: accountId,
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