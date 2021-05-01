#!/usr/bin/env ts-node

import User from '../../models/user/User';
import { accountTypeFactory, subscriptionTypeFactory } from '../../Types/factoryTypes';
import createUser from '../../dataAccessLayer/entities/user/createUser';

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

function printObject(obj) {
    console.log(JSON.stringify(obj, null, 2))
}

(async ()=> {
    const user = new User({
        fullName: argv.name,
        mobileNumber: argv.mobile,
        email: argv.email,
        accountType: argv.at? accountTypeFactory(argv.at): undefined,
        subscriptionType: argv.st? subscriptionTypeFactory(argv.st): undefined,
        emailVerified: argv.emailVerified
    })
    try {
        const newUser= await createUser(user)
        printObject(newUser)
    } catch(e){
        console.log(e)
    }
})();
