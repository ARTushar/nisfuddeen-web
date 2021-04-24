interface EIConstructorParams {
    aboutMe: string;
    aboutOccupation?: string | null
    guardianKnowsAboutSubmission: boolean;
}

export default class ExtraInformation {
    aboutMe: string;
    aboutOccupation: string | null;
    guardianKnowsAboutSubmission: boolean;

    constructor({aboutMe, aboutOccupation=null, guardianKnowsAboutSubmission}: EIConstructorParams) {
        this.aboutMe = aboutMe;
        this.aboutOccupation = aboutOccupation;
        this.guardianKnowsAboutSubmission = guardianKnowsAboutSubmission;
    }
}
