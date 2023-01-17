import { LOAD_PRODUCTS } from "./productTypes";
import axios from 'axios';
import { API_URL } from "../apiSettings";

export const getProducts = () => dispatch => {
    axios.get(`${API_URL}/api/products/`).then(
        response => {
            const data = response.data;

            dispatch({
                type: LOAD_PRODUCTS,
                payload: data
            });
        }
    )
}