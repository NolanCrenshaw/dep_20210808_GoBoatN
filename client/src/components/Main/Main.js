import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Main = ({ loginToggle }) => {
  const user = useSelector((state) => state.user.profile);
  const boats = useSelector((state) => state.user.boats);

  const logOut = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("auth_token");
    loginToggle();
  };

  return (
    <div className="main-container">
      <nav>
        <div className="nav_content">
          <section>
            <h1>test</h1>
          </section>
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
          {/* <div>
            {boats.map((item, i) => (
              <div key={i}>{item.name}</div>
            ))}
          </div> */}
        </section>
        <section id="center_panel"></section>
        <section id="right_panel"></section>
      </div>
    </div>
  );
};

export default Main;
