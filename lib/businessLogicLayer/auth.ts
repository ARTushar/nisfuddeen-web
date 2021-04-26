import { User } from '../models/user/User';
import createUser from '../dataAccessLayer/entities/user/createUser';
import { AccountType } from '../Types/types';
import { accountTypeFactory } from '../Types/factoryTypes';
import { errorFactory } from '../utils/helpers';
import { createServerError } from '../utils/errorCreators';
import { getUserByEmail, getUserByMobile } from '../dataAccessLayer/entities/user/getUser';
import { comparePassword } from '../utils/passwordHelpers';

export async function createAccount(fullName: string, email: string, mobile: string, accountType: string, password: string): Promise<User> {
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

export async function loginByEmail(email: string, password: string) {
    const user: User = await getUserByEmail(email);
    if(!user) {
        throw errorFactory(new Error("Wrong Email"), createServerError);
    }
    if(! await comparePassword(password, user.password)){
        throw errorFactory(new Error("Wrong Password"), createServerError);
    }
    return user;
}

export async function loginByMobile(mobile: string, password: string) {
    const user: User = await getUserByMobile(mobile);
    if(!user) {
        throw errorFactory(new Error("Wrong Mobile"), createServerError);
    }
    if(! await comparePassword(password, user.password)){
        throw errorFactory(new Error("Wrong Password"), createServerError);
    }
    return user;
}