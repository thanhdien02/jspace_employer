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
    commonChange: (state: any) => ({
      ...state,
    }),
  },
});
export const { commonChange } = commonSlice.actions;
export default commonSlice.reducer;
