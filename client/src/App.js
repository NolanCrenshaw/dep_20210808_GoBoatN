// Package Requirements
import React, { useEffect, useState } from "react";

// Local Requirements
import Splash from "./components/Splash/Splash";
import Main from "./components/Main";

// React Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginAttempt, setLoginAttempt] = useState(0);
  const [user, setUser] = useState({ username: "default" });

  // Login Control
  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    const checkToken = async (tk) => {
      const res = await fetch(`${BASE_URL}/api/auth/`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`,
        },
      });
      if (!res.ok) {
        // -- TODO Handling
        setUser({ username: "default" });
        setIsLoggedIn(false);
        console.log("checkToken res failure");
      } else {
        const json = await res.json();
        setUser(json.admin);
        setIsLoggedIn(true);
      }
    };
    if (token !== null) {
      checkToken(token);
    }
  }, [loginAttempt]);

  // Render
  return <>{isLoggedIn ? <Main /> : <Splash loginCtrl={setLoginAttempt} />}</>;
}

export default App;
