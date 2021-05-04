import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { familyInformationAliases as fia, FinancialStatus, invertAlias } from '../../dataAccessLayer/utils/aliases';

interface FIConstructorParams {
    fatherAlive: boolean;
    fatherOccupation: string;
    motherAlive: boolean;
    motherOccupation: string;
    totalSisters: number;
    totalBrothers: number;
    brothersStatus?: string;
    sistersStatus?: string;
    financialStatus: string;
    socialStatus?: string;
    unclesStatus?: string;
}

export default class FamilyInformation {
    fatherAlive: boolean;
    fatherOccupation: string;
    motherAlive: boolean;
    motherOccupation: string;
    totalSisters: number;
    totalBrothers: number;
    brothersStatus: string;
    sistersStatus: string;
    financialStatus: string;
    socialStatus: string;
    unclesStatus: string

    constructor({fatherAlive, fatherOccupation, motherAlive, motherOccupation, totalSisters, totalBrothers, brothersStatus, sistersStatus, financialStatus, socialStatus, unclesStatus}: FIConstructorParams) {
        this.fatherAlive = fatherAlive;
        this.fatherOccupation = fatherOccupation;
        this.motherAlive = motherAlive;
        this.motherOccupation = motherOccupation;
        this.totalSisters = totalSisters;
        this.totalBrothers = totalBrothers;
        this.brothersStatus = brothersStatus;
        this.sistersStatus = sistersStatus;
        this.financialStatus = financialStatus;
        this.socialStatus = socialStatus;
        this.unclesStatus = unclesStatus;
    }

    mapToAlias() {
        return mapItemToAlias(fia, this);
    }

    static mapFromAlias(item) {
        return new FamilyInformation({
            fatherAlive: false,
            fatherOccupation: '',
            financialStatus: '',
            motherAlive: false,
            motherOccupation: '',
            totalBrothers: 0,
            totalSisters: 0,
            ...mapItemFromAlias(fia, item)
        })
    }
}