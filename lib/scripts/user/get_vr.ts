#!/usr/bin/env ts-node

import generateArgv from '../utils/generateArgv';
import printObject from '../utils/printObject';
import { getVR } from '../../dataAccessLayer/entities/user/getVR';

const argv = generateArgv();

(async ()=> {
    if(!(argv.token && argv.secret)) {
        console.log("Please provide token && secret");
    }
    try {
        const vr = await getVR(argv.token, argv.secret);
        printObject(vr);
    } catch(e){
        console.log(e);
    }
})();
