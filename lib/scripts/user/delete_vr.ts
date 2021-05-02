#!/usr/bin/env ts-node

import generateArgv from '../utils/generateArgv';
import printObject from '../utils/printObject';
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
