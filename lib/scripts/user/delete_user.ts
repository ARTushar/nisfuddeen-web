#!/usr/bin/env ts-node

import { deleteUserById } from '../../dataAccessLayer/entities/user/deleteUser';
import generateArgv from '../utils/generateArgv';
import printObject from '../utils/printObject';

const argv = generateArgv();

(async ()=> {
    if(argv.userid) {
        try {
            const user = await deleteUserById(argv.userid)
            printObject(user)
        } catch(e){
            console.log(e)
        }
    }
})();
