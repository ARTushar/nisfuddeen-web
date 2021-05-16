#!/usr/bin/env ts-node

import { generateArgv } from '../utils/utils';
import deleteBiodata from '../../dataAccessLayer/entities/biodata/deleteBiodata';

const argv = generateArgv();

(async ()=> {
    if(argv.userid) {
        try {
            const deleted = await deleteBiodata(argv.userid);
            console.log("Biodata deleted: ", deleted);
        } catch(e){
            console.log(e);
        }
    }
})();
