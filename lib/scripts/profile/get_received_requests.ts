#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import getReceivedRequests from '../../dataAccessLayer/entities/profile/getReceivedRequests';
import Request from '../../models/profile/Request';

const argv = generateArgv();

(async ()=> {
    if(argv.uid) {
        try {
            const requests: Request[]  = await getReceivedRequests(argv.uid);
            printObject(requests);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
