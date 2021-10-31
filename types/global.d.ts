import 'little-state-machine';

declare module 'little-state-machine' {
  interface GlobalState {
    basicInfo: {
      [key: string]: string;
    };
    addresses: {
      [key: string]: string;
      address: number;
    };
    educationQualifications: {
      [key: string]: string;
      education: number;
    };
    familyInformation: {
      [key: string]: string;
    };
    extraInformation: {
      [key: string]: string;
    };
    partnerQualities: {
      [key: string]: string;
    };
    contactInformation: {
      [key: string]: string;
    };
    personalInformation: {
      [key: string]: string;
    };
    marriageInformation: {
      [key: string]: string;
    };
  }
}
