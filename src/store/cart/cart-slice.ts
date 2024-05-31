import { createSlice } from "@reduxjs/toolkit";

interface IFile {
  carts: any;
  loadingCart?: boolean;
  messageCart?: string;
  paginationCart?: any;
}

const init: IFile = {
  carts: {},
  loadingCart: false,
  messageCart: "",
  paginationCart: {},
};
const cartSlice: any = createSlice({
  name: "cart",
  initialState: init,
  reducers: {
    cartAddToCart: () => {},
    cartUpdateCart: () => {},
    cartDeleteCart: () => {},
    cartGetCart: () => {},
    cartUpdateLoadingRedux: (state: any, action: any) => ({
      ...state,
      loadingCart: action.payload.loadingCart,
    }),
    cartUpdateCartRedux: (state: any, action: any) => ({
      ...state,
      carts: action.payload.carts,
    }),
    cartUpdateMessageRedux: (state: any, action: any) => ({
      ...state,
      messageCart: action.payload.messageCart,
    }),
    cartUpdatePaginationRedux: (state: any, action: any) => ({
      ...state,
      paginationCart: action.payload.paginationCart,
    }),
  },
});
export const {
  cartUpdateLoadingRedux,
  cartUpdateMessageRedux,
  cartUpdateCartRedux,
  cartAddToCart,
  cartGetCart,
  cartUpdateCart,
  cartUpdatePaginationRedux,
  cartDeleteCart,
} = cartSlice.actions;
export default cartSlice.reducer;
