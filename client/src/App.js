// Package Requirements
import React, { useEffect, useState } from "react";

// Local Requirements
import Splash from "./components/Splash/Splash";
import Main from "./components/Main";

// React Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // token sets to null when absent
    setToken(window.localStorage.getItem("auth_token"));
  }, []);

  useEffect(() => {
    /*
    ~~ TODO ~~
    Currently not secure.
    Will need to fetch against restricted route
    to check if token is valid.
    */
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);

  // Render
  return <>{isLoggedIn ? <Main /> : <Splash />}</>;
}

export default App;
