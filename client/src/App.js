// Package Requirements
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./actions";
import { BASE_URL } from "./config";

// Local Requirements
import Splash from "./components/Splash/Splash";
import Main from "./components/Main/Main";

// React Component
function App() {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState(false);

  // Login Attempt Function for Props
  const registerLoginAttempt = () => {
    /*
    ~~ TODO ~~
    This code should be cleaned up in the future.
    It is functional, but relies on a boolean.
    Semantically a boolean is inappropriate.
    */
    setLoginAttempt(!loginAttempt);
  };

  // Login Control
  useEffect(() => {
    /*
    Pulls token from localStorage to dispatch the setUser action.
    Relies on checkToken() to control setIsLoggedIn, which manages render.
    JWT_required on backend secures token authentication.
    loginAttempt state controls useEffect firing.
    registerLoginAttempt() is passed to subcomponents for event handling.
    */
    const token = window.localStorage.getItem("auth_token");
    const checkToken = async (tk) => {
      const res = await fetch(`${BASE_URL}/api/users/token`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`,
        },
      });
      if (!res.ok) {
        setIsLoggedIn(false);
        console.log("checkToken res failure");
      } else {
        const json = await res.json();
        dispatch(setUser(json));
        setIsLoggedIn(true);
      }
    };
    if (token !== null) {
      checkToken(token);
    } else {
      console.log("TOKEN IS NULL");
    }
  }, [loginAttempt]);

  // Render
  return (
    <>
      {isLoggedIn ? (
        <Main />
      ) : (
        <Splash registerLoginAttempt={() => registerLoginAttempt()} />
      )}
    </>
  );
}

export default App;
