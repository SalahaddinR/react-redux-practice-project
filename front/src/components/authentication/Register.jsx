import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/userReducer/userAction";
import { focusHandle, blurHandle } from "./utils";
import 'styles/authentication/Form.scss';

export default function Register() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const error = useSelector(state => state.error);

    const name = useRef();
    const email = useRef();
    const phone = useRef();
    const password = useRef();
    const repeatPassword = useRef();
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
    )

    useEffect(
        () => {
            if (user.token) {
                navigator('/')
            }
        }, [user]
    );


    const validateForm = () => {
        if (
            !name.current.value || !email.current.value ||
            !phone.current.value || !password.current.value ||
            !repeatPassword.current.value) {
            return 'all fields required!';
        }
        if (password.current.value.length < 6) {
            return 'password must be more than 5 symbols'
        }
        if (password.current.value !== repeatPassword.current.value) {
            return 'passwords mismatching!';
        }
        return true;
    }

    const sumbitForm = (event) => {
        event.preventDefault();

        const verified = validateForm();
        if (verified === true) {
            const formData = {
                name: name.current.value,
                email: email.current.value,
                phone: phone.current.value,
                password: password.current.value
            };

            name.current.value = '';
            email.current.value = '';
            phone.current.value = '';
            password.current.value = '';
            repeatPassword.current.value = '';

            Array.from(
                document.querySelectorAll('.inputLabel')
            ).forEach(
                element => {
                    element.removeAttribute('style');
                }
            )


            dispatch(registerUser(
                formData.name,
                formData.email,
                formData.password,
                formData.phone
            ))


        }
        else {
            errors.current.innerText = verified;
            setTimeout(
                () => {
                    errors.current.innerText = '';
                }, 5000
            )
        }
    }


    return (
        <div className="formWrapper">
            <section className="Form" id="register">
                <div className="errors" ref={errors}></div>
                <form className="formContainer" onSubmit={sumbitForm} >
                    <h1 className="title">Registration</h1>
                    <div className="inputGroup" onFocus={focusHandle} onBlur={blurHandle}>
                        <label htmlFor="name" className="inputLabel">Full name</label>
                        <input type="text" name="name" id="name" className="inputField" ref={name} />
                    </div>
                    <div className="inputGroup" onClick={focusHandle} onBlur={blurHandle}>
                        <label htmlFor="email" className="inputLabel">Email</label>
                        <input type="text" name="email" id="email" className="inputField" ref={email} />
                    </div>
                    <div className="inputGroup" onClick={focusHandle} onBlur={blurHandle}>
                        <label htmlFor="phone" className="inputLabel">Phone</label>
                        <input type="tel" name="phone" id="phone" className="inputField" ref={phone} />
                    </div>
                    <div className="inputGroup" onClick={focusHandle} onBlur={blurHandle}>
                        <label htmlFor="password" className="inputLabel">Password</label>
                        <input type="password" name="password" id="password" className="inputField" ref={password} />
                    </div>
                    <div className="inputGroup" onClick={focusHandle} onBlur={blurHandle}>
                        <label htmlFor="repeatPassword" className="inputLabel">Repeat Password</label>
                        <input type="password" name="repeatPassword" id="repeatPassword" className="inputField" ref={repeatPassword} />
                    </div>
                    <button type="submit" className="submitBtn">Register</button>
                </form>
            </section>
        </div>
    )
}