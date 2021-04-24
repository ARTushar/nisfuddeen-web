import { AfterMarriageStudyReply, MarriageReply } from '../../Types/types';


interface MIConstructorParams {
    guardianAgreed: boolean;
    reasonOfMarriage: string;
    ideaAboutMarriage: string;
    jobAfterMarriage?: MarriageReply | null;
    carryStudyAfterMarriage?: MarriageReply | null;
    willManageWifePardah?: boolean | null;
    willAllowWifeStudy?: AfterMarriageStudyReply | null;
    afterMarriageStay?: string | null;
    desiresDowryOrGift?: boolean | null;
}

export default class MarriageInformation {
    guardianAgreed: boolean;
    reasonOfMarriage: string;
    ideaAboutMarriage: string;
    jobAfterMarriage: MarriageReply | null;
    carryStudyAfterMarriage: MarriageReply | null;
    willManageWifePardah: boolean | null;
    willAllowWifeStudy: AfterMarriageStudyReply | null
    afterMarriageStay: string | null;
    desiresDowryOrGift?: boolean | null;


    constructor({guardianAgreed, reasonOfMarriage, ideaAboutMarriage, jobAfterMarriage=null, carryStudyAfterMarriage=null, willManageWifePardah=null, willAllowWifeStudy=null, afterMarriageStay=null, desiresDowryOrGift=null}: MIConstructorParams) {
        this.guardianAgreed = guardianAgreed;
        this.reasonOfMarriage = reasonOfMarriage;
        this.ideaAboutMarriage = ideaAboutMarriage;
        this.jobAfterMarriage = jobAfterMarriage;
        this.carryStudyAfterMarriage = carryStudyAfterMarriage;
        this.willManageWifePardah = willManageWifePardah;
        this.willAllowWifeStudy = willAllowWifeStudy;
        this.afterMarriageStay = afterMarriageStay;
        this.desiresDowryOrGift = desiresDowryOrGift;
    }
}