import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { extraInformationAliases } from '../../dataAccessLayer/utils/aliases';

interface EIConstructorParams {
    aboutMe: string;
    aboutOccupation?: string
    guardianKnowsAboutSubmission: boolean;
}

export default class ExtraInformation {
    aboutMe: string;
    aboutOccupation: string;
    guardianKnowsAboutSubmission: boolean;

    constructor({aboutMe, aboutOccupation, guardianKnowsAboutSubmission}: EIConstructorParams) {
        this.aboutMe = aboutMe;
        this.aboutOccupation = aboutOccupation;
        this.guardianKnowsAboutSubmission = guardianKnowsAboutSubmission;
    }

    mapToAlias() {
        return mapItemToAlias(extraInformationAliases, this)
    }

    static mapFromAlias(item) {
        return new ExtraInformation({
            aboutMe: '', guardianKnowsAboutSubmission: false,
            ...mapItemFromAlias(extraInformationAliases, item)
        })
    }
}
