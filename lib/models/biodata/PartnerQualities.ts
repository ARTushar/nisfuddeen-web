import { EducationDegree, FacialColor, FinancialStatus, MaritalStatus, RangePair } from '../../Types/types';

interface PQConstructorParams {
    ageRange: RangePair;
    facialComplexion: FacialColor;
    heightRange: RangePair;
    minimumEducationDegree: EducationDegree;
    district: string;
    maritalStatus: MaritalStatus;
    occupation: string;
    financialStatus: FinancialStatus[];
    desiredQualities: string;
}

export default class PartnerQualities {
    ageRange: RangePair;
    facialComplexion: FacialColor;
    heightRange: RangePair;
    minimumEducationDegree: EducationDegree;
    country: string;
    district: string;
    maritalStatus: MaritalStatus;
    occupation: string;
    financialStatus: FinancialStatus[];
    desiredQualities: string;


    constructor({ageRange, facialComplexion, heightRange, minimumEducationDegree, district, maritalStatus, occupation, financialStatus, desiredQualities}: PQConstructorParams) {
        this.ageRange = ageRange;
        this.facialComplexion = facialComplexion;
        this.heightRange = heightRange;
        this.minimumEducationDegree = minimumEducationDegree;
        this.district = district;
        this.maritalStatus = maritalStatus;
        this.occupation = occupation;
        this.financialStatus = financialStatus;
        this.desiredQualities = desiredQualities;
    }
}