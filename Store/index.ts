export const updateBasicInfo = (state, payload) => {
  return {
    ...state,
    basicInfo: {
      ...payload,
    },
  };
};

export const updateAddressInfo = (state, payload) => {
  return {
    ...state,
    addresses: {
      ...payload,
    },
  };
};

export const updateEducationQualifications = (state, payload) => {
  return {
    ...state,
    educationQualifications: {
      ...payload,
    },
  };
};

export const updateFamilyInformation = (state, payload) => {
  return {
    ...state,
    familyInformation: {
      ...payload,
    },
  };
};

export const updateExtraInformation = (state, payload) => {
  return {
    ...state,
    extraInformation: {
      ...payload,
    },
  };
};

export const updatePartnerQualities = (state, payload) => {
  return {
    ...state,
    partnerQualities: {
      ...payload,
    },
  };
};

export const updateContactInformation = (state, payload) => {
  return {
    ...state,
    contactInformation: {
      ...payload,
    },
  };
};

export const updatePersonalInformation = (state, payload) => {
  return {
    ...state,
    personalInformation: {
      ...payload,
    },
  };
};

export const updateMarriageInformation = (state, payload) => {
  return {
    ...state,
    marriageInformation: {
      ...payload,
    },
  };
};