import React, { useEffect, useState, useContext } from 'react';
import './Navbar.css'; // Import the CSS file
import { NavLink } from "react-router-dom";
import axios from 'axios';


// imports files
import { GlobalContext } from '../../Context/Context.jsx';

const baseUrl = "http://localhost:8080";
const Navbar = () => {
    let { state, dispatch } = useContext(GlobalContext);


    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get(`${baseUrl}/api/v1/user/ping`, {
                    withCredentials: true,
                });
                console.log("API Response:", response); // Log API response
                if (response?.status === 201) {
                    dispatch({
                        type: "USER_LOGIN"
                    })
                    console.log("USER_LOGIN");

                } else {
                    dispatch({
                        type: "USER_LOGOUT"
                    })
                    console.log("USER_LOGOUT");
                }
            } catch (error) {
                console.log("submit error :", error);
            }
        };

        checkLoginStatus();
    }, []);



    return (
        <>
            <header className="navbar-header">
                <div className="container">
                    <div className="brand-logo">
                        <NavLink to="/" className="nav-logo">
                            Hassan-Nadeem
                        </NavLink>
                    </div>
                    {/* Render Navigation Menu Based on Login Status */}
                    <nav className="nav-menu">
                        <ul>
                            {state.isLogin === true ? (
                                // Show these links when user is logged in
                                <>
                                    <li>
                                        <NavLink
                                            to="/"
                                            className={({ isActive }) => (isActive ? "active-link" : "")}
                                        >
                                            Home
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/about"
                                            className={({ isActive }) => (isActive ? "active-link" : "")}
                                        >
                                            About
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/contact"
                                            className={({ isActive }) => (isActive ? "active-link" : "")}
                                        >
                                            Contact
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/chat"
                                            className={({ isActive }) => (isActive ? "active-link" : "")}
                                        >
                                            Chat
                                        </NavLink>
                                    </li>
                                </>
                            ) : null}


                            {state.isLogin === false ? (
                                // Show these links when user is logged in
                                <>
                                    <li>
                                        <NavLink
                                            to="/register"
                                            className={({ isActive }) => (isActive ? "active-link" : "")}
                                        >
                                            Register
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/login"
                                            className={({ isActive }) => (isActive ? "active-link" : "")}
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            ) : null}









                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Navbar;
