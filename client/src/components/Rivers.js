import React, { useEffect } from 'react';
import { API_URL } from '../config';
import '../styles/rivers.css';


// React Component
const Rivers = props => {

    // State
    const token = window.localStorage.getItem("auth_token");
    const L = window.L;

    // Listen

    // Function

    useEffect(() => {
        const mymap = L.map('mapid').setView([51.505, -0.09], 13);
    }, [])

// ---- Component Render ---- //

    // Render
    return (
        <div className="rivers-root--container">
            <div className="rivers">
                <div id="mapid">

                </div>
            </div>
        </div>
    )
};
export default Rivers;
