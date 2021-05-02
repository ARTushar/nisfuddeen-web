import { BirthDay } from '../../Types/types';


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
}