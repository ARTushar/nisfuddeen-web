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

    mapToAlias() {
        return {
            ...mapItemToAlias(mia, this),
            [mia.maleMohoranaRange]: this.maleMohoranaRange?.toFormatString(),
            [mia.femaleMohoranaExpectation]: this.femaleMohoranaExpectation?.toFormatString()
        }
    }
    static mapFromAlias(item) {
        return new MarriageInformation({
            guardianAgreed: false,
            ideaAboutMarriage: '',
            reasonOfMarriage: '',
            ...mapItemFromAlias(mia, item),
            maleMohoranaRange: RangePair.fromFormatString(item[mia.maleMohoranaRange]),
            femaleMohoranaExpectation: RangePair.fromFormatString(item[mia.femaleMohoranaExpectation]),
        })
    }


    isEqual(obj: MarriageInformation): boolean {
        return isEqual(this, obj)
    }
}