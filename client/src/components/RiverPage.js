import React, { useState, useEffect } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { BASE_URL } from '../config';
import '../styles/riverpage.css';


// React Component
const RiverPage = props => {

    // State
    const token = window.localStorage.getItem("auth_token");
    const [river, setRiver] = useState({});
    const [access, setAccess] = useState([]);
    const [center, setCenter] = useState([35.082900, -84.491800,]);
    const [zoom, setZoom] = useState(13);


    // Listen

    // Function
    useEffect(() => {
        const getRiver = async () => {
            const res = await fetch(`${BASE_URL}/api/rivers/${props.match.params.id}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            if (!res.ok) {
                // -- TODO Handling
                console.log("getRiver res failure");
            } else {
                const json = await res.json();
                setRiver(json.river);
                setAccess(json.access);
            }
        };
        getRiver();
    },[]);


// ---- Component Render ---- //

    // Render
    return (
        <div className="riverpage-root--container">
            <div className="riverpage">
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
export default RiverPage;
