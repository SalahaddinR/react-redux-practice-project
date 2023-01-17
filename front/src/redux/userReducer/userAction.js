import { GET_USER, USER_LOGIN, USER_REGISTER } from "./userTypes";
import { ERROR_INVALID_CREDENTIALS, ERROR_USER_EXISTS } from "../errorReducer/errorTypes";
import axios from 'axios';
import { API_URL } from '../apiSettings';

export const registerUser = (name, email, password, phone) => async dispatch => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, {
            name, email,
            phone, password
        })
        dispatch({
            type: USER_REGISTER,
            payload: response.data
        })
        
    }
    catch(error) {
        dispatch({
            type: ERROR_USER_EXISTS
        })
    }
}

export const loginUser = (email, password) => async dispatch => {
    try {
        const response = await axios.post(`${API_URL}/api/users/login`, {
            email, 
            password
        });

        dispatch({
            type: USER_LOGIN,
            payload: response.data
        })
    }
    catch(error) {
        dispatch({
            type: ERROR_INVALID_CREDENTIALS
        })
    }
}


export const getUser = (token) => async dispatch => {
    try {
        const response = await axios.get(`${API_URL}/api/users/me`, {
            headers: {
                authorization: `Bearer ${token || localStorage.getItem('token')}`
            }
        });

        dispatch({
            type: GET_USER,
            payload: response.data
        })
    }
    catch(error) {}
}