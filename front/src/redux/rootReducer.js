import { combineReducers } from "redux";
import userReducer from "./userReducer/userReducer";
import productReducer from "./productReducer/productReducer";
import errorReducer from "./errorReducer/errorReducer";
import cartReducer from "./cartReducer/cartReducer";

export default combineReducers({
    user: userReducer,
    product: productReducer,
    error: errorReducer,
    cart: cartReducer
});

