import { generatePutTransactItemRaw, mapItem } from '../dataAccessLayer/utils/utils';
import { generateBIKeys, generateEIKeys } from '../dataAccessLayer/utils/generateKeys';
import { basicInformationAliases, extraInformationAliases } from '../dataAccessLayer/utils/aliases';
import ExtraInformation from '../models/biodata/ExtraInformation';
import BasicInformation from '../models/biodata/BasicInformation';
import { BirthDay } from './types';
import printObject from '../scripts/utils/printObject';

export {}

const alias = {
    "uncle": 'a',
    'aunt': 'a'
}
const val = 'b';

// console.log(Object.keys(alias).find(key => alias[key] === val));
const ei: ExtraInformation = new ExtraInformation({
    aboutMe: "I'm a student",
    aboutOccupation: "bekar",
    guardianKnowsAboutSubmission: false
})
const res = JSON.stringify(generatePutTransactItemRaw(generateEIKeys, ["123"], extraInformationAliases, ei, "EI"), null, 2);
console.log(res);

const item = {}
mapItem(item, extraInformationAliases, ei);

const values = {
    ...item,
    "Hala": "madrid"
}
console.log(values);

const bi: BasicInformation = new BasicInformation({
    gender: 'male',
    maritalStatus: 'unmarried',
    birthDay: new BirthDay(1997, 11, 28),
    facialColor: "pinkishWhite",
    height: 156,
    weight: 50,
    bloodGroup: "AB+",
    occupation: "engineer"
})

printObject(generatePutTransactItemRaw(generateBIKeys, ["124"], basicInformationAliases, bi, "BIj"));