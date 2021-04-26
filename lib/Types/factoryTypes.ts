import { AccountType, EducationDegree, FacialColor, Gender, MaritalStatus } from './types';

export function accountTypeFactory(type: string): AccountType {
    if(type === 'normal') return AccountType.Bridegroom;
    if(type === 'guardian') return AccountType.Guardian;
    if(type === 'moderator') return AccountType.Moderator;
    if(type === 'admin') return AccountType.Admin;
    return null;
}

export function maritalStatusFactory(type: string): MaritalStatus {
    if(type === 'marriedWithChildren') return MaritalStatus.MarriedWithChildren;
    if(type === 'marriedWithoutChildren') return MaritalStatus.MarriedWithoutChildren;
    if(type === 'unmarried') return MaritalStatus.Unmarried;
    if(type === 'divorcedWithChildren') return MaritalStatus.DivorcedWithChildren;
    if(type === 'divorcedWithoutChildren') return MaritalStatus.DivorcedWithoutChildren;
    if(type === 'widow') return MaritalStatus.Widow;
    return null;
}

export function genderFactory(type: string): Gender {
    if(type === 'male') return Gender.Male;
    if(type === 'female') return Gender.Female;
    return null;
}

export function facialColorFactory(type: string): FacialColor {
    if(type === 'PinkishWhite') return FacialColor.PinkishWhite;
    if(type === 'PaleWhite') return FacialColor.PaleWhite;
    if(type === 'FairWhite') return FacialColor.FairWhite;
    if(type === 'MediumFair') return FacialColor.MediumFair;
    if(type === 'LightBrown') return FacialColor.LightBrown;
    if(type === 'ModerateBrown') return FacialColor.ModerateBrown;
    if(type === 'Black') return FacialColor.Black;
    return null;
}

export function educationDegreeFactory(type: string): EducationDegree {
    if(type === 'Secondary') return EducationDegree.Secondary;
    if(type === 'HigherSecondary') return EducationDegree.HigherSecondary;
    if(type === 'Undergraduate') return EducationDegree.Undergraduate;
    if(type === 'PostGraduate') return EducationDegree.Postgraduate;
    if(type === 'Doctorate') return EducationDegree.Doctorate;
    if(type === 'PostDoctorate') return EducationDegree.PostDoctorate;
    return null;
}
