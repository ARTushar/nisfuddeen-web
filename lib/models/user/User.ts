import { AccountType, SubscriptionType } from '../../Types/types';
import { accountTypeFactory } from '../../Types/factoryTypes';
import createUser from '../../dataAccessLayer/entities/user/createUser';
import { errorFactory } from '../../utils/helpers';
import { createServerError } from '../../utils/errorCreators';
import { getUserByEmail, getUserByMobile } from '../../dataAccessLayer/entities/user/getUser';
import { comparePassword } from '../../utils/passwordHelpers';

interface UserConstructorParams {
    userId?: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    password?: string;
    accountType: AccountType;
    subscriptionType?: SubscriptionType;
    createdAt?: string;
    updatedAt?: string;
}

export default class User {
    userId: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    password: string
    accountType: AccountType;
    subscriptionType: SubscriptionType;
    createdAt: string;
    updatedAt: string;

    constructor({userId=null, fullName, mobileNumber, email, password=null, accountType, subscriptionType=SubscriptionType.Free}: UserConstructorParams) {
        this.userId = userId;
        this.fullName = fullName;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.password = password
        this.accountType = accountType;
        this.subscriptionType = subscriptionType;
    }

    static async createAccount(fullName: string, email: string, mobile: string, accountType: string, password: string): Promise<User> {
        const ac = accountTypeFactory(accountType);

        const user: User = await createUser(new User({
            fullName: fullName,
            mobileNumber: mobile,
            email: email,
            password: password,
            accountType: ac
        }));

        if(user) return user;
        throw errorFactory(new Error("Cannot Create the account."), createServerError);
    }

    static async loginByEmail(email: string, password: string) {
        const user: User = await getUserByEmail(email);
        if(!user) {
            throw errorFactory(new Error("Wrong Email"), createServerError);
        }
        if(! await comparePassword(password, user.password)){
            throw errorFactory(new Error("Wrong Password"), createServerError);
        }
        return user;
    }

    static async loginByMobile(mobile: string, password: string) {
        const user: User = await getUserByMobile(mobile);
        if(!user) {
            throw errorFactory(new Error("Wrong Mobile"), createServerError);
        }
        if(! await comparePassword(password, user.password)){
            throw errorFactory(new Error("Wrong Password"), createServerError);
        }
        return user;
    }
}