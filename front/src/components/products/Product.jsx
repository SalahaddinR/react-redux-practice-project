import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCart, setCart } from "../../redux/cartReducer/cartActions";
import 'styles/products/Product.scss';

export default function Product({ id, name, price, image }) {
    const [amount, setAmount] = useState(1);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.data);

    const buttonsPannel = useRef();

    const increaseAmount = (newAmount) => {
        if (newAmount < 15) {
            setAmount(newAmount);
        }
    }

    const decreaseAmount = (newAmount) => {
        if (newAmount > 0) {
            setAmount(newAmount)
        }
    }

    const triggerButtonPannel = () => {
        const buttonsGroup = document.getElementById(`${id}`).querySelector('.buttonsGroup');
        if (buttonsGroup.id === 'hidden') {
            buttonsGroup.id = 'displayed';
        }
        else {
            buttonsGroup.id = 'hidden';
        }
    }

    const addToCart = () => {
        setAmount(1);

        document.getElementById(`${id}`).querySelector('.buttonsGroup').id = "hidden";
        document.querySelector('.count').innerText = 
            (parseInt(document.querySelector('.count').innerText) + 1).toString();

        const productElement = {
            id,
            price: Math.round(price * amount * 100) / 100,
            amount
        };


        if (user._id) {
            dispatch(setCart(user._id, productElement.id, productElement.amount))
        }
    }

    return (
        <div className="Product" id={`${id}`}>
            <img
                src={image} alt={`image ${name}`}
                className="productImage"
                onClick={() => triggerButtonPannel()}
            />
            <div className="description" onClick={() => triggerButtonPannel()} >
                <span className="productName">{name}</span>
                <span className="productPrice">{price} $</span>
            </div>
            <div className="buttonsGroup" id="hidden" ref={buttonsPannel}>
                <button className="productAdd" onClick={addToCart}>Add to Cart</button>
                <div className="controllers">
                    <button
                        className="productDecreaseBtn controlBtn"
                        onClick={() => decreaseAmount(amount - 1)}
                    >-</button>
                    <span className="amount">{amount}</span>
                    <button
                        className="productIncreaseBtn controlBtn"
                        onClick={() => increaseAmount(amount + 1)}
                    >+</button>
                </div>
            </div>
        </div>
    )
}