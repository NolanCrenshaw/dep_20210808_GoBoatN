import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setUserStart,
  setUserSuccess,
  setUserFailure,
} from "./actions/userActions";
import { BASE_URL } from "./config";

// Local Requirements
import Splash from "./components/Splash/Splash";
import Main from "./components/Main/Main";
import LoadingSpinner from "./components/_svg_library/LoadingSpinner";

// React Component
function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [pageRendered, setPageRendered] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState(false);

  // Login Attempt Function for Props
  const loginToggle = () => {
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
    loginToggle() is passed to subcomponents for event handling.
    */
    const token = window.localStorage.getItem("auth_token");
    // const checkToken = async (tk) => {
    //   const res = await fetch(`${BASE_URL}/api/users/token`, {
    //     method: "GET",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${tk}`,
    //     },
    //   });
    //   if (!res.ok) {
    //     setIsLoggedIn(false);
    //     dispatch(setUserFailure(res.statusText));
    //   } else {
    //     const json = await res.json();
    //     dispatch(setUserSuccess(json));
    //     setIsLoggedIn(true);
    //   }
    // };
    if (token !== null) {
      checkToken(token);
    } else {
      // setIsLoggedIn(false);
    }
  }, [loginAttempt]);

  useEffect(() => {
    setTimeout(() => {
      setPageRendered(true);
    }, 500);
  }, []);

  // Render
  return (
    <>
      {!pageRendered ? (
        <div className="loader">
          <LoadingSpinner />
        </div>
      ) : (
        <div>
          {isLoggedIn ? (
            <Main loginToggle={() => loginToggle()} />
          ) : (
            <Splash loginToggle={() => loginToggle()} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
