import { RangePair } from '../../Types/types';
import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { partnerQualitiesAliases as pqa } from '../../dataAccessLayer/utils/aliases';
import { isEqual } from '../../utils/helpers';

interface PQConstructorParams {
    ageRange: RangePair;
    facialComplexion: string; //FacialColor;
    heightRange: RangePair;
    minimumEducationDegree: string; // EducationDegree;
    country: string,
    division?: string,
    district?: string[];
    maritalStatus: string; // MaritalStatus;
    occupation: string[];
    financialStatus: string[]; // FinancialStatus[];
    desiredQualities: string;
}

export default class PartnerQualities {
    ageRange: RangePair;
    facialComplexion: string; //FacialColor;
    heightRange: RangePair;
    minimumEducationDegree: string; // EducationDegree;
    country: string;
    division: string;
    district: string[];
    maritalStatus: string; // MaritalStatus;
    occupation: string[];
    financialStatus: string[]; // FinancialStatus[];
    desiredQualities: string;


    constructor({ageRange, facialComplexion, heightRange, minimumEducationDegree, district, country, division, maritalStatus, occupation, financialStatus, desiredQualities}: PQConstructorParams) {
        this.ageRange = ageRange;
        this.facialComplexion = facialComplexion;
        this.heightRange = heightRange;
        this.minimumEducationDegree = minimumEducationDegree;
        this.district = district;
        this.country = country;
        this.division = division;
        this.maritalStatus = maritalStatus;
        this.occupation = occupation;
        this.financialStatus = financialStatus;
        this.desiredQualities = desiredQualities;
    }

    mapToAlias() {
        return {
            ...mapItemToAlias(pqa, this),
            [pqa.ageRange]: this.ageRange.toFormatString(),
            [pqa.heightRange]: this.heightRange.toFormatString()
        }
    }

    static mapFromAlias(item) {
        return new PartnerQualities({
            occupation: [],
            country: '',
            desiredQualities: '',
            district: [],
            division: '',
            facialComplexion: '',
            financialStatus: [],
            maritalStatus: '',
            minimumEducationDegree: '',
            ...mapItemFromAlias(pqa, item),
            ageRange: RangePair.fromFormatString(item[pqa.ageRange]),
            heightRange: RangePair.fromFormatString(item[pqa.heightRange])
        })
    }

    isEqual(obj: PartnerQualities): boolean {
        return isEqual(this, obj)
    }
}