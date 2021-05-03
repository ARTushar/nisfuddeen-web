import Address from './Address';
import EducationQualification from './EducationQualification';
import FamilyInformation from './FamilyInformation';
import BasicInformation from './BasicInformation';
import PersonalInformation from './PersonalInformation';
import MarriageInformation from './MarriageInformation';
import ExtraInformation from './ExtraInformation';
import PartnerQualities from './PartnerQualities';
import ContactInformation from './ContactInformation';

interface BiodataConstructorParams {
    userId: string;
    enabled?: boolean;
    verified?: boolean;
    basicInformation: BasicInformation;
    addresses: Address[];
    educationQualifications: EducationQualification[];
    familyInformation: FamilyInformation;
    personaInformation: PersonalInformation;
    marriageInformation: MarriageInformation;
    extraInformation: ExtraInformation;
    partnerQualities: PartnerQualities;
    contactInformation: ContactInformation;
}

export default class Biodata {
    userId: string;
    enabled: boolean;
    verified: boolean;
    basicInformation: BasicInformation;
    addresses: Address[];
    educationQualifications: EducationQualification[];
    familyInformation: FamilyInformation;
    personaInformation: PersonalInformation;
    marriageInformation: MarriageInformation;
    extraInformation: ExtraInformation;
    partnerQualities: PartnerQualities;
    contactInformation: ContactInformation;
    createdAt: string;
    updatedAt: string;

    constructor({userId, enabled=true, verified=false, basicInformation, addresses, educationQualifications, familyInformation, personaInformation, marriageInformation, extraInformation, partnerQualities, contactInformation}: BiodataConstructorParams) {
        this.userId = userId;
        this.enabled = enabled;
        this.verified = verified;
        this.basicInformation = basicInformation;
        this.addresses = addresses;
        this.educationQualifications = educationQualifications;
        this.familyInformation = familyInformation;
        this.personaInformation = personaInformation;
        this.marriageInformation = marriageInformation;
        this.extraInformation = extraInformation;
        this.partnerQualities = partnerQualities;
        this.contactInformation = contactInformation;
    }
}