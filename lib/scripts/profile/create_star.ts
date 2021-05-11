#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import Star from '../../models/profile/Star';
import createStar from '../../dataAccessLayer/entities/profile/createStar';

const argv = generateArgv();

(async ()=> {
    if(argv.by && argv.to) {
        try {
            const star: Star = await createStar(argv.by, argv.to);
            printObject(star);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
