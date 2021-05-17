import { RangePair } from '../../Types/types';
import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { partnerQualitiesAliases as pqa } from '../../dataAccessLayer/utils/aliases';
import { isEqual } from '../../utils/helpers';

interface PQConstructorParams {
    ageRange: object;
    facialColor: string; //FacialColor;
    heightRange: object;
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
    ageRange: object;
    facialColor: string; //FacialColor;
    heightRange: object;
    minimumEducationDegree: string; // EducationDegree;
    country: string;
    division: string;
    district: string[];
    maritalStatus: string; // MaritalStatus;
    occupation: string[];
    financialStatus: string[]; // FinancialStatus[];
    desiredQualities: string;


    constructor({ageRange, facialColor, heightRange, minimumEducationDegree, district, country, division, maritalStatus, occupation, financialStatus, desiredQualities}: PQConstructorParams) {
        this.ageRange = ageRange;
        this.facialColor = facialColor;
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
        return mapItemToAlias(pqa, this);
    }

    static mapFromAlias(item) {
        return new PartnerQualities({
            occupation: undefined, country: undefined, desiredQualities: undefined, district: undefined,
            division: undefined, facialColor: undefined, ageRange: undefined, heightRange: undefined,
            financialStatus: undefined, maritalStatus: undefined, minimumEducationDegree: undefined,
            ...mapItemFromAlias(pqa, item)
        })
    }

    isEqual(obj: PartnerQualities): boolean {
        return isEqual(this, obj)
    }
}