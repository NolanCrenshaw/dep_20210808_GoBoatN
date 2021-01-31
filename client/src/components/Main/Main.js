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
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-home-2"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="5 12 3 12 12 3 21 12 19 12" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <rect x="10" y="12" width="4" height="4" />
              </svg>
              <label>Home</label>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-friends"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="7" cy="5" r="2" />
                <path d="M5 22v-5l-1 -1v-4a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4l-1 1v5" />
                <circle cx="17" cy="5" r="2" />
                <path d="M15 22v-4h-2l2 -6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1l2 6h-2v4" />
              </svg>
              <label>Friends</label>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-car"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
                <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
              </svg>
              <label>Trips</label>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-cloud-rain"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7" />
                <path d="M11 13v2m0 3v2m4 -5v2m0 3v2" />
              </svg>
              <label>Rivers</label>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-settings"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <label>Settings</label>
            </button>
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
