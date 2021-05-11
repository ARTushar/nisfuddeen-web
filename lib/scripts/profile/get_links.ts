#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import Link from '../../models/profile/Link';
import getLinks from '../../dataAccessLayer/entities/profile/getLinks';

const argv = generateArgv();

(async ()=> {
    if(argv.uid) {
        try {
            const links: Link[]  = await getLinks(argv.uid);
            printObject(links);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
