import Address from './Address';
import EducationQualification from './EducationQualification';
import FamilyInformation from './FamilyInformation';
import BasicInformation from './BasicInformation';
import PersonalInformation from './PersonalInformation';
import MarriageInformation from './MarriageInformation';
import ExtraInformation from './ExtraInformation';
import PartnerQualities from './PartnerQualities';
import ContactInformation from './ContactInformation';
import { biodataAliases } from '../../dataAccessLayer/utils/aliases';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { isEqual } from '../../utils/helpers';

interface BiodataConstructorParams {
    userId?: string;
    enabled?: boolean;
    verified?: boolean;
    basicInformation?: BasicInformation;
    addresses?: Address[];
    educationQualifications?: EducationQualification[];
    familyInformation?: FamilyInformation;
    personaInformation?: PersonalInformation;
    marriageInformation?: MarriageInformation;
    extraInformation?: ExtraInformation;
    partnerQualities?: PartnerQualities;
    contactInformation?: ContactInformation;
    createdAt?: string;
    updatedAt?: string;
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

    static mapFromAlias(items): Biodata {
        let biodata, bi: BasicInformation, ads: Address[] = [], eqs: EducationQualification[] = [],
          fi: FamilyInformation, pi: PersonalInformation, mi: MarriageInformation, ei: ExtraInformation,
          pq: PartnerQualities, ci: ContactInformation;
        for(const rawItem of items) {
            const item = unmarshall(rawItem);
            switch(item._tp){
                case 'BIODATA':
                    biodata = {
                        userId : item[biodataAliases.userId],
                        enabled : item[biodataAliases.enabled],
                        verified : item[biodataAliases.verified],
                        createdAt : item[biodataAliases.createdAt],
                        updatedAt : item[biodataAliases.updatedAt]
                    }
                    break;
                case 'AD':
                    ads.push(Address.mapFromAlias(item));
                    break;
                case 'BI':
                    bi = BasicInformation.mapFromAlias(item);
                    break;
                case 'CI':
                    ci = ContactInformation.mapFromAlias(item);
                    break;
                case 'EQ':
                    eqs.push(EducationQualification.mapFromAlias(item));
                    break;
                case 'EI':
                    ei = ExtraInformation.mapFromAlias(item);
                    break;
                case 'FI':
                    fi = FamilyInformation.mapFromAlias(item);
                    break;
                case 'MI':
                    mi = MarriageInformation.mapFromAlias(item);
                    break;
                case 'PQ':
                    pq = PartnerQualities.mapFromAlias(item);
                    break;
                case 'PI':
                    pi = PersonalInformation.mapFromAlias(item);
                    break;
                default:
                    throw new Error("Invalid Type");
            }
        }
        return new Biodata({
            ...biodata,
            basicInformation: bi,
            addresses: ads,
            educationQualifications: eqs,
            familyInformation: fi,
            marriageInformation: mi,
            personaInformation: pi,
            extraInformation: ei,
            partnerQualities: pq,
            contactInformation: ci,
        })
    }

    isEqual(obj: Biodata): boolean {
        return isEqual(this, obj);
    }
}