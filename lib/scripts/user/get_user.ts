#!/usr/bin/env ts-node
import { getUserByEmail, getUserById, getUserByMobile } from '../../dataAccessLayer/entities/user/getUser';

export {}
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

function printObject(obj) {
  console.log(JSON.stringify(obj, null, 2))
}

const run = async ()=> {
  if(argv.userid) {
    try {
      const user = await getUserById(argv.userid)
      printObject(user)
    } catch(e){
        console.log(e)
    }
  }

  if(argv.email) {
    try {
      const user = await getUserByEmail(argv.email)
      printObject(user)
    } catch(e){
      console.log(e)
    }
  }

  if(argv.mobile) {
    try {
      const user = getUserByMobile(argv.mobile)
      printObject(user)
    } catch(e){
        console.log(e)
    }
  }
};

run();


