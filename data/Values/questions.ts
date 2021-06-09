import {
  MaritalStatusOptions,
  FacialColorOptions,
  BloodGroupOptions,
  AddressTypeOptions,
  EducationDegreeOptions,
  BooleanOptions,
  FinancialStatusOptions,
  prayerTimeOptions,
  MixAnswerOptions,
  MajhabOptions,
  NegativeAnswerOptions,
  PositiveAnswerOptions,
  PersonalityTypeOptions,
  GuardianOptions,
  BoyOutFitOptions,
  BeardStyleOptions,
  GirlOutFitOptions,
  AfterMarriageStudyOptions,
  MohranaTimeOptions,
  MarriageReplyOptions,
} from './formOptions';

interface Info {
  [key: string]: {
    label: { en: string };
    options?: Array<{ value: string; label: string }>;
  };
};

export const basicInformation: Info = {
  maritalStatus: {
    label: { en: 'Marital Status' },
    options: MaritalStatusOptions,
  },
  birthDay: {
    label: { en: 'birthDay' },
  },
  facialColor: {
    label: { en: 'facialColor' },
    options: FacialColorOptions,
  },
  height: {
    label: { en: 'height' },
  },
  weight: {
    label: { en: 'weight' },
  },
  bloodGroup: {
    label: { en: 'bloodGroup' },
    options: BloodGroupOptions,
  },
  occupation: {
    label: { en: 'occupation' },
  },
};

export const addressInformation: Info = {
  type: { label: { en: 'type' }, options: AddressTypeOptions },
  country: { label: { en: 'country' } },
  division: { label: { en: 'division' } },
  district: { label: { en: 'district' } },
  postOffice: { label: { en: 'post office' } },
};

export const educationQualifications: Info = {
  degreeName: { label: { en: 'degreeName' }, options: EducationDegreeOptions },
  department: { label: { en: 'department' } },
  passYear: { label: { en: 'passYear' } },
  instituteName: { label: { en: 'instituteName' } },
  result: { label: { en: 'result' } },
};

export const familyInformation: Info = {
  fatherAlive: { label: { en: 'fatherAlive' }, options: BooleanOptions },
  fatherOccupation: { label: { en: 'fatherOccupation' } },
  motherAlive: { label: { en: 'motherAlive' }, options: BooleanOptions },
  motherOccupation: { label: { en: 'motherOccupation' } },
  totalSisters: { label: { en: 'totalSisters' } },
  totalBrothers: { label: { en: 'totalBrothers' } },
  brothersStatus: { label: { en: 'brothersStatus' } },
  sistersStatus: { label: { en: 'sistersStatus' } },
  financialStatus: { label: { en: 'financialStatus' } },
  socialStatus: { label: { en: 'socialStatus' } },
  unclesStatus: { label: { en: 'unclesStatus' } },
};

export const extraInformation: Info = {
  aboutMe: { label: { en: 'aboutMe' } },
  aboutOccupation: { label: { en: 'aboutOccupation' } },
  guardianKnowsAboutSubmission: {
    label: { en: 'guardianKnowsAboutSubmission' },
    options: BooleanOptions,
  },
};

export const partnerQualities: Info = {
  ageMin: { label: { en: 'ageMin' } },
  ageMax: { label: { en: 'ageMax' } },
  facialComplexion: { label: { en: 'ageMin' }, options: FacialColorOptions },
  heightMin: { label: { en: 'heightMin' } },
  heightMax: { label: { en: 'heightMax' } },
  minimumEducationDegree: {
    label: { en: 'minimumEducationDegree' },
    options: EducationDegreeOptions,
  },
  country: { label: { en: 'country' } },
  district: { label: { en: 'district' } },
  maritalStatus: { label: { en: 'maritalStatus' }, options: MaritalStatusOptions },
  occupation: { label: { en: 'occupation' } }, // array
  financialStatus: { label: { en: 'financialStatus' }, options: FinancialStatusOptions },
  desiredQualities: { label: { en: 'desiredQualities' } },
};

export const contactInformation:Info = {
  fatherMobile: { label: { en: 'fatherMobile' } },
  motherMobile: { label: { en: 'motherMobile' } },
  guardianMobile: { label: { en: 'guardianMobile' } },
}

export const commonPersonalInformation: Info = {
  prayerTimes: { label: { en: 'prayerTimes' }, options: prayerTimeOptions },
  durationOfRegularPrayer: { label: { en: 'durationOfRegularPrayer' }, },
  mahramMaintain: { label: { en: 'mahramMaintain' }, options: MixAnswerOptions },
  majhab: { label: { en: 'majhab' }, options: MajhabOptions },
  politicalPhilosophy: { label: { en: 'politicalPhilosophy' },  },
  watchDramaMovie: { label: { en: 'watchDramaMovie' }, options: NegativeAnswerOptions },
  readSahihQuran: { label: { en: 'readSahihQuran' }, options: PositiveAnswerOptions },
  listenMusic: { label: { en: 'listenMusic' }, options: NegativeAnswerOptions },
  anyDisease: { label: { en: 'anyDisease' },  },
  deenMehnat: { label: { en: 'deenMehnat' },  },
  pirFollower: { label: { en: 'pirFollower' },  },
  mazarBelief: { label: { en: 'mazarBelief' },  },
  favoriteIslamicBooks: { label: { en: 'favoriteIslamicBooks' },  },
  favoriteScholars: { label: { en: 'favoriteScholars' },  },
  specialQualities: { label: { en: 'specialQualities' },  },
  badHabits: { label: { en: 'badHabits' },  },
  personalityType: { label: { en: 'personalityType' }, options: PersonalityTypeOptions },
  hobbies: { label: { en: 'badHabits' },  },
  futurePlan: { label: { en: 'futurePlan' },  },
  guardian: { label: { en: 'guardian' }, options: GuardianOptions },
}

export const malePersonalInformation: Info = {
  outfit: { label: { en: 'outfit' }, options: BoyOutFitOptions },
  beardStyle: { label: { en: 'beardStyle' }, options: BeardStyleOptions },
  pantPajamaAboveKnee: { label: { en: 'pantPajamaAboveKnee' }, options: BooleanOptions  },
  malePrayerTimesInJamah: { label: { en: 'malePrayerTimesInJamah' }, options: prayerTimeOptions },
}

export const femalePersonalInformation: Info = {
  outfit: { label: { en: 'outfit' }, options: GirlOutFitOptions },
  femalePrayerTimesInAwwal: { label: { en: 'femalePrayerTimesInAwwal' }, options: prayerTimeOptions },
}

export const commonMarriageInformation: Info = {
  guardianAgreed: { label: { en: 'guardianAgreed' }, options: BooleanOptions  },
  reasonOfMarriage: { label: { en: 'reasonOfMarriage' },  },
  ideaAboutMarriage: { label: { en: 'ideaAboutMarriage' },  }
}

export const femaleMarriageInformation: Info = {
  jobAfterMarriage: { label: { en: 'jobAfterMarriage' }, options: MarriageReplyOptions  },
  carryStudyAfterMarriage: { label: { en: 'carryStudyAfterMarriage' }, options: MarriageReplyOptions  },
  femaleMohoranaExpectationMin: { label: { en: 'femaleMohoranaExpectationMin' }, },
  femaleMohoranaExpectationMax: { label: { en: 'femaleMohoranaExpectationMax' }, },
  femaleMohoranaExpectedPaidTime: { label: { en: 'femaleMohoranaExpectedPaidTime' }, options: MohranaTimeOptions}
}

export const maleMarriageInformation: Info = {
  willManageWifePardah: { label: { en: 'willManageWifePardah' }, options: BooleanOptions  },
  willAllowWifeStudy: { label: { en: 'willAllowWifeStudy' }, options: AfterMarriageStudyOptions  },
  afterMarriageStay: { label: { en: 'afterMarriageStay' },  },
  desiresDowryOrGift: { label: { en: 'desiresDowryOrGift' }, options: BooleanOptions  },
  maleMohoranaRangeMin: { label: { en: 'maleMohoranaRange' },  },
  maleMohoranaRangeMax: { label: { en: 'maleMohoranaRange' },  },
  maleMohoranaPaidTime: { label: { en: 'maleMohoranaPaidTime' }, options: MohranaTimeOptions  },
}