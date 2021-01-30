import React, { useState, useEffect } from "react";
import { Map, TileLayer, Marker } from "react-leaflet";
import { BASE_URL } from "../config";
import { useHistory } from "react-router-dom";
// import '../styles/riverpage.css';

// React Component
const RiverPage = (props) => {
  const token = window.localStorage.getItem("auth_token");
  const history = useHistory();

  // State
  const [river, setRiver] = useState({});
  const [user, setUser] = useState({});
  const [access, setAccess] = useState([{}, {}]);
  const [putin, setPutin] = useState([35.0829, -84.4918]);
  const [takeout, setTakeout] = useState([35.0829, -84.4918]);
  const [center, setCenter] = useState([35.0829, -84.4918]);
  const [zoom, setZoom] = useState(11);

  // Listen

  // Function
  const createTrip = async () => {
    const trip = {
      river: river.id,
      user: user.id,
      putin: access[0].id,
      takeout: access[1].id,
    };

    const res = await fetch(`${BASE_URL}/api/trips/create`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(trip),
    });
    if (!res.ok) {
      // -- TODO  - Handling
      console.log("createTrip res failure");
    } else {
      const json = await res.json();
      history.push(`/trips/${json.trip_id}`);
      history.go(0);
    }
  };

  useEffect(() => {
    const getRiver = async () => {
      const res = await fetch(
        `${BASE_URL}/api/rivers/${props.match.params.id}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        // -- TODO Handling
        console.log("getRiver res failure");
      } else {
        const json = await res.json();
        const piLat = json.access[0].latitude;
        const piLon = json.access[0].longitude;
        const toLat = json.access[1].latitude;
        const toLon = json.access[1].longitude;
        setRiver(json.river);
        setAccess(json.access);
        setCenter([piLat, toLon]);
        setPutin([piLat, piLon]);
        setTakeout([toLat, toLon]);
      }
    };
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
        setUser(json.user);
      }
    };
    getRiver();
    getUser();
  }, []);

  // ---- Component Render ---- //

  // Render
  return (
    <div className="riverpage-root--container">
      <div className="riverpage">
        <div className="map-container">
          <Map center={center} zoom={zoom}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={putin}>
              {/* <Popup>{access[0].name}</Popup> */}
            </Marker>
            <Marker position={takeout}>
              {/* <Popup>{access[1].name}</Popup> */}
            </Marker>
          </Map>
        </div>
        <div className="riverpage-body">
          <div className="riverpage-body__textbox">
            <div className="riverpage-body--name-c">
              <div className="riverpage-body__rivername">
                <span>{river.name}</span>
              </div>
            </div>
            <div className="riverpage-body--region-c">
              <div className="riverpage-body__region">
                <span>{river.region}</span>
              </div>
            </div>
          </div>
          <div className="riverpage-body__access-c">
            <div className="riverpage-body__access">
              <span>Put in:</span>
              <span>{access[0].name}</span>
              <span>Take out:</span>
              <span>{access[1].name}</span>
            </div>
          </div>
          <div className="riverpage-body__trip-c">
            <div className="riverpage-body__trip--button" onClick={createTrip}>
              <span>Let's Go Boating!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RiverPage;
