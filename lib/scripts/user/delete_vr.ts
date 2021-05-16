#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import { deleteVR } from '../../dataAccessLayer/entities/user/deleteVR';

const argv = generateArgv();

(async ()=> {
    if(!(argv.token && argv.secret)) {
        console.log("Please provide token && secret");
        return;
    }
    try {
        const vr = await deleteVR(argv.token, argv.secret);
        printObject(vr);
    } catch(e){
        console.log(e);
    }
})();
