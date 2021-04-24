import { BirthDay, BloodGroup, FacialColor, Gender, MaritalStatus } from '../../Types/types';


interface BIConstructorParams {
    gender: Gender;
    maritalStatus: MaritalStatus;
    birthDay: BirthDay;
    facialColor: FacialColor;
    height: number;
    weight: number;
    bloodGroup: BloodGroup;
    occupation: string;
}

export default class BasicInformation {
    gender: Gender;
    maritalStatus: MaritalStatus;
    birthDay: BirthDay;
    facialColor: FacialColor; 
    height: number;
    weight: number;
    bloodGroup: BloodGroup;
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