import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Home from "../Home/Home";
import HomeIcon from "../_svg_library/HomeIcon";
import FriendsIcon from "../_svg_library/FriendsIcon";
import TripsIcon from "../_svg_library/TripsIcon";
import RiversIcon from "../_svg_library/RiversIcon";
import SettingsIcon from "../_svg_library/SettingsIcon";

const Main = ({ loginToggle }) => {
  const user = useSelector((state) => state.user.profile);
  const boats = useSelector((state) => state.user.boats);
  const vehicles = useSelector((state) => state.user.vehicles);

  const logOut = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("auth_token");
    loginToggle();
  };

  return (
    <Router>
      <div className="main-container">
        <nav>
          <div className="nav_content">
            <section></section>
            <section>
              <h1>Go Boating</h1>
            </section>
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
                <button>
                  <HomeIcon />
                  <label>Home</label>
                </button>
              </Link>
              <Link to="/friends">
                <button>
                  <FriendsIcon />
                  <label>Friends</label>
                </button>
              </Link>
              <Link to="/trips">
                <button>
                  <TripsIcon />
                  <label>Trips</label>
                </button>
              </Link>
              <Link to="/rivers">
                <button>
                  <RiversIcon />
                  <label>Rivers</label>
                </button>
              </Link>
              <Link to="/settings">
                <button>
                  <SettingsIcon />
                  <label>Settings</label>
                </button>
              </Link>
            </nav>
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
                <div>
                  <h1>Rivers</h1>
                </div>
              </Route>
              <Route exact path="/settings">
                <div>
                  <h1>Settings</h1>
                </div>
              </Route>
            </Switch>
          </section>
          <section id="right_panel"></section>
        </div>
        <footer></footer>
      </div>
    </Router>
  );
};

export default Main;
