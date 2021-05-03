#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import Session from '../../models/user/Session';
import updateSession from '../../dataAccessLayer/entities/user/updateSession';

const argv = generateArgv();

(async ()=> {
    if(!(argv.userid && argv.stoken)) {
        console.log("Please provide userid && stoken");
        return;
    }
    if(!argv.expires) {
        argv.expires = 60*1000;
    }
    const session = new Session({
        userId: argv.userid,
        sessionToken: argv.stoken,
    });
    try {
        const updatedUser = await updateSession(session, argv.expires)
        printObject(updatedUser)
    } catch(e){
        console.log(e)
    }
})();
