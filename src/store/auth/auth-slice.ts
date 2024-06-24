import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  user: any;
  companyAuth?: any;
  checkAuth?: any;
  accessToken: string;
  loading?: boolean;
  loadingEmailPassword?: boolean;
  messageAuth?: string;
}

const init: IAuth = {
  user: {},
  companyAuth: {},
  checkAuth: {},
  accessToken: "",
  loading: false,
  loadingEmailPassword: false,
  messageAuth: "",
};
const authSlice: any = createSlice({
  name: "auth",
  initialState: init,
  reducers: {
    authChange: (state: any, action: any) => ({
      ...state,
      user: action.payload,
    }),
    authLogin: (state: any) => ({
      ...state,
    }),
    authLoginWithEmailPassword: (state: any) => ({
      ...state,
    }),
    authLogout: (state: any) => ({
      ...state,
    }),
    authRegister: (state: any) => ({
      ...state,
    }),
    authUpdateLoadingRedux: (state: any, action: any) => ({
      ...state,
      loading: action.payload.loading,
    }),
    authUpdateEmailPasswordLoadingRedux: (state: any, action: any) => ({
      ...state,
      loadingEmailPassword: action.payload.loadingEmailPassword,
    }),
    authUpdateCheckAuthRedux: (state: any, action: any) => ({
      ...state,
      checkAuth: action.payload.checkAuth,
    }),
    authUpdateCompanyAuthRedux: (state: any, action: any) => ({
      ...state,
      companyAuth: action.payload.companyAuth,
    }),
    authUpdateMessageRedux: (state: any, action: any) => ({
      ...state,
      messageAuth: action.payload.messageAuth,
    }),
    authFetchMe: (state: any) => ({
      ...state,
    }),
    authRefreshToken: (state: any) => ({
      ...state,
    }),
    authGetRoles: (state: any) => ({
      ...state,
    }),
    authUpdateRolesRedux: (state: any, action: any) => ({
      ...state,
      roles: action.payload.roles,
    }),
    authUpdateFetchRedux: (state: any, action: any) => ({
      ...state,
      accessToken: action.payload.accessToken,
      user: action.payload.user,
      companyAuth: action.payload.companyAuth,
    }),
  },
});
export const {
  authChange,
  authLogin,
  authUpdateRolesRedux,
  authGetRoles,
  authFetchMe,
  authRegister,
  authLogout,
  authUpdateLoadingRedux,
  authUpdateFetchRedux,
  authRefreshToken,
  authUpdateCheckAuthRedux,
  authUpdateCompanyAuthRedux,
  authUpdateMessageRedux,
  authLoginWithEmailPassword,
  authUpdateEmailPasswordLoadingRedux,
} = authSlice.actions;
export default authSlice.reducer;
