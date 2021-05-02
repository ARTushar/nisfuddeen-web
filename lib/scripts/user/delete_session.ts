#!/usr/bin/env ts-node

import generateArgv from '../utils/generateArgv';
import printObject from '../utils/printObject';
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
