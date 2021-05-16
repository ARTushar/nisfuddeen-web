#!/usr/bin/env ts-node

import { generateArgv } from '../utils/utils';
import deleteRequest from '../../dataAccessLayer/entities/profile/deleteRequest';

const argv = generateArgv();

(async ()=> {
    if(argv.by && argv.to) {
        try {
            const deleted  = await deleteRequest(argv.by, argv.to);
            console.log('Deleted:', deleted);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
