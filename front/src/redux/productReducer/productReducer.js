import { LOAD_PRODUCTS } from "./productTypes";

export default function productReducer(state = {}, action) {
    switch(action.type) {
        case LOAD_PRODUCTS: 
            return [...action.payload]
        default:
            return state;
    }
}