import { ADD_CART, DELETE_CART, LOAD_CART, UPDATE_CART } from "./cartTypes";
import axios from 'axios';
import { API_URL } from "../apiSettings";

export const getCart = (userId, token) => async dispatch => {
    try {
        const response = await axios.get(`${API_URL}/api/carts/user/${userId || localStorage.getItem('id')}`, {
            headers: {
                authorization: `Bearer ${token || localStorage.getItem('token')}`
            }
        });

        dispatch({
            type: LOAD_CART,
            payload: response.data
        })
    }
    catch(error) {
        
    }
}

export const setCart = (userId, productId, amount, token) => async dispatch => {
    try {
        const response = await axios.post(`${API_URL}/api/carts/`, {
            user: userId,
            product: productId,
            amount  
        }, {
            headers: {
                authorization: `Bearer ${token || localStorage.getItem('token')}`
            }
        });

        dispatch({
            type: ADD_CART,
            payload: response.data
        })
    }
    catch(error) {
        console.log(error);
    }
} 

export const updateCart = (cartId, token, amount) => async dispatch => {
    try {
        const response = await axios.put(`${API_URL}/api/carts/${cartId}`, {
            amount
        }, {
            headers: {
                authorization: `Bearer ${token || localStorage.getItem('token')}`
            }
        });

        dispatch({
            type: UPDATE_CART,
            payload: {
                id: response.data._id,
                amount: response.data.amount
            }
        })
    }
    catch(error) {
        console.log(error);
    }
}

export const deleteCart = (cartId, token) => async dispatch => {
    try {
        const response = await axios.delete(`${API_URL}/api/carts/${cartId}`, {
            headers: {
                authorization: `Bearer ${token || localStorage.getItem('token')}`
            }
        });

        dispatch({
            type: DELETE_CART,
            payload: response._id
        })
    }
    catch(error) {
        
    }
}