import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../../config';
import '../../styles/tripcard.css';


// React Component
const TripCard = props => {

    const token = window.localStorage.getItem("auth_token");
    const history = useHistory();
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        timezone: 'UTC',
        hour12: 'false',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
    };

    // State
    const [river, setRiver] = useState({});
    const [tripDate, setTripDate] = useState(new Date);
    const [tripTime, setTripTime] = useState([])

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

        // Trip's Date and Time State
        const tripTime = new Date(props.trip.scheduled_time);
        console.log(tripTime.toLocaleString('en-US', options).split(/[\,,\s]/))
        setTripDate(
            tripTime.toLocaleString('en-US', options).split(/[\,,\s]/)
        );
        setTripTime(
            tripTime.toLocaleTimeString('en-US').split(/[:,\s]/)
        )


    },[])

// ---- Component Render ---- //

    // Render
    return (
        <div className="tripCard-root--container">
            <div
                className="tripCard"
                key={river.id}
                onClick={navToTrip}>
                <div className="tripCard__datebox">
                    <span>{tripDate[0]}</span>
                    <span>{tripDate[2]}</span>
                    <span>{tripDate[3]}</span>
                </div>
                <div className="tripCard__text-container">
                    <div className="tripCard__name">
                        <span>{river.name}</span>
                    </div>
                </div>
                <div className="tripCard__time">
                    <span>{tripTime[0]}:{tripTime[1]}{tripTime[3]}</span>
                </div>
            </div>
        </div>
    )
};
export default TripCard;
