#!/usr/bin/env ts-node

import generateArgv from '../utils/generateArgv';
import printObject from '../utils/printObject';
import { deleteAccount } from '../../dataAccessLayer/entities/user/deleteAccount';

const argv = generateArgv();

(async ()=> {
    if(!(argv.pid && argv.aid)) {
        console.log("Please provide pid && aid");
        return;
    }
    try {
        const account = await deleteAccount(argv.pid, argv.aid);
        printObject(account);
    } catch(e){
        console.log(e);
    }
})();
