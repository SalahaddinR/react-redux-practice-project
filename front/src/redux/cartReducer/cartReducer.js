import { ADD_CART, DELETE_CART, LOAD_CART, UPDATE_CART } from "./cartTypes";

export default function cartReducer(state = [], action) {
    switch(action.type) {
        case LOAD_CART:
            return [...action.payload];
        case ADD_CART:
            return [
                ...state,
                action.payload
            ]
        case UPDATE_CART:
            for (let index = 0; index < state.length; index++) {
                if (state[index]._id === action.payload.id) {
                    state[index].amount = action.payload.amount;
                }
            }
            return [...state];
        case DELETE_CART:
            const filteredState = state.filter(element => element._id !== action.payload.id);
            return [...filteredState]
        default:
            return state;
    }
}