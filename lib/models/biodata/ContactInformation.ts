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
}