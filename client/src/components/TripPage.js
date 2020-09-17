import React, { useState, useEffect } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { BASE_URL } from '../config';
import '../styles/trippage.css';


// React Component
const TripPage = props => {

    // Page State
    const token = window.localStorage.getItem("auth_token");
    const [trip, setTrip] = useState({});
    const [putin, setPutin] = useState({});
    const [takeout, setTakeout] = useState({});
    const [center, setCenter] = useState([35.082900, -84.491800,]);
    const [zoom, setZoom] = useState(13);

    // River State
    const [river, setRiver] = useState({});
    const [access, setAccess] = useState([]);

    // Current User State
    const [user, setUser] = useState({});
    const [userBoats, setUserBoats] = useState([]);
    const [userVehicles, setUserVehicles] = useState([]);


    // Listen

    // Function

    useEffect(() => {
        const getTrip = async () => {
            const res = await fetch(`${BASE_URL}/api/trips/${props.match.params.id}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) {
                // -- TODO Handling
                console.log("getTrip res failure");
            } else {
                const json = await res.json();
                setTrip(json.trip);
            }
        }
        const getRiver = async () => {
            const res = await fetch(`${BASE_URL}/api/rivers/${trip.river_id}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            if (!res.ok) {
                // -- TODO Handling
                console.log("getRiver res failure");
            } else {
                const json = await res.json();
                setRiver(json.river);
                setAccess(json.access);
            }
        };
        const getUser = async () => {
            const res = await fetch(`${BASE_URL}/api/users/token`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) {
                // -- TODO -- Handling
                console.log("getUser res failure");
            } else {
                const json = await res.json();
                setUser(json.user);
                setUserBoats(json.boats);
                setUserVehicles(json.vehicles);
            }
        };
        getUser();
        getTrip();
        getRiver();
    },[]);


// ---- Component Render ---- //

    // Render
    return (
        <div className="trippage-root--container">
            <div className="trippage">
                <div className="map-container">
                    <Map
                        center={center}
                        zoom={zoom}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </Map>
                </div>
            </div>
        </div>
    )
};
export default TripPage;
