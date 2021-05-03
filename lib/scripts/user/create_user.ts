#!/usr/bin/env ts-node

import User from '../../models/user/User';
import createUser from '../../dataAccessLayer/entities/user/createUser';
import { generateArgv, printObject } from '../utils/utils';
import { AccountType, SubscriptionType } from '../../dataAccessLayer/utils/aliases';

const argv = generateArgv();

(async ()=> {
    const user = new User({
        fullName: argv.name,
        mobileNumber: argv.mobile,
        email: argv.email,
        accountType: argv.at? AccountType[argv.at]: undefined,
        subscriptionType: argv.st? SubscriptionType[argv.st]: undefined,
        emailVerified: argv.emailVerified
    });
    try {
        const newUser= await createUser(user);
        printObject(newUser);
    } catch(e){
        console.log(e);
    }
})();
