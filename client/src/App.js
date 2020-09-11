// Package Requirements
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

// Local Requirements
import Splash from './components/Splash';
import Main from './components/Main';
import { API_URL } from './config';

// Access "auth_token" -- never pass to props
const token = window.localStorage.getItem('auth_token');

// React Component
function App() {


    // useEffect(() => {
    //     const getCSRF = async () => {
    //         const response = await fetch(`${baseUrl}/csrf`, {
    //         method: "get",
    //         credentials:'include',
    //         headers: { "Content-Type": "application/json" },
    //         });
    //         if (response.ok) {
    //         const cookieValue = document.cookie
    //             .split("; ")
    //             .find((row) => row.startsWith("csrf_token"))
    //             .split("=")[1];
    //         dispatch(setCSRF(cookieValue));
    //         };
    //     };
    //     getCSRF();
    // }, [])


    // export const signIn = (email, password, csurf) => async dispatch => {
    //     const response = await fetch(`${baseUrl}/signin`, {
    //       method: 'post',
    //       credentials:'include',
    //       headers: { 'Content-Type': 'application/json',
    //       'X-CSRFToken': csurf
    //     },
    //       body: JSON.stringify({ email, password }),
    //     });
    //     if (response.ok) { more code after

    return (
        <BrowserRouter>
            {token ? <Main/> : <Splash/>}
        </BrowserRouter>
    );
}

export default App;
