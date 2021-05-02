#!/usr/bin/env ts-node

import generateArgv from '../utils/generateArgv';
import printObject from '../utils/printObject';
import { getAccountsSessionsById } from '../../dataAccessLayer/entities/user/getAccountsSessions';

const argv = generateArgv();

(async ()=> {
    if(!argv.userid) {
        console.log("Please provide userid");
    }
    try {
        const accounts = await getAccountsSessionsById(argv.userid);
        printObject(accounts);
    } catch(e){
        console.log(e);
    }
})();
