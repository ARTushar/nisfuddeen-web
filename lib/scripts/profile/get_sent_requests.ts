#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import getSentRequests from '../../dataAccessLayer/entities/profile/getSentRequests';
import Request from '../../models/profile/Request';

const argv = generateArgv();

(async ()=> {
    if(argv.uid) {
        try {
            const requests: Request[]  = await getSentRequests(argv.uid);
            printObject(requests);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
