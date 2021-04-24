import { FinancialStatus } from '../../Types/types';

interface FIConstructorParams {
    fatherAlive: boolean;
    fatherOccupation: string;
    motherAlive: boolean;
    motherOccupation: string;
    totalSisters: number;
    totalBrothers: number;
    brothersStatus: string | null;
    sistersStatus: string | null;
    financialStatus: FinancialStatus;
    socialStatus: string;
    unclesStatus: string | null;
}

export default class FamilyInformation {
    fatherAlive: boolean;
    fatherOccupation: string;
    motherAlive: boolean;
    motherOccupation: string;
    totalSisters: number;
    totalBrothers: number;
    brothersStatus: string | null;
    sistersStatus: string | null;
    financialStatus: FinancialStatus;
    socialStatus: string;
    unclesStatus: string | null

    constructor({fatherAlive, fatherOccupation, motherAlive, motherOccupation, totalSisters, totalBrothers, brothersStatus=null, sistersStatus=null, financialStatus, socialStatus, unclesStatus=null}: FIConstructorParams) {
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
}