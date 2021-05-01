import { AccountType, SubscriptionType } from '../../Types/types';
import { accountTypeFactory, subscriptionTypeFactory } from '../../Types/factoryTypes';
import createUser from '../../dataAccessLayer/entities/user/createUser';
import { getUserByEmail, getUserById, getUserByMobile } from '../../dataAccessLayer/entities/user/getUser';
import { updateUser } from '../../dataAccessLayer/entities/user/updateUser';
import { deleteUserById } from '../../dataAccessLayer/entities/user/deleteUser';

interface UserConstructorParams {
    userId?: string;
    fullName?: string;
    mobileNumber?: string;
    email?: string;
    accountType?: AccountType;
    subscriptionType?: SubscriptionType;
    createdAt?: string;
    updatedAt?: string;
    emailVerified?: string
}

interface  UserUpdateParams {
    userId: string;
    fullName?: string;
    mobileNumber?: string;
    email?: string;
    accountType?: string;
    subscriptionType?: string;
    emailVerified?: string
}

export default class User {
    id: string;
    name: string;
    mobileNumber: string;
    email: string;
    accountType: AccountType;
    subscriptionType: SubscriptionType;
    emailVerified: string;
    createdAt: string;
    updatedAt: string;

    constructor({userId, fullName, mobileNumber, email,  accountType, subscriptionType, emailVerified}: UserConstructorParams) {
        this.id = userId;
        this.name = fullName;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.accountType = accountType;
        this.subscriptionType = subscriptionType;
        this.emailVerified = emailVerified
    }

    static async createAccountByProvider(fullName: string, email: string, emailVerified: string) {
        try {
            return await createUser(new User({
                fullName: fullName,
                email: email,
                emailVerified: emailVerified,
                subscriptionType: SubscriptionType.Free
            }));
        } catch (e) {
            // throw createServerError("Cannot Create the account.");
            throw e;
        }
    }

    static async createAccount(fullName: string, email: string, emailVerified: string, mobile: string, accountType: string): Promise<User> {
        const ac = accountTypeFactory(accountType);

        try {
            return await createUser(new User({
                fullName: fullName,
                mobileNumber: mobile,
                email: email,
                accountType: ac
            }));
        } catch (e) {
            // throw createServerError("Cannot Create the account.");
            throw e;
        }
    }

    static async getByEmail(email: string): Promise<User> {
        try  {
            return await getUserByEmail(email);
        } catch (e) {
            // throw createServerError("Wrong Email");
            throw e;
        }
    }

    static async getByMobile(mobile: string): Promise<User> {
        try {
            return await getUserByMobile(mobile);
        } catch (e) {
            // throw createServerError("Wrong Mobile");
            throw e;
        }
    }

    static async getById(id: string):Promise<User> {
        try {
            return await getUserById(id);
        } catch (e) {
            // throw createServerError("Wrong ID");
            throw e;
        }
    }

    static async updateUser({userId, email, mobileNumber, emailVerified, accountType, fullName, subscriptionType}: UserUpdateParams){
        const ac = accountTypeFactory(accountType);
        const st = subscriptionTypeFactory(subscriptionType);

        try {
            return await updateUser(new User({
                userId,
                fullName,
                mobileNumber,
                email,
                emailVerified,
                accountType: ac,
                subscriptionType: st
            }))
        } catch (e) {
            throw e;
        }
    }

    static async deleteUserById(userId: string) {
        try {
            return await deleteUserById(userId);
        } catch(e) {
            throw e;
        }
    }

}