import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import cartReducer from "./reducers/cart";
import searchReducer from "./reducers/search"

import productsReducer from "./reducers/products";
export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart : cartReducer,
    search:searchReducer
  },
});
