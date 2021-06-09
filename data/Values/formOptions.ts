import {
  MixAnswer,
  Majhab,
  NegativeAnswer,
  PositiveAnswer,
  PersonalityType,
  Guardian,
  BoyOutfit,
  GirlOutfit,
  BeardStyle,
  AfterMarriageStudyReply,
  MohoranaTimeReply,
  MarriageReply,
  MaritalStatus,
  FacialColor,
  BloodGroup,
  AddressType,
  EducationDegree,
  FinancialStatus
} from '../../lib/dataAccessLayer/utils/aliases';

export const prayerTimeOptions = [0, 1, 2, 3, 4, 5].map((e) => {
  return { value: e.toString(), label: e.toString() };
});

export const genOptions = (options: { [key: string]: string }) => {
  return Object.keys(options).map((e) => ({ value: e, label: e }));
};

export const MaritalStatusOptions = genOptions(MaritalStatus);
export const FacialColorOptions = genOptions(FacialColor);
export const BloodGroupOptions = genOptions(BloodGroup);
export const AddressTypeOptions = genOptions(AddressType);
export const EducationDegreeOptions = genOptions(EducationDegree);
export const FinancialStatusOptions = genOptions(FinancialStatus);
export const MixAnswerOptions = genOptions(MixAnswer);
export const NegativeAnswerOptions = Object.keys(NegativeAnswer).map((e) => ({
  value: e,
  label: e,
}));
export const PositiveAnswerOptions = Object.keys(PositiveAnswer).map((e) => ({
  value: e,
  label: e,
}));
export const MajhabOptions = Object.keys(Majhab).map((e) => ({ value: e, label: e }));
export const PersonalityTypeOptions = Object.keys(PersonalityType).map((e) => ({
  value: e,
  label: e,
}));
export const GuardianOptions = Object.keys(Guardian).map((e) => ({ value: e, label: e }));
export const BoyOutFitOptions = Object.keys(BoyOutfit).map((e) => ({ value: e, label: e }));
export const GirlOutFitOptions = Object.keys(GirlOutfit).map((e) => ({ value: e, label: e }));
export const BeardStyleOptions = Object.keys(BeardStyle).map((e) => ({ value: e, label: e }));
export const MohranaTimeOptions = Object.keys(MohoranaTimeReply).map((e) => ({
  value: e,
  label: e,
}));
export const MarriageReplyOptions = Object.keys(MarriageReply).map((e) => ({ value: e, label: e }));
export const AfterMarriageStudyOptions = Object.keys(AfterMarriageStudyReply).map((e) => ({
  value: e,
  label: e,
}));

export const BooleanOptions = [
  { value: 'yes', label: 'yes' },
  { value: 'no', label: 'no' },
];
