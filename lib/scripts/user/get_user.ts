#!/usr/bin/env ts-node

import { getUserByEmail, getUserById, getUserByMobile } from '../../dataAccessLayer/entities/user/getUser';
import { generateArgv, printObject } from '../utils/utils';

const argv = generateArgv();

(async ()=> {
  if(argv.userid) {
    try {
      const user = await getUserById(argv.userid);
      printObject(user);
    } catch(e){
        console.log(e);
    }
  }

  if(argv.email) {
    try {
      const user = await getUserByEmail(argv.email);
      printObject(user);
    } catch(e){
      console.log(e);
    }
  }

  if(argv.mobile) {
    try {
      const user = getUserByMobile(argv.mobile);
      printObject(user);
    } catch(e){
        console.log(e);
    }
  }
})();