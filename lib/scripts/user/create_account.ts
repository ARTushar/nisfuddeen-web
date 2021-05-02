#!/usr/bin/env ts-node

import generateArgv from '../utils/generateArgv';
import printObject from '../utils/printObject';
import Account from '../../models/user/Account';
import createAccount from '../../dataAccessLayer/entities/user/createAccount';

const argv = generateArgv();

(async ()=> {
    if(!(argv.userid && argv.pid && argv.aid && argv.atoken)) {
        console.log("Please provide userid, pid, aid, atoken");
        return;
    }
    const account = new Account({
        userId: argv.userid,
        providerId: argv.pid,
        providerAccountId: argv.aid,
        providerType: argv.ptype,
        refreshToken: argv.rtoken,
        accessToken: argv.atoken,
        accessTokenExpires: argv.expires,
    });
    try {
        const newAccount = await createAccount(account);
        printObject(newAccount);
    } catch(e){
        console.log(e);
    }
})();
