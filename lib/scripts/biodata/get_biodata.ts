#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import { getBiodataByUserId, getBiodatasBy1 } from '../../dataAccessLayer/entities/biodata/getBiodata';
import Address from '../../models/biodata/Address';

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

    if(argv.gender && argv.ms && argv.country) {
        let enabled = true, verified = false;
        try {
            // const last = {"SK":{"S":"BIODATA"},"PK":{"S":"UID#1s4cBI4sQwBTEz9A5wAdISmHCS0"},"GSI1PK":{"S":"EN#true#VER#false#GEN#male#MS#widow#CN#usa"},"GSI1SK":{"S":"DIV#western#DIS#western#PO#mount vew#UID#1s4cBI4sQwBTEz9A5wAdISmHCS0"}}

            const biodatas = await getBiodatasBy1(enabled, verified, argv.gender, argv.ms, new Address({
                type: 'permanent',
                country: argv.country,
                division: argv.division,
                district: argv.district,
                postOffice: argv.postOffice
            }), argv.limit)
            printObject(biodatas);

        } catch (e) {
            console.error(e);
        }
    }

})();
