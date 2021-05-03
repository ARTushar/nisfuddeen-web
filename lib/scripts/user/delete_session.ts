#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import { deleteSessionByToken } from '../../dataAccessLayer/entities/user/deleteSession';

const argv = generateArgv();

(async ()=> {
    if(!argv.token) {
        console.log("Please provide token");
        return;
    }
    try {
        const session = await deleteSessionByToken(argv.token);
        printObject(session);
    } catch(e){
        console.log(e);
    }
})();
