import { createSlice } from "@reduxjs/toolkit";

interface IFile {
  files: any;
  loadingFile?: boolean;
  messageFile?: string;
}

const init: IFile = {
  files: {},
  loadingFile: false,
  messageFile: "",
};
const fileSlice: any = createSlice({
  name: "file",
  initialState: init,
  reducers: {
    fileUploadFile: (state: any) => ({
      ...state,
    }),
    fileUploadImage: () => {},
    fileUpdateLoadingRedux: (state: any, action: any) => ({
      ...state,
      loadingFile: action.payload.loadingFile,
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
  fileUploadImage,
} = fileSlice.actions;
export default fileSlice.reducer;
