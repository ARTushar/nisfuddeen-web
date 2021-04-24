interface CIConstructorParams {
    fatherMobile?: string | null;
    motherMobile?: string | null;
    guardianMobile?: string | null;
}

export default class ContactInformation {
    fatherMobile: string | null;
    motherMobile: string | null;
    guardianMobile: string | null;


    constructor({fatherMobile=null, motherMobile=null, guardianMobile=null}: CIConstructorParams) {
        this.fatherMobile = fatherMobile;
        this.motherMobile = motherMobile;
        this.guardianMobile = guardianMobile;
    }
}