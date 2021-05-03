import Address from '../../models/biodata/Address';

export function generateBiodataPrimaryKeys(userId: string) {
    return {
        PK: "UID#"+userId,
        SK: "BIODATA"
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
    outfit: string;
    aboveKnee: boolean;
    beardStyle: string;
    pAddress: Address;
}

export function generateBiodataGSI3KeysMale({userId, enabled, verified, gender, maritalStatus, prayerTimes, prayerTimesJamah, outfit, aboveKnee, beardStyle, pAddress}: GenerateBiodataGSI3KeysMaleParams) {
    return {
        GSI3PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#CN#"+pAddress.country+"#PT#"+prayerTimes+"#DEEN#"+prayerTimes+prayerTimesJamah+aboveKnee+beardStyle+outfit,
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
    outfit: string;
    pAddress: Address;
}

export function generateBiodataGSI3KeysFemale({userId, enabled, verified, gender, maritalStatus, prayerTimes, prayerTimesAwwal, outfit, pAddress}: GenerateBiodataGSI3KeysFemaleParams) {
    return {
        GSI3PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#CN#"+pAddress.country+"#PT#"+prayerTimes+"#DEEN#"+prayerTimes+prayerTimesAwwal+outfit,
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
    outfit: string;
    pAddress: Address;
}

export function generateBiodataGSI4KeysMale({userId, enabled, verified, gender, maritalStatus, occupation, prayerTimes, prayerTimesJamah, beardStyle, aboveKnee, outfit, pAddress}: GenerateBiodataGSI4KeysMaleParams) {
    return {
        GSI4PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#OC#"+occupation+"#CN#"+pAddress.country+"#DEEN#"+prayerTimes+prayerTimesJamah+aboveKnee+beardStyle+outfit,
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
    outfit: string;
    pAddress: Address;
}

export function generateBiodataGSI4KeysFemale({userId, enabled, verified, gender, maritalStatus, occupation, prayerTimes, prayerTimesAwwal, outfit, pAddress}: GenerateBiodataGSI4KeysFemaleParams) {
    return {
        GSI4PK: "EN#"+enabled+"#VER#"+verified+"#GEN#"+gender+"#MS#"+maritalStatus+"#OC#"+occupation+"#CN#"+pAddress.country+"#DEEN#"+prayerTimes+prayerTimesAwwal+outfit,
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
