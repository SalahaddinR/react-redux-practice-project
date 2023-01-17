import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { focusHandle, blurHandle } from "./utils";
import { loginUser } from "../../redux/userReducer/userAction";
import 'styles/authentication/Form.scss';
import { useNavigate } from "react-router";

export default function Login() {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const user = useSelector(state => state.user);
    const error = useSelector(state => state.error);

    const email = useRef();
    const password = useRef();
    const errors = useRef();


    useEffect(
        () => {
            if (error.message) {
                errors.current.innerText = error.message;
                setTimeout(
                    () => {
                        errors.current.innerText = ''
                    }, 5000
                )
            }
        }, [error]
    );

    useEffect(
        () => {
            if (user.token) {
                navigator('/');
            }
        }, [user]
    )

    const sumbitForm = (event) => {
        event.preventDefault();

        if (!email.current.value || !password.current.value) {
            errors.current.innerText = 'All fields required!';
            setTimeout(
                () => {
                    errors.current.innerText = '';
                }, 5000
            )
        }
        else {
            const formData = {
                email: email.current.value,
                password: password.current.value
            };

            email.current.value = '';
            password.current.value = '';

            Array.from(
                document.querySelectorAll('.inputLabel')
            ).forEach(
                element => {
                    element.removeAttribute('style');
                }
            )

            dispatch(
                loginUser(formData.email, formData.password)
            );
        }
    }


    return (
        <div className="formWrapper">
            <section className="Form" id="login">
                <div className="errors" ref={errors}></div>
                <form className="formContainer" onSubmit={sumbitForm} >
                    <h1 className="title">Log in</h1>
                    <div className="inputGroup" onClick={focusHandle} onBlur={blurHandle}>
                        <label htmlFor="email" className="inputLabel">Email</label>
                        <input type="text" name="email" id="email" className="inputField" ref={email} />
                    </div>
                    <div className="inputGroup" onClick={focusHandle} onBlur={blurHandle}>
                        <label htmlFor="password" className="inputLabel">Password</label>
                        <input type="password" name="password" id="password" className="inputField" ref={password} />
                    </div>
                    <button type="submit" className="submitBtn">Log in</button>
                </form>
            </section>
        </div>
    )
}