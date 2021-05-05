#!/usr/bin/env ts-node

import Address from '../../models/biodata/Address';
import { generateArgv, printObject } from '../utils/utils';
import {
    getBiodatasByGnMsLocRelOc,
} from '../../dataAccessLayer/entities/biodata/getBiodata';

const argv = generateArgv();

(async() => {
    if(argv.gender && argv.ms && argv.country && argv.oc) {
        let enabled = true, verified = false;
        try {
            // const last = {"SK":{"S":"BIODATA"},"PK":{"S":"UID#1s4cBI4sQwBTEz9A5wAdISmHCS0"},"GSI1PK":{"S":"EN#true#VER#false#GEN#male#MS#widow#CN#usa"},"GSI1SK":{"S":"DIV#western#DIS#western#PO#mount vew#UID#1s4cBI4sQwBTEz9A5wAdISmHCS0"}}
            const biodatas = await getBiodatasByGnMsLocRelOc({
                enabled, verified,
                gender: argv.gender,
                maritalStatus : argv.ms,
                prayerTimes: argv.pt,
                prayerTimesAwwal: argv.pta,
                prayerTimesJamah: argv.ptj,
                beardStyle: argv.bs,
                aboveKnee: argv.ak,
                outfit: argv.split('-'),
                occupation: argv.oc,
                pAddress : new Address({
                    type: 'permanent',
                    country: argv.country,
                    division: argv.division,
                    district: argv.district,
                    postOffice: argv.postOffice
                }),
                limit : argv.limit
            })
            printObject(biodatas);

        } catch (e) {
            console.error(e);
        }
    }
})();
