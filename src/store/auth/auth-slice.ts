import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  user: any;
  accessToken: string;
  loading?: boolean;
  message?: string;
}

const init: IAuth = {
  user: {},
  accessToken: "",
  loading: false,
  message: "",
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
} = authSlice.actions;
export default authSlice.reducer;
