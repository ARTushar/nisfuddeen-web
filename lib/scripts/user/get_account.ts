#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import { getAccountByProviderAccountId } from '../../dataAccessLayer/entities/user/getAccount';

const argv = generateArgv();

(async ()=> {
    if(!(argv.pid && argv.aid)) {
        console.log("Please provide pid && aid");
    }
    try {
        const account = await getAccountByProviderAccountId(argv.pid, argv.aid);
        printObject(account);
    } catch(e){
        console.log(e);
    }
})();
