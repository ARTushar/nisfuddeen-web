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
import { debug, isEqual, objStringify } from '../../utils/helpers';
import { getBiodataByUserId, getBiodatasByGnMsUgLoc } from '../../dataAccessLayer/entities/biodata/getBiodata';
import createBiodata from '../../dataAccessLayer/entities/biodata/createBiodata';
import updateBiodata from '../../dataAccessLayer/entities/biodata/updateBiodata';
import deleteBiodata from '../../dataAccessLayer/entities/biodata/deleteBiodata';
import { BirthDay } from '../../Types/types';

interface BiodataConstructorParams {
    userId?: string;
    enabled?: boolean;
    verified?: boolean;
    basicInformation?: BasicInformation;
    addresses?: Address[];
    educationQualifications?: EducationQualification[];
    familyInformation?: FamilyInformation;
    personalInformation?: PersonalInformation;
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
    personalInformation: PersonalInformation;
    marriageInformation: MarriageInformation;
    extraInformation: ExtraInformation;
    partnerQualities: PartnerQualities;
    contactInformation: ContactInformation;
    createdAt: string;
    updatedAt: string;

    constructor({userId, enabled, verified, basicInformation, addresses, educationQualifications, familyInformation, personalInformation, marriageInformation, extraInformation, partnerQualities, contactInformation}: BiodataConstructorParams) {
        this.userId = userId;
        this.enabled = enabled;
        this.verified = verified;
        this.basicInformation = basicInformation;
        this.addresses = addresses;
        this.educationQualifications = educationQualifications;
        this.familyInformation = familyInformation;
        this.personalInformation = personalInformation;
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
            personalInformation: pi,
            extraInformation: ei,
            partnerQualities: pq,
            contactInformation: ci,
        })
    }

    isEqual(obj: Biodata): boolean {
        return isEqual(this, obj);
    }

    static async getBiodataByUserId(userId: string) {
        try {
            return await getBiodataByUserId(userId);
        } catch (e) {
            throw e;
        }
    }

    static async getBiodataPubliclyByUserId(userId: string) {
        try {
            let biodata = await getBiodataByUserId(userId);
            delete biodata.contactInformation;
            return biodata;
        } catch (e) {
            throw e;
        }

    }

    static async createBiodata(userId: string, biodata) {
        biodata.enabled = true;
        biodata.verified = false;
        const transformedBiodata = Biodata.constructBiodata(biodata);
        debug("transformed biodata", objStringify(transformedBiodata))
        try {
            return await createBiodata(userId, transformedBiodata)
        } catch (e) {
            throw e;
        }
    }

    static async updateBiodata(userId: string, biodata, gender: string) {
        try {
            return await updateBiodata(userId, biodata, gender)
        } catch (e) {
            throw e;
        }
    }

    static async deleteBiodata(userId: string ) {
        try {
            return await deleteBiodata(userId)
        } catch (e) {
            throw e;
        }
    }

    static constructBiodata(biodata): Biodata {
        let addresses = [];
        for(const ad of biodata.addresses) {
            addresses.push(new Address(ad));
        }
        let educationQualifications = [];
        for(const eq of biodata.educationQualifications) {
            educationQualifications.push(new EducationQualification(eq));
        }

        return new Biodata({
            ...biodata,
            basicInformation: biodata.basicInformation? new BasicInformation({
                ...biodata.basicInformation,
                birthDay: biodata.basicInformation?.birthDay? BirthDay.constructBirthDay(biodata.basicInformation.birthDay): undefined,
            }): undefined,
            addresses,
            educationQualifications,
            familyInformation: biodata.familyInformation? new FamilyInformation(biodata.familyInformation): undefined,
            personalInformation: biodata.personalInformation? new PersonalInformation(biodata.personalInformation): undefined,
            marriageInformation: biodata.marriageInformation? new MarriageInformation(biodata.marriageInformation): undefined,
            extraInformation: biodata.extraInformation? new ExtraInformation(biodata.extraInformation): undefined,
            partnerQualities: biodata.partnerQualities? new PartnerQualities(biodata.partnerQualities): undefined,
            contactInformation: biodata.contactInformation? new ContactInformation(biodata.contactInformation): undefined
        })
    }
}