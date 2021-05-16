import Joi from 'joi';
import { checkValidMobileNumber, genRxFmEnVals } from '../utils/helpers';
import { getKeys } from '../scripts/utils/utils';
import {
    AddressType, AfterMarriageStudyReply, BeardStyle,
    BloodGroup, BoyOutfit, EducationDegree,
    FacialColor, FinancialStatus,
    GirlOutfit, Guardian, Majhab,
    MaritalStatus, MarriageReply, MixAnswer, MohoranaTimeReply, NegativeAnswer, PersonalityType, PositiveAnswer
} from '../dataAccessLayer/utils/aliases';

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
      .pattern(genRxFmEnVals(getKeys(MaritalStatus)))
      .required(),

    birthDay: BirthDay
      .required(),

    facialColor: Joi.string()
      .pattern(genRxFmEnVals(getKeys(FacialColor)))
      .required(),

    height: Joi.number()
      .required(),

    weight: Joi.number()
      .required(),

    bloodGroup: Joi.string()
      .pattern(genRxFmEnVals(getKeys(BloodGroup)))
      .required(),

    occupation: Joi.string()
      .lowercase()
      .required()
});

const Address = Joi.object({
    type: Joi.string()
      .pattern(genRxFmEnVals(getKeys(AddressType)))
      .required(),

    country: Joi.string()
      .pattern(new RegExp('^[a-zA-Z ]$'))
      .lowercase()
      .required(),

    division: Joi.string()
      .lowercase()
      .required(),

    district: Joi.string()
      .lowercase()
      .required(),

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
      .pattern(genRxFmEnVals(getKeys(EducationDegree)))
      .required(),

    department: Joi.string()
      .pattern(new RegExp('^[a-zA-Z]$'))
      .lowercase()
      .required(),

    passYear: Joi.number()
      .required(),

    instituteName: Joi.string()
      .lowercase()
      .required(),

    result: Joi.string()
})

const ExtraInformation = Joi.object({
    aboutMe: Joi.string()
      .required(),

    aboutOccupation: Joi.string()
      .required(),

    guardianKnowsAboutSubmission: Joi.boolean()
      .required()
})

const FamilyInformation = Joi.object({
    fatherAlive: Joi.boolean()
      .required(),

    fatherOccupation: Joi.string()
      .lowercase()
      .required(),

    motherAlive: Joi.boolean()
      .required(),

    motherOccupation: Joi.string()
      .lowercase()
      .required(),

    totalSisters: Joi.number()
      .required(),

    totalBrothers: Joi.number()
      .required(),

    brothersStatus: Joi.string(),

    sistersStatus: Joi.string(),

    financialStatus: Joi.string()
      .lowercase()
      .required(),

    socialStatus: Joi.string(),

    unclesStatus: Joi.string()
})

const Range = Joi.object({
    min: Joi.number()
      .required(),
    max: Joi.number()
      .required()
})

const CommonMarriageInformation = Joi.object({
    guardianAgreed: Joi.boolean()
      .required(),
    reasonOfMarriage: Joi.string()
      .required(),
    ideaAboutMarriage: Joi.string()
      .required(),
})

const MaleMarriageInformation = CommonMarriageInformation.append({
    willManageWifePardah: Joi.boolean()
      .required(),
    willAllowWifeStudy: Joi.string()
      .pattern(genRxFmEnVals(getKeys(AfterMarriageStudyReply)))
      .required(),
    afterMarriageStay: Joi.string()
      .required(),
    desiresDowryOrGift: Joi.boolean()
      .required(),
    maleMohoranaRange: Range
      .required(),
    maleMohoranaPaidTime: Joi.string()
      .pattern(genRxFmEnVals(getKeys(MohoranaTimeReply)))
      .required(),
})

const FemaleMarriageInformation = CommonMarriageInformation.append({
    jobAfterMarriage: Joi.string()
      .pattern(genRxFmEnVals(getKeys(MarriageReply)))
      .required(),
    carryStudyAfterMarriage: Joi.string()
      .pattern(genRxFmEnVals(getKeys(MarriageReply)))
      .required(),
    femaleMohoranaExpectation: Joi.object({
        min: Joi.number()
          .required(),
        max: Joi.number()
    })
      .required(),
    femaleMohoranaExpectedPaidTime: Joi.string()
      .pattern(genRxFmEnVals(getKeys(MohoranaTimeReply)))
      .required(),
})

const PartnerQualities = Joi.object({
    ageRange: Range
      .required(),
    facialComplexion: Joi.string()
      .pattern(genRxFmEnVals(getKeys(FacialColor))), //FacialColor,
    heightRange: Range
      .required(),
    minimumEducationDegree: Joi.string()
      .pattern(genRxFmEnVals(getKeys(EducationDegree))), // EducationDegree,
    country: Joi.string()
      .lowercase()
      .required(),
    district: Joi.array()
      .items(Joi.string().lowercase())
      .unique()
      .max(maxPQDistrictsAllowed),
    maritalStatus: Joi.string()
      .pattern(genRxFmEnVals(getKeys(MaritalStatus))), // MaritalStatus,
    occupation: Joi.array()
      .items(Joi.string().lowercase())
      .unique()
      .max(maxPQOccupationAllowed),
    financialStatus: Joi.array()
      .items(Joi.string().pattern(genRxFmEnVals(getKeys(FinancialStatus))))// FinancialStatus[],
      .unique()
      .max(getKeys(FinancialStatus).length),
    desiredQualities: Joi.string().required()
})

const CommonPersonalInformation = Joi.object({
    prayerTimes: Joi.number().integer().valid(prayerValues).required(),
    durationOfRegularPrayer: Joi.number().integer().required(), // TODO: need to recheck the type
    mahramMaintain: Joi.string().pattern(genRxFmEnVals(getKeys(MixAnswer))).required(),
    majhab: Joi.string().pattern(genRxFmEnVals(getKeys(Majhab))).required(),
    politicalPhilosophy: Joi.string().required(),
    watchDramaMovie: Joi.string().pattern(genRxFmEnVals(getKeys(NegativeAnswer))).required(),// NegativeAnswer,
    readSahihQuran: Joi.string().pattern(genRxFmEnVals(getKeys(PositiveAnswer))).required(), // PositiveAnswer,
    listenMusic: Joi.string().pattern(genRxFmEnVals(getKeys(NegativeAnswer))).required(), // NegativeAnswer,
    anyDisease: Joi.string().required(),
    deenMehnat: Joi.string().required(),
    pirFollower: Joi.string(),
    mazarBelief: Joi.string().required(),
    favoriteIslamicBooks: Joi.string().required(),
    favoriteScholars: Joi.string().required(),
    specialQualities: Joi.string().required(),
    badHabits: Joi.string().required(),
    personalityType: Joi.string().pattern(genRxFmEnVals(getKeys(PersonalityType))).required(),
    hobbies: Joi.string().required(),
    futurePlan: Joi.string().required(),
    guardian: Joi.string().pattern(genRxFmEnVals(getKeys(Guardian))).required(), // Guardian,
})

const MalePersonalInformation = CommonPersonalInformation.append({
    outfit: Joi.array().items(Joi.string().pattern(genRxFmEnVals(getKeys(BoyOutfit))))
      .unique().max(getKeys(BoyOutfit).length).required(),
    beardStyle: Joi.string().pattern(genRxFmEnVals(getKeys(BeardStyle))).required(), // BeardStyle
    pantPajamaAboveKnee: Joi.boolean().required(),
    malePrayerTimesInJamah: Joi.number().integer().valid(prayerValues),
})

const FemalePersonalInformation = CommonPersonalInformation.append({
    outfit: Joi.array().items(Joi.string().pattern(genRxFmEnVals(getKeys(GirlOutfit))))
      .unique().max(getKeys(BoyOutfit).length).required(),
    femalePrayerTimesInAwwal: Joi.number().integer().valid(prayerValues),

})

const CommonBiodata = Joi.object({
    basicInformation: BasicInformation.required(),
    addresses: Joi.array().items(Address).max(getKeys(AddressType).length).required(),
    educationQualifications: Joi.array().items(EducationQualification).max(getKeys(EducationDegree).length).required(),
    familyInformation: FamilyInformation.required(),
    extraInformation: ExtraInformation.required(),
    partnerQualities: PartnerQualities.required(),
    contactInformation: ContactInformation.required(),
})

export default function getBiodataSubmitSchema(gender: string): Joi.Schema {
    if(gender === 'male') {
        return CommonBiodata.append({
            personalInformation: MalePersonalInformation.required(),
            marriageInformation: MaleMarriageInformation.required(),
        })
    } else if(gender === 'female') {
        return CommonBiodata.append({
            personalInformation: FemalePersonalInformation.required(),
            marriageInformation: FemaleMarriageInformation.required(),
        })
    }
}