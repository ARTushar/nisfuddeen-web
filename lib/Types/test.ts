import { generatePutTransactItemRaw, mapItemToAlias } from '../dataAccessLayer/utils/utils';
import { generateBIKeys, generateEIKeys } from '../dataAccessLayer/utils/generateKeys';
import {
    AddressType,
    basicInformationAliases, BloodGroup, EducationDegree,
    extraInformationAliases, FacialColor, Gender,
    invertAlias, MaritalStatus
} from '../dataAccessLayer/utils/aliases';
import ExtraInformation from '../models/biodata/ExtraInformation';
import BasicInformation from '../models/biodata/BasicInformation';
import { BirthDay, RangePair } from './types';
import Address from '../models/biodata/Address';

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

const item = mapItemToAlias(extraInformationAliases, ei);

const values = {
    ...item,
    "Hala": "madrid"
}
// console.log(values);

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

// printObject(generatePutTransactItemRaw(generateBIKeys, ["124"], basicInformationAliases, bi, "BIj"));


function printJSON(json) {
    console.log(JSON.stringify(json, null, 4));
}


// printJSON(invertAlias(BloodGroup))
const address = new Address({
    type: 'permanent',
    country: "BD",
    division: "Dh",
    district: 'Dh',
    postOffice: "Jatrabari",
})
const mapped = address.mapToAlias();
// printJSON(mapped);
const newAddress = Address.mapFromAlias(mapped);
// printJSON(newAddress);

let range = new RangePair(undefined, 3);
console.log(range);
let v = range.toFormatString();
console.log(v);
console.log(RangePair.fromFormatString(v));