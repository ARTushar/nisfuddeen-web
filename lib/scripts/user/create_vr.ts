#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import createVR from '../../dataAccessLayer/entities/user/createVR';

const argv = generateArgv();

(async ()=> {
    if(!(argv.indentifer && argv.token && argv.secret )) {
        console.log("Please provide userid, token && expires");
        return;
    }
    if(!argv.expires) argv.expires = 60* 1000;
    try {
        const newSession = await createVR(argv.identifier, argv.token, argv.secret, argv.expires);
        printObject(newSession);
    } catch(e){
        console.log(e);
    }
})();
