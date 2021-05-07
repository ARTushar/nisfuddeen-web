import Address from '../../models/biodata/Address';
import {
    addressAliases,
    basicInformationAliases,
    biodataAliases,
    educationQualificationAliases, familyInformationAliases,
    personalInformationAliases
} from './aliases';


export const globalIndexArgs = {
    biodata: {
        GSI1: ['userId', 'enabled', 'verified', 'gender', 'maritalStatus', 'address'],
        GSI2: ['userId', 'enabled', 'verified', 'gender', 'maritalStatus', 'address', 'institute'],
        GSI3Male: ['userId', 'enabled', 'verified', 'gender', 'maritalStatus', 'address', 'prayerTimes', 'prayerTimesJamah', 'outfit', 'aboveKnee', 'beardStyle'],
        GSI3Female: ['userId', 'enabled', 'verified', 'gender', 'maritalStatus', 'address', 'prayerTimes', 'prayerTimesAwwal', 'outfit'],
        GSI4Male: ['userId', 'enabled', 'verified', 'gender', 'maritalStatus', 'address', 'prayerTimes', 'prayerTimesJamah', 'outfit', 'aboveKnee', 'beardStyle', 'occupation'],
        GSI4Female: ['userId', 'enabled', 'verified', 'gender', 'maritalStatus', 'address', 'prayerTimes', 'prayerTimesAwwal', 'outfit', 'occupation'],
        GSI5: ['userId', 'enabled', 'verified', 'gender', 'maritalStatus', 'address', 'occupation', 'facialColor', 'financialStatus'],
        GSI6: ['userId', 'enabled', 'verified', 'gender', 'maritalStatus', 'address', 'occupation'],
    }
}

export const commonBiodataGlobalArgs = [
    biodataAliases.enabled,
    biodataAliases.verified,
    basicInformationAliases.maritalStatus,
    addressAliases.country,
    addressAliases.district
]

export const biodataGsi1args = [addressAliases.division, addressAliases.postOffice];
export const biodataGsi2args = [addressAliases.division, addressAliases.postOffice, educationQualificationAliases.instituteName];
export const biodataGsi3argsMale = [addressAliases.division, addressAliases.postOffice,
    personalInformationAliases.prayerTimes,
    personalInformationAliases.malePrayerTimesInJamah,
    personalInformationAliases.beardStyle,
    personalInformationAliases.pantPajamaAboveKnee,
    personalInformationAliases.outfit,
];
export const biodataGsi3argsFemale = [addressAliases.division, addressAliases.postOffice,
    personalInformationAliases.prayerTimes,
    personalInformationAliases.femalePrayerTimesInAwwal,
    personalInformationAliases.outfit,
];
export const biodataGsi4argsMale = [addressAliases.division, addressAliases.postOffice,
    personalInformationAliases.prayerTimes,
    personalInformationAliases.malePrayerTimesInJamah,
    personalInformationAliases.beardStyle,
    personalInformationAliases.pantPajamaAboveKnee,
    personalInformationAliases.outfit,
    basicInformationAliases.occupation
];
export const biodataGsi4argsFemale = [addressAliases.division, addressAliases.postOffice,
    personalInformationAliases.prayerTimes,
    personalInformationAliases.femalePrayerTimesInAwwal,
    personalInformationAliases.outfit,
    basicInformationAliases.occupation
];
export const biodataGsi5args = [
    basicInformationAliases.occupation,
    basicInformationAliases.facialColor,
    familyInformationAliases.financialStatus,
    basicInformationAliases.birthDay,
];
export const biodataGsi6args = [
    basicInformationAliases.occupation,
];

export function generateUserPrimaryKeys(userId: string) {
    return {
        PK: "USER#ID#" + userId,
        SK: "USER#ID#" + userId,
    }
}

export function generateUserGSI1Keys(email: string) {
    return {
        GSI1PK: "USER#EMAIL#" + email,
        GSI1SK: "USER#EMAIL#" + email,
    }
}

export function generateUserGSI2Keys(mobileNumber: string) {
    return {
        GSI2PK: "USER#MOBILE#" + mobileNumber,
        GSI2SK: "USER#MOBILE#" + mobileNumber,
    }
}

export function generateBiodataPrimaryKeys(userId: string) {
    return {
        PK: "UID#"+userId,
        SK: "BIODATA"
    }
}

export function generatePIKeys(userId: string) {
    return {
        PK: "UID#"+userId,
        SK: "BIODATA#PI"
    }
}

export function generateBIKeys(userId: string) {
    return {
        PK: "UID#"+userId,
        SK: "BIODATA#BI"
    }
}

export function generateCIKeys(userId: string) {
    return {
        PK: "UID#"+userId,
        SK: "BIODATA#CI"
    }
}
export function generateEQKeys(userId: string, degree: string) {
    return {
        PK: "UID#"+userId,
        SK: "BIODATA#EQ#"+degree
    }
}
export function generateEIKeys(userId: string) {
    return {
        PK: "UID#"+userId,
        SK: "BIODATA#EI"
    }
}
export function generateFIKeys(userId: string) {
    return {
        PK: "UID#"+userId,
        SK: "BIODATA#FI"
    }
}
export function generateMIKeys(userId: string) {
    return {
        PK: "UID#"+userId,
        SK: "BIODATA#MI"
    }
}
export function generatePQKeys(userId: string) {
    return {
        PK: "UID#"+userId,
        SK: "BIODATA#PQ"
    }
}
export function generateADKeys(userId: string, type: string) {
    return {
        PK: "UID#"+userId,
        SK: "BIODATA#AD#"+type
    }
}


interface GenerateBiodataGSI1KeysParams {
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string,
    pAddress: Address;
}


export function generateBiodataGSI1Keys({userId, enabled, verified, gender, maritalStatus, pAddress}: GenerateBiodataGSI1KeysParams) {
    return {
        GSI1PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#CN#"+pAddress.country,
        GSI1SK: "DIV#"+pAddress.district+"#DIS#"+pAddress.district+"#PO#"+pAddress.postOffice+"#UID#"+userId
    }
}


interface GenerateBiodataGSI2KeysParams {
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    ugradInstitute: string;
    pAddress: Address;
}

export function generateBiodataGSI2Keys({userId, enabled, verified, gender, maritalStatus, ugradInstitute, pAddress}: GenerateBiodataGSI2KeysParams) {
    return {
        GSI2PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#UGRAD#"+ugradInstitute,
        GSI2SK: "CN#"+pAddress.country+"#DIV#"+pAddress.district+"#DIS#"+pAddress.district+"#PO#"+pAddress.postOffice+"#UID#"+userId
    }
}


interface GenerateBiodataGSI3KeysMaleParams {
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    prayerTimes: number;
    prayerTimesJamah: number;
    outfit: string[];
    aboveKnee: boolean;
    beardStyle: string;
    pAddress: Address;
}

export function generateBiodataGSI3KeysMale({userId, enabled, verified, gender, maritalStatus, prayerTimes, prayerTimesJamah, outfit, aboveKnee, beardStyle, pAddress}: GenerateBiodataGSI3KeysMaleParams) {
    return {
        GSI3PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#CN#"+pAddress.country+"#DEEN#"+prayerTimes+prayerTimesJamah+aboveKnee+beardStyle+outfit.join('-'),
        GSI3SK: "DIV#"+pAddress.district+"#DIS#"+pAddress.district+"#PO#"+pAddress.postOffice+"#UID#"+userId
    }
}


interface GenerateBiodataGSI3KeysFemaleParams {
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    prayerTimes: number;
    prayerTimesAwwal: number;
    outfit: string[];
    pAddress: Address;
}

export function generateBiodataGSI3KeysFemale({userId, enabled, verified, gender, maritalStatus, prayerTimes, prayerTimesAwwal, outfit, pAddress}: GenerateBiodataGSI3KeysFemaleParams) {
    return {
        GSI3PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#CN#"+pAddress.country+"#DEEN#"+prayerTimes+prayerTimesAwwal+outfit.join('-'),
        GSI3SK: "DIV#"+pAddress.district+"#DIS#"+pAddress.district+"#PO#"+pAddress.postOffice+"#UID#"+userId
    }
}


interface GenerateBiodataGSI4KeysMaleParams {
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    occupation: string;
    prayerTimes: number;
    prayerTimesJamah: number;
    beardStyle: string;
    aboveKnee: boolean;
    outfit: string[];
    pAddress: Address;
}

export function generateBiodataGSI4KeysMale({userId, enabled, verified, gender, maritalStatus, occupation, prayerTimes, prayerTimesJamah, beardStyle, aboveKnee, outfit, pAddress}: GenerateBiodataGSI4KeysMaleParams) {
    return {
        GSI4PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#OC#"+occupation+"#CN#"+pAddress.country+"#DEEN#"+prayerTimes+prayerTimesJamah+aboveKnee+beardStyle+outfit.join('-'),
        GSI4SK: "DIV#"+pAddress.district+"#DIS#"+pAddress.district+"#PO#"+pAddress.postOffice+"#UID#"+userId
    }
}


interface GenerateBiodataGSI4KeysFemaleParams {
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    occupation: string;
    prayerTimes: number;
    prayerTimesAwwal: number;
    outfit: string[];
    pAddress: Address;
}

export function generateBiodataGSI4KeysFemale({userId, enabled, verified, gender, maritalStatus, occupation, prayerTimes, prayerTimesAwwal, outfit, pAddress}: GenerateBiodataGSI4KeysFemaleParams) {
    return {
        GSI4PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#OC#"+occupation+"#CN#"+pAddress.country+"#DEEN#"+prayerTimes+prayerTimesAwwal+outfit.join('-'),
        GSI4SK: "DIV#"+pAddress.district+"#DIS#"+pAddress.district+"#PO#"+pAddress.postOffice+"#UID#"+userId
    }
}


interface GenerateBiodataGSI5KeysParams {
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    occupation: string;
    facialComplexion: string;
    financialStatus: string;
    bDay: string;
    pAddress: Address;
}


export function generateBiodataGSI5Keys({userId, enabled, verified, gender, maritalStatus, occupation, facialComplexion, financialStatus, bDay, pAddress}: GenerateBiodataGSI5KeysParams) {
    return {
        GSI5PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#OC#"+occupation+"#FC#"+facialComplexion+"#FS#"+financialStatus+"#CN#"+pAddress.country+"#DIS#"+pAddress.district,
        GSI5SK: "BD#"+bDay+"#UID#"+userId
    }
}


interface GenerateBiodataGSI6KeysParams {
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    maritalStatus: string;
    occupation: string;
    pAddress: Address;
}

export function generateBiodataGSI6Keys({userId, enabled, verified, gender, maritalStatus, occupation, pAddress}: GenerateBiodataGSI6KeysParams) {
    return {
        GSI6PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#OC#"+occupation+"#CN#"+pAddress.country,
        GSI6SK: "DIV#"+pAddress.district+"#DIS#"+pAddress.district+"#PO#"+pAddress.postOffice+"#UID#"+userId
    }
}

