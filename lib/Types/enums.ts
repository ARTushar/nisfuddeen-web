import {
    AccountType,
    AddressType,
    AfterMarriageStudyReply,
    BeardStyle,
    BloodGroup,
    BoyOutfit,
    EducationDegree,
    FacialColor,
    FinancialStatus,
    Gender,
    GirlOutfit,
    Guardian,
    Majhab,
    MaritalStatus,
    MarriageReply,
    MixAnswer,
    MohoranaTimeReply,
    NegativeAnswer,
    PositiveAnswer,
    Relation, RequestBiodataStatus, RequestBiodataType,
    SubscriptionType
} from '../dataAccessLayer/utils/aliases';
import { getKeys } from '../scripts/utils/utils';

export {}
// import {
//     AccountType,
//     AddressType,
//     BloodGroup,
//     EducationDegree,
//     FacialColor,
//     Gender,
//     MaritalStatus,
//     SubscriptionType
// } from './types';


// export function accountTypeFactory(type: string): AccountType {
//     if(type === 'normal') return AccountType.Bridegroom;
//     if(type === 'guardian') return AccountType.Guardian;
//     if(type === 'moderator') return AccountType.Moderator;
//     if(type === 'admin') return AccountType.Admin;
//     console.assert(false);
// }
//
// export function inverseAccountTypeFactory(type: AccountType): string {
//     if(type === AccountType.Admin) return "admin";
//     if(type === AccountType.Guardian) return "guardian";
//     if(type === AccountType.Moderator) return "moderator";
//     if(type === AccountType.Bridegroom) return "normal";
//     console.assert(false);
// }
//
// export function maritalStatusFactory(type: string): MaritalStatus {
//     if(type === 'marriedWithChildren') return MaritalStatus.MarriedWithChildren;
//     if(type === 'marriedWithoutChildren') return MaritalStatus.MarriedWithoutChildren;
//     if(type === 'unmarried') return MaritalStatus.Unmarried;
//     if(type === 'divorcedWithChildren') return MaritalStatus.DivorcedWithChildren;
//     if(type === 'divorcedWithoutChildren') return MaritalStatus.DivorcedWithoutChildren;
//     if(type === 'widow') return MaritalStatus.Widow;
//     console.assert(false);
// }
//
// export function genderFactory(type: string): Gender {
//     if(type === 'male') return Gender.Male;
//     if(type === 'female') return Gender.Female;
//     console.assert(false);
// }
//
// export function facialColorFactory(type: string): FacialColor {
//     if(type === 'PinkishWhite') return FacialColor.PinkishWhite;
//     if(type === 'PaleWhite') return FacialColor.PaleWhite;
//     if(type === 'FairWhite') return FacialColor.FairWhite;
//     if(type === 'MediumFair') return FacialColor.MediumFair;
//     if(type === 'LightBrown') return FacialColor.LightBrown;
//     if(type === 'ModerateBrown') return FacialColor.ModerateBrown;
//     if(type === 'Black') return FacialColor.Black;
//     console.assert(false);
// }
//
// export function educationDegreeFactory(type: string): EducationDegree {
//     if(type === 'Secondary') return EducationDegree.Secondary;
//     if(type === 'HigherSecondary') return EducationDegree.HigherSecondary;
//     if(type === 'Undergraduate') return EducationDegree.Undergraduate;
//     if(type === 'PostGraduate') return EducationDegree.Postgraduate;
//     if(type === 'Doctorate') return EducationDegree.Doctorate;
//     if(type === 'PostDoctorate') return EducationDegree.PostDoctorate;
//     console.assert(false);
// }
//
// export function subscriptionTypeFactory(type: string): SubscriptionType {
//     if(type === 'free') return SubscriptionType.Free;
//     if(type === 'premium') return SubscriptionType.Premium;
//     console.assert(false)
// }
//
// export function inverseSubscriptionFactory(type: SubscriptionType): string {
//     if(type === SubscriptionType.Free) return 'free';
//     if(type === SubscriptionType.Premium) return 'premium';
//     console.assert(false);
// }
//
// export function addressTypeFactory(type: string): AddressType {
//     if(type === 'home') return AddressType.Home;
//     if(type === 'present') return AddressType.Present;
//     if(type === 'permanent') return AddressType.Permanent;
//     if(type === 'working') return AddressType.Working;
//     console.assert(false);
// }
//
// export function inverseAddressTypeFactory(type: AddressType) {
//     if(type === AddressType.Home) return 'home';
//     if(type === AddressType.Present) return 'present';
//     if(type === AddressType.Permanent) return 'permanent';
//     if(type === AddressType.Working) return 'working';
//     console.assert(false);
// }
//
// export function bloodGroupFactory(type: string): BloodGroup {
//     if(type === 'A+') return BloodGroup.APos;
//     if(type === 'A-') return BloodGroup.ANeg;
//     if(type === 'B+') return BloodGroup.BPos;
//     if(type === 'B-') return BloodGroup.BNeg;
//     if(type === 'AB+') return BloodGroup.ABPos;
//     if(type === 'AB-') return BloodGroup.ABNeg;
//     if(type === 'O+') return BloodGroup.OPos;
//     if(type === 'O-') return BloodGroup.ONeg;
// }

export const nisfuddeenEnums = {
    gender: getKeys(Gender),
    maritalStatus: getKeys(MaritalStatus),
    facialColor: getKeys(FacialColor),
    educationDegree: getKeys(EducationDegree),
    bloodGroup: getKeys(BloodGroup),
    beardStyle: getKeys(BeardStyle),
    financialStatus: getKeys(FinancialStatus),
    marriageReply: getKeys(MarriageReply),
    afterMarriageStudyReply: getKeys(AfterMarriageStudyReply),
    mohoranaTimeReply: getKeys(MohoranaTimeReply),
    boyOutfit: getKeys(BoyOutfit),
    girlOutfit: getKeys(GirlOutfit),
    mixAnswer: getKeys(MixAnswer),
    positiveAnswer: getKeys(PositiveAnswer),
    negativeAnswer: getKeys(NegativeAnswer),
    guardian: getKeys(Guardian),
    majhab: getKeys(Majhab),
    addressType: getKeys(AddressType),
    accountType: getKeys(AccountType),
    subscriptionType: getKeys(SubscriptionType),
    relation: getKeys(Relation),
    requestBiodataType: getKeys(RequestBiodataType),
    requestBiodataStatus: getKeys(RequestBiodataStatus)
}
