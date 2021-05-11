#!/usr/bin/env ts-node

import { generateArgv } from '../utils/utils';
import updateStatusRequest from '../../dataAccessLayer/entities/profile/updateStatusRequest';

const argv = generateArgv();

(async ()=> {
    if(argv.by && argv.to && argv.status) {
        try {
            const updated = await updateStatusRequest(argv.by, argv.to, argv.status);
            console.log("Updated Request Status: ", updated);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
