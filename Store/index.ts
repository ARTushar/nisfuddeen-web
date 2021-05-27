export const updateBasicInfo = (state, payload) => {
  return {
    ...state,
    basicInfo: {
      ...payload,
    },
  };
}