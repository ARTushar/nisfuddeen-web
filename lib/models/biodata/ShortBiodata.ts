import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { biodataAliases } from '../../dataAccessLayer/utils/aliases';
import { isEqual } from '../../utils/helpers';

interface SBDConstructorParams {
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    country: string;
    district: string;
    maritalStatus: string;
    birthYear: string;
    occupation: string;
    createdAt: string;
    updatedAt: string;
}

export default class ShortBiodata {
    userId: string;
    enabled: boolean;
    verified: boolean;
    gender: string;
    country: string;
    district: string;
    maritalStatus: string;
    birthYear: string;
    occupation: string;
    createdAt: string;
    updatedAt: string;

    constructor({userId, enabled, verified, gender, country, district, maritalStatus, birthYear, occupation, createdAt, updatedAt}: SBDConstructorParams) {
        this.userId = userId;
        this.enabled = enabled;
        this.verified = verified;
        this.gender = gender;
        this.country = country;
        this.district = district;
        this.maritalStatus = maritalStatus;
        this.birthYear = birthYear;
        this.occupation = occupation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    mapToAlias() {
        return mapItemToAlias(biodataAliases, this);
    }

    static mapFromAlias(item) {
        return new ShortBiodata({
            userId: '', birthYear: '', country: '', district: '', gender: '', maritalStatus: '', occupation: '',
            createdAt: '', enabled: false, updatedAt: '', verified: false,
            ...mapItemFromAlias(biodataAliases, item)
        })
    }


    isEqual(obj: ShortBiodata): boolean {
        return isEqual(this, obj);
    }
}