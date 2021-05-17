#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import Link from '../../models/profile/Link';
import createLink from '../../dataAccessLayer/entities/profile/createLink';

const argv = generateArgv();

(async ()=> {
    if(argv.by && argv.to && argv.rel) {
        try {
            const link: Link = await createLink(argv.by, argv.to, argv.rel);
            printObject(link);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
