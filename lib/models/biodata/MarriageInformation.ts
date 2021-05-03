import { RangePair } from '../../Types/types';


interface MIConstructorParams {
    guardianAgreed: boolean;
    reasonOfMarriage: string;
    ideaAboutMarriage: string;
    jobAfterMarriage?: string; // MarriageReply
    carryStudyAfterMarriage?: string; // MarriageReply;
    willManageWifePardah?: boolean;
    willAllowWifeStudy?: string; // AfterMarriageStudyReply;
    afterMarriageStay?: string;
    desiresDowryOrGift?: boolean;
    maleMohoranaRange?: RangePair;
    maleMohoranaPaidTime?: string; // MohoranaTimeReply;
    femaleMohoranaExpectation?: RangePair;
    femaleMohoranaExpectedPaidTime?: string; // MohoranaTimeReply
}

export default class MarriageInformation {
    guardianAgreed: boolean;
    reasonOfMarriage: string;
    ideaAboutMarriage: string;
    jobAfterMarriage: string; // MarriageReply
    carryStudyAfterMarriage: string; // MarriageReply;
    willManageWifePardah: boolean;
    willAllowWifeStudy: string; // AfterMarriageStudyReply;
    afterMarriageStay: string;
    desiresDowryOrGift: boolean;
    maleMohoranaRange: RangePair;
    maleMohoranaPaidTime: string; // MohoranaTimeReply;
    femaleMohoranaExpectation: RangePair;
    femaleMohoranaExpectedPaidTime: string; // MohoranaTimeReply


    constructor({guardianAgreed, reasonOfMarriage, ideaAboutMarriage, jobAfterMarriage, carryStudyAfterMarriage, willManageWifePardah, willAllowWifeStudy, afterMarriageStay, desiresDowryOrGift, maleMohoranaRange, maleMohoranaPaidTime, femaleMohoranaExpectedPaidTime, femaleMohoranaExpectation}: MIConstructorParams) {
        this.guardianAgreed = guardianAgreed;
        this.reasonOfMarriage = reasonOfMarriage;
        this.ideaAboutMarriage = ideaAboutMarriage;
        this.jobAfterMarriage = jobAfterMarriage;
        this.carryStudyAfterMarriage = carryStudyAfterMarriage;
        this.willManageWifePardah = willManageWifePardah;
        this.willAllowWifeStudy = willAllowWifeStudy;
        this.afterMarriageStay = afterMarriageStay;
        this.desiresDowryOrGift = desiresDowryOrGift;
        this.maleMohoranaRange = maleMohoranaRange;
        this.maleMohoranaPaidTime = maleMohoranaPaidTime;
        this.femaleMohoranaExpectation = femaleMohoranaExpectation;
        this.femaleMohoranaExpectedPaidTime = femaleMohoranaExpectedPaidTime;
    }
}