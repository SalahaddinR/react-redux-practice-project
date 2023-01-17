import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import 'styles/products/ShoppingItem.scss';
import { deleteCart, updateCart } from "../../redux/cartReducer/cartActions";

export default function ShoppingItem({ id, name, image, amount, price }) {
    const dispatch = useDispatch();
    const [amountValue, setAmountValue] = useState(amount || '0')

    const quantityElement = useRef();
    const totalPrice = useRef();
    const amountInput = useRef();
    const editBtn = useRef();
    const deleteBtn = useRef();
    const container = useRef();

    const user = useSelector(state => state.user);

    useEffect(
        () => {
            editBtn.current.addEventListener('click', (event) => {
                if (editBtn.current.id === 'edit') {
                    amountInput.current.value = amountValue ;
                    amountInput.current.id = 'displayed';
                    editBtn.current.innerText = 'done';
                    editBtn.current.id = 'save';
                }
                else if (editBtn.current.id === 'save') {

                    amountInput.current.id = 'hidden';
                    editBtn.current.innerText = 'edit';
                    editBtn.current.id = 'edit';

                    let value = parseInt(amountInput.current.value)

                    if (value !== amount) {
                        dispatch(
                            updateCart(id, user.token, value)
                        )
                    }
                }
            })

            document.body.addEventListener('keypress', event => {
                if (event.which === 13) {
                    amountInput.current.blur();
                }
            })

            deleteBtn.current.addEventListener('click', event => {
                container.current.style.cssText = 'display:none';

                dispatch(deleteCart(id, user.token));
            })

        }, []
    )

    const changeAmount = (event) => {
        const value = parseInt(event.target.value);

        if (value > 0 && value <= 15) {
            quantityElement.current.innerText = `${value} items`;
            totalPrice.current.innerText = `${Math.round(value * price)} $`
        }

        setAmountValue(event.target.value);   
    }

    return (
        <div className="ShoppingItem" id={`item#${id}`} ref={container}>
            <img src={image} alt="" className="itemImage" />
            <div className="itemData">
                <span className="name">{name}</span>
                <span className="quantity" ref={quantityElement}>{amount || '0'} items</span>
                <span className="price" >{price} $</span>
                <span className="totalPrice" ref={totalPrice}>{Math.round(price * amount * 100) / 100} $</span>
            </div>
            <div className="itemButtons">
                <button className="itemBtn deleteBtn material-symbols-outlined" ref={deleteBtn}>delete</button>
                <button className="itemBtn changeBtn material-symbols-outlined" id="edit" ref={editBtn} >edit</button>
                <input
                    type="number" name="amount"
                    id="hidden" className="changeAmount"
                    ref={amountInput}
                    onChange={changeAmount}
                    value={amountValue}
                />
            </div>
        </div>
    )
}