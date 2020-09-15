import React, { useEffect } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { API_URL } from '../config';
import '../styles/riverpage.css';


// React Component
const RiverPage = props => {

    // State
    const token = window.localStorage.getItem("auth_token");
    const position = [35.082900, -84.491800,]
    const zoom = 13

    // Listen

    // Function


// ---- Component Render ---- //

    // Render
    return (
        <div className="riverpage-root--container">
            <div className="riverpage">
                <div className="map-container">
                    <Map
                        center={position}
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
