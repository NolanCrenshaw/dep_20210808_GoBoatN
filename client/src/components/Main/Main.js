import React from "react";
import { useDispatch, useSelector } from "react-redux";

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
            <button>Home</button>
            <button>Friends</button>
            <button>Trips</button>
            <button>Rivers</button>
            <button>Settings</button>
          </nav>
        </section>
        <section id="center_panel">
          <div className="banner-container">
            <img
              alt="banner image"
              src="https://goboatnbucky.s3.us-east-2.amazonaws.com/eduardlabar_med.jpg"
            />
          </div>
          <div className="user_items">
            <div>
              <h2>Boats</h2>
              {boats.map((item, i) => (
                <div key={i}>{item.name}</div>
              ))}
            </div>
          </div>
          <div className="user_items">
            <div>
              <h2>Vehicles</h2>
              {vehicles.map((item, i) => (
                <div key={i}>{item.name}</div>
              ))}
            </div>
          </div>
        </section>
        <section id="right_panel"></section>
      </div>
      <footer></footer>
    </div>
  );
};

export default Main;
