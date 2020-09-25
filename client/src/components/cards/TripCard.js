import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../../config';
import '../../styles/tripcard.css';


// React Component
const TripCard = props => {

    const token = window.localStorage.getItem("auth_token");
    const history = useHistory();

    // State
    const [river, setRiver] = useState({})

    // Listen

    // Function
    const navToTrip = () => {
        history.push(`/trips/${props.trip.id}`);
        history.go(0);
    };

    useEffect(() => {
        const getRiver = async () => {
            const res = await fetch(`${BASE_URL}/api/rivers/${props.trip.river_id}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            if (!res.ok) {
                // -- TODO - Handling
                console.log("getRiver res failure")
            } else {
                const json = await res.json()
                setRiver(json.river)
            }
        };
        getRiver();
    },[])

// ---- Component Render ---- //

    // Render
    return (
        <div className="tripCard-root--container">
            <div
                className="tripCard"
                onClick={navToTrip}>
                <div className="tripCard__sidebox"></div>
                <div className="tripCard__text-container">
                    <div className="tripCard__name">
                        <span>{river.name}</span>
                    </div>
                    <div className="tripCard__time">
                        <span>{props.trip.scheduled_time}</span>
                    </div>
                    <div className="tripCard__info--container">
                        <div className="tripCard__info--class">
                            <span>{props.trip.class_designation}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default TripCard;
