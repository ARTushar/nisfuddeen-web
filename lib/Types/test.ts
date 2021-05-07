import { generatePutTransactItemRaw, mapItemToAlias } from '../dataAccessLayer/utils/utils';
import {
    biodataGsi1args,
    biodataGsi2args,
    biodataGsi3argsFemale,
    biodataGsi3argsMale,
    biodataGsi4argsFemale,
    biodataGsi4argsMale, biodataGsi5args, biodataGsi6args,
    commonBiodataGlobalArgs,
    generateBIKeys,
    generateEIKeys
} from '../dataAccessLayer/utils/generateKeys';
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
import { deleteSameFields, isEqual, isEqualDeep } from '../utils/helpers';
import { generateRandomBiodata } from '../scripts/utils/data_generation/generateRandomBiodata';
import { getKeys } from '../scripts/utils/utils';
import Biodata from '../models/biodata/Biodata';
import PersonalInformation from '../models/biodata/PersonalInformation';
import EducationQualification from '../models/biodata/EducationQualification';

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

const newBi = BasicInformation.mapFromAlias(bi.mapToAlias());
console.log(isEqualDeep(bi, newBi));

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

const addressCopy = new Address({
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

// let range = new RangePair(undefined, 3);
// console.log(range);
// let v = range.toFormatString();
// console.log(v);
// console.log(RangePair.fromFormatString(v));

// console.log(isEqualDeep(addressCopy, newAddress));

let a = generateRandomBiodata('halamadrid');
// let b = generateRandomBiodata('halamadrid');
// console.log(isEqualDeep(a, b))
// console.log(a);
// console.log(b)
// deleteSameFields(a, b, ['userID']);
// console.log(a);
// console.log(b)
