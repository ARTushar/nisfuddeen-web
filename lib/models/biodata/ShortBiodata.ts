interface SBDConstructorParams {
    gender: string;
    country: string;
    district: string;
    maritalStatus: string;
    birthYear: string;
    occupation: string;
}

export default class ShortBiodata {
    gender: string;
    country: string;
    district: string;
    maritalStatus: string;
    birthYear: string;
    occupation: string;

    constructor({gender, country, district, maritalStatus, birthYear, occupation}: SBDConstructorParams) {
        this.gender = gender;
        this.country = country;
        this.district = district;
        this.maritalStatus = maritalStatus;
        this.birthYear = birthYear;
        this.occupation = occupation;
    }
}