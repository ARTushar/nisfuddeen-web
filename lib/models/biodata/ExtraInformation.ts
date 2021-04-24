interface EIConstructorParams {
    aboutMe: string;
    guardianKnowsAboutSubmission: boolean;
}

export default class ExtraInformation {
    aboutMe: string;
    guardianKnowsAboutSubmission: boolean;

    constructor({aboutMe, guardianKnowsAboutSubmission}: EIConstructorParams) {
        this.aboutMe = aboutMe;
        this.guardianKnowsAboutSubmission = guardianKnowsAboutSubmission;
    }
}
