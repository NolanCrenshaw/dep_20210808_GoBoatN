import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
    const token = window.localStorage.getItem("auth_token");
    if (token !== null) {
      setUser(token);
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
