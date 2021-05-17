#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import { getStarsBy } from '../../dataAccessLayer/entities/profile/getStars';
import ShortBiodata from '../../models/biodata/ShortBiodata';

const argv = generateArgv();

(async ()=> {
    if(argv.uid) {
        try {
            const biodatas: ShortBiodata[]  = await getStarsBy(argv.uid);
            printObject(biodatas);
        } catch(e){
            console.log(e);
        }
    } else {
        console.log('Invalid arguments');
    }
})();
