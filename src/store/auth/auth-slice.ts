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
    authLogin: (state: any) => ({
      ...state,
    }),
    authUpdateUser: (state: any, action: any) => ({
      ...state,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
    }),
    authFetchMe: (state: any) => ({
      ...state,
    }),
    authLogout: (state: any) => ({
      ...state,
    }),
    authUploadLoading: (state, action) => ({
      ...state,
      loading: action.payload.loading,
    }),
    authUploadMessageRedux: (state, action) => ({
      ...state,
      message: action.payload.message,
    }),
  },
});
export const {
  authChange,
  authLogin,
  authUpdateUser,
  authFetchMe,
  authUploadLoading,
  authLogout,
  authUploadMessageRedux,
} = authSlice.actions;
export default authSlice.reducer;
