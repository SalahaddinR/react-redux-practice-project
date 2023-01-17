import { ERROR_INVALID_CREDENTIALS, ERROR_USER_EXISTS } from "./errorTypes";

export default function errorReducer(state = {}, action) {
    switch(action.type) {
        case ERROR_INVALID_CREDENTIALS:
            return ({
                message: 'Invalid credentials'
            });
        case ERROR_USER_EXISTS:
            return ({
                message: 'User with this email already registered'
            });
        default:
            return state;
    }
}