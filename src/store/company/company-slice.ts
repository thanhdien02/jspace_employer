import { createSlice } from "@reduxjs/toolkit";

interface ICompany {
  company: any;
  loadingCompany?: boolean;
  messageCompany?: string;
  paginationCompany?: any;
}

const init: ICompany = {
  company: {},
  loadingCompany: false,
  messageCompany: "",
  paginationCompany: {},
};
const companySlice: any = createSlice({
  name: "company",
  initialState: init,
  reducers: {
    companyUpdateLoadingRedux: (state, action) => ({
      ...state,
      loadingCompany: action.payload.loadingCompany,
    }),
    companyUpdatePaginationRedux: (state, action) => ({
      ...state,
      paginationCompany: action.payload.paginationCompany,
    }),
    companyCreateCompany: () => {},
    companyGetCompany: () => {},
    companyUpdateLogoCompany: () => {},
    companyUpdateBackgroundCompany: () => {},
    companyGetCompanyById: () => {},
    companyUpdateCompanyRedux: (state, action) => ({
      ...state,
      company: action.payload.company,
    }),
    companyUpdateInformationCompany: () => {},
    companyUpdateMessageRedux: (state, action) => ({
      ...state,
      messageCompany: action.payload.messageCompany,
    }),
  },
});
export const {
  companyUpdateLoadingRedux,
  companyCreateCompany,
  companyUpdateMessageRedux,
  companyUpdateInformationCompany,
  companyUpdateCompanyRedux,
  companyGetCompany,
  companyGetCompanyById,
  companyUpdatePaginationRedux,
  companyUpdateLogoCompany,
  companyUpdateBackgroundCompany,
} = companySlice.actions;
export default companySlice.reducer;
