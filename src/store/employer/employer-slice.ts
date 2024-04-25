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
    employerUpdateLoadingRedux: (state, action) => ({
      ...state,
      loadingEmployer: action.payload.loadingEmployer,
    }),
    employerUpdateEmployerRedux: (state, action) => ({
      ...state,
      employer: action.payload.employer,
    }),
    employerUpdateInformationEmployer: () => {},
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
} = employerSlice.actions;
export default employerSlice.reducer;
