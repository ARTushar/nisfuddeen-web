import { FinancialStatus, MaritalStatus, RangePair } from '../../Types/types';

interface PQConstructorParams {
    ageRange: RangePair;
    facialComplexion: string;
    heightRange: RangePair;
    minimumEducationDegree: string;
    district: string;
    maritalStatus: MaritalStatus;
    occupation: string;
    financialStatus: FinancialStatus[];
    socialStatus: string;
    desiredQualities: string;
}

export default class PartnerQualities {
    ageRange: RangePair;
    facialComplexion: string;
    heightRange: RangePair;
    minimumEducationDegree: string;
    district: string;
    maritalStatus: MaritalStatus;
    occupation: string;
    financialStatus: FinancialStatus[];
    socialStatus: string;
    desiredQualities: string;


    constructor({ageRange, facialComplexion, heightRange, minimumEducationDegree, district, maritalStatus, occupation, financialStatus, socialStatus, desiredQualities}: PQConstructorParams) {
        this.ageRange = ageRange;
        this.facialComplexion = facialComplexion;
        this.heightRange = heightRange;
        this.minimumEducationDegree = minimumEducationDegree;
        this.district = district;
        this.maritalStatus = maritalStatus;
        this.occupation = occupation;
        this.financialStatus = financialStatus;
        this.socialStatus = socialStatus;
        this.desiredQualities = desiredQualities;
    }
}