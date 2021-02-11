import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setRiversStart,
  setRiversSuccess,
  setRiversFailure,
} from "../../actions/riverActions";
import { BASE_URL } from "../../config";
import { motion } from "framer-motion";
import { DateTime } from "luxon";

import Home from "../Home/Home";
import Rivers from "../Rivers/Rivers";
import RiverPage from "../Rivers/RiverPage";
import HomeIcon from "../_svg_library/HomeIcon";
import FriendsIcon from "../_svg_library/FriendsIcon";
import TripsIcon from "../_svg_library/TripsIcon";
import RiversIcon from "../_svg_library/RiversIcon";
import SettingsIcon from "../_svg_library/SettingsIcon";

const Main = ({ loginToggle }) => {
  const dispatch = useDispatch();

  const [currentTime, setCurrentTime] = useState({});
  const user = useSelector((state) => state.user.profile);
  const trips = useSelector((state) => state.user.trips);
  const invites = useSelector((state) => state.user.invites);

  const logOut = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("auth_token");
    loginToggle();
  };

  // Running Clock Handler
  useEffect(() => {
    const setTime = () => {
      const now = DateTime.local();
      setCurrentTime(now.toLocaleString(DateTime.DATETIME_MED));
    };
    setTime();
    const minuteInterval = setInterval(() => setTime(), 30000);
    return () => clearInterval(minuteInterval);
  }, []);

  // state.rivers ~ Fetch & Redux Management
  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    const fetchRivers = async (tk) => {
      const res = await fetch(`${BASE_URL}/api/rivers/`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tk}`,
        },
      });
      if (!res.ok) {
        dispatch(setRiversFailure(res.statusText));
      } else {
        const json = await res.json();
        dispatch(setRiversSuccess(json.rivers));
      }
    };
    if (token !== null) {
      dispatch(setRiversStart());
      fetchRivers(token);
    }
  }, []);

  return (
    <Router>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="main-container"
      >
        <nav>
          <div className="nav_content">
            <section>
              <h1>Go Boating</h1>
            </section>
            <section></section>
            <section>
              <button className="nav_button" onClick={logOut}>
                Log Out
              </button>
            </section>
          </div>
        </nav>
        <div className="vis">
          <section id="left_panel">
            <img
              alt="profile picture"
              src="https://goboatnbucky.s3.us-east-2.amazonaws.com/default-profile-pic.jpg"
            />
            <hgroup>
              <h3>{user.username}</h3>
              <h4>{user.email}</h4>
            </hgroup>
            <div className="left_panel--divider" />
            <nav>
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05, transition: { duration: 0.01 } }}
                >
                  <HomeIcon />
                  <label>Home</label>
                </motion.button>
              </Link>
              <Link to="/friends">
                <motion.button
                  whileHover={{ scale: 1.05, transition: { duration: 0.01 } }}
                >
                  <FriendsIcon />
                  <label>Friends</label>
                </motion.button>
              </Link>
              <Link to="/trips">
                <motion.button
                  whileHover={{ scale: 1.05, transition: { duration: 0.01 } }}
                >
                  <TripsIcon />
                  <label>Trips</label>
                </motion.button>
              </Link>
              <Link to="/rivers">
                <motion.button
                  whileHover={{ scale: 1.05, transition: { duration: 0.01 } }}
                >
                  <RiversIcon />
                  <label>Rivers</label>
                </motion.button>
              </Link>
              <Link to="/settings">
                <motion.button
                  whileHover={{ scale: 1.05, transition: { duration: 0.01 } }}
                >
                  <SettingsIcon />
                  <label>Settings</label>
                </motion.button>
              </Link>
            </nav>
            <div className="left_panel--divider" />
          </section>
          <section id="center_panel">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/friends">
                <div>
                  <h1>Friends</h1>
                </div>
              </Route>
              <Route exact path="/trips">
                <div>
                  <h1>Trips</h1>
                </div>
              </Route>
              <Route exact path="/rivers">
                <Rivers />
              </Route>
              <Route exact path="/rivers/:id">
                <RiverPage />
              </Route>
              <Route exact path="/settings">
                <div>
                  <h1>Settings</h1>
                </div>
              </Route>
            </Switch>
          </section>
          <section id="right_panel">
            <header>
              <span>{currentTime ? `${currentTime}` : ""}</span>
            </header>
            <div>
              <h3>Trips</h3>
              {trips.map((item) => (
                <div key={item.id}>{item}</div>
              ))}
            </div>
            <div>
              <h3>Invites</h3>
              {invites.map((item) => (
                <div key={item.id}>{item}</div>
              ))}
            </div>
          </section>
        </div>
        <footer></footer>
      </motion.div>
    </Router>
  );
};

export default Main;
