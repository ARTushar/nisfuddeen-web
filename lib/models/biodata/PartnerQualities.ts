import { RangePair } from '../../Types/types';

interface PQConstructorParams {
    ageRange: RangePair;
    facialComplexion: string; //FacialColor;
    heightRange: RangePair;
    minimumEducationDegree: string; // EducationDegree;
    country: string
    district: string;
    maritalStatus: string; // MaritalStatus;
    occupation: string;
    financialStatus: string[]; // FinancialStatus[];
    desiredQualities: string;
}

export default class PartnerQualities {
    ageRange: RangePair;
    facialComplexion: string; //FacialColor;
    heightRange: RangePair;
    minimumEducationDegree: string; // EducationDegree;
    country: string
    district: string;
    maritalStatus: string; // MaritalStatus;
    occupation: string;
    financialStatus: string[]; // FinancialStatus[];
    desiredQualities: string;


    constructor({ageRange, facialComplexion, heightRange, minimumEducationDegree, district, country, maritalStatus, occupation, financialStatus, desiredQualities}: PQConstructorParams) {
        this.ageRange = ageRange;
        this.facialComplexion = facialComplexion;
        this.heightRange = heightRange;
        this.minimumEducationDegree = minimumEducationDegree;
        this.district = district;
        this.country = country;
        this.maritalStatus = maritalStatus;
        this.occupation = occupation;
        this.financialStatus = financialStatus;
        this.desiredQualities = desiredQualities;
    }
}