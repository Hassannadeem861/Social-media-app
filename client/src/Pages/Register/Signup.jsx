import React, { useState, useRef } from 'react'
import './Signup.css'
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080"

const Signup = () => {

    const userNameInputRef = useRef(null)
    const emailInputRef = useRef(null)
    const passwordInputRef = useRef(null)
    const repeatPasswordInputRef = useRef(null)

    const navigate = useNavigate();
    const signupSubmitHandler = async (e) => {
        e.preventDefault()

        if (passwordInputRef.current.value !== repeatPasswordInputRef.current.value) {
            console.log(`passwordInputRef: ${passwordInputRef.current.value} repeatPasswordInputRef: ${repeatPasswordInputRef.current.value}`);
            toast.error("Password do not match");
            return
        }

        try {

            const response = await axios.post(`${baseUrl}/api/v1/user/register`, {
                username: userNameInputRef.current.value,
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            console.log("response :", response);

            if (response.status == 201) {
                toast.success(response?.data?.message);
                navigate("/login");
            } else {
                toast.error(response?.data?.message);
            }

        } catch (error) {
            console.log("submit error :", error);
            toast.error(error.response?.data?.message || "Something went wrong!");

        }
    }


    return (
        <div>
            <form id='signupForm' onSubmit={signupSubmitHandler}>
                <label htmlFor='userNameInput'>Username:</label>
                <input ref={userNameInputRef} type='text' name='userNameInput' id='userNameInput' placeholder='Enter your username' required></input>
                <br />
                <label htmlFor='emailInput'>Email:</label>
                <input ref={emailInputRef} type='email' name='passwordInput' id='passwordInput' placeholder='Enter your email' required></input>
                <br />
                <label htmlFor='passwordInput'>Password:</label>
                <input ref={passwordInputRef} type='password' name='passwordInput' id='passwordInput' placeholder='Enter your password' required></input>
                <br />
                <label htmlFor='repeatPasswordInput'>Repeat password:</label>
                <input ref={repeatPasswordInputRef} type='password' name='repeatPasswordInput' id='repeatPasswordInput' placeholder='Enter your repeat password' required></input>
                <br />
                <button type='submit' id='signup-btn'>Register</button>
            </form>
        </div>
    )
    // <p className={`passwordError ${passwordErrorClass}`}>Password do not match</p>
}

export default Signup
