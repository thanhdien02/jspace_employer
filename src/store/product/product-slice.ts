import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  products: any;
  buyedProducts: any;
  productById: any;
  paginationProduct?: any;
  loadingProduct?: boolean;
  messageProduct?: string;
}

const init: IUser = {
  products: [],
  buyedProducts: [],
  productById: [],
  paginationProduct: {},
  loadingProduct: false,
  messageProduct: "",
};

const companyrequestreviewSlice: any = createSlice({
  name: "product",
  initialState: init,
  reducers: {
    productCreateProduct: () => {},
    productGetProduct: () => {},
    productGetBuyedProduct: () => {},
    productGetProductById: () => {},
    productUpdateProductByIdRedux: (state: any, action: any) => ({
      ...state,
      productById: action.payload.productById,
    }),
    productUpdateProductRedux: (state: any, action: any) => ({
      ...state,
      products: action.payload.products,
    }),
    productUpdateBuyedProductRedux: (state: any, action: any) => ({
      ...state,
      buyedProducts: action.payload.buyedProducts,
    }),
    productUpdatePaginationRedux: (state: any, action: any) => ({
      ...state,
      paginationProduct: action.payload.paginationProduct,
    }),
    productUpdateLoadingRedux: (state: any, action: any) => ({
      ...state,
      loadingProduct: action.payload.loadingProduct,
    }),
    productUpdateMessageRedux: (state: any, action: any) => ({
      ...state,
      messageProduct: action.payload.messageProduct,
    }),
  },
});
export const {
  productGetProduct,
  productUpdateProductRedux,
  productUpdatePaginationRedux,
  productUpdateLoadingRedux,
  productUpdateMessageRedux,
  productCreateProduct,
  productGetProductById,
  productUpdateProductByIdRedux,
  productGetBuyedProduct,
  productUpdateBuyedProductRedux,
} = companyrequestreviewSlice.actions;
export default companyrequestreviewSlice.reducer;
