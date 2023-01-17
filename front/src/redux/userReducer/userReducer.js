import { GET_USER, USER_LOGIN, USER_REGISTER } from "./userTypes";

const initialState = {
    id: '',
    token: '',
    data: {}
}

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case USER_REGISTER:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('id', action.payload.id);
            return ({
                ...state,
                id: action.payload.id,
                token: action.payload.token
            })
        case USER_LOGIN:
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('id', action.payload.id);
            return ({
                ...state,
                id: action.payload.id,
                token: action.payload.token
            })
        case GET_USER:
            return ({
                ...state,
                data: action.payload
            })
        default:
            return state;
    }
}