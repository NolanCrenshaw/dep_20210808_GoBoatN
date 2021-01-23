import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BASE_URL } from "../config";
import { setUser } from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Boats from "./Boats";
import Vehicles from "./Vehicles";
import RiverPage from "./RiverPage";
import TripPage from "./TripPage";
import Rivers from "./Rivers";
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";
// import "../styles/main.css";
// import "../styles/alt/alt-main.css";

// React Component
const Main = () => {
  // Redux Controls
  const dispatch = useDispatch();

  // Page State
  const token = window.localStorage.getItem("auth_token");

  // Functions
  useEffect(() => {
    // Fetch User by <auth_token>
    const getUser = async () => {
      const res = await fetch(`${BASE_URL}/api/users/token`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        // -- TODO -- Handling
        console.log("getUser res failure");
      } else {
        const json = await res.json();
        dispatch(setUser(json));
      }
    };
    getUser();
  }, []);

  // ---- Component Render ---- //

  // Render
  return (
    <div className="main-container"></div>

    // <div className="main-root--container">
    //     <div className="main--container">
    //         <Header/>
    //         <div className="main__body">
    //             <div className="main__body--elements">
    //                 <Router>
    //                     <div className="main__caput">
    //                         <Switch>
    //                             <Route exact path="/boats">
    //                                 <Boats/>
    //                             </Route>
    //                             <Route exact path="/vehicles">
    //                                 <Vehicles/>
    //                             </Route>
    //                             <Route exact path="/rivers">
    //                                 <Rivers/>
    //                             </Route>
    //                             <Route exact path="/rivers/:id" component={RiverPage}/>
    //                             <Route exact path="/profile/edit">
    //                                 <ProfileEdit/>
    //                             </Route>
    //                             <Route exact path="/profile/:id" component={Profile}/>
    //                             <Route exact path="/trips/:id" component={TripPage}/>
    //                             <Route exact path="/">
    //                                 <Landing/>
    //                             </Route>
    //                         </Switch>
    //                     </div>
    //                 </Router>
    //             </div>
    //             <div className="main__footer">
    //                 <span>Footer</span>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
};
export default Main;
