import { createSlice } from "@reduxjs/toolkit";

interface IEmployer {
  employer: any;
  loadingEmployer?: boolean;
  messageEmployer?: string;
}
const init: IEmployer = {
  employer: {},
  loadingEmployer: false,
  messageEmployer: "",
};
const employerSlice: any = createSlice({
  name: "employer",
  initialState: init,
  reducers: {
    employerUpdateInformationEmployer: () => {},
    employerUpdateBackgroundEmployer: () => {},
    employerUpdateAvatarEmployer: () => {},
    employerConfirmCompanyEmployer: () => {},
    employerUpdateLoadingRedux: (state, action) => ({
      ...state,
      loadingEmployer: action.payload.loadingEmployer,
    }),
    employerUpdateEmployerRedux: (state, action) => ({
      ...state,
      employer: action.payload.employer,
    }),
    employerUpdateMessageRedux: (state, action) => ({
      ...state,
      messageEmployer: action.payload.messageEmployer,
    }),
  },
});
export const {
  employerUpdateLoadingRedux,
  employerUpdateMessageRedux,
  employerUpdateInformationEmployer,
  employerUpdateEmployerRedux,
  employerConfirmCompanyEmployer,
  employerUpdateBackgroundEmployer,
  employerUpdateAvatarEmployer,
} = employerSlice.actions;
export default employerSlice.reducer;
