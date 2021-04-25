import { AccountType, SubscriptionType } from '../../Types/types';

interface UserConstructorParams {
    userId?: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    password?: string;
    accountType: AccountType;
    subscriptionType: SubscriptionType;
    createdAt: string;
    updatedAt: string;
}

export class User {
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
    
}