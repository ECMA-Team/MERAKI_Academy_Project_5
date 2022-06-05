import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import cartReducer from "./reducers/cart";
import categoryReducer from "./reducers/categoryAdmin";
import productsReducer from "./reducers/products";
import usersReducer from "./reducers/users";
import sreachReducer from "./reducers/sreach";


export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    category: categoryReducer,
    users: usersReducer,
    search:sreachReducer
  },
});
