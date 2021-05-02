#!/usr/bin/env ts-node

import generateArgv from '../utils/generateArgv';
import printObject from '../utils/printObject';
import createSession from '../../dataAccessLayer/entities/user/createSession';

const argv = generateArgv();

(async ()=> {
    if(!(argv.userid && argv.expires)) {
        console.log("Please provide userid and expires");
        return;
    }
    try {
        const newSession = await createSession(argv.userid, argv.expires);
        printObject(newSession);
    } catch(e){
        console.log(e);
    }
})();
