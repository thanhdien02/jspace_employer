import { createSlice } from "@reduxjs/toolkit";

interface ICommon {
  user: any;
}

const init: ICommon = {
  user: {},
};

const commonSlice: any = createSlice({
  name: "common",
  initialState: init,
  reducers: {
    commonUpdateOAuthRedux: (state: any, action: any) => ({
      ...state,
      infoUserOauth: action.payload.infoUserOauth,
    }),
  },
});
export const { commonUpdateOAuthRedux } = commonSlice.actions;
export default commonSlice.reducer;
