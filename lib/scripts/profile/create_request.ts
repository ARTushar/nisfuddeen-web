#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import Request from '../../models/profile/Request';
import createRequest from '../../dataAccessLayer/entities/profile/createRequest';

const argv = generateArgv();

(async ()=> {
    if(argv.by && argv.to) {
        try {
            const request: Request = await createRequest(argv.by, argv.to);
            printObject(request);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
