import React, { useEffect, useRef } from "react";
import Product from "./Product";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/productReducer/productAction";
import { getUser } from "../../redux/userReducer/userAction";

import 'styles/products/Catalog.scss';
import { getCart } from "../../redux/cartReducer/cartActions";

export default function Catalog() {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const products = useSelector(state => state.product);
    const cart = useSelector(state => state.cart);

    const count = useRef();

    useEffect(() => {
        dispatch(getCart(user.id, user.token))
        dispatch(getProducts());
    }, []);

    useEffect(() => {
        dispatch(getUser(user.token));
    }, [user])

    useEffect(() => {
        count.current.innerText = cart.length.toString();
    }, [cart])

    const cartBtnOrCartLink = user.token || localStorage.getItem('token') ?
        <a className="cartOpenBtn" href="/cart">
            <span className="material-symbols-outlined">shopping_cart</span>
        </a> :
        <a className="cartOpenBtn" href="/login">
            <span className="material-symbols-outlined">shopping_cart</span>
        </a>

    if (products) {
        return (
            <div className="catalogWrapper">
                <div className="wrapper">
                    <div className="buttonContainer">
                        <span className="count" ref={count}>0</span>
                        {cartBtnOrCartLink}
                    </div>
                    <div className="Catalog">
                        {
                            Array.from(products).map(
                                (product, index) => {
                                    const image = require(`images/products/${product.image}`)
                                    const productElement = <Product
                                        key={index}
                                        id={product._id}
                                        name={product.name}
                                        price={product.price}
                                        image={image}
                                    />
                                    return productElement;
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
    else {
        return <h1>Loading...</h1>
    }
}