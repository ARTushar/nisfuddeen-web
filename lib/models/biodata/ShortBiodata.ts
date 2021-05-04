import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { shortBiodataAliases } from '../../dataAccessLayer/utils/aliases';

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

    mapToAlias() {
        return mapItemToAlias(shortBiodataAliases, this);
    }

    mapFromAlias(item) {
        return new ShortBiodata({
            birthYear: '',
            country: '',
            district: '',
            gender: '',
            maritalStatus: '',
            occupation: '',
            ...mapItemFromAlias(shortBiodataAliases, item),
        })
    }
}