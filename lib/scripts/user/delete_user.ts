#!/usr/bin/env ts-node

import { deleteUserById } from '../../dataAccessLayer/entities/user/deleteUser';
import { generateArgv, printObject } from '../utils/utils';

const argv = generateArgv();

(async ()=> {
    if(!argv.userid) {
        console.log("Please provide userid");
    }
    try {
        const user = await deleteUserById(argv.userid);
        printObject(user);
    } catch(e){
        console.log(e);
    }
})();
