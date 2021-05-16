#!/usr/bin/env ts-node

import { generateArgv } from '../utils/utils';
import updateStatusLink from '../../dataAccessLayer/entities/profile/updateStatusLink';

const argv = generateArgv();

(async ()=> {
    if(argv.by && argv.to && argv.status) {
        try {
            const updated = await updateStatusLink(argv.by, argv.to, argv.status);
            console.log("Updated Link Status: ", updated);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
