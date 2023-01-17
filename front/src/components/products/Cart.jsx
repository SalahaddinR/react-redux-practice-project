import React, { useEffect, useState } from "react";
import ShoppingItem from "./ShoppingItem";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/cartReducer/cartActions";
import { useNavigate } from "react-router";

import 'styles/products/Cart.scss';
import { getProducts } from "../../redux/productReducer/productAction";

export default function Cart() {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const user = useSelector(state => state.user);
    const products = useSelector(state => state.product)
    const cart = useSelector(state => state.cart);

    useEffect(
        () => {
            if (!user.token && !localStorage.getItem('token')) {
                navigator('/login');
            }
            dispatch(getProducts());
            dispatch(getCart(user.id, user.token));

            
        }, []
    );

    useEffect(
        () => {
            let totalPrice = 0;
            Array.from(cart).forEach(
                cartData => {
                    const product = Array.from(products).filter(product => product._id == cartData.product)[0];
                    totalPrice += product.price * cartData.amount;
                }
            )

            totalPrice += Math.round(totalPrice);   

            document.querySelector('.totalFee').innerText = `${totalPrice} $`
        }, [cart]
    )

    return (
        <div className="cartWrapper">
            <div className="Cart">
                <h2 className="title">Shopping Cart</h2>
                <div className="itemsContainer">
                    {
                        Array.from(cart).map(
                            cartData => {
                                const product = Array.from(products).filter(product => product._id == cartData.product)[0];
                                const image = require(`images/products/${product.image}`);
                                

                                const shoppingItem =
                                    <ShoppingItem
                                        id={cartData._id}
                                        key={cartData._id}
                                        name={product.name}
                                        image={image}
                                        amount={cartData.amount}
                                        price={product.price}
                                    />;

                                return shoppingItem;
                            }
                        )
                    }
                </div>
                <div className="purchaseContainer">
                    <div className="purchaseDetails">
                        <span className="label">Total Fee</span>
                        <span className="totalFee"></span>
                    </div>
                    <button className="purchaseBtn">Purchase</button>
                </div>
            </div>
        </div>
    )
}