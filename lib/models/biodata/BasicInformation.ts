import { BirthDay } from '../../Types/types';
import {
    basicInformationAliases as bia,
    BloodGroup,
    FacialColor,
    Gender, invertAlias,
    MaritalStatus
} from '../../dataAccessLayer/utils/aliases';
import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';


interface BIConstructorParams {
    gender: string;
    maritalStatus: string;
    birthDay: BirthDay;
    facialColor: string;
    height: number;
    weight: number;
    bloodGroup: string;
    occupation: string;
}

export default class BasicInformation {
    gender: string;
    maritalStatus: string;
    birthDay: BirthDay;
    facialColor: string;
    height: number;
    weight: number;
    bloodGroup: string;
    occupation: string;

    constructor({gender, maritalStatus, birthDay, facialColor, height, weight, bloodGroup, occupation}: BIConstructorParams) {
        this.gender = gender;
        this.maritalStatus = maritalStatus;
        this.birthDay = birthDay;
        this.facialColor = facialColor;
        this.height = height;
        this.weight = weight;
        this.bloodGroup = bloodGroup;
        this.occupation = occupation;
    }

    mapToAlias() {
        return {
            ...mapItemToAlias(bia, this),
            [bia.birthDay]: this.birthDay.toISOString(),
        }
    }

    static mapFromAlias(bi) {
        return new BasicInformation({
            bloodGroup: '', facialColor: '', gender: '', height: 0, maritalStatus: '', occupation: '', weight: 0,
            ...mapItemFromAlias(bia, bi),
            birthDay: BirthDay.fromISOString(bi[bia.birthDay])
        })
    }
}