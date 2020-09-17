import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../styles/tripcard.css';


// React Component
const TripCard = props => {

    // State
    const history = useHistory();

    // Listen

    // Function
    const navToTrip = () => {
        history.push(`/trips/${props.trip[0].id}`);
        history.go(0);
    };

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
                        <span>{props.trip[0].name}</span>
                    </div>
                    <div className="tripCard__info-container">
                        <div className="tripCard__info--class">
                            <span>{props.trip[0].class_designation}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default TripCard;
