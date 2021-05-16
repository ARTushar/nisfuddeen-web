#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import deleteLink from '../../dataAccessLayer/entities/profile/deleteLink';

const argv = generateArgv();

(async ()=> {
    if(argv.by && argv.to) {
        try {
            const deleted  = await deleteLink(argv.by, argv.to);
            console.log('Deleted:', deleted);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
