import { contactInformationAliases as cia } from '../../dataAccessLayer/utils/aliases';
import { mapItemFromAlias, mapItemToAlias } from '../../dataAccessLayer/utils/utils';
import { isEqual } from '../../utils/helpers';

interface CIConstructorParams {
    fatherMobile?: string;
    motherMobile?: string;
    guardianMobile?: string;
}

export default class ContactInformation {
    fatherMobile: string;
    motherMobile: string;
    guardianMobile: string;


    constructor({fatherMobile, motherMobile, guardianMobile}: CIConstructorParams) {
        this.fatherMobile = fatherMobile;
        this.motherMobile = motherMobile;
        this.guardianMobile = guardianMobile;
    }

    mapToAlias() {
        return mapItemToAlias(cia, this);
    }

    static mapFromAlias(item) {
        return new ContactInformation({
            ...mapItemFromAlias(cia, item)
        })
    }

    isEqual(obj: ContactInformation): boolean {
        return isEqual(this, obj)
    }
}