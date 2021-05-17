import { RangePair } from '../../Types/types';
import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { marriageInformationAliases as mia } from '../../dataAccessLayer/utils/aliases';
import { isEqual } from '../../utils/helpers';


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
    maleMohoranaRange?: object;
    maleMohoranaPaidTime?: string; // MohoranaTimeReply;
    femaleMohoranaExpectation?: object;
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
    maleMohoranaRange: object;
    maleMohoranaPaidTime: string; // MohoranaTimeReply;
    femaleMohoranaExpectation: object;
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

    mapToAlias() {
        return mapItemToAlias(mia, this);
    }
    static mapFromAlias(item) {
        return new MarriageInformation({
            guardianAgreed: false,
            ideaAboutMarriage: '',
            reasonOfMarriage: '',
            ...mapItemFromAlias(mia, item),
        })
    }


    isEqual(obj: MarriageInformation): boolean {
        return isEqual(this, obj)
    }
}