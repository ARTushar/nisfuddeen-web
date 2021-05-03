import Address from '../../../models/biodata/Address';
import EducationQualification from '../../../models/biodata/EducationQualification';
import { BirthDay, RangePair } from '../../../Types/types';
import BasicInformation from '../../../models/biodata/BasicInformation';
import ContactInformation from '../../../models/biodata/ContactInformation';
import ExtraInformation from '../../../models/biodata/ExtraInformation';
import FamilyInformation from '../../../models/biodata/FamilyInformation';
import MarriageInformation from '../../../models/biodata/MarriageInformation';
import PartnerQualities from '../../../models/biodata/PartnerQualities';
import PersonalInformation from '../../../models/biodata/PersonalInformation';
import Biodata from '../../../models/biodata/Biodata';
import { nisfuddeenEnums } from '../../../Types/enums';
import { generateRandomBoolean, generateRandomMobileNumber, getKeys, getRandomEnumValue, getRandomInt } from '../utils';

const poffices: object = {
    'bangladesh': {
        'dhaka': {
            'dhaka': ['jatrabari', 'dhandmondi', 'mirpur'],
            'madaripur': ['shivcor', 'shivpur']
        },
        'chittangong': {
            'noakhali': ['maizdee', 'chaiyani']
        }
    },
    'usa': {
        'california': {
            'western': ['mount vew']
        }
    }
}


const sInstitutes = ['A K High School', 'Motijheel Ideal School'];
const hsInstitutes = ['Notre Dame College', 'Holy Cross College'];
const ugradInstitutes = ['BUET', 'KUET', 'RUET', 'CUET', 'DU'];
const occupations = ['engineer', 'worker', 'doctor', 'student'];

function getsi(){
    return sInstitutes[getRandomInt(sInstitutes.length)];
}
function gethsi() {
    return hsInstitutes[getRandomInt(hsInstitutes.length)];
}
function getgsi() {
    return ugradInstitutes[getRandomInt(ugradInstitutes.length)]
}

function getInstitute(type: string)  {
    if(type === 'secondary') return getsi();
    if(type === 'higherSecondary') return gethsi();
    return getgsi();
}
function getsResults(type: string) {
    if(type === 'secondary' || type === 'higherSecondary') return getRandomInt(6, 3).toString();
    return getRandomInt(5, 3).toString();
}

function getDept(type: string) {
    const hsdepts = ['science', 'commerce', 'arts'];
    const udepts = ['cse', 'eee', 'physics', 'ipe'];
    if(type === 'secondary' || type === 'higherSecondary') return hsdepts[getRandomInt(hsdepts.length)];
    return udepts[getRandomInt(udepts.length)];
}

function generateRandomAddress(typeIndex): Address {
    const countries = getKeys(poffices);
    const cnIndex = getRandomInt(countries.length);
    const divisions = getKeys(poffices[countries[cnIndex]]);
    const divIndex = getRandomInt(divisions.length);
    const districts = getKeys(poffices[countries[cnIndex]][divisions[divIndex]]);
    const disIndex = getRandomInt(districts.length);
    const pOffices = getKeys(poffices[countries[cnIndex]][divisions[divIndex]][districts[disIndex]]);
    const pindex = getRandomInt(pOffices.length);
    return new Address({
        type: nisfuddeenEnums.addressType[typeIndex],
        country: countries[cnIndex],
        division: divisions[divIndex],
        district: districts[disIndex],
        postOffice: pOffices[pindex]
    })
}

function generateRandomEq(typeIndex: number) {
    const degreeName = nisfuddeenEnums.educationDegree[typeIndex];
    const department = getDept(degreeName);
    const passYear = getRandomInt(2021, 2000);
    const instituteName = getInstitute(degreeName);
    const result = getsResults(degreeName);
    return new EducationQualification({
        degreeName,
        department,
        passYear,
        instituteName,
        result
    })
}


function generateRandomBday(): BirthDay {
    return new BirthDay(getRandomInt(2004, 1990), getRandomInt(13, 1), getRandomInt(30, 1));
}
function generateRandomBI(): BasicInformation {
    const gender = getRandomEnumValue(nisfuddeenEnums.gender);
    const maritalStatus = getRandomEnumValue(nisfuddeenEnums.maritalStatus);
    const birthDay = generateRandomBday();
    const facialColor = getRandomEnumValue(nisfuddeenEnums.facialColor);
    const height = getRandomInt(84, 40);
    const weight = getRandomInt(200, 25);
    const bloodGroup = getRandomEnumValue(nisfuddeenEnums.bloodGroup);
    const occupation = getRandomEnumValue(occupations);
    return new BasicInformation({
        gender,
        maritalStatus,
        birthDay,
        facialColor,
        height,
        weight,
        bloodGroup,
        occupation
    })
}


function generateRandomCI(): ContactInformation {
    const fatherMobile = generateRandomMobileNumber();
    const motherMobile = generateRandomMobileNumber();
    const guardianMobile = generateRandomMobileNumber();
    return new ContactInformation({
        fatherMobile,
        motherMobile,
        guardianMobile
    })
}


function generateRandomEI(): ExtraInformation {
    const gkas = generateRandomBoolean();

    return new ExtraInformation({
        aboutMe: "I'm a good boy. I will not let you down. :)",
        aboutOccupation: "My income is 100% halal. So no worries. :)",
        guardianKnowsAboutSubmission: gkas
    })
}

function generateRandomFI(): FamilyInformation {
    return new FamilyInformation({
        fatherAlive: generateRandomBoolean(),
        fatherOccupation: getRandomEnumValue(occupations),
        motherAlive: generateRandomBoolean(),
        motherOccupation: getRandomEnumValue(occupations),
        totalSisters: getRandomInt(5),
        totalBrothers: getRandomInt(5),
        financialStatus: getRandomEnumValue(nisfuddeenEnums.financialStatus)
    })
}

function genereateRandomMMI(): MarriageInformation {
    const max = getRandomInt(1000000, 100000);
    const min = getRandomInt(max+1, 1000);
    return new MarriageInformation({
        guardianAgreed: generateRandomBoolean(),
        reasonOfMarriage: "I just want to marry to complete half of my deen",
        ideaAboutMarriage: "It's necessary to keep one from haram deeds",
        willManageWifePardah: generateRandomBoolean(),
        willAllowWifeStudy: getRandomEnumValue(nisfuddeenEnums.afterMarriageStudyReply),
        afterMarriageStay: getRandomEnumValue(nisfuddeenEnums.afterMarriageStudyReply),
        desiresDowryOrGift: generateRandomBoolean(),
        maleMohoranaRange: new RangePair(max, min),
        maleMohoranaPaidTime: getRandomEnumValue(nisfuddeenEnums.mohoranaTimeReply),
    })
}

function genereateRandomFMI(): MarriageInformation {
    const max = getRandomInt(1000000, 100000);
    const min = getRandomInt(max+1, 1000);
    return new MarriageInformation({
        guardianAgreed: generateRandomBoolean(),
        reasonOfMarriage: "I just want to marry to complete half of my deen",
        ideaAboutMarriage: "It's necessary to keep one from haram deeds",
        jobAfterMarriage: getRandomEnumValue(nisfuddeenEnums.afterMarriageStudyReply),
        carryStudyAfterMarriage: getRandomEnumValue(nisfuddeenEnums.marriageReply),
        femaleMohoranaExpectation: new RangePair(max, min),
        femaleMohoranaExpectedPaidTime: getRandomEnumValue(nisfuddeenEnums.mohoranaTimeReply)
    })
}

function genereateRandomPQ(): PartnerQualities {
    const minAge = getRandomInt(25, 16);
    const maxAge = getRandomInt(35, minAge)
    const minHeight = getRandomInt(50, 66);
    const maxHeight = getRandomInt(72, minHeight);
    const country = getRandomEnumValue(poffices);
    const districts = [];
    for(const div of getKeys(poffices[country])){
        districts.push(getKeys(poffices[country][div]));
    }

    return new PartnerQualities({
        ageRange: new RangePair(minAge, maxAge),
        facialComplexion: getRandomEnumValue(nisfuddeenEnums.facialColor),
        heightRange: new RangePair(minHeight, maxHeight),
        minimumEducationDegree: getRandomEnumValue(nisfuddeenEnums.educationDegree),
        country,
        district: getRandomEnumValue(districts),
        maritalStatus: getRandomEnumValue(nisfuddeenEnums.maritalStatus),
        occupation: getRandomEnumValue(occupations),
        financialStatus: [getRandomEnumValue(nisfuddeenEnums.financialStatus)],
        desiredQualities: "Honest && Religious && Caring && Considerable"
    })
}

function generateMaleOutfit():string[] {
    let outfit = [['panjabi', 'paijama'], ['shirt', 'pant']];
    return getRandomEnumValue(outfit);
}

function generateFemaleOutfit(): string[] {
    let outfit = [['niqab', 'abaya', 'handSocks', 'feetSocks'], ['hijab', 'salwarKamiz' ]]
    return getRandomEnumValue(outfit);
}

function generateRandomMPI(): PersonalInformation {
    const prayerTimes = getRandomInt(6);
    return new PersonalInformation({
        outfit: generateMaleOutfit(),
        beardStyle: getRandomEnumValue(nisfuddeenEnums.beardStyle),
        pantPajamaAboveKnee: generateRandomBoolean(),
        prayerTimes,
        malePrayerTimesInJamah: getRandomInt(prayerTimes+1),
        durationOfRegularPrayer: getRandomInt(10),
        mahramMaintain: getRandomEnumValue(nisfuddeenEnums.mixAnswer),
        majhab: getRandomEnumValue(nisfuddeenEnums.majhab),
        politicalPhilosophy: "No view",
        watchDramaMovie: getRandomEnumValue(nisfuddeenEnums.negativeAnswer),
        readSahihQuran: getRandomEnumValue(nisfuddeenEnums.positiveAnswer),
        listenMusic: getRandomEnumValue(nisfuddeenEnums.negativeAnswer),
        anyDisease: "No",
        deenMehnat: "No but like tehriki iman",
        pirFollower: "No",
        mazarBelief: "Don't believe",
        favoriteIslamicBooks: "Hayatus Sahabah, Muntakhab Hadith",
        favoriteScholars: "Maolana Ahmadullah, Maolana Saad Kandhalvi",
        specialQualities: "don't have any :|",
        guardian: getRandomEnumValue(nisfuddeenEnums.guardian)
    })
}

function generateRandomFPI(): PersonalInformation {
    const prayerTimes = getRandomInt(6);
    return new PersonalInformation({
        outfit: generateFemaleOutfit(),
        beardStyle: getRandomEnumValue(nisfuddeenEnums.beardStyle),
        prayerTimes,
        femalePrayerTimesInAwwal: getRandomInt(prayerTimes+1),
        durationOfRegularPrayer: getRandomInt(10),
        mahramMaintain: getRandomEnumValue(nisfuddeenEnums.mixAnswer),
        majhab: getRandomEnumValue(nisfuddeenEnums.majhab),
        politicalPhilosophy: "No view",
        watchDramaMovie: getRandomEnumValue(nisfuddeenEnums.negativeAnswer),
        readSahihQuran: getRandomEnumValue(nisfuddeenEnums.positiveAnswer),
        listenMusic: getRandomEnumValue(nisfuddeenEnums.negativeAnswer),
        anyDisease: "No",
        deenMehnat: "No but like tehriki iman",
        pirFollower: "No",
        mazarBelief: "Don't believe",
        favoriteIslamicBooks: "Hayatus Sahabah, Muntakhab Hadith",
        favoriteScholars: "Maolana Ahmadullah, Maolana Saad Kandhalvi",
        specialQualities: "don't have any :|",
        guardian: getRandomEnumValue(nisfuddeenEnums.guardian)
    })
}
export function generateRandomBiodata(userId: string): Biodata {
    const totalAddresses = getRandomInt(4);
    let addresses: Address[] = [];
    for(let j = 0; j < totalAddresses; j++) {
        addresses.push(generateRandomAddress(j));
    }
    const totalEqs = getRandomInt(6);
    let eqs: EducationQualification[] = [];
    for(let j = 0; j < totalEqs; j++) {
        eqs.push(generateRandomEq(j));
    }
    const bi = generateRandomBI();
    const mi = bi.gender === 'male'? genereateRandomMMI(): genereateRandomFMI();
    const pi = bi.gender === 'male'? generateRandomMPI(): generateRandomFPI();
    return new Biodata({
        userId,
        basicInformation: bi,
        addresses,
        educationQualifications: eqs,
        contactInformation: generateRandomCI(),
        extraInformation: generateRandomEI(),
        familyInformation: generateRandomFI(),
        marriageInformation: mi,
        partnerQualities: genereateRandomPQ(),
        personaInformation: pi,
    });
}
