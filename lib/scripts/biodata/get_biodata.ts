#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import { getBiodataByUserId } from '../../dataAccessLayer/entities/biodata/getBiodata';

const argv = generateArgv();

(async ()=> {
    if(argv.userid) {
        try {
            const biodata = await getBiodataByUserId(argv.userid);
            printObject(biodata);
        } catch(e){
            console.log(e);
        }
    }


})();
