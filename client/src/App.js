import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./actions/userActions";

// Local Requirements
import Splash from "./components/Splash/Splash";
import Main from "./components/Main/Main";
import LoadingSpinner from "./components/_svg_library/LoadingSpinner";

// React Component
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [pageRendered, setPageRendered] = useState(false);

  // Login Control ~~ based on stored auth_token
  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    // undefined token instances require being interpolated
    if (token !== null && token !== `${undefined}`) {
      dispatch(setUser(token));
    } else if (token === `${undefined}`) {
      // remove corrupt auth_token instances
      window.localStorage.removeItem("auth_token");
    }
  }, []);

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
        <div>{isLoggedIn ? <Main /> : <Splash />}</div>
      )}
    </>
  );
}

export default App;
