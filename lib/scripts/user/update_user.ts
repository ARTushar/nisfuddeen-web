#!/usr/bin/env ts-node

import { updateUser } from '../../dataAccessLayer/entities/user/updateUser';
import User from '../../models/user/User';
import { accountTypeFactory, subscriptionTypeFactory } from '../../Types/factoryTypes';
import generateArgv from '../utils/generateArgv';
import printObject from '../utils/printObject';

const argv = generateArgv();

(async ()=> {
    if(argv.userid) {
        const user = new User({
            userId: argv.userid,
            fullName: argv.name,
            mobileNumber: argv.mobile,
            email: argv.email,
            accountType: argv.at? accountTypeFactory(argv.at): undefined,
            subscriptionType: argv.st? subscriptionTypeFactory(argv.st): undefined,
            emailVerified: argv.emailVerified
        })
        try {
            const updatedUser = await updateUser(user)
            printObject(updatedUser)
        } catch(e){
            console.log(e)
        }
    }
})();