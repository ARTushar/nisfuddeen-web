#!/usr/bin/env ts-node

import { generateArgv, printObject } from '../utils/utils';
import { generateRandomBiodata } from '../utils/data_generation/generateRandomBiodata';
import { generateRandomUser } from '../utils/data_generation/generateRandomUser';
import Biodata from '../../models/biodata/Biodata';
import BasicInformation from '../../models/biodata/BasicInformation';
import { BirthDay } from '../../Types/types';
import updateBiodata from '../../dataAccessLayer/entities/biodata/updateBiodata';
import FamilyInformation from '../../models/biodata/FamilyInformation';
import EducationQualification from '../../models/biodata/EducationQualification';

const argv = generateArgv();

(async ()=> {
    if(argv.userid && argv.gender) {
        const biodata = new Biodata({
            enabled: argv.en,
            verified: argv.ver,
            basicInformation: new BasicInformation({
                maritalStatus: argv.ms,
                birthDay: (argv.byear && argv.bmonth && argv.bday)? new BirthDay(argv.byear, argv.bmonth, argv.bday): undefined,
                facialColor: argv.fc,
                height: argv.height,
                weight: argv.weight,
                bloodGroup: argv.bg,
                occupation: argv.oc
            }),
            familyInformation: new FamilyInformation({
                fatherAlive: argv.fa? (argv.fa === 'true') : undefined,
            }),
           /* educationQualifications: [new EducationQualification({
                degreeName: 'postdoctorate',
                department: 'CSE',
                passYear: 2022,
                instituteName: 'BUET',
                result: '4/4'
            })]*/
        })
        // console.log(biodata);
        try {
            const newBiodata = await updateBiodata(argv.userid, biodata, argv.gender);
            printObject(newBiodata);
        } catch(e){
            console.log(e);
        }
    }
})();
