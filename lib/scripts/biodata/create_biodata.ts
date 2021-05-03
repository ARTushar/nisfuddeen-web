#!/usr/bin/env ts-node

import createUser from '../../dataAccessLayer/entities/user/createUser';
import { generateArgv, printObject } from '../utils/utils';
import createBiodata from '../../dataAccessLayer/entities/biodata/createBiodata';
import { generateRandomBiodata } from '../utils/data_generation/generateRandomBiodata';
import { generateRandomUser } from '../utils/data_generation/generateRandomUser';

const argv = generateArgv();

(async ()=> {
    let user = generateRandomUser();
    try {
       user = await createUser(user);
        printObject(user);
    } catch (e) {
        console.log(e);
        return;
    }
    const biodata = generateRandomBiodata(user.id)
    try {
        const newBiodata = await createBiodata(biodata);
        printObject(newBiodata);
    } catch(e){
        console.log(e);
    }
})();
