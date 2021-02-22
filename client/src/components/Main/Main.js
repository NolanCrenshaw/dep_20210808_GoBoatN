import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { fetchRivers } from "../../actions/riverActions";
import { setFriends } from "../../actions/friendsActions";
import { setTrips } from "../../actions/tripActions";
import { setTripsStart, setTripsSuccess } from "../../actions/tripActions";
import { motion } from "framer-motion";
import { DateTime } from "luxon";

// Icon Imports
import HomeIcon from "../_svg_library/HomeIcon";
import FriendsIcon from "../_svg_library/FriendsIcon";
import TripsIcon from "../_svg_library/TripsIcon";
import RiversIcon from "../_svg_library/RiversIcon";
import SettingsIcon from "../_svg_library/SettingsIcon";

import Home from "../Home/Home";
import Rivers from "../Rivers/Rivers";
import RiverPage from "../Rivers/RiverPage";
import Friends from "../Friends/Friends";

const Main = () => {
  const dispatch = useDispatch();

  const [currentTime, setCurrentTime] = useState({});
  const user = useSelector((state) => state.user.profile);
  const trips = useSelector((state) => state.trips);
  const invites = useSelector((state) => state.user.invites);

  // Logout Function
  const logOut = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("auth_token");
    dispatch(logout());
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

  // state.rivers ~ Fetch & Redux management
  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    dispatch(fetchRivers(token));
  }, []);

  // state.friends ~ Fetch & Redux management
  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    dispatch(setFriends(token));
  }, []);

  // state.trips ~ Fetch & Redux management
  useEffect(() => {
    const token = window.localStorage.getItem("auth_token");
    dispatch(setTrips(token));
  }, []);

  // useEffect(() => {
  //   /*
  //   ~~ TODO ~~
  //   Will possibly need to change initial trip fetch call.
  //   Currently being returned through user object.
  //   */
  //   if (trips !== undefined && trips.length > 0) {
  //     dispatch(setTripsStart());
  //     dispatch(setTripsSuccess(trips));
  //   }
  // }, [trips]);

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
            <section className="nav_title">
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
                <Friends />
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
              {Object.values(trips).map((item) => (
                <div key={item.id}>
                  <span>{item.river_id}</span>
                  <p> | </p>
                  <span>{item.put_in}</span>
                  <p> | </p>
                  <span>{item.take_out}</span>
                </div>
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
