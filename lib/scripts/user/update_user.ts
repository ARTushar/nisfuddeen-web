#!/usr/bin/env ts-node

import { updateUser } from '../../dataAccessLayer/entities/user/updateUser';
import User from '../../models/user/User';
import { generateArgv, printObject } from '../utils/utils';
import { AccountType, SubscriptionType } from '../../dataAccessLayer/utils/aliases';

const argv = generateArgv();

(async ()=> {
    if(argv.userid) {
        const user = new User({
            id: argv.userid,
            name: argv.name,
            mobileNumber: argv.mobile,
            email: argv.email,
            accountType: argv.at? AccountType[ argv.at ]: undefined,
            subscriptionType: argv.st? SubscriptionType[ argv.st ]: undefined,
            emailVerified: argv.emailVerified
        })
        try {
            const updatedUser = await updateUser(user)
            printObject(updatedUser)
        } catch(e){
            console.log(e)
        }
    } else {
        console.log("Please provide userid");
    }
})();