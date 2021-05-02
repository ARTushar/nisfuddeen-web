#!/usr/bin/env ts-node
import { deleteUserById } from '../../dataAccessLayer/entities/user/deleteUser';

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

function printObject(obj) {
    console.log(JSON.stringify(obj, null, 2))
}

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
