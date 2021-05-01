#!/usr/bin/env ts-node

import { updateUser } from '../../dataAccessLayer/entities/user/updateUser';
import User from '../../models/user/User';
import { accountTypeFactory, subscriptionTypeFactory } from '../../Types/factoryTypes';

export {}
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

function printObject(obj) {
    console.log(JSON.stringify(obj, null, 2))
}

const run = async ()=> {
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
};

run().then(r => console.log(r));


