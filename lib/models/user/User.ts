import { AccountType, SubscriptionType } from '../../Types/types';

interface UserConstructorParams {
    userId: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    accountType: AccountType;
    subscriptionType: SubscriptionType;
}

export class User {
    userId: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    accountType: AccountType;
    subscriptionType: SubscriptionType;

    constructor({userId, fullName, mobileNumber, email, accountType, subscriptionType}: UserConstructorParams) {
        this.userId = userId;
        this.fullName = fullName;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.accountType = accountType;
        this.subscriptionType = subscriptionType;
    }
    
}