#!/usr/bin/env ts-node

import { generateArgv } from '../utils/utils';
import deleteStar from '../../dataAccessLayer/entities/profile/deleteStar';

const argv = generateArgv();

(async ()=> {
    if(argv.by && argv.to) {
        try {
            const deleted  = await deleteStar(argv.by, argv.to);
            console.log('Deleted:', deleted);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
