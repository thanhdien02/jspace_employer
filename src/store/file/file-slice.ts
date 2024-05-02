import { createSlice } from "@reduxjs/toolkit";

interface IFile {
  files: any;
  loading?: boolean;
  messageFile?: string;
}

const init: IFile = {
  files: {},
  loading: false,
  messageFile: "",
};
const fileSlice: any = createSlice({
  name: "file",
  initialState: init,
  reducers: {
    fileUploadFile: (state: any) => ({
      ...state,
    }),
    fileUpdateLoadingRedux: (state: any, action: any) => ({
      ...state,
      loading: action.payload.loading,
    }),
    fileUpdateFileRedux: (state: any, action: any) => ({
      ...state,
      files: action.payload.files,
    }),
    fileUpdateMessageRedux: (state: any, action: any) => ({
      ...state,
      messageFile: action.payload.messageFile,
    }),
    fileGetAllFile: (state: any) => ({
      ...state,
    }),
  },
});
export const {
  fileUploadFile,
  fileUpdateLoadingRedux,
  fileUpdateMessageRedux,
  fileGetAllFile,
  fileUpdateFileRedux,
} = fileSlice.actions;
export default fileSlice.reducer;
