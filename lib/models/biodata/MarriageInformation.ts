enum MarriageReply {
    Yes,
    No,
    YesIfSpouseAgrees
}

export class MarriageInformation {
    guardianAgreed: boolean;
    reasonOfMarriage: string;
    ideaAboutMarriage: string;
    jobAfterMarriage: MarriageReply;
    carryStudyAfterMarriage: MarriageReply;

    constructor(guardianAgreed: boolean, reasonOfMarriage: string, ideaAboutMarriage: string, jobAfterMarriage: MarriageReply, carryStudyAfterMarraige: MarriageReply) {
        this.guardianAgreed = guardianAgreed;
        this.reasonOfMarriage = reasonOfMarriage;
        this.ideaAboutMarriage = ideaAboutMarriage;
        this.jobAfterMarriage = jobAfterMarriage;
        this.carryStudyAfterMarriage = carryStudyAfterMarraige;
        
    }
}