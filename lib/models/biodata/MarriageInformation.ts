import { MarriageReply } from '../../Types/types';

interface MIConstructorParams {
    guardianAgreed: boolean;
    reasonOfMarriage: string;
    ideaAboutMarriage: string;
    jobAfterMarriage: MarriageReply;
    carryStudyAfterMarriage: MarriageReply;
}

export default class MarriageInformation {
    guardianAgreed: boolean;
    reasonOfMarriage: string;
    ideaAboutMarriage: string;
    jobAfterMarriage: MarriageReply;
    carryStudyAfterMarriage: MarriageReply;

    constructor({guardianAgreed, reasonOfMarriage, ideaAboutMarriage, jobAfterMarriage, carryStudyAfterMarriage}: MIConstructorParams) {
        this.guardianAgreed = guardianAgreed;
        this.reasonOfMarriage = reasonOfMarriage;
        this.ideaAboutMarriage = ideaAboutMarriage;
        this.jobAfterMarriage = jobAfterMarriage;
        this.carryStudyAfterMarriage = carryStudyAfterMarriage;
        
    }
}