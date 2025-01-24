import React, { useState, useRef, useContext } from 'react'
import './Login.css'
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from '../../Context/Context.jsx';



// const baseUrl = "http://localhost:8080"
const Login = () => {
    let { state, dispatch } = useContext(GlobalContext);

    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)

    // const navigate = useNavigate();
    const loginSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post("http://localhost:8080/api/v1/user/login", {
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value
            },
                {
                    withCredentials: true
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )

            dispatch({
                type: "USER_LOGIN"
            })

            console.log("response :", response);
            // console.log("Email:", emailInputRef.current.value);
            // console.log("Password:", passwordInputRef.current.value);


            if (response?.status === 201) {
                toast.success(response?.data?.message);

            }
            else {
                toast.error(response?.data?.message);

            }

        } catch (error) {
            console.log("submit error :", error);
            toast.error(error.response?.data?.message || "Something went wrong!");


        }
    }



    return (
        <div>
            <form id='loginForm' onSubmit={loginSubmitHandler}>
                <label htmlFor='emailInput'>Email:</label>
                <input ref={emailInputRef} type='email' name='emailInput' id='emailInput' placeholder='Enter your email' required></input>
                <br />
                <label htmlFor='passwordInput'>Password:</label>
                <input autoComplete='current-password' ref={passwordInputRef} type='password' name='passwordInput' id='passwordInput' placeholder='Enter your password' required></input>
                <br />
                <button type='submit' id='login-btn'>Login</button>
            </form>
        </div>
    )
}

export default Login
