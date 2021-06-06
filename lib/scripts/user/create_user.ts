#!/usr/bin/env ts-node

import User from '../../models/user/User';
import createUser from '../../dataAccessLayer/entities/user/createUser';
import { generateArgv, printObject } from '../utils/utils';

const argv = generateArgv();

(async ()=> {
    const user = new User({
        name: argv.name,
        mobileNumber: argv.mobile,
        email: argv.email,
        accountType: argv.at,
        subscriptionType: argv.st,
        emailVerified: argv.emailV? argv.emailV === 'true': undefined
    });
    try {
        const newUser = await createUser(user);
        printObject(newUser);
    } catch(e){
        console.log(e);
    }
})();
