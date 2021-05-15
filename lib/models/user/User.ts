import createUser from '../../dataAccessLayer/entities/user/createUser';
import { getUserByEmail, getUserById, getUserByMobile } from '../../dataAccessLayer/entities/user/getUser';
import { updateUser } from '../../dataAccessLayer/entities/user/updateUser';
import { deleteUserById } from '../../dataAccessLayer/entities/user/deleteUser';
import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { userAliases } from '../../dataAccessLayer/utils/aliases';
import { debug } from '../../utils/helpers';

interface UserConstructorParams {
    id?: string;
    name?: string;
    mobileNumber?: string;
    email?: string;
    gender?: string;
    completeAccount?: boolean;
    accountType?: string;
    subscriptionType?: string;
    createdAt?: string;
    updatedAt?: string;
    emailVerified?: string;
    biodataSubmitted?: boolean;
}

interface  UserUpdateParams {
    id: string;
    name?: string;
    mobileNumber?: string;
    email?: string;
    gender?: string;
    completeAccount?: boolean;
    accountType?: string;
    subscriptionType?: string;
    emailVerified?: string;
    biodataSubmitted?: boolean;
}

export default class User {
    id: string;
    name: string;
    mobileNumber: string;
    email: string;
    gender?: string;
    completeAccount?: boolean;
    accountType: string;
    subscriptionType: string;
    emailVerified: string;
    createdAt: string;
    updatedAt: string;
    biodataSubmitted: boolean;

    constructor({id, name, biodataSubmitted, mobileNumber, email, gender, completeAccount, accountType, subscriptionType, emailVerified}: UserConstructorParams) {
        this.id = id;
        this.name = name;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.gender = gender;
        this.completeAccount = completeAccount
        this.accountType = accountType;
        this.subscriptionType = subscriptionType;
        this.emailVerified = emailVerified;
        this.biodataSubmitted = biodataSubmitted
    }

    mapToAlias() {
        return mapItemToAlias(userAliases, this);
    }

    static mapFromAlias(item): User {
        return new User({
            ...mapItemFromAlias(userAliases, item)
        })
    }

    static async createAccountByProvider(fullName: string, email: string, emailVerified: string) {
        try {
            return await createUser(new User({
                name: fullName,
                email: email,
                emailVerified: emailVerified,
                completeAccount: false,
                subscriptionType: "free",
                biodataSubmitted: false,
            }));
        } catch (e) {
            // throw createServerError("Cannot Create the account.");
            throw e;
        }
    }

    static async createAccount(fullName: string, email: string, emailVerified: string, mobile: string, accountType: string): Promise<User> {
        try {
            return await createUser(new User({
                name: fullName,
                mobileNumber: mobile,
                email,
                accountType,
                subscriptionType: "free",
                biodataSubmitted: false,
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
            throw e;
        }
    }

    static async getByMobile(mobile: string): Promise<User> {
        try {
            return await getUserByMobile(mobile);
        } catch (e) {
            throw e;
        }
    }

    static async getById(id: string):Promise<User> {
        try {
            const user =  await getUserById(id);
            debug('getuserbyid', user);
            return user;
        } catch (e) {
            throw e;
        }
    }

    static async updateUser({id, email, gender, completeAccount, mobileNumber, emailVerified, accountType, name, subscriptionType}: UserUpdateParams){
        debug("update user mobile number", mobileNumber);
        try {
            return await updateUser(new User({
                id,
                name,
                mobileNumber,
                email,
                gender,
                completeAccount,
                emailVerified,
                accountType,
                subscriptionType
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