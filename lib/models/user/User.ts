export class User {
    userId: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    accountType: string;
    subscriptionType: string;

    constructor(userId: string, fullName: string, mobileNumber: string, email: string, accountType: string, subscriptionType: string) {
        this.userId = userId;
        this.fullName = fullName;
        this.mobileNumber = mobileNumber;
        this.email = email;
        this.accountType = accountType;
        this.subscriptionType = subscriptionType;
    }
    
}