import Joi from 'joi';
import { checkValidMobileNumber } from '../utils/helpers';
import { getKeys } from '../scripts/utils/utils';
import {
    AddressType, AfterMarriageStudyReply, BeardStyle,
    BloodGroup, BoyOutfit, EducationDegree,
    FacialColor, FinancialStatus,
    GirlOutfit, Guardian, Majhab,
    MaritalStatus, MarriageReply, MixAnswer, MohoranaTimeReply, NegativeAnswer, PersonalityType, PositiveAnswer
} from '../dataAccessLayer/utils/aliases';
import { validWordsRegex } from './biodataSubmit';

const maxPQDistrictsAllowed = 10;
const maxPQOccupationAllowed = 10;
const prayerValues = [0, 1, 2, 3, 4 ,5];

const BirthDay = Joi.object({
    year: Joi.number()
      .required(),
    month: Joi.number()
      .required(),
    day: Joi.number()
      .required()
})

const BasicInformation = Joi.object({
    maritalStatus: Joi.string()
      .valid(...getKeys(MaritalStatus)),
    birthDay: BirthDay,

    facialColor: Joi.string()
      .valid(...getKeys(FacialColor)),

    height: Joi.number(),

    weight: Joi.number(),

    bloodGroup: Joi.string()
      .valid(...getKeys(BloodGroup)),

    occupation: Joi.string()
      .lowercase()
});

const Address = Joi.object({
    type: Joi.string()
      .valid(...getKeys(AddressType)),

    country: Joi.string()
      .pattern(validWordsRegex)
      .lowercase(),

    division: Joi.string()
      .lowercase(),

    district: Joi.string()
      .lowercase(),

    postOffice: Joi.string()
      .lowercase()

})

const ContactInformation = Joi.object({
    fatherMobile: Joi.string()
      .custom(checkValidMobileNumber, 'valid father mobile number'),

    motherMobile: Joi.string()
      .custom(checkValidMobileNumber, 'valid mother mobile number'),

    guardianMobile: Joi.string()
      .custom(checkValidMobileNumber, 'valid guardian mobile number')

})

const EducationQualification = Joi.object({
    degreeName: Joi.string()
      .valid(...getKeys(EducationDegree))
      .required(),

    department: Joi.string()
      .pattern(validWordsRegex)
      .lowercase(),

    passYear: Joi.number(),

    instituteName: Joi.string()
      .lowercase(),

    result: Joi.string()
})

const ExtraInformation = Joi.object({
    aboutMe: Joi.string(),

    aboutOccupation: Joi.string(),

    guardianKnowsAboutSubmission: Joi.boolean(),
})

const FamilyInformation = Joi.object({
    fatherAlive: Joi.boolean(),

    fatherOccupation: Joi.string()
      .lowercase(),

    motherAlive: Joi.boolean(),

    motherOccupation: Joi.string()
      .lowercase(),

    totalSisters: Joi.number(),

    totalBrothers: Joi.number(),

    brothersStatus: Joi.string(),

    sistersStatus: Joi.string(),

    financialStatus: Joi.string()
      .lowercase(),

    socialStatus: Joi.string(),

    unclesStatus: Joi.string(),
})

const Range = Joi.object({
    min: Joi.number()
      .required(),
    max: Joi.number()
      .required()
})

const CommonMarriageInformation = Joi.object({
    guardianAgreed: Joi.boolean(),
    reasonOfMarriage: Joi.string(),
    ideaAboutMarriage: Joi.string()
})

const MaleMarriageInformation = CommonMarriageInformation.append({
    willManageWifePardah: Joi.boolean(),
    willAllowWifeStudy: Joi.string()
      .valid(...getKeys(AfterMarriageStudyReply)),
    afterMarriageStay: Joi.string(),
    desiresDowryOrGift: Joi.boolean(),
    maleMohoranaRange: Range,
    maleMohoranaPaidTime: Joi.string()
      .valid(...getKeys(MohoranaTimeReply)),
})

const FemaleMarriageInformation = CommonMarriageInformation.append({
    jobAfterMarriage: Joi.string()
      .valid(...getKeys(MarriageReply)),
    carryStudyAfterMarriage: Joi.string()
      .valid(...getKeys(MarriageReply)),
    femaleMohoranaExpectation: Joi.object({
        min: Joi.number()
          .required(),
        max: Joi.number()
    }),
    femaleMohoranaExpectedPaidTime: Joi.string()
      .valid(...getKeys(MohoranaTimeReply)),
})

const PartnerQualities = Joi.object({
    ageRange: Range,
    facialComplexion: Joi.string()
      .valid(...getKeys(FacialColor)), //FacialColor,
    heightRange: Range,
    minimumEducationDegree: Joi.string()
      .valid(...getKeys(EducationDegree)), // EducationDegree,
    country: Joi.string()
      .pattern(validWordsRegex)
      .lowercase(),
    district: Joi.array()
      .items(Joi.string().lowercase())
      .unique()
      .max(maxPQDistrictsAllowed),
    maritalStatus: Joi.string()
      .valid(...getKeys(MaritalStatus)), // MaritalStatus,
    occupation: Joi.array()
      .items(Joi.string().lowercase())
      .unique()
      .max(maxPQOccupationAllowed),
    financialStatus: Joi.array()
      .items(Joi.string().valid(...getKeys(FinancialStatus)))// FinancialStatus[],
      .unique()
      .max(getKeys(FinancialStatus).length),
    desiredQualities: Joi.string(),
})

const CommonPersonalInformation = Joi.object({
    prayerTimes: Joi.number().integer().valid(...prayerValues),
    durationOfRegularPrayer: Joi.number().integer(), // TODO: need to recheck the type
    mahramMaintain: Joi.string().valid(...getKeys(MixAnswer)),
    majhab: Joi.string().valid(...getKeys(Majhab)),
    politicalPhilosophy: Joi.string(),
    watchDramaMovie: Joi.string().valid(...getKeys(NegativeAnswer)),// NegativeAnswer,
    readSahihQuran: Joi.string().valid(...getKeys(PositiveAnswer)), // PositiveAnswer,
    listenMusic: Joi.string().valid(...getKeys(NegativeAnswer)), // NegativeAnswer,
    anyDisease: Joi.string(),
    deenMehnat: Joi.string(),
    pirFollower: Joi.string(),
    mazarBelief: Joi.string(),
    favoriteIslamicBooks: Joi.string(),
    favoriteScholars: Joi.string(),
    specialQualities: Joi.string(),
    badHabits: Joi.string(),
    personalityType: Joi.string().valid(...getKeys(PersonalityType)),
    hobbies: Joi.string(),
    futurePlan: Joi.string(),
    guardian: Joi.string().valid(...getKeys(Guardian)), // Guardian,
})

const MalePersonalInformation = CommonPersonalInformation.append({
    outfit: Joi.array().items(Joi.string().valid(...getKeys(BoyOutfit)))
      .unique().max(getKeys(BoyOutfit).length),
    beardStyle: Joi.string().valid(...getKeys(BeardStyle)), // BeardStyle
    pantPajamaAboveKnee: Joi.boolean(),
    malePrayerTimesInJamah: Joi.number().integer().valid(...prayerValues),
})

const FemalePersonalInformation = CommonPersonalInformation.append({
    outfit: Joi.array().items(Joi.string().valid(...getKeys(GirlOutfit)))
      .unique().max(getKeys(BoyOutfit).length),
    femalePrayerTimesInAwwal: Joi.number().integer().valid(...prayerValues),

})

const CommonBiodata = Joi.object({
    basicInformation: BasicInformation,
    addresses: Joi.array().items(Address).max(getKeys(AddressType).length),
    educationQualifications: Joi.array().items(EducationQualification).max(getKeys(EducationDegree).length),
    familyInformation: FamilyInformation,
    extraInformation: ExtraInformation,
    partnerQualities: PartnerQualities,
    contactInformation: ContactInformation,
})

export default function getBiodataUpdateSchema(gender: string): Joi.Schema {
    if(gender === 'male') {
        return CommonBiodata.append({
            personalInformation: MalePersonalInformation,
            marriageInformation: MaleMarriageInformation,
        }).min(1);
    } else if(gender === 'female') {
        return CommonBiodata.append({
            personalInformation: FemalePersonalInformation,
            marriageInformation: FemaleMarriageInformation,
        }).min(1);
    }
}
